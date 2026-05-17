import {
  Building2,
  DollarSignIcon,
  LayoutDashboard,
  LogOut,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="group w-14 hover:w-56 transition-all duration-300 h-full bg-[#0a0a0a] flex flex-col items-start py-4 gap-4 px-3">
      <div className="logo w-10 h-10 rounded-sm bg-[#2a5a2a] flex items-center justify-center text-white text-xs font-black tracking-wider">
        SC
      </div>

      <nav className="sidebar-nav flex flex-col gap-4 mt-7 items-center flex-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 h-10 ${isActive ? "text-white" : "text-gray-500 hover:text-white"}`
          }
        >
          <LayoutDashboard size={20} className="shrink-0" />
          <span className="hidden group-hover:block whitespace-nowrap text-sm">
            Dashboard
          </span>
        </NavLink>

        <NavLink
          to="/empleados"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 h-10 ${isActive ? "text-white" : "text-gray-500 hover:text-white"}`
          }
        >
          <Users size={20} className="shrink-0" />
          <span className="hidden group-hover:block whitespace-nowrap text-sm">
            Empleados
          </span>
        </NavLink>

        <NavLink
          to="/departamentos"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 h-10 ${isActive ? "text-white" : "text-gray-500 hover:text-white"}`
          }
        >
          <Building2 size={20} className="shrink-0" />
          <span className="hidden group-hover:block whitespace-nowrap text-sm">
            Departamentos
          </span>
        </NavLink>

        <NavLink
          to="/nomina"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 h-10 ${isActive ? "text-white" : "text-gray-500 hover:text-white"}`
          }
        >
          <DollarSignIcon size={20} className="shrink-0" />
          <span className="hidden group-hover:block whitespace-nowrap text-sm">
            Nómina
          </span>
        </NavLink>
      </nav>

      <button className="text-gray-500 hover:text-white" title="Cerrar sesión">
        <LogOut size={20} />
        <span className="hidden group-hover:block whitespace-nowrap text-sm">
            Cerrar sesión
          </span>
      </button>
    </aside>
  );
}
