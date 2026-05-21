import { jwtDecode } from "jwt-decode";

interface HeaderProps {
  totalEmpleados: number;
  totalDepartamentos: number;
}

export default function Header({ totalEmpleados, totalDepartamentos }: HeaderProps) {
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode<{ email: string; role: string }>(token) : null;

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : "AD";

  return (
    <header className="h-20 border-b border-gray-100 flex items-center justify-between px-8 bg-white">

      {/* Izquierda — nombre del sistema */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#2a5a2a] rounded-sm flex items-center justify-center">
          <span className="text-white text-[9px] font-black">SC</span>
        </div>
        <span className="text-[#2a5a2a] font-bold text-base tracking-wide">
          StaffCore
        </span>
      </div>

      {/* Centro — métricas */}
      <div className="flex items-baseline gap-6">
        <a className="flex items-baseline gap-1.5 hover:opacity-80 transition-opacity cursor-pointer">
          <span className="text-2xl font-bold text-gray-900">{totalEmpleados}</span>
          <span className="text-sm text-gray-400">Empleados</span>
        </a>
        <div className="w-px h-4 bg-gray-200" />
        <a className="flex items-baseline gap-1.5 hover:opacity-80 transition-opacity cursor-pointer">
          <span className="text-2xl font-bold text-gray-900">{totalDepartamentos}</span>
          <span className="text-sm text-gray-400">Departamentos</span>
        </a>
      </div>

      {/* Derecha — usuario */}
      <div className="flex items-center gap-3">
        <div className="w-px h-8 bg-gray-100" />
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">
              {user?.email || "example@example.com"}
            </p>
            <p className="text-[10px] text-[#2a5a2a] font-bold uppercase tracking-widest">
              {user?.role || "Admin"}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
            <span className="text-[11px] font-bold text-[#2a5a2a]">{initials}</span>
          </div>
        </div>
      </div>

    </header>
  );
}