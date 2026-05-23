import { jwtDecode } from "jwt-decode";
import api from "@/api/axios";
import { useEffect, useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, ShieldCheck, ShieldAlert } from "lucide-react";

interface User {
  id_user: number;
  firstname: string;
  last_name: string;
  email: string;
  hashed_password: string;
  role: string;
}

const inputClass = "h-10 bg-white border-gray-200 rounded-lg text-sm focus:border-[#2a5a2a] focus:ring-[#2a5a2a]";
const labelClass = "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 block";

export default function Roles() {
  const token = localStorage.getItem("token");
  const currentUser = token ? jwtDecode<{ role: string }>(token) : null;
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [form, setForm] = useState({
    firstname: "", last_name: "", email: "", password: "", role: "Manager",
  });

  const cargarDatos = async () => {
    try {
      const userRes = await api.get("/user/");
      setUsers(userRes.data);
    } catch (err) {
      console.error("Error al cargar usuarios", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const userRes = await api.get("/user/");
        setUsers(userRes.data);
      } catch (err) {
        console.error("Error al cargar usuarios", err);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  const handleGuardar = async () => {
    try {
      if (editUser) {
        await api.patch(`/user/${editUser.id_user}`, form);
      } else {
        await api.post("/user/", form);
      }
      setModalAbierto(false);
      await cargarDatos();
    } catch (err) {
      console.error("Error al guardar usuario", err);
    }
  };

  const handleEliminar = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        await api.delete(`/user/${id}`);
        await cargarDatos();
      } catch (err) {
        console.error("Error al eliminar usuario", err);
      }
    }
  };

  const abrirModal = (user: User | null = null) => {
    if (user) {
      setEditUser(user);
      setForm({
        firstname: user.firstname, last_name: user.last_name,
        email: user.email, password: "", role: user.role,
      });
    } else {
      setEditUser(null);
      setForm({ firstname: "", last_name: "", email: "", password: "", role: "Manager" });
    }
    setModalAbierto(true);
  };

  // Acceso denegado
  if (currentUser?.role !== "Admin") {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
          <ShieldAlert size={24} className="text-red-400" />
        </div>
        <p className="text-gray-900 font-semibold">Acceso restringido</p>
        <p className="text-gray-400 text-sm">Solo los administradores pueden acceder a esta vista.</p>
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

  const roleBadge = (role: string) => {
    if (role === "Admin") return (
      <Badge className="bg-purple-50 text-purple-700 border-purple-100 text-xs gap-1">
        <ShieldCheck size={11} /> Admin
      </Badge>
    );
    if (role === "Manager") return (
      <Badge className="bg-blue-50 text-blue-700 border-blue-100 text-xs">
        Manager
      </Badge>
    );
    return (
      <Badge className="bg-gray-100 text-gray-500 border-gray-200 text-xs">
        {role}
      </Badge>
    );
  };

  return (
    <>
      <div className="p-8 max-w-[1600px] mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Roles & Acceso
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {users.length} usuarios registrados
            </p>
          </div>
          <Button
            onClick={() => abrirModal()}
            className="bg-[#2a5a2a] hover:bg-[#1e421e] text-white rounded-lg gap-2"
          >
            <Plus size={16} />
            Nuevo manager
          </Button>
        </div>

        {/* Tabla */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">Usuario</TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rol</TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id_user} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-bold text-[#2a5a2a]">
                        {u.firstname[0]}{u.last_name[0]}
                      </div>
                      <span className="font-medium text-gray-900 text-sm">
                        {u.firstname} {u.last_name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">{u.email}</TableCell>
                  <TableCell>{roleBadge(u.role)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => abrirModal(u)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#2a5a2a] hover:bg-green-50 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      {u.role !== "Admin" && (
                        <button
                          onClick={() => handleEliminar(u.id_user)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-900">
              {editUser ? "Editar usuario" : "Nuevo manager"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className={labelClass}>Nombre</label>
              <Input className={inputClass} value={form.firstname}
                onChange={(e) => setForm({ ...form, firstname: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Apellido</label>
              <Input className={inputClass} value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Email</label>
              <Input className={inputClass} type="email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>
                {editUser ? "Nueva contraseña (dejar vacío para no cambiar)" : "Contraseña"}
              </label>
              <Input className={inputClass} type="password" value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Rol</label>
              <select
                className="w-full h-10 bg-white border border-gray-200 rounded-lg text-sm px-3 focus:border-[#2a5a2a] focus:outline-none"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="Manager">Manager</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
          </div>

          <Button
            onClick={handleGuardar}
            className="w-full mt-4 h-11 bg-[#2a5a2a] hover:bg-[#1e421e] text-white font-semibold rounded-lg"
          >
            {editUser ? "Guardar cambios" : "Crear manager"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}