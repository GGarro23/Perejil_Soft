import { useEffect, useState } from "react";
import MeseroLayout from "../../layouts/MeseroLayout";
import { obtenerOrdenes } from "../../api/ordenApi";

function EstadoPedidos() {
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        const cargar = async () => {
            try {
                const data = await obtenerOrdenes();
                setOrdenes(data.filter(o => o.estado !== "cancelada" && o.estado !== "listo"));
            } catch (err) {
                console.error(err);
            }
        };
        cargar();
        // Actualizar cada 15 segundos
        const intervalo = setInterval(cargar, 15000);
        return () => clearInterval(intervalo);
    }, []);

    const pendientes = ordenes.filter(o => o.estado === "pendiente");
    const enPreparacion = ordenes.filter(o => o.estado === "en preparacion");
    const listos = ordenes.filter(o => o.estado === "listo");

    const columnas = [
        { titulo: "Pendiente", color: "#b45309", bg: "#fef9ec", ordenes: pendientes },
        { titulo: "En preparación", color: "#1d4ed8", bg: "#eff6ff", ordenes: enPreparacion },
        { titulo: "Lista para servir", color: "#7c3aed", bg: "#f5f3ff", ordenes: listos },
    ];

    return (
        <MeseroLayout>
            <div className="page-header">
                <div>
                    <h1>Estado de pedidos</h1>
                    <p>Monitorea el estado de todas las órdenes</p>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                {columnas.map(col => (
                    <div key={col.titulo}>
                        <div style={{ background: col.bg, borderRadius: "12px", padding: "14px 18px", marginBottom: "12px" }}>
                            <h3 style={{ color: col.color }}>{col.titulo}</h3>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {col.ordenes.length === 0 ? (
                                <div className="card" style={{ textAlign: "center", color: "#9CA3AF" }}>
                                    No hay órdenes
                                </div>
                            ) : (
                                col.ordenes.map(orden => (
                                    <div key={orden.id} className="card">
                                        <p style={{ fontWeight: 600, marginBottom: "4px" }}>Orden #{orden.id}</p>
                                        <p style={{ color: "#6B7280", marginBottom: "4px" }}>Mesa {orden.mesa}</p>
                                        <p style={{ color: "#9CA3AF", fontSize: "0.85rem" }}>
                                            {new Date(orden.fecha).toLocaleTimeString("es-CR")}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </MeseroLayout>
    );
}

export default EstadoPedidos;
