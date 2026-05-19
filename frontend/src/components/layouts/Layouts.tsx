import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useEffect, useState } from 'react';
import api from '@/api/axios';


export default function Layout() {

  const [totalEmpleados, setTotalEmpleados] = useState(0);
  const [totalDepartamentos, setTotalDepartamentos] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const empleadosResponse = await api.get("/employee/")
        setTotalEmpleados(empleadosResponse.data.length);

        const departamentosResponse = await api.get("/departments/")
        setTotalDepartamentos(departamentosResponse.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

// useEffect con las llamadas aquí

  return (
    <div className="layout flex h-screen bg-white">
      <Sidebar />
      <div className="main-content flex-1 flex flex-col overflow-hidden">
        <Header totalEmpleados={totalEmpleados} totalDepartamentos={totalDepartamentos} />
        <main className="content-area flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}