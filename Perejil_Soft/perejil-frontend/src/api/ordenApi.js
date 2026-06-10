import api from "./axios";

export const obtenerOrdenes = async () =>{
    const response = await api.get("/ordenes");
    return response.data;
};
export const obtenerOrden = async (id) =>{
    const response = await api.get(`/ordenes/${id}`);
    return response.data;
};
export const crearOrden = async (mesa_id) =>{
    const response = await api.post("/ordenes", { mesa_id });
    return response.data;
};
export const agregarProducto = async (ordenId, producto_id, cantidad, nota = "") =>{
    const response = await api.post(`/ordenes/${ordenId}/productos`, { producto_id, cantidad, nota });
    return response.data;
};
export const enviarACocina = async (ordenId) =>{
    const response = await api.patch(`/ordenes/${ordenId}/enviar`);
    return response.data;
};
export const cancelarOrden = async (ordenId) =>{
    const response = await api.patch(`/ordenes/${ordenId}/cancelar`);
    return response.data;
};
export const cerrarOrden = async (ordenId, metodo_pago) =>{
    const response = await api.post(`/ordenes/${ordenId}/cerrar`, { metodo_pago });
    return response.data;
};