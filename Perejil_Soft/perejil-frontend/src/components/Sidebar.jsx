import {
    NavLink,
    useNavigate
} from "react-router-dom";

import {
    FiHome,
    FiUsers,
    FiBook,
    FiGrid,
    FiShoppingCart,
    FiDollarSign,
    FiFileText,
    FiLogOut
} from "react-icons/fi";

function Sidebar() {

    const navigate =
        useNavigate();

    const cerrarSesion =
    () => {

        localStorage.removeItem(
            "token"
        );

        navigate(
            "/login"
        );

    };

    return (

        <aside
            className="sidebar"
        >

            <div
                className="logo"
            >
                Perejil_Soft
            </div>

            <nav
                className="nav"
            >

                <NavLink
                    to="/admin"
                    end
                    className={({
                        isActive
                    }) =>
                        isActive
                        ? "active-link"
                        : ""
                    }
                >

                    <FiHome />

                    <span>
                        Inicio
                    </span>

                </NavLink>

                <NavLink
                    to="/admin/usuarios"
                    className={({
                        isActive
                    }) =>
                        isActive
                        ? "active-link"
                        : ""
                    }
                >

                    <FiUsers />

                    <span>
                        Usuarios
                    </span>

                </NavLink>

                <NavLink
                    to="/admin/menu"
                    className={({
                        isActive
                    }) =>
                        isActive
                        ? "active-link"
                        : ""
                    }
                >

                    <FiBook />

                    <span>
                        Menú
                    </span>

                </NavLink>

                <NavLink
                    to="/admin/mesas"
                    className={({
                        isActive
                    }) =>
                        isActive
                        ? "active-link"
                        : ""
                    }
                >

                    <FiGrid />

                    <span>
                        Mesas
                    </span>

                </NavLink>

                <NavLink
                    to="/admin/pedidos"
                    className={({
                        isActive
                    }) =>
                        isActive
                        ? "active-link"
                        : ""
                    }
                >

                    <FiShoppingCart />

                    <span>
                        Pedidos
                    </span>

                </NavLink>

                <NavLink
                    to="/admin/ventas"
                    className={({
                        isActive
                    }) =>
                        isActive
                        ? "active-link"
                        : ""
                    }
                >

                    <FiDollarSign />

                    <span>
                        Ventas
                    </span>

                </NavLink>

                <NavLink
                    to="/admin/facturas"
                    className={({
                        isActive
                    }) =>
                        isActive
                        ? "active-link"
                        : ""
                    }
                >

                    <FiFileText />

                    <span>
                        Facturas
                    </span>

                </NavLink>

            </nav>

            <div
                className="sidebar-footer"
            >

                <button
                    className="logout-btn"
                    onClick={
                        cerrarSesion
                    }
                >

                    <FiLogOut />

                    <span>
                        Cerrar sesión
                    </span>

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;