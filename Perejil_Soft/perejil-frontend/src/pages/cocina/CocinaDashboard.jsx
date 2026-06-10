import { useEffect, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { obtenerOrdenesCocina, cambiarEstadoOrden } from "../../api/cocinaApi.js";
import "../../styles/cocina.css";
function CocinaDashboard() {
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        cargarOrdenes();

        const intervalo = setInterval(cargarOrdenes, 5000);

        return () => clearInterval(intervalo);
    }, []);

    const cargarOrdenes = async () => {
        try {
            const data = await obtenerOrdenesCocina();
            console.log("ORDENES:", data);
            setOrdenes(data);
        } catch (error) {
            console.log(error);
        }
    };
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        navigate("/login");
    };
    const pendientes = ordenes.filter(o => o.estado === "pendiente");
    const preparacion = ordenes.filter(o => o.estado === "en preparacion");
    const marcarPreparacion = async (idOrden) => {
        try {

            await cambiarEstadoOrden(
                idOrden,
                "en preparacion"
            );

            cargarOrdenes();

        } catch (error) {
            console.log(error);
        }
    };
    const marcarListo = async (idOrden, boton) => {
        const rect = boton.getBoundingClientRect();

        confetti({
            particleCount: 200,
            spread: 120,
            startVelocity: 40,
            origin: {
                x: (rect.left + rect.width / 2) / window.innerWidth,
                y: (rect.top + rect.height / 2) / window.innerHeight
            }
        });

        try {
            await cambiarEstadoOrden(idOrden, "listo");
            await cargarOrdenes();
        } catch (error) {
            console.log("ERROR PATCH LISTO:", error);
        }
    };
    return (
        <div className="cocina-page">
            <header className="cocina-header">
                <div className="header-info">
                    <h1>
                        <FaUtensils className="header-icon" />
                        Perejil_Soft - Cocina
                    </h1>
                    <p>Panel de órdenes</p>
                </div>

                <button
                    className="btn-logout"
                    onClick={cerrarSesion}
                >
                    <FiLogOut />
                    Cerrar sesión
                </button>
            </header>

            <main className="cocina-content">
                <section>
                    <h2 className="cocina-column-title pendientes-title">
                        Órdenes pendientes ({pendientes.length})
                    </h2>
                    {pendientes.map(orden => (
                        <div className="orden-card orden-pendiente" key={orden.id}>
                            <h3>Orden #{orden.id}</h3>
                            <p>Mesa {orden.mesa}</p>

                            {orden.productos.map((producto, i) => (
                                <div className="producto-row" key={i}>
                                    <div className="producto-main">
                                        <span>{producto.nombre}</span>
                                        <strong className="cantidad">
                                            x {producto.cantidad}
                                        </strong>
                                    </div>

                                    {producto.nota && (
                                        <p className="nota">
                                            {producto.nota}
                                        </p>
                                    )}
                                </div>
                            ))}

                            <button
                                className="btn-preparacion"
                                onClick={() => marcarPreparacion(orden.id)}
                            >
                                Marcar en preparación
                            </button>
                        </div>
                    ))}
                </section>

                <section>
                    <h2 className="cocina-column-title preparacion-title">
                        Órdenes Preparandose ({preparacion.length})
                    </h2>
                    {preparacion.map(orden => (
                        <div className="orden-card orden-preparacion" key={orden.id}>
                            <h3>Orden #{orden.id}</h3>
                            <p>Mesa {orden.mesa}</p>

                            {orden.productos.map((producto, i) => (
                                <div className="producto-row" key={i}>
                                    <div className="producto-main">
                                        <span>{producto.nombre}</span>
                                        <strong className="cantidad">
                                            x {producto.cantidad}
                                        </strong>
                                    </div>

                                    {producto.nota && (
                                        <p className="nota">
                                            {producto.nota}
                                        </p>
                                    )}
                                </div>
                            ))}

                            <button
                                className="btn-listo"
                                onClick={(e) => marcarListo(orden.id, e.currentTarget)}
                            >
                                Marcar Listo para Servir
                            </button>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}

export default CocinaDashboard;