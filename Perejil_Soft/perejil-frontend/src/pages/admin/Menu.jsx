import {useEffect,useState} from "react";
import MainLayout
from "../../layouts/MainLayout";
import {obtenerProductos,crearProducto,actualizarProducto,cambiarEstadoProducto,eliminarProducto}
from "../../api/productoApi";
function Menu() {
    const [productos, setProductos] =useState([]);
    const [mostrarModal,setMostrarModal] =useState(false);
    const [mostrarEditar,setMostrarEditar] =useState(false);
    const [mostrarEliminar, setMostrarEliminar] = useState(false);
    const [productoSeleccionado,setProductoSeleccionado] =useState(null);
    const [nuevoProducto,setNuevoProducto] =useState({ nombre: "",descripcion: "",precio: ""});
    const [productoEditar,setProductoEditar] =useState({id: "",nombre: "",descripcion: "",precio: ""});
    useEffect(() => {cargarProductos();}, []);
    const cargarProductos =
    async () => {
        try {
            const data = await obtenerProductos();
            setProductos(data);
        } catch (error) {console.error(error);}
    };
    const guardarProducto =
    async () => {
        try {
            await crearProducto(
                nuevoProducto
            );
            setNuevoProducto({nombre: "",descripcion: "",precio: ""});
            setMostrarModal( false);
            cargarProductos();
        } catch (error) {console.error(error);}
    };
    const editarProducto =
    (producto) => {
        setProductoEditar({
            id:producto.id,
            nombre:producto.nombre,
            descripcion:producto.descripcion,
            precio:producto.precio
        });
        setMostrarEditar(true);
    };
    const guardarEdicion =
    async () => {
        try {
            await actualizarProducto(
                productoEditar.id,
                {
                    nombre:productoEditar.nombre,
                    descripcion:productoEditar.descripcion,
                    precio:productoEditar.precio
                }
            );
            setMostrarEditar(false);
            cargarProductos();
        } catch (error) {console.error(error);}
    };
    const toggleEstado =
    async (id) => {
        try {
            await cambiarEstadoProducto( id);
            cargarProductos();
        } catch (error) {console.error(error);}
    };
    const borrarProducto =
    (producto) => {
        setProductoSeleccionado(producto);
        setMostrarEliminar( true);
    };
    const confirmarEliminar =
    async () => {
        try {
            await eliminarProducto(productoSeleccionado.id);
            setMostrarEliminar(false);
            setProductoSeleccionado(null );
            cargarProductos();
        } catch (error) {console.error(error);}
    };
    return (
        <MainLayout>
            <div className="page-header">
                <div>
                    <h1>
                        Gestión de menú
                    </h1>
                    <p>
                        Administra los productos del menú
                    </p>
                </div>
                <button
                    className="btn-primary"
                    onClick={() =>setMostrarModal(true)}
                >
                    + Crear producto
                </button>
            </div>
            {
                mostrarModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>
                                Crear producto
                            </h2>
                            <div className="form-group">
                                <label>
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    value={nuevoProducto.nombre}
                                    onChange={(e) =>setNuevoProducto({...nuevoProducto,nombre:e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Descripción
                                </label>
                                <textarea
                                    value={nuevoProducto.descripcion}
                                    onChange={(e) => setNuevoProducto({ ...nuevoProducto,descripcion:e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Precio
                                </label>
                                <input
                                    type="number"
                                    value={nuevoProducto.precio}
                                    onChange={(e) =>setNuevoProducto({...nuevoProducto,precio:e.target.value})}
                                />
                            </div>
                            <div className="modal-actions">
                                <button
                                    className="btn-secondary"
                                    onClick={() =>setMostrarModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="btn-primary"
                                    onClick={guardarProducto}
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
                        <div className="menu-grid">
                {
                    productos.map(
                        (producto) => (
                            <div
                                key={producto.id}
                                className="menu-card"
                            >
                                <div
                                    className="menu-top"
                                >
                                    <h3>
                                        {producto.nombre}
                                    </h3>
                                    <span
                                        className={ producto.agotado? "badge-red" : "badge-green"}
                                    >
                                        {producto.agotado? "Agotado" : "Disponible"}
                                    </span>
                                </div>
                                <p>
                                    {producto.descripcion}
                                </p>
                                <h4>
                                    ₡{producto.precio}
                                </h4>
                                <hr />
                                <div
                                    className="menu-actions"
                                >
                                    <span
                                        className="action-edit"
                                        onClick={() =>editarProducto(producto)}
                                    >
                                        Editar
                                    </span>
                                    <span
                                        className="action-toggle"
                                        onClick={() =>toggleEstado(producto.id )}
                                    >
                                        {producto.agotado? "Activar" : "Agotar" }
                                    </span>
                                    <span
                                        className="action-delete"
                                        onClick={() =>borrarProducto(producto)}
                                    >
                                        Eliminar
                                    </span>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
            {
                mostrarEditar && (<div className="modal-overlay">
                        <div className="modal">
                            <h2>
                                Editar producto
                            </h2>
                            <div className="form-group">
                                <label>
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    value={productoEditar.nombre}
                                    onChange={(e) =>setProductoEditar({...productoEditar, nombre:e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Descripción
                                </label>
                                <textarea
                                    value={ productoEditar.descripcion}
                                    onChange={(e) => setProductoEditar({ ...productoEditar, descripcion: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Precio
                                </label>
                                <input
                                    type="number"
                                    value={productoEditar.precio }
                                    onChange={(e) => setProductoEditar({...productoEditar,precio:e.target.value}) }
                                />
                            </div>
                            <div className="modal-actions">
                                <button
                                    className="btn-secondary"
                                    onClick={() =>setMostrarEditar( false ) }
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="btn-primary"
                                    onClick={guardarEdicion}
                                >
                                    Guardar cambios
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
                                ¿Está seguro que desea eliminar este producto?
                            </p>
                            <p>
                                Esta acción no se puede deshacer.
                            </p>
                            <div className="modal-actions">
                                <button
                                    className="btn-secondary"
                                    onClick={() => {setMostrarEliminar(false);
                                        setProductoSeleccionado(null);
                                    }}
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
export default Menu;