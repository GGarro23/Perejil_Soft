import api from "./axios";

export const obtenerOrdenesCocina = async () => {
  const res = await api.get("/cocina");
  return res.data;
};
export const cambiarEstadoOrden = async (id, estado) => {
    const res = await api.patch(
        `/cocina/${id}/estado`,
        { estado }
    );

    return res.data;
};