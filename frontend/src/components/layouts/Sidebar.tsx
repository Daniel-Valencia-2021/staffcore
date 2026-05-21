import {
  Building2,
  DollarSignIcon,
  LayoutDashboard,
  LogOut,
  Users,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="group w-14 hover:w-[220px] transition-all duration-300 ease-in-out h-full bg-[#0a0a0a] flex flex-col py-6 overflow-hidden z-50 shadow-2xl">

      {/* Logo */}
      <div className="px-4 mb-10 flex items-center gap-4">
        <div className="min-w-[24px] h-6 w-6 bg-[#2a5a2a] flex items-center justify-center rounded-sm shrink-0">
          <span className="text-white text-[10px] font-black">SC</span>
        </div>
        <span className="hidden group-hover:block whitespace-nowrap text-white font-bold text-sm tracking-wide">
          StaffCore
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 px-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-4 h-11 px-2 rounded-lg transition-colors ${
              isActive
                ? "bg-[#2a5a2a]/20 border-l-4 border-[#2a5a2a] text-white"
                : "text-gray-500 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <LayoutDashboard size={20} className="shrink-0" />
          <span className="hidden group-hover:block whitespace-nowrap text-sm font-medium">
            Dashboard
          </span>
        </NavLink>

        <NavLink
          to="/empleados"
          className={({ isActive }) =>
            `flex items-center gap-4 h-11 px-2 rounded-lg transition-colors ${
              isActive
                ? "bg-[#2a5a2a]/20 border-l-4 border-[#2a5a2a] text-white"
                : "text-gray-500 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <Users size={20} className="shrink-0" />
          <span className="hidden group-hover:block whitespace-nowrap text-sm font-medium">
            Empleados
          </span>
        </NavLink>

        <NavLink
          to="/departamentos"
          className={({ isActive }) =>
            `flex items-center gap-4 h-11 px-2 rounded-lg transition-colors ${
              isActive
                ? "bg-[#2a5a2a]/20 border-l-4 border-[#2a5a2a] text-white"
                : "text-gray-500 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <Building2 size={20} className="shrink-0" />
          <span className="hidden group-hover:block whitespace-nowrap text-sm font-medium">
            Departamentos
          </span>
        </NavLink>

        <NavLink
          to="/nomina"
          className={({ isActive }) =>
            `flex items-center gap-4 h-11 px-2 rounded-lg transition-colors ${
              isActive
                ? "bg-[#2a5a2a]/20 border-l-4 border-[#2a5a2a] text-white"
                : "text-gray-500 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <DollarSignIcon size={20} className="shrink-0" />
          <span className="hidden group-hover:block whitespace-nowrap text-sm font-medium">
            Nómina
          </span>
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="px-2 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 h-11 px-2 rounded-lg text-gray-500 hover:bg-white/5 hover:text-white transition-colors"
        >
          <LogOut size={20} className="shrink-0" />
          <span className="hidden group-hover:block whitespace-nowrap text-sm font-medium">
            Cerrar sesión
          </span>
        </button>
      </div>

    </aside>
  );
}