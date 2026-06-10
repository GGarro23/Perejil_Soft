import api from "./axios";

export const getVentas = async (desde, hasta) => {
    const response = await api.get("/ventas", { params: { desde, hasta }});
    return response.data;
};