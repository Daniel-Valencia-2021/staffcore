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
  const [empleados, setEmpleados] = useState<Empleado[]>([]); // Cambia el tipo de estado a un array para almacenar la lista de empleados);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]); // Cambia el tipo de estado a un array para almacenar la lista de departamentos);
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

  const totalEmpleados = empleados.length; // Reemplaza con la lógica para obtener el número total de empleados

  const salarioPromedio =
    empleados.length > 0
      ? empleados.reduce((acc, emp) => acc + emp.salary, 0) / empleados.length
      : 0; // Reemplaza con la lógica para calcular el salario promedio

  const empleadosRecientes = empleados.slice(-5).reverse(); // Reemplaza con la lógica para obtener los empleados recientes

  const empleadosPorDepartamento = departamentos.map((dept) => ({
    name: dept.name,
    empleados: empleados.filter((emp) => emp.departament_id === dept.id).length,
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Cargando...
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400 text-sm">Cargando datos...</p>
      </div>
    );
  }
  return (
    <div className="p-8">
      <div className="dashboard mb-12">
        <h2 className="text-xs text-gray-400 justify-center uppercase tracking-widest mb-6">
          RESUMEN GENERAL
        </h2>
        <div className="flex gap-12 justify-center border-b border-gray-100 pb-8">
          <div className="flex flex-col">
            <span className="text-4xl font-black text-[#2a5a2a]">
              {totalEmpleados}
            </span>
            <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">
              Empleados
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-4xl font-black text-[#2a5a2a]">
              {departamentos.length}
            </span>
            <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">
              Departamentos
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-4xl font-black text-[#2a5a2a]">
              $
              {salarioPromedio.toLocaleString("es-CO", {
                maximumFractionDigits: 0,
              })}{" "}
            </span>
            <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">
              Salario promedio
            </span>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xs text-gray-400 justify-center uppercase tracking-widest mb-6">
          Empleados recientes
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Salario</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {empleadosRecientes.map((emp) => (
              <TableRow key={emp.id_employee}>
                <TableCell>
                  {emp.first_name} {emp.last_name}
                </TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>
                  {departamentos.find((d) => d.id === emp.departament_id)
                    ?.name || "No asignado"}
                </TableCell>
                <TableCell>${emp.salary.toLocaleString("es-CO")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-6">
          Empleados por departamento
        </h2>
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
      </div>
    </div>
  );
}
