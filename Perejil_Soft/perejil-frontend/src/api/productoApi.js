import api from "./axios";
export const obtenerProductos =
async () => {
    const response = await api.get("/productos");
    return response.data;
};
export const crearProducto =
async (producto) => {
    const response = await api.post("/productos", producto);
    return response.data;
};

export const cambiarEstadoProducto =
async (id) => {
    const response =await api.patch( `/productos/${id}/agotado`);
    return response.data;
};
export const eliminarProducto =
async (id) => {
    const response =await api.delete(`/productos/${id}`);
    return response.data;
};
export const actualizarProducto =
async (id, producto) => {
    const response =await api.put(`/productos/${id}`,producto);
    return response.data;
};