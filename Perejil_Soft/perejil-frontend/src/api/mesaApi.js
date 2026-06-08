import api from "./axios";
export const obtenerMesas = async () => {
    const response =await api.get("/mesas");
    return response.data;
};
export const crearMesa = async (mesa) => {
    const response =await api.post( "/mesas",mesa );
    return response.data;
};
export const eliminarMesa = async (id) => {
    const response =await api.delete( `/mesas/${id}`);
    return response.data;
};
export const cambiarEstadoMesa = async (id) => {
    const response =await api.patch(`/mesas/${id}/estado`);
    return response.data;
};