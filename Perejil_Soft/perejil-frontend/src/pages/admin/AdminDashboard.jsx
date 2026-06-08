import {useEffect, useState} from "react";
import MainLayout from "../../layouts/MainLayout";
import {obtenerDashboard}from "../../api/dashboardApi";
function AdminDashboard() {
    const [datos,setDatos] =useState({
            mesas: 0,
            usuarios: 0,
            productos: 0,
            pedidos: 0});
    useEffect(() => { cargarDashboard();}, []);
    const cargarDashboard =
    async () => {
        try {
            const data =await obtenerDashboard();
            setDatos(data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <MainLayout>
            <div className="dashboard-header">
                <h1>
                    Inicio
                </h1>
                <p>
                    Resumen general del restaurante
                </p>
            </div>
            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h3>
                        Mesas
                    </h3>
                    <h2>
                        {datos.mesas}
                    </h2>
                </div>
                <div className="dashboard-card">
                    <h3>
                        Usuarios
                    </h3>
                    <h2>
                        {datos.usuarios}
                    </h2>
                </div>
                <div className="dashboard-card">
                    <h3>
                        Productos
                    </h3>
                    <h2>
                        {datos.productos}
                    </h2>
                </div>
                <div className="dashboard-card">
                    <h3>
                        Pedidos activos
                    </h3>
                    <h2>
                        {datos.pedidos}
                    </h2>
                </div>
            </div>
            <div className="dashboard-panel">
                <h2>
                    Resumen para administrar
                </h2>
                <p>
                    Desde aquí se puede administrar
                    mesas, usuarios, productos,
                    pedidos y reportes.
                </p>
            </div>
        </MainLayout>
    );
}
export default AdminDashboard;