import { TOtp } from "#components/types";
import { handleResponse, SERVER_HOST } from "#api";
import axios from "axios";


export const verifyMobile = async (otp: TOtp) => {
    let axiosMethod = axios.post;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/otp/generate`,
        JSON.stringify(otp),
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    return handleResponse(res);
}

export const verifyMobileOtp = async (id: string, otp: TOtp) => {
    let axiosMethod = axios.post;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/otp/verify/${id}`,
        JSON.stringify(otp),
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    return handleResponse(res);
}