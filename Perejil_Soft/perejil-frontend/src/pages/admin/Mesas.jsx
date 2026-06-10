import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { obtenerMesas, crearMesa, eliminarMesa, cambiarEstadoMesa, editarMesa } from "../../api/mesaApi";
function Mesas() {
    const [mesas, setMesas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarEliminar, setMostrarEliminar] = useState(false);
    const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
    const [numero, setNumero] = useState("");
    const [capacidad, setCapacidad] = useState("");
    const [error, setError] = useState("");
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [mesaEditando, setMesaEditando] = useState(null);
    const cargarMesas = async () => {
        try {
            const data = await obtenerMesas();
            setMesas(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => { cargarMesas(); }, []);
    const handleCrear = async () => {
        try {
            setError("");
            await crearMesa({ numero, capacidad });
            setNumero("");
            setCapacidad("");
            setMostrarModal(false);
            cargarMesas();
        } catch (error) {
            setError(
                error.response?.data?.mensaje ||
                "Error al crear mesa"
            );
        }
    };
    const handleEliminar = (id) => { setMesaSeleccionada(id); setMostrarEliminar(true); };
    const confirmarEliminar = async () => {
        try {
            await eliminarMesa(
                mesaSeleccionada
            );
            setMostrarEliminar(false);
            setMesaSeleccionada(null);
            cargarMesas();
        } catch (error) {
            console.error(error);
        }
    };
    const handleEstado = async (id) => {
        try {
            await cambiarEstadoMesa(id);
            cargarMesas();
        } catch (error) {
            console.error(error);
        }
    };
    const abrirEditar = (mesa) => {
        setMesaEditando({
            id: mesa.id,
            numero: mesa.numero,
            capacidad: mesa.capacidad,
            activa: mesa.activa
        });
        setError("");
        setMostrarEditar(true);
    };

    const guardarEdicion = async () => {
        try {
            setError("");

            await editarMesa(
                mesaEditando.id,
                {
                    numero: mesaEditando.numero,
                    capacidad: mesaEditando.capacidad,
                    activa: mesaEditando.activa
                }
            );

            setMostrarEditar(false);
            setMesaEditando(null);
            cargarMesas();

        } catch (error) {
            setError(
                error.response?.data?.mensaje ||
                "Error al editar mesa"
            );
        }
    };
    return (
        <MainLayout>
            <div className="page-header">
                <div>
                    <h1>
                        Gestión de Mesas
                    </h1>
                    <p>
                        Administra las mesas del restaurante
                    </p>
                </div>
                <button
                    className="btn-primary"
                    onClick={() => { setError(""); setMostrarModal(true); }}
                >
                    + Crear mesa
                </button>
            </div>
            <div className="mesas-grid">
                {mesas.map((mesa) => (
                    <div
                        key={mesa.id}
                        className="mesa-card"
                    >
                        <h3>
                            Mesa {mesa.numero}
                        </h3>
                        <p className="capacidad">
                            {mesa.capacidad} personas
                        </p>
                        <span
                            className={
                                mesa.activa ? "estado disponible" : "estado ocupada"
                            }
                        >
                            {
                                mesa.activa ? "Disponible" : "Ocupada"
                            }
                        </span>
                        <div className="card-actions">
                            <button
                                className="btn-link"
                                onClick={() => handleEstado(mesa.id)}
                            >
                                {mesa.activa ? "Marcar ocupada" : "Marcar disponible"}
                            </button>
                            <button
                                className="btn-link"
                                onClick={() => abrirEditar(mesa)}
                            >
                                Editar
                            </button>

                            <button
                                className="btn-danger"
                                onClick={() => handleEliminar(mesa.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {
                mostrarModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>
                                Crear Mesa
                            </h2>
                            <input
                                type="number"
                                placeholder="Número de mesa"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Capacidad"
                                value={capacidad}
                                onChange={(e) => setCapacidad(e.target.value)}
                            />
                            {
                                error && (
                                    <p className="error-message">
                                        {error}
                                    </p>
                                )
                            }
                            <div className="modal-actions">
                                <button
                                    className="btn-primary"
                                    onClick={handleCrear}
                                >
                                    Guardar
                                </button>
                                <button
                                    className="btn-secondary"
                                    onClick={() => {
                                        setMostrarModal(false);
                                        setError("");
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                mostrarEditar && mesaEditando && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>Editar Mesa</h2>
                            <input
                                type="number"
                                placeholder="Capacidad"
                                value={mesaEditando.capacidad}
                                onChange={(e) =>
                                    setMesaEditando({
                                        ...mesaEditando,
                                        capacidad: e.target.value
                                    })
                                }
                            />

                            <select
                                value={mesaEditando.activa ? "true" : "false"}
                                onChange={(e) =>
                                    setMesaEditando({
                                        ...mesaEditando,
                                        activa: e.target.value === "true"
                                    })
                                }
                            >
                                <option value="true">Disponible</option>
                                <option value="false">Ocupada</option>
                            </select>

                            {
                                error && (
                                    <p className="error-message">
                                        {error}
                                    </p>
                                )
                            }

                            <div className="modal-actions">
                                <button
                                    className="btn-primary"
                                    onClick={guardarEdicion}
                                >
                                    Guardar
                                </button>

                                <button
                                    className="btn-secondary"
                                    onClick={() => {
                                        setMostrarEditar(false);
                                        setMesaEditando(null);
                                        setError("");
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                mostrarEliminar && (
                    <div className="modal-overlay">
                        <div className="modal delete-modal">
                            <h2>
                                Confirmar eliminación
                            </h2>
                            <p>
                                ¿Está seguro que desea eliminar esta mesa?
                            </p>
                            <p>
                                Esta acción no se puede deshacer.
                            </p>
                            <div className="modal-actions">
                                <button
                                    className="btn-secondary"
                                    onClick={() => { setMostrarEliminar(false); setMesaSeleccionada(null); }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="btn-danger"
                                    onClick={confirmarEliminar}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </MainLayout>
    );
}
export default Mesas;