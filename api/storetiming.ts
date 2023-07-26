import { handleResponse, SERVER_HOST } from "@api";
import { TStoreTiming } from "@components/types";
import axios from "axios";

// Get All Store Timing
export const getStoreTiming = async (store_id: number) => {
    let axiosMethod = axios.get;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/storeopeninghours/?store_id=${store_id}`,
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    return handleResponse(res);
}

// Create Store Timing
export const createStoreTiming = async (timing: TStoreTiming) => {
    let axiosMethod = axios.post;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/storeopeninghours`,
        JSON.stringify(timing),
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    return handleResponse(res);
}

// Update Store Timing
export const updateStoreTiming = async (timing: TStoreTiming, id:number) => {
    let axiosMethod = axios.put;;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/storeopeninghours/${id}`,
        JSON.stringify(timing),
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    return handleResponse(res);
}