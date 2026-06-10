import { useEffect, useState } from "react";
import MeseroLayout from "../../layouts/MeseroLayout";
import { obtenerOrdenes, obtenerOrden, cancelarOrden, cerrarOrden } from "../../api/ordenApi";

function OrdenesActivas() {
    const [ordenes, setOrdenes] = useState([]);
    const [detalle, setDetalle] = useState(null);
    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const [mostrarFactura, setMostrarFactura] = useState(false);
    const [ordenFactura, setOrdenFactura] = useState(null);
    const [metodoPago, setMetodoPago] = useState("efectivo");
    const [error, setError] = useState("");

    const cargar = async () => {
        try {
            const data = await obtenerOrdenes();
            setOrdenes(data.filter(o => o.estado !== "cancelada" && o.estado!=="facturada"));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { cargar(); }, []);

    const handleVer = async (id) => {
        try {
            const data = await obtenerOrden(id);
            setDetalle({ id, ...data });
            setMostrarDetalle(true);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCancelar = async (id) => {
        try {
            await cancelarOrden(id);
            cargar();
        } catch (err) {
            setError("No se puede cancelar esta orden");
        }
    };

    const handleAbrirFactura = (orden) => {
        setOrdenFactura(orden);
        setMostrarFactura(true);
    };

    const handleCerrarOrden = async () => {
        try {
            await cerrarOrden(ordenFactura.id, metodoPago);
            setMostrarFactura(false);
            setOrdenFactura(null);
            cargar();
        } catch (err) {
            setError("Error al generar factura");
        }
    };

    const getBadge = (estado) => {
        const estilos = {
            pendiente: { background: "#fef3c7", color: "#b45309" },
            "en preparacion": { background: "#dbeafe", color: "#1d4ed8" },
            listo: { background: "#dcfce7", color: "#16a34a" },
        };
        const estilo = estilos[estado] || {};
        return (
            <span style={{ ...estilo, padding: "4px 12px", borderRadius: "999px", fontSize: "0.85rem", fontWeight: 600 }}>
                {estado.charAt(0).toUpperCase() + estado.slice(1)}
            </span>
        );
    };

    return (
        <MeseroLayout>
            <div className="page-header">
                <div>
                    <h1>Órdenes activas</h1>
                    <p>Gestiona tus órdenes en curso</p>
                </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
                {ordenes.length === 0 ? (
                    <p style={{ color: "#6B7280" }}>No hay órdenes activas.</p>
                ) : (
                    ordenes.map(orden => (
                        <div key={orden.id} className="card">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                                <h3>Orden #{orden.id}</h3>
                                {getBadge(orden.estado)}
                            </div>
                            <p style={{ color: "#6B7280", marginBottom: "4px" }}>Mesa {orden.mesa}</p>
                            <p style={{ color: "#6B7280", marginBottom: "4px", fontSize: "0.9rem" }}>
                                {new Date(orden.fecha).toLocaleString("es-CR")}
                            </p>
                            <p style={{ color: "#A6B48A", fontWeight: 600, marginBottom: "16px" }}>
                                ₡{Number(orden.total).toLocaleString()}
                            </p>
                            <div style={{ display: "flex", gap: "16px" }}>
                                <span className="action-edit" onClick={() => handleVer(orden.id)}>
                                    Ver
                                </span>
                                {orden.estado === "pendiente" && (
                                    <span style={{ color: "#DC2626", cursor: "pointer", fontWeight: 600 }} onClick={() => handleCancelar(orden.id)}>
                                        Cancelar
                                    </span>
                                )}
                                <span style={{ color: "#16a34a", cursor: "pointer", fontWeight: 600 }} onClick={() => handleAbrirFactura(orden)}>
                                    Factura
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal ver detalle */}
            {mostrarDetalle && detalle && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2 style={{ marginBottom: "16px" }}>Orden #{detalle.id}</h2>
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cant.</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detalle.items.map((item, i) => (
                                    <tr key={i}>
                                        <td>{item.nombre}</td>
                                        <td>{item.cantidad}</td>
                                        <td>₡{Number(item.subtotal || 0).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p style={{ fontWeight: 700, marginTop: "12px" }}>
                            Total: ₡{Number(detalle.total || 0).toLocaleString()}
                        </p>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setMostrarDetalle(false)}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal generar factura */}
            {mostrarFactura && ordenFactura && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2 style={{ marginBottom: "16px" }}>Generar factura</h2>
                        <p style={{ marginBottom: "16px" }}>Orden #{ordenFactura.id} · Mesa {ordenFactura.mesa}</p>
                        <div className="form-group">
                            <label>Método de pago</label>
                            <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
                                <option value="efectivo">Efectivo</option>
                                <option value="tarjeta">Tarjeta</option>
                                <option value="transferencia">Transferencia</option>
                            </select>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setMostrarFactura(false)}>Cancelar</button>
                            <button className="btn-primary" onClick={handleCerrarOrden}>Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
        </MeseroLayout>
    );
}

export default OrdenesActivas;
