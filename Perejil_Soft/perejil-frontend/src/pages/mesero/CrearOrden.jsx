import { useEffect, useState } from "react";
import MeseroLayout from "../../layouts/MeseroLayout";
import { obtenerMesas } from "../../api/mesaApi";
import { obtenerProductos } from "../../api/productoApi";
import { crearOrden, agregarProducto, enviarACocina, cancelarOrden, guardarNotaOrden } from "../../api/ordenApi";

function CrearOrden() {
    const [mesas, setMesas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
    const [ordenId, setOrdenId] = useState(null);
    const [resumen, setResumen] = useState([]);
    const [notaOrden, setNotaOrden] = useState("");
    const [nota, setNota] = useState("");
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        const cargar = async () => {
            try {
                const [m, p] = await Promise.all([obtenerMesas(), obtenerProductos()]);
                setMesas(m.filter(mesa => mesa.activa));
                setProductos(p);
            } catch (err) {
                console.error(err);
            }
        };
        cargar();
    }, []);

    const handleSeleccionarMesa = async (mesa) => {
        try {
            setError("");
            const data = await crearOrden(mesa.id);
            setMesaSeleccionada(mesa);
            setOrdenId(data.ordenId);
            setResumen([]);
        } catch (err) {
            setError("Error al crear la orden");
        }
    };

    const handleAgregarProducto = async (producto) => {
        if (!ordenId) {
            setError("Selecciona una mesa primero");
            return;
        }
        try {
            await agregarProducto(ordenId, producto.id, 1);
            setResumen(prev => {
                const existe = prev.find(p => p.id === producto.id);
                if (existe) {
                    return prev.map(p => p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p);
                }
                return [...prev, { ...producto, cantidad: 1 }];
            });
        } catch (err) {
            setError("Error al agregar producto");
        }
    };

    const total = resumen.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

const handleEnviarCocina = async () => {
    if (!ordenId) return;

    try {
        await guardarNotaOrden(ordenId, notaOrden);
        await enviarACocina(ordenId);

        setMensaje("Orden enviada a cocina");
        setOrdenId(null);
        setMesaSeleccionada(null);
        setResumen([]);
        setNotaOrden("");

    } catch (err) {
        setError("Error al enviar a cocina");
    }
};

    const handleCancelar = async () => {
        if (!ordenId) return;
        try {
            await cancelarOrden(ordenId);
            setOrdenId(null);
            setMesaSeleccionada(null);
            setResumen([]);
            setMensaje("Orden cancelada");
        } catch (err) {
            setError("No se puede cancelar esta orden");
        }
    };

    return (
        <MeseroLayout>
            <div className="page-header">
                <div>
                    <h1>Crear nueva orden</h1>
                    <p>Selecciona una mesa y agrega productos</p>
                </div>
            </div>

            {error && <p className="error-message">{error}</p>}
            {mensaje && (
                <p style={{ background: "#dcfce7", color: "#16a34a", padding: "12px", borderRadius: "10px", marginBottom: "16px" }}>
                    {mensaje}
                </p>
            )}

            {/* Seleccionar mesa */}
            <div style={{ marginBottom: "24px" }}>
                <h3 style={{ marginBottom: "12px" }}>Seleccionar mesa</h3>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    {mesas.map(mesa => (
                        <div
                            key={mesa.id}
                            onClick={() => handleSeleccionarMesa(mesa)}
                            style={{
                                background: mesaSeleccionada?.id === mesa.id ? "#A6B48A" : "white",
                                color: mesaSeleccionada?.id === mesa.id ? "white" : "#1F2937",
                                border: "1px solid #E5E7EB",
                                borderRadius: "12px",
                                padding: "16px 24px",
                                cursor: "pointer",
                                textAlign: "center",
                                minWidth: "120px"
                            }}
                        >
                            <p style={{ fontWeight: 600 }}>Mesa {mesa.numero}</p>
                            <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>{mesa.capacidad} personas</p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px", alignItems: "start" }}>
                {/* Menú */}
                <div>
                    <h3 style={{ marginBottom: "12px" }}>Menú</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                        {productos.map(producto => (
                            <div key={producto.id} className="card" style={{ position: "relative" }}>
                                {producto.agotado && (
                                    <span className="badge-red" style={{ position: "absolute", top: "12px", right: "12px", fontSize: "0.75rem" }}>
                                        Agotado
                                    </span>
                                )}
                                <h4 style={{ marginBottom: "8px", color: producto.agotado ? "#9CA3AF" : "#1F2937" }}>
                                    {producto.nombre}
                                </h4>
                                <p style={{ color: "#6B7280", fontSize: "0.9rem", marginBottom: "8px" }}>
                                    {producto.descripcion}
                                </p>
                                <p style={{ color: "#A6B48A", fontWeight: 600, marginBottom: "12px" }}>
                                    ₡{Number(producto.precio).toLocaleString()}
                                </p>
                                <button
                                    className="btn-primary"
                                    style={{ width: "100%" }}
                                    onClick={() => handleAgregarProducto(producto)}
                                    disabled={producto.agotado}
                                >
                                    Agregar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resumen */}
                <div className="card" style={{ position: "sticky", top: "20px" }}>
                    <h3 style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                        <FiShoppingCartIcon /> Resumen de orden
                    </h3>
                    {resumen.length === 0 ? (
                        <p style={{ color: "#9CA3AF", textAlign: "center", margin: "20px 0" }}>
                            No hay productos agregados
                        </p>
                    ) : (
                        <div style={{ marginBottom: "16px" }}>
                            {resumen.map(item => (
                                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                    <span>{item.nombre} x{item.cantidad}</span>
                                    <span>₡{Number(item.precio * item.cantidad).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600, marginBottom: "16px", borderTop: "1px solid #E5E7EB", paddingTop: "12px" }}>
                        <span>Total</span>
                        <span>₡{Number(total).toLocaleString()}</span>
                    </div>
                    <textarea
                        placeholder="Agregar nota..."
                        value={notaOrden}
                        onChange={(e) => setNotaOrden(e.target.value)}
                        style={{
                            width: "100%",
                            minHeight: "90px",
                            marginBottom: "12px",
                            padding: "12px",
                            borderRadius: "12px",
                            border: "1px solid #D1D5DB",
                            resize: "vertical",
                            fontFamily: "inherit"
                        }}
                    />
                    <button className="btn-primary" style={{ width: "100%", marginBottom: "8px" }} onClick={handleEnviarCocina}>
                        Enviar a cocina
                    </button>
                    <button className="btn-secondary" style={{ width: "100%", marginBottom: "8px" }}>
                        Guardar orden
                    </button>
                    <button
                        style={{ width: "100%", background: "none", border: "1px solid #DC2626", color: "#DC2626", padding: "12px", borderRadius: "12px", cursor: "pointer", fontWeight: 600 }}
                        onClick={handleCancelar}
                    >
                        Cancelar orden
                    </button>
                </div>
            </div>
        </MeseroLayout>
    );
}

function FiShoppingCartIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
    );
}

export default CrearOrden;