import api from "@/api/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Empleado {
  id_employee: number;
  first_name: string;
  last_name: string;
  position: string;
  salary: number;
  departament_id: number;
  cc: string;
  age: number;
  phone: string;
  mail: string;
  hire_date: Date;
  disability: string | null;
  details: string;
  status: string;
  img: string | null;
}

interface Departamento {
  id: number;
  name: string;
}

const inputClass =
  "h-10 bg-white border-gray-200 rounded-lg text-sm focus:border-[#2a5a2a] focus:ring-[#2a5a2a]";
const labelClass =
  "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 block";

export default function Empleados() {
  const [paginaActual, setPaginaActual] = useState(1);
  const empleadosPorPagina = 10;
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [empleadoEditando, setEmpleadoEditando] = useState<Empleado | null>(
    null,
  );
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    cc: "",
    age: 0,
    phone: "",
    mail: "",
    position: "",
    hire_date: "",
    salary: 0,
    disability: "none",
    details: "",
    status: "active",
    img: "",
    departament_id: 0,
  });
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarEmpleados = async () => {
    try {
      const empRes = await api.get("/employee/");
      setEmpleados(empRes.data);
      const deptRes = await api.get("/departments/");
      setDepartamentos(deptRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleGuardar = async () => {
    try {
      if (empleadoEditando) {
        await api.patch(`/employee/${empleadoEditando.id_employee}`, form);
      } else {
        await api.post("/employee/", form);
      }
      setModalAbierto(false);
      await cargarEmpleados();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const eliminarEmpleado = async (id: number) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este empleado?",
    );
    if (!confirmar) return;
    try {
      await api.delete(`/employee/${id}`);
      await cargarEmpleados();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    const cargarEmpleados = async () => {
      try {
        const empRes = await api.get("/employee/");
        setEmpleados(empRes.data);
        const deptRes = await api.get("/departments/");
        setDepartamentos(deptRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarEmpleados();
  }, []);

  const normalizar = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filtrarEmpleados = () =>
    empleados.filter((emp) => {
      const nombre = `${emp.first_name} ${emp.last_name}`;
      const termino = normalizar(busqueda);
      return (
        normalizar(nombre).includes(termino) ||
        normalizar(emp.cc).includes(termino) ||
        normalizar(emp.position).includes(termino) ||
        normalizar(
          departamentos.find((d) => d.id === emp.departament_id)?.name || "",
        ).includes(termino)
      );
    });

  const empleadosPaginados = filtrarEmpleados().slice(
    (paginaActual - 1) * empleadosPorPagina,
    paginaActual * empleadosPorPagina,
  );
  const totalPaginas = Math.ceil(
    filtrarEmpleados().length / empleadosPorPagina,
  );

  const abrirModal = (empleado: Empleado | null = null) => {
    if (empleado) {
      setEmpleadoEditando(empleado);
      setForm({
        first_name: empleado.first_name,
        last_name: empleado.last_name,
        cc: empleado.cc,
        age: empleado.age,
        phone: empleado.phone,
        mail: empleado.mail,
        position: empleado.position,
        hire_date: empleado.hire_date.toString().split("T")[0],
        salary: empleado.salary,
        disability: empleado.disability || "none",
        details: empleado.details,
        status: empleado.status,
        img: empleado.img || "",
        departament_id: empleado.departament_id,
      });
    } else {
      setEmpleadoEditando(null);
      setForm({
        first_name: "",
        last_name: "",
        cc: "",
        age: 0,
        phone: "",
        mail: "",
        position: "",
        hire_date: "",
        salary: 0,
        disability: "none",
        details: "",
        status: "active",
        img: "",
        departament_id: 0,
      });
    }
    setModalAbierto(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400 text-sm">Cargando datos...</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-8 max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Empleados
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {filtrarEmpleados().length} empleados encontrados
            </p>
          </div>
          <Button
            onClick={() => abrirModal()}
            className="bg-[#2a5a2a] hover:bg-[#1e421e] text-white rounded-lg gap-2"
          >
            <Plus size={16} />
            Nuevo empleado
          </Button>
        </div>

        {/* Buscador */}
        <div className="relative w-full md:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            type="text"
            placeholder="Buscar por nombre, cédula, cargo o departamento"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPaginaActual(1);
            }}
            className="pl-9 h-10 bg-white border-gray-200 rounded-lg text-sm"
          />
        </div>

        {/* Tabla */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Empleado
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Cédula
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Edad
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Teléfono
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Correo
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Departamento
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Cargo
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Contratación
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Salario
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Estado
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {empleadosPaginados.map((emp) => (
                <TableRow
                  key={emp.id_employee}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {emp.img ? (
                        <img
                          src={emp.img}
                          alt={emp.first_name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-bold text-[#2a5a2a]">
                          {emp.first_name[0]}
                          {emp.last_name[0]}
                        </div>
                      )}
                      <span className="font-medium text-gray-900 text-sm">
                        {emp.first_name} {emp.last_name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {emp.cc}
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {emp.age}
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {emp.phone}
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {emp.mail}
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {departamentos.find((d) => d.id === emp.departament_id)
                      ?.name || "No asignado"}
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {emp.position}
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {new Date(emp.hire_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 text-sm tabular-nums">
                    ${emp.salary.toLocaleString("es-CO")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        emp.status === "active"
                          ? "bg-green-50 text-green-700 border-green-100 text-xs"
                          : "bg-gray-100 text-gray-500 border-gray-200 text-xs"
                      }
                    >
                      {emp.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => abrirModal(emp)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#2a5a2a] hover:bg-green-50 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => eliminarEmpleado(emp.id_employee)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Paginación */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              Página {paginaActual} de {totalPaginas} —{" "}
              {filtrarEmpleados().length} empleados
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPaginaActual((p) => p - 1)}
                disabled={paginaActual === 1}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-[#2a5a2a] hover:text-[#2a5a2a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPaginaActual((p) => p + 1)}
                disabled={paginaActual === totalPaginas}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-[#2a5a2a] hover:text-[#2a5a2a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-900">
              {empleadoEditando ? "Editar empleado" : "Nuevo empleado"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className={labelClass}>Nombre</label>
              <Input
                className={inputClass}
                value={form.first_name}
                onChange={(e) =>
                  setForm({ ...form, first_name: e.target.value })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Apellido</label>
              <Input
                className={inputClass}
                value={form.last_name}
                onChange={(e) =>
                  setForm({ ...form, last_name: e.target.value })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Cédula</label>
              <Input
                className={inputClass}
                value={form.cc}
                onChange={(e) => setForm({ ...form, cc: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Edad</label>
              <Input
                className={inputClass}
                type="number"
                value={form.age}
                onChange={(e) =>
                  setForm({ ...form, age: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Teléfono</label>
              <Input
                className={inputClass}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Correo</label>
              <Input
                className={inputClass}
                type="email"
                value={form.mail}
                onChange={(e) => setForm({ ...form, mail: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Departamento</label>
              <select
                className="w-full h-10 bg-white border border-gray-200 rounded-lg text-sm px-3 focus:border-[#2a5a2a] focus:outline-none"
                value={form.departament_id}
                onChange={(e) =>
                  setForm({ ...form, departament_id: Number(e.target.value) })
                }
              >
                <option value="">Seleccionar</option>
                {departamentos.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Cargo</label>
              <Input
                className={inputClass}
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Fecha de contratación</label>
              <Input
                className={inputClass}
                type="date"
                value={form.hire_date}
                onChange={(e) =>
                  setForm({ ...form, hire_date: e.target.value })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Salario</label>
              <Input
                className={inputClass}
                type="number"
                value={form.salary}
                onChange={(e) =>
                  setForm({ ...form, salary: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Discapacidad</label>
              <select
                className="w-full h-10 bg-white border border-gray-200 rounded-lg text-sm px-3 focus:border-[#2a5a2a] focus:outline-none"
                value={form.disability}
                onChange={(e) =>
                  setForm({ ...form, disability: e.target.value })
                }
              >
                <option value="none">Ninguna</option>
                <option value="visual">Visual</option>
                <option value="auditory">Auditiva</option>
                <option value="motor">Motora</option>
                <option value="cognitive">Cognitiva</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Estado</label>
              <select
                className="w-full h-10 bg-white border border-gray-200 rounded-lg text-sm px-3 focus:border-[#2a5a2a] focus:outline-none"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Imagen URL</label>
              <Input
                className={inputClass}
                value={form.img}
                onChange={(e) => setForm({ ...form, img: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Detalles</label>
              <textarea
                className="w-full bg-white border border-gray-200 rounded-lg text-sm px-3 py-2 focus:border-[#2a5a2a] focus:outline-none resize-none"
                rows={3}
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
              />
            </div>
          </div>

          <Button
            onClick={handleGuardar}
            className="w-full mt-4 h-11 bg-[#2a5a2a] hover:bg-[#1e421e] text-white font-semibold rounded-lg"
          >
            {empleadoEditando ? "Guardar cambios" : "Crear empleado"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
