import "./App.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Layout from "./components/layouts/Layouts";
import Dashboard from "./pages/Dashboard";
import Empleados from "./pages/Empleados";
import Departamentos from "./pages/Departamentos";
import Nomina from "./pages/Nomina";
import Login from "./pages/Login";
import Roles from './pages/Roles'


function ProtectedRoute() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  } else {
    return <Outlet />;
  }
}

function App() {
  return (
    <Routes>
      <Route path="/" element={localStorage.getItem("token") ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/departamentos" element={<Departamentos />} />
          <Route path="/nomina" element={<Nomina />} />
          <Route path="/roles" element={<Roles/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
