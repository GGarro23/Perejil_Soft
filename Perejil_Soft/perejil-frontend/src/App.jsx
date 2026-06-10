import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Menu from "./pages/admin/Menu";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Usuarios from "./pages/admin/Usuarios";
import Mesas from "./pages/admin/Mesas";
import Pedidos from "./pages/admin/Pedidos";
import CocinaDashboard from "./pages/cocina/CocinaDashboard";
function Ventas() {return <h1>Panel Ventas</h1>;}
//import Ventas from "./pages/admin/Ventas";
function MeseroDashboard() {return <h1>Panel Mesero</h1>;}
function Facturas() {return <h1>Facturas</h1>;}
function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route 
                path="/" 
                element={<Navigate to="/login" replace />} 
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/usuarios"
                    element={
                        <ProtectedRoute role="admin">
                            <Usuarios />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/mesas"
                    element={
                        <ProtectedRoute role="admin">
                            <Mesas />
                        </ProtectedRoute>
                    }
                />
                 <Route
                    path="/admin/menu"
                    element={
                        <ProtectedRoute role="admin">
                        <Menu />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/pedidos"
                    element={
                        <ProtectedRoute role="admin">
                            <Pedidos />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/ventas"
                    element={
                        <ProtectedRoute role="admin">
                            <Ventas />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/facturas"
                    element={
                        <ProtectedRoute role="admin">
                            <Facturas />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/mesero"
                    element={
                        <ProtectedRoute role="mesero">
                            <MeseroDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cocina"
                    element={
                        <ProtectedRoute role="cocina">
                            <CocinaDashboard />
                        </ProtectedRoute>
                    }
                />              
            </Routes>
        </BrowserRouter>
    );
}
export default App;