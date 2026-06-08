import { useState } from "react";
import { loginRequest } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data =
                await loginRequest(
                    username,
                    password
                );
            login(
                data.usuario,
                data.token
            );
            const rol =data.usuario.rol .toLowerCase();
            if (rol === "admin") {
                navigate("/admin");
            }
            else if (rol === "mesero") {
                navigate("/mesero");
            }
            else if (rol === "cocina") {
                navigate("/cocina");
            }
        } catch (err) {
    console.log(err);
    console.log(err.response);
    setError(
        err.response?.data?.mensaje ||
        "Error al iniciar sesión"
    );
}
    };
    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Perejil_Soft</h1>
                <p>
                    Sistema de gestión de restaurante
                </p>
                <form onSubmit={handleSubmit}>
                    <label>
                        Usuario
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) =>
                            setUsername(
                                e.target.value
                            )
                        }
                    />
                    <label>
                        Contraseña
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />
                    {
                        error &&
                        <p className="error">
                            {error}
                        </p>
                    }
                    <button type="submit">
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    );
}
export default Login;