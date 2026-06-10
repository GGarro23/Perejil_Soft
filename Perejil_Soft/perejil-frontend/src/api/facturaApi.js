import api from "./axios";

export const getFacturas = async () => {
    const response = await api.get("/facturas");
    return response.data;
};

export const getDetalleFactura = async (id) => {
    const response = await api.get(`/facturas/${id}`);
    return response.data;
};