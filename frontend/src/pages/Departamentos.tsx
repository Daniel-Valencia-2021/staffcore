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
  Building2,
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

interface Departamento {
  id: number;
  name: string;
  description: string;
}

interface Empleado {
  id_employee: number;
  departament_id: number;
  salary: number;
}

const inputClass =
  "h-10 bg-white border-gray-200 rounded-lg text-sm focus:border-[#2a5a2a] focus:ring-[#2a5a2a]";
const labelClass =
  "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 block";

export default function Departamentos() {
  const [loading, setLoading] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDepartamento, setEditingDepartamento] =
    useState<Departamento | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({ name: "", description: "" });

  const cargarDepartamentos = async () => {
    setLoading(true);
    try {
      const depRes = await api.get("/departments/");
      setDepartamentos(depRes.data);
      const empRes = await api.get("/employee/");
      setEmpleados(empRes.data);
    } catch (err) {
      console.error("Error al cargar departamentos", err);
    }
    finally{
      setLoading(false)
    }
  };

  const handleGuardar = async () => {
    try {
      if (editingDepartamento) {
        await api.patch(`/departments/${editingDepartamento.id}`, form);
      } else {
        await api.post("/departments/", form);
      }
      setOpenDialog(false);
      setForm({ name: "", description: "" });
      await cargarDepartamentos();
    } catch (err) {
      console.error("Error al guardar departamento", err);
    }
  };

  const handleEliminar = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este departamento?")) {
      try {
        await api.delete(`/departments/${id}`);
        await cargarDepartamentos();
      } catch (err) {
        console.error("Error al eliminar departamento", err);
      }
    }
  };

  useEffect(() => {
    const cargarDepartamentos = async () => {
      try {
        const depRes = await api.get("/departments/");
        setDepartamentos(depRes.data);
        const empRes = await api.get("/employee/");
        setEmpleados(empRes.data);
      } catch (err) {
        console.error("Error al cargar departamentos", err);
      } finally {
        setLoading(false);
      }
    };
    cargarDepartamentos();
  }, []);

  const normalizar = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filtrarDepartamentos = () =>
    departamentos.filter((dep) =>
      normalizar(dep.name).includes(normalizar(searchTerm)),
    );

  const departamentosPaginados = filtrarDepartamentos().slice(
    (paginaActual - 1) * 5,
    paginaActual * 5,
  );
  const totalPaginas = Math.ceil(filtrarDepartamentos().length / 5);

  const abrirDialogo = (departamento: Departamento | null = null) => {
    if (departamento) {
      setEditingDepartamento(departamento);
      setForm({
        name: departamento.name,
        description: departamento.description,
      });
    } else {
      setEditingDepartamento(null);
      setForm({ name: "", description: "" });
    }
    setOpenDialog(true);
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
              Departamentos
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {filtrarDepartamentos().length} departamentos encontrados
            </p>
          </div>
          <Button
            onClick={() => abrirDialogo()}
            className="bg-[#2a5a2a] hover:bg-[#1e421e] text-white rounded-lg gap-2"
          >
            <Plus size={16} />
            Nuevo departamento
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
            placeholder="Buscar departamento..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
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
                  Departamento
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Descripción
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Empleados
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Nomina Total
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departamentosPaginados.map((dept) => {
                const totalEmpleados = empleados.filter(
                  (e) => e.departament_id === dept.id,
                ).length;
                const nominaDept = empleados
                  .filter((e) => e.departament_id === dept.id)
                  .reduce((sum, e) => sum + e.salary, 0);
                return (
                  <TableRow
                    key={dept.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center">
                          <Building2 size={15} className="text-[#2a5a2a]" />
                        </div>
                        <span className="font-medium text-gray-900 text-sm">
                          {dept.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm max-w-xs truncate">
                      {dept.description || "—"}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2a5a2a]">
                        {totalEmpleados}
                        <span className="text-xs text-gray-400 font-normal">
                          {totalEmpleados === 1 ? "empleado" : "empleados"}
                        </span>
                      </span>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 tabular-nums text-sm">
                      ${nominaDept.toLocaleString("es-CO")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => abrirDialogo(dept)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-[#2a5a2a] hover:bg-green-50 transition-colors"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleEliminar(dept.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* Paginación */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              Página {paginaActual} de {totalPaginas} —{" "}
              {filtrarDepartamentos().length} departamentos
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
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-900">
              {editingDepartamento
                ? "Editar departamento"
                : "Nuevo departamento"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <label className={labelClass}>Nombre</label>
              <Input
                className={inputClass}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ej: Tecnología"
              />
            </div>
            <div>
              <label className={labelClass}>Descripción</label>
              <textarea
                className="w-full bg-white border border-gray-200 rounded-lg text-sm px-3 py-2 focus:border-[#2a5a2a] focus:outline-none resize-none"
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Descripción del departamento..."
              />
            </div>
          </div>

          <Button
            onClick={handleGuardar}
            className="w-full mt-4 h-11 bg-[#2a5a2a] hover:bg-[#1e421e] text-white font-semibold rounded-lg"
          >
            {editingDepartamento ? "Guardar cambios" : "Crear departamento"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
