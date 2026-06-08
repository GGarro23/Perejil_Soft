import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
    obtenerUsuarios,
    crearUsuario,
    eliminarUsuario
} from "../../api/usuarioApi";
function Usuarios() {
    const [usuarios, setUsuarios] =useState([]);
    const [mostrarModal, setMostrarModal] =useState(false);
    const [mostrarEliminar, setMostrarEliminar] =useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] =useState(null);
    const [nombre, setNombre] =useState("");
    const [username, setUsername] =useState("");
    const [password, setPassword] =useState("");
    const [rol, setRol] =useState("mesero");
    const [error, setError] =useState("");
    useEffect(() => {cargarUsuarios();}, []);
    const cargarUsuarios = async () => {
        try {
            const data =await obtenerUsuarios();
            setUsuarios(data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleCrear = async () => {
        setError("");
        if (!nombre.trim() ||!username.trim() || !password.trim() || !rol) {
            setError("Todos los campos son obligatorios");
            return;
        }
        if (password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres");
            return;
        }
        try {
            await crearUsuario({nombre,username,password,rol});
            setNombre("");
            setUsername("");
            setPassword("");
            setRol("mesero");
            setMostrarModal(false);
            cargarUsuarios();
        } catch (error) {
            setError(
                error.response?.data?.mensaje ||
                "Error al crear usuario"
            );
        }
    };
    const handleEliminar = (id) => {
        setUsuarioSeleccionado(id);
        setMostrarEliminar(true);
    };
    const confirmarEliminar = async () => {
        try {
            await eliminarUsuario( usuarioSeleccionado);
            setMostrarEliminar(false);
            setUsuarioSeleccionado(null);
            cargarUsuarios();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <MainLayout>
            <div className="page-header">
                <div>
                    <h1>
                        Gestión de usuarios
                    </h1>
                    <p>
                        Administra los usuarios del sistema
                    </p>
                </div>
                <button
                    className="btn-primary"
                    onClick={() => {setError("");setMostrarModal(true);}}
                >
                    + Crear usuario
                </button>
            </div>
            <div className="table-card">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Usuario</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios.map(
                                (usuario) => (
                                    <tr
                                        key={usuario.id}
                                    >
                                        <td>
                                            {usuario.nombre}
                                        </td>
                                        <td>
                                            {usuario.username}
                                        </td>
                                        <td>
                                            <span className="badge-role">
                                                {
                                                    usuario.rol
                                                }
                                            </span>
                                        </td>
                                        <td>
                                            <span className="badge-active">
                                                Activo
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn-danger"
                                                onClick={() =>
                                                    handleEliminar(
                                                        usuario.id
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>{
                mostrarModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>
                                Crear usuario
                            </h2>
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) =>setNombre(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Usuario"
                                value={username}
                                onChange={(e) =>setUsername(e.target.value) }
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) =>etPassword(e.target.value )}
                            />
                            <select
                                value={rol}
                                onChange={(e) =>setRol(e.target.value)}
                            >
                                <option value="admin">
                                    Administrador
                                </option>
                                <option value="mesero">
                                    Mesero
                                </option>
                                <option value="cocina">
                                    Cocina
                                </option>
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
                                    onClick={handleCrear}
                                >
                                    Guardar
                                </button>
                                <button
                                    className="btn-secondary"
                                    onClick={() => {setMostrarModal(false);setError("");}}
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
                                ¿Está seguro que desea eliminar este usuario?
                            </p>
                            <p className="delete-warning">
                                Esta acción no se puede deshacer.
                            </p>
                            <div className="modal-actions">
                                <button
                                    className="btn-secondary"
                                    onClick={() => {
                                        setMostrarEliminar(false);
                                        setUsuarioSeleccionado(null);
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="btn-danger"
                                    onClick={
                                        confirmarEliminar
                                    }
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
export default Usuarios;