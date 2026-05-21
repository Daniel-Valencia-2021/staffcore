import api from "@/api/axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Empleado {
  id_employee: number;
  first_name: string;
  last_name: string;
  position: string;
  salary: number;
  departament_id: number;
}

interface Departamento {
  id: number;
  name: string;
}

export default function Dashboard() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empleadosResponse = await api.get("/employee/");
        setEmpleados(empleadosResponse.data);
        const departamentosResponse = await api.get("/departments/");
        setDepartamentos(departamentosResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalEmpleados = empleados.length;
  const salarioPromedio =
    empleados.length > 0
      ? empleados.reduce((acc, emp) => acc + emp.salary, 0) / empleados.length
      : 0;
  const empleadosRecientes = empleados.slice(-5).reverse();
  const empleadosPorDepartamento = departamentos.map((dept) => ({
    name: dept.name,
    empleados: empleados.filter((emp) => emp.departament_id === dept.id).length,
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400 text-sm">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-10">

      {/* Bienvenida */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Bienvenido
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Aquí está el resumen de tu organización hoy.
        </p>
      </div>

      {/* Métricas — cards estilo Stitch */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-0.5 transition-transform">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Total empleados
          </p>
          <span className="text-4xl font-black text-gray-900">
            {totalEmpleados}
          </span>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2a5a2a] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-0.5 transition-transform">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Departamentos
          </p>
          <span className="text-4xl font-black text-gray-900">
            {departamentos.length}
          </span>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2a5a2a] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-0.5 transition-transform">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Salario promedio
          </p>
          <span className="text-4xl font-black text-gray-900">
            ${salarioPromedio.toLocaleString("es-CO", { maximumFractionDigits: 0 })}
          </span>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2a5a2a] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </div>
      </section>

      {/* Tabla empleados recientes */}
      <section className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h4 className="text-base font-semibold text-gray-900">
            Empleados recientes
          </h4>
          <button className="text-sm text-[#2a5a2a] font-semibold hover:underline">
            Ver todos
          </button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Empleado
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Cargo
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Departamento
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Salario
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {empleadosRecientes.map((emp) => (
              <TableRow
                key={emp.id_employee}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-bold text-[#2a5a2a]">
                      {emp.first_name[0]}{emp.last_name[0]}
                    </div>
                    <span className="font-medium text-gray-900">
                      {emp.first_name} {emp.last_name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-500">{emp.position}</TableCell>
                <TableCell className="text-gray-500">
                  {departamentos.find((d) => d.id === emp.departament_id)?.name || "No asignado"}
                </TableCell>
                <TableCell className="font-medium text-gray-900 tabular-nums">
                  ${emp.salary.toLocaleString("es-CO")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Gráfica por departamento */}
      <section className="bg-white border border-gray-100 rounded-xl p-6">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
          Distribución por departamento
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={empleadosPorDepartamento}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "#0a0a0a",
                border: "none",
                borderRadius: "6px",
                color: "#fff",
                fontSize: "12px",
              }}
            />
            <Bar
              dataKey="empleados"
              fill="#2a5a2a"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </section>

    </div>
  );
}