import axiosInstance from "../utils/axiosInstance"

export const LoginUser = async (email, password) => {
    const { data } = await axiosInstance.post("/api/auth/login", { email, password })
    return data;
}

export const RegisterUser = async (name, email, password) => {
    const { data } = await axiosInstance.post("/api/auth/signup", { name, email, password })
    return data;
}

export const LogoutUser = async () => {
    const { data } = await axiosInstance.post("/api/auth/logout");
    return data;
}

export const getCurrentUser = async () => {
    const { data } = await axiosInstance.get("/api/auth/me", {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    })
    return data
}

export const updateUrl = async (id, updateData) => {
    const { data } = await axiosInstance.put(`/api/user/urls/${id}`, updateData);
    return data;
}

export const deleteUrl = async (id) => {
    const { data } = await axiosInstance.delete(`/api/user/urls/${id}`);
    return data;
}