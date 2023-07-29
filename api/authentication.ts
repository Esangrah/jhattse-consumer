import { handleResponse, SERVER_HOST } from "@api";
import { TIdentity, TPasswordReset } from "@components/types";
import Cookies from 'js-cookie';
import axios from "axios";

export const login = async (loginInfo: TIdentity) => {
    let axiosMethod = axios.post
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/token?username_source=${loginInfo.email !== undefined && loginInfo.email?.length > 0 ? "email" : "phone"}`,
        new URLSearchParams({ "username": loginInfo.email || loginInfo.phone || "", "password": loginInfo.password || "" }).toString(),
        {
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
        })
    return handleResponse(res);
}


export const refresh = async () => {
    const res = await axios.get(`${SERVER_HOST}/api/v1/refresh`,
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${Cookies.get('refresh_token')}` } })
    return handleResponse(res);
}

export const signout = async () => {
    let axiosMethod = axios.get
    let token = localStorage.getItem("token");
    localStorage.removeItem("token");
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/logout`, {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    })
    return handleResponse(res);
}


export const passwordRecovery = async (email: string) => {
    let axiosMethod = axios.post;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/password-recovery/${email}`,
        { headers: { "Content-Type": "application/json" } })
    return handleResponse(res);
}

export const passwordReset = async (state: TPasswordReset) => {
    let axiosMethod = axios.post;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/reset-password/`, JSON.stringify(state),
        { headers: { "Content-Type": "application/json" } })
    return handleResponse(res);
}

export const signup = async (signInfo: TIdentity) => {
    const res = await axios.post(`${SERVER_HOST}/api/v1/users/register`,
        JSON.stringify(signInfo),
        { headers: { "Content-Type": "application/json;charset=utf-8" } })
    const result = handleResponse(res);
    return result;
}

export const socialLogin = async (token: string) => {
    const res = await axios.get(`${SERVER_HOST}/api/v1/google/token?token=${token}`,
        { headers: { "Content-Type": "application/json;charset=utf-8" } })
    const result = handleResponse(res);
    return result;
}

export const socialSignup = async (provider: string, token: string) => {
    const res = await axios.post(`${SERVER_HOST}/api/v1/users/register?provider=${provider}&token=${token}`,
        JSON.stringify({}),
        { headers: { "Content-Type": "application/json;charset=utf-8" } })
    const result = handleResponse(res);
    return result;
}

export const getprofile = async () => {
    const res = await axios.get(`${SERVER_HOST}/api/v1/users/me`,
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    const result = handleResponse(res);
    return result;
}

export const updateProfile = async (user: TIdentity) => {
    const res = await axios.put(`${SERVER_HOST}/api/v1/users/me`, JSON.stringify(user), {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
    });
    const result = handleResponse(res);
    return result;
}
export const uploadProfileImage = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const res = await axios.post(`${SERVER_HOST}/api/v1/users/profile/image/add`, formData, {
            headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        });
        const result = handleResponse(res);
        return result;
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error sending file:', error);
    }
}