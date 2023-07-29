import axios from "axios";
import { handleResponse, HEADERS, SERVER_HOST } from "@api";
import { TStore } from "@components/types";
import { getLocation } from "@core/geolocation";
import { getMyStoresOffline, getStoreOffline } from "@core/offline/store";

export const getNearestStores = async (category_id: number, pageNumber: number = 0, pageSize: number = 10) => {
    let location = await getLocation();
    const res = await axios.get(`${SERVER_HOST}/api/v1/stores/?${category_id > 0 ? `category_id=${category_id}&` : "" }skip=${pageNumber * pageSize}&limit=${pageSize}&lat=${location.latitude}&lon=${location.longitude}`,
        { headers: HEADERS });
    const result: TStore[] = handleResponse(res);
    return result
}

export const saveStore = async (store: TStore) => {
    let axiosMethod = store.id == null ? axios.post : axios.put;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/stores/${store.id == null ? "" : store.id}`, JSON.stringify(store), {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` }
    })
    const result: TStore = handleResponse(res)
    return result;
}

export const getStore = async (id: number) => {
    if (typeof (navigator) === "undefined" || navigator.onLine) {
        const res = await axios.get(`${SERVER_HOST}/api/v1/stores/${id}`, {
            headers: HEADERS
        })
        const result: TStore = handleResponse(res);
        return result;
    } else {
        const result = await getStoreOffline(id);
        return result;
    }
}

export const getMyStores = async () => {
    if (typeof (navigator) === "undefined" || navigator.onLine) {
        const res = await axios.get(`${SERVER_HOST}/api/v1/stores/?user_id=${JSON.parse(localStorage.getItem("profile") || '{}')?.id}`, {
            headers: HEADERS
        })
        const result: TStore[] = handleResponse(res);
        return result;
    } else {
        const result: TStore[] = await getMyStoresOffline();
        return result;
    }
}

// Get All Store Timing
export const getStoreImages = async (store_id: number) => {
    let axiosMethod = axios.get;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/storeimages/?store_id=${store_id}`,
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    return handleResponse(res);
}