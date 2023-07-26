import { handleResponse, SERVER_HOST } from "@api";
import { TAddAddress, TAddress } from "@components/types";
import axios from "axios";

export const addAddress = async (addAddress: TAddress) => {
    let axiosMethod = addAddress.id == null ? axios.post : axios.put;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/addresses/${addAddress.id == null ? "" : addAddress.id}`,
        JSON.stringify(addAddress),
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    return handleResponse(res);
}

export const getAllStates = async () => {
    const res = await fetch(`${SERVER_HOST}/api/v1/states?skip=0&limit=100`)
    const result = await res.json()
    return result;
}

export const getCitiesOfState = async (name: string = null, stateId: number) => {
    const res = await fetch(`${SERVER_HOST}/api/v1/cities?${name != null && name?.length > 0 ? `name=${name}&` : ""}state_id=${stateId}`)
    const result = await res.json()
    return result;
}

export const getAddresses = async () => {
    const res = await fetch(`${SERVER_HOST}/api/v1/addresses/?user_id=${JSON.parse(localStorage.getItem("profile"))?.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json;charset=utf-8", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(addAddress)
    })
    const result: TAddress[] = await res.json()
    return result;

}

export const removeAddress = async (id: number) => {
    const res = await fetch(`${SERVER_HOST}/api/v1/addresses/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json;charset=utf-8", "Authorization": `Bearer ${localStorage.getItem("token")}` },
    })
    const result = await res.json()
    return result;
}