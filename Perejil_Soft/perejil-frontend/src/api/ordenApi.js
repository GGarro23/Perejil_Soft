import api from "./axios";
export const obtenerOrdenes =
async () => {
    const response =await api.get( "/ordenes" );
    return response.data;

};