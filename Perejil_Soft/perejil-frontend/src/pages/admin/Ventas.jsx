import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getVentas } from "../../api/ventaApi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function Ventas(){
    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");
    const [resumen, setResumen] = useState(null);
    const [porDia, setPorDia] = useState([]);
    const [error, setError] = useState("");

    const handleConsultar = async () =>{
        if(!desde || !hasta){
            setError("Selecciona ambas fechas"); return;
        }
        try{
            setError("");
            const data = await getVentas(desde, hasta);
            setResumen(data.resumen);
            setPorDia(data.porDia);
        } catch (err) {
            console.error(err);
            setError("Error al consultar ventas");
        }
    };

    return(
        <MainLayout>
            <div className="page-header">
                <div>
                    <h1> Consulta de ventas </h1>
                    <p> Datos e información sobre las ventas del restaurante </p>
                </div>
            </div>

            <div className="card">
                <h3 style={{ marginBottom: "16px" }}>Buscar por rango de fechas</h3>
                <div style={{ display: "flex", gap: "32px", alignItems: "flex-end", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <label style={{ marginBottom: "6px" }}>Fecha inicial</label>
                        <input
                            type="date"
                            value={desde}
                            onChange={(e) => setDesde(e.target.value)}
                            style={{ padding: "10px", border: "1px solid #D1D5DB", borderRadius: "10px" }}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <label style={{ marginBottom: "6px" }}>Fecha final</label>
                        <input
                            type="date"
                            value={hasta}
                            onChange={(e) => setHasta(e.target.value)}
                            style={{ padding: "10px", border: "1px solid #D1D5DB", borderRadius: "10px" }}
                        />
                    </div>
                    <button className="btn-primary" onClick={handleConsultar}>
                        Consultar
                    </button>
                </div>
                {error && <p className="error-message" style={{ marginTop: "12px" }}>{error}</p>}
            </div>


        { /* VEN A MI, MI CHATGPT!!!! o sea, no tengo ni idea como funciona esto */}
            {resumen && (
                <>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "20px" }}>
                        <div className="dashboard-card">
                            <h3>Total vendido</h3>
                            <h2>₡{Number(resumen.totalVendido || 0).toLocaleString()}</h2>
                        </div>
                        <div className="dashboard-card">
                            <h3>Cantidad de pedidos</h3>
                            <h2>{resumen.cantidadPedidos || 0}</h2>
                        </div>
                        <div className="dashboard-card">
                            <h3>Producto más vendido</h3>
                            <h2 style={{ fontSize: "1.2rem" }}>{resumen.productoMasVendido || "—"}</h2>
                        </div>
                    </div>

                    {porDia.length > 0 && (
                        <div className="card">
                            <h3 style={{ marginBottom: "16px" }}>Ventas por día</h3>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={porDia}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="dia" />
                                    <YAxis />
                                    <Tooltip formatter={(v) => `₡${Number(v).toLocaleString()}`} />
                                    <Bar dataKey="total" fill="#A6B48A" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {porDia.length === 0 && (
                        <div className="card" style={{ textAlign: "center", color: "#6B7280" }}>
                            No hay ventas en el rango seleccionado.
                        </div>
                    )}
                </>
            )}
        </MainLayout>
    );
}

export default Ventas;
