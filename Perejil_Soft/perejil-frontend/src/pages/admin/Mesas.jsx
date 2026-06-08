import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {obtenerMesas,crearMesa,eliminarMesa,cambiarEstadoMesa} from "../../api/mesaApi";
function Mesas() {
    const [mesas, setMesas] =useState([]);
    const [mostrarModal, setMostrarModal] =useState(false);
    const [mostrarEliminar, setMostrarEliminar] =useState(false);
    const [mesaSeleccionada, setMesaSeleccionada] =useState(null);
    const [numero, setNumero] =useState("");
    const [capacidad, setCapacidad] =useState("");
    const [error, setError] =useState("");
    const cargarMesas = async () => {
        try {
            const data =await obtenerMesas();
            setMesas(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {cargarMesas();}, []);
    const handleCrear = async () => {
        try {
            setError("");
            await crearMesa({numero,capacidad });
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
    const handleEliminar = (id) => {setMesaSeleccionada(id);setMostrarEliminar(true);};
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
    const handleEstado= async (id) => {
        try {
            await cambiarEstadoMesa(id);
            cargarMesas();
        } catch (error) {
            console.error(error);
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
                    onClick={() => {setError("");setMostrarModal(true);}}
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
                                mesa.activa? "estado disponible": "estado ocupada"
                            }
                        >
                            {
                                mesa.activa? "Disponible": "Ocupada"
                            }
                        </span>
                        <div className="card-actions">
                            <button
                                className="btn-link"
                                onClick={() =>handleEstado(mesa.id ) }
                            >
                                {mesa.activa? "Marcar ocupada": "Marcar disponible"}
                            </button>
                            <button
                                className="btn-danger"
                                onClick={() =>handleEliminar( mesa.id)  }
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
                                onChange={(e) =>setNumero(e.target.value) }
                            />
                            <input
                                type="number"
                                placeholder="Capacidad"
                                value={capacidad}
                                onChange={(e) =>setCapacidad(e.target.value)}
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
                                    onClick={() => {setMostrarModal(false);
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
                                    onClick={() => {setMostrarEliminar(false);setMesaSeleccionada(null);}}
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