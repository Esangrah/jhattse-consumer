import { handleResponse, SERVER_HOST } from "@api";
import { TAddress } from "@components/types";
import fetch from 'cross-fetch';
import axios from "axios";

export const addAddress = async (addAddress: TAddress) => {
    let axiosMethod = addAddress.id == null ? axios.post : axios.put;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/addresses/${addAddress.id == null ? "" : addAddress.id}`,
        JSON.stringify(addAddress),
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    return handleResponse(res);
}

export const getAllStates = async () => {
    const res = await axios.get(`${SERVER_HOST}/api/v1/states?skip=0&limit=100`)
    return handleResponse(res);
}

export const getCitiesOfState = async (name: string, stateId: number) => {
    const res = await axios.get(`${SERVER_HOST}/api/v1/cities?${name?.length > 0 ? `name=${name}&` : ""}${stateId > 0 ? `state_id=${stateId}` : ""}`)
    return handleResponse(res);
}

export const getAddresses = async () => {
    const res = await axios.get(`${SERVER_HOST}/api/v1/addresses/?user_id=${JSON.parse(localStorage.getItem("profile") || '{}')?.id}`,
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    return handleResponse(res);

}

export const removeAddress = async (id: number) => {
    const res = await fetch(`${SERVER_HOST}/api/v1/addresses/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json;charset=utf-8", "Authorization": `Bearer ${localStorage.getItem("token")}` },
    })
    const result = await res.json()
    return result;
}