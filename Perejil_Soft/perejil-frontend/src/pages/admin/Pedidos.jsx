import {useEffect, useState}
from "react";
import MainLayout
from "../../layouts/MainLayout";
import {obtenerOrdenes}
from "../../api/ordenApi";
function Pedidos() {
    const [ordenes,setOrdenes] =useState([]);
    const [estado,setEstado] =useState("Todos");
    useEffect(() => {cargarOrdenes();}, []);
    const cargarOrdenes =
    async () => {
        try {
            const data =await obtenerOrdenes();
            setOrdenes(
                data
            );
        } catch (error) {
            console.log(
                error
            );
        }
    };
    const ordenesFiltradas =
        estado === "Todos"? ordenes: ordenes.filter(o =>o.estado ===estado );
    return (
        <MainLayout>
            <div
                className="page-header"
            >
                <div>
                    <h1>
                        Consulta de pedidos
                    </h1>
                    <p>
                        Visualiza todos los pedidos del restaurante
                    </p>
                </div>
            </div>
            <div
                className="card"
            >
                <h3>
                    Filtros
                </h3>
                <div
                    className="form-group"
                >
                    <label>
                        Estado
                    </label>
                    <select
                        value={ estado}
                        onChange={(e) =>setEstado(e.target.value)
                        }
                    >
                        <option>
                            Todos
                        </option>
                        <option>
                            Pendientes
                        </option>
                        <option>
                            En preparación
                        </option>
                        <option>
                            Cancelados
                        </option>
                    </select>
                </div>
            </div>
            <div
                className="table-card"
            >
                <table>
                    <thead>
                        <tr>
                            <th>
                                Orden
                            </th>
                            <th>
                                Mesa
                            </th>
                            <th>
                                Mesero
                            </th>
                            <th>
                                Fecha y Hora
                            </th>
                            <th>
                                Estado
                            </th>
                            <th>
                                Total
                            </th>
                            <th>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ordenesFiltradas.map( (orden) => (
                                <tr
                                    key={orden.id}
                                >
                                    <td>
                                        #
                                        {orden.id}
                                    </td>
                                    <td>
                                        Mesa
                                        {orden.mesa}
                                    </td>
                                    <td>
                                        {orden.mesero}
                                    </td>
                                    <td>
                                        {new Date(orden.fecha).toLocaleString()}
                                    </td>
                                    <td>
                                        <span
                                            className={orden.estado ==="en preparacion"?"badge-blue":orden.estado ==="pendiente"?"badge-yellow":"badge-red"}

                                        >
                                            {orden.estado}
                                        </span>
                                    </td>
                                    <td>
                                        ₡
                                        {orden.total}
                                    </td>
                                    <td>
                                        <span
                                            className="action-edit"
                                        >
                                            Ver detalle
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </MainLayout>
    );
}
export default Pedidos;