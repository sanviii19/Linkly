import axiosInstance from "../utils/axiosInstance"

export const LoginUser = async (email, password) =>{
    const {data} = await axiosInstance.post("/api/auth/login",{email, password})
    return data;
}

export const RegisterUser = async (name, email, password) =>{
    const {data} = await axiosInstance.post("/api/auth/register",{name, email, password})
    return data;
}

export const LogoutUser = async () => {
    const {data} = await axiosInstance.post("/api/auth/logout");
    return data;
}

export const getCurrentUser = async () =>{
    const {data} = await axiosInstance.get("/api/auth/me")
    return data
}