import api from "./axios";
export const loginRequest = async (username,password
) => {
    const response = await api.post(
        "/auth/login",
        { username, password}
    );
    return response.data;
};