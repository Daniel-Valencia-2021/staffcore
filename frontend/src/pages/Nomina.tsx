import api from "@/api/axios";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Departamento {
  id: number;
  name: string;
}

interface Empleado {
  id_employee: number;
  first_name: string;
  last_name: string;
  position: string;
  departament_id: number;
  salary: number;
}

export default function Nomina() {
  const [loading, setLoading] = useState(false);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const depRes = await api.get("/departments/");
        setDepartamentos(depRes.data);
        const empRes = await api.get("/employee/");
        setEmpleados(empRes.data);
      } catch (err) {
        console.error("Error al cargar nómina", err);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  // Cálculos derivados
  const nominaTotal = empleados.reduce((sum, e) => sum + e.salary, 0);
  const salarioPromedio =
    empleados.length > 0 ? nominaTotal / empleados.length : 0;
  const empleadoMejorPagado = empleados.reduce(
    (max, e) => (e.salary > (max?.salary ?? 0) ? e : max),
    empleados[0],
  );

  const empleadosOrdenados = [...empleados].sort((a, b) => b.salary - a.salary);

  const nominaPorDepartamento = departamentos.map((dept) => ({
    name: dept.name,
    nomina: empleados
      .filter((e) => e.departament_id === dept.id)
      .reduce((sum, e) => sum + e.salary, 0),
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400 text-sm">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Nómina
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Resumen de salarios y distribución por departamento
        </p>
      </div>

      {/* Métricas */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-0.5 transition-transform">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Nómina total
          </p>
          <span className="text-4xl font-black text-gray-900">
            ${nominaTotal.toLocaleString("es-CO", { maximumFractionDigits: 0 })}
          </span>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2a5a2a] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-0.5 transition-transform">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Salario promedio
          </p>
          <span className="text-4xl font-black text-gray-900">
            $
            {salarioPromedio.toLocaleString("es-CO", {
              maximumFractionDigits: 0,
            })}
          </span>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2a5a2a] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-3 relative overflow-hidden group hover:-translate-y-0.5 transition-transform">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Mejor salario
          </p>
          {empleadoMejorPagado && (
            <>
              <span className="text-4xl font-black text-gray-900">
                $
                {empleadoMejorPagado.salary.toLocaleString("es-CO", {
                  maximumFractionDigits: 0,
                })}
              </span>
              <span className="text-xs text-gray-400">
                {empleadoMejorPagado.first_name} {empleadoMejorPagado.last_name}{" "}
                · {empleadoMejorPagado.position}
              </span>
            </>
          )}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2a5a2a] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </div>
      </section>

      {/* Tabla de empleados ordenados por salario */}
      <section className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h4 className="text-base font-semibold text-gray-900">
            Empleados por salario
          </h4>
          <p className="text-xs text-gray-400 mt-0.5">
            Ordenados de mayor a menor
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                #
              </TableHead>
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
              <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                % del total
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {empleadosOrdenados.map((emp, index) => (
              <TableRow
                key={emp.id_employee}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="text-gray-400 text-sm font-medium">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-bold text-[#2a5a2a]">
                      {emp.first_name[0]}
                      {emp.last_name[0]}
                    </div>
                    <span className="font-medium text-gray-900 text-sm">
                      {emp.first_name} {emp.last_name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-500 text-sm">
                  {emp.position}
                </TableCell>
                <TableCell className="text-gray-500 text-sm">
                  {departamentos.find((d) => d.id === emp.departament_id)
                    ?.name || "—"}
                </TableCell>
                <TableCell className="font-semibold text-gray-900 text-sm tabular-nums">
                  ${emp.salary.toLocaleString("es-CO")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 max-w-[80px]">
                      <div
                        className="bg-[#2a5a2a] h-1.5 rounded-full"
                        style={{
                          width: `${(emp.salary / nominaTotal) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 tabular-nums">
                      {((emp.salary / nominaTotal) * 100).toFixed(1)}%
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Gráfica por departamento */}
      <section className="bg-white border border-gray-100 rounded-xl p-6">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
          Nómina por departamento
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={nominaPorDepartamento}
            margin={{ top: 0, right: 0, left: 10, bottom: 0 }}
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
              tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`}
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
              dataKey="nomina"
              fill="#2a5a2a"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}
