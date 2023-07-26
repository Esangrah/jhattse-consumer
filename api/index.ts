import { AxiosResponse } from "axios";

export const SERVER_HOST = typeof window !== "undefined" && window.location.hostname.endsWith(".com")? `${window.location.protocol}//${window.location.host}`:"https://jhattse.com";
export const HEADERS = { "Content-Type": "application/json;charset=utf-8" };

export const handleResponse = (res:AxiosResponse<any, any>) => {
    return res.data;
}