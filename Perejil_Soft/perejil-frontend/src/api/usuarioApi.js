import api from "./axios";
export const obtenerUsuarios =
async () => {
    const response = await api.get("/usuarios");
    return response.data;
};
export const crearUsuario =
async (usuario) => {
    const response = await api.post("/usuarios", usuario);
    return response.data;
};
export const editarUsuario = async (id, usuario) => {
    const res = await api.put(`/usuarios/${id}`, usuario);
    return res.data;
};
export const eliminarUsuario =
async (id) => {
    const response = await api.delete( `/usuarios/${id}`);
    return response.data;
};