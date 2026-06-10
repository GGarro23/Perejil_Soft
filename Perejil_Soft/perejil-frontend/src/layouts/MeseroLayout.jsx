import { NavLink, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiBook, FiGrid, FiLogOut } from "react-icons/fi";

function MeseroLayout({ children }){
    const navigate = useNavigate();
    const cerrarSesion = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return(
        <div className="layout">
            <aside className="sidebar">
                <div className="logo">Perejil_Soft</div>
                <nav className="nav">
                    <NavLink
                        to="/mesero"
                        end
                        className={({ isActive }) => isActive ? "active-link" : ""}
                    >
                        <FiShoppingCart />
                        <span>Crear orden</span>
                    </NavLink>
                    <NavLink
                        to="/mesero/ordenes"
                        className={({ isActive }) => isActive ? "active-link" : ""}
                    >
                        <FiBook />
                        <span>Ordenes activas</span>
                    </NavLink>
                    <NavLink
                        to="/mesero/estado"
                        className={({ isActive }) => isActive ? "active-link" : ""}
                    >
                        <FiGrid />
                        <span>Estado de pedidos</span>
                    </NavLink>
                </nav>
                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={cerrarSesion}>
                        <FiLogOut />
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </aside>
            <main className="main-content">
                {children}
            </main>
        </div>
    );
}

export default MeseroLayout;