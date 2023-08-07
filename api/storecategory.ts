import axios from "axios";
import { handleResponse, HEADERS, SERVER_HOST } from "#api";
import { TStoreCategory } from "#components/types";


export const getStoreCategories = async () => {
    const res = await axios.get(`${SERVER_HOST}/api/v1/storecategories/`, {
        headers: HEADERS
    })
    const result: TStoreCategory[] = handleResponse(res);
    return result;
}

export const getStoreCategory = async (id: number) => {
    const res = await axios.get(`${SERVER_HOST}/api/v1/storecategories/${id}`, {
        headers: HEADERS
    })
    const result: TStoreCategory = handleResponse(res);
    return result;
}