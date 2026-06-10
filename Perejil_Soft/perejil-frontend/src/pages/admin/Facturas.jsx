import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getFacturas, getDetalleFactura } from "../../api/facturaApi";

function Facturas() {
    const [facturas, setFacturas] = useState([]);
    const [detalle, setDetalle] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
        const cargar = async () => {
            try {
                const data = await getFacturas();
                setFacturas(data);
            } catch (err) {
                console.error(err);
            }
        };
        cargar();
    }, []);

    const handleVerFactura = async (id) => {
        try {
            const data = await getDetalleFactura(id);
            setDetalle(data);
            setMostrarModal(true);
        } catch (err) {
            console.error(err);
        }
    };

    const formatFecha = (fecha) => new Date(fecha).toLocaleString("es-CR");

    return (
        <MainLayout>
            <div className="page-header">
                <div>
                    <h1>Facturas</h1>
                    <p>Ver y consultar el historial de facturas del restaurante</p>
                </div>
            </div>

            <div className="table-card">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Factura</th>
                            <th>Orden</th>
                            <th>Mesa</th>
                            <th>Fecha y Hora</th>
                            <th>Método de pago</th>
                            <th>Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facturas.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ textAlign: "center", color: "#6B7280" }}>
                                    No hay facturas registradas.
                                </td>
                            </tr>
                        ) : (
                            facturas.map((f) => (
                                <tr key={f.id}>
                                    <td>#{f.id}</td>
                                    <td>#{f.orden_id}</td>
                                    <td>Mesa {f.mesa}</td>
                                    <td>{formatFecha(f.fecha)}</td>
                                    <td style={{ textTransform: "capitalize" }}>{f.metodo_pago}</td>
                                    <td>₡{Number(f.total).toLocaleString()}</td>
                                    <td>
                                        <span
                                            className="action-edit"
                                            onClick={() => handleVerFactura(f.id)}
                                        >
                                            Ver factura
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {mostrarModal && detalle && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2 style={{ marginBottom: "8px" }}>{detalle.numero_factura}</h2>
                        <p style={{ color: "#6B7280", marginBottom: "16px" }}>
                            Mesa {detalle.mesa} · {formatFecha(detalle.fecha)} · {detalle.metodo_pago}
                        </p>

                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cant.</th>
                                    <th>Precio</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detalle.items.map((item, i) => (
                                    <tr key={i}>
                                        <td>{item.nombre}</td>
                                        <td>{item.cantidad}</td>
                                        <td>₡{Number(item.precio).toLocaleString()}</td>
                                        <td>₡{Number(item.subtotal).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <p style={{ textAlign: "left", fontWeight: 700, fontSize: "1.1rem", marginTop: "16px" }}>
                            Total: ₡{Number(detalle.total).toLocaleString()}
                        </p>

                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setMostrarModal(false)}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}

export default Facturas;