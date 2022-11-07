import { fetchGet_public_pending, fetchPost_public_pending } from "../utils/projectAPI";

const baseURL = 'http://localhost:8000/api';

export const getUsers = async()=>{
    const token = localStorage.getItem("token");
    return await fetchGet_public_pending(`${baseURL}/auth/users`, token);
}

export const getImplementers = async()=>{
    const token = localStorage.getItem("token");
    return await fetchGet_public_pending(`${baseURL}/auth/implementers`, token);
}

export const createUser = async(user)=>{
    return await fetchPost_public_pending(`${baseURL}/auth/register`, {
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        password: user.password,
        role: user.role,
      }, 'token')
}