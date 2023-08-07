import { handleResponse, SERVER_HOST } from "#api";
import { OrderStatus } from "#components/contants";
import { TCreateOrder, TOrder } from "#components/types";
import { getOrdersOffline, saveOrderOffline } from "#core/offline/order";
import axios from "axios";

export const createOrder = async (order: TCreateOrder) => {
    if (typeof (navigator) === "undefined" || navigator.onLine) {
        let axiosMethod = axios.post;
        const res = await axiosMethod(`${SERVER_HOST}/api/v1/orders/create`,
            JSON.stringify(order),
            { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
        return handleResponse(res);
    }
}

export const updateOrder = async (order: TOrder) => {
    if (typeof (navigator) === "undefined" || navigator.onLine) {
        let axiosMethod = axios.put;
        const res = await axiosMethod(`${SERVER_HOST}/api/v1/orders/${order.id}`,
            JSON.stringify(order),
            { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
        return handleResponse(res);
    }
    else {
        const res = await saveOrderOffline(order);
        return res;
    }
}

export const getOrders = async (status: OrderStatus[] = [], ids: string[] = [], transaction_id: string = "") => {
    if (typeof (navigator) === "undefined" || navigator.onLine) {
        let axiosMethod = axios.get;
        const res = await axiosMethod(`${SERVER_HOST}/api/v1/orders/?${transaction_id?.length > 0 ? `transaction_id=${transaction_id}&` : ""}${status && status.length > 0 ? `status=${status.join("&status=")}&` : ""}${ids && ids.length > 0 ? `ids=${ids.join("&ids=")}` : ""}`,
            { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
        return handleResponse(res);
    } else {
        const res = await getOrdersOffline(status, ids);
        return res;
    }
}

export const getOrderById = async (id: string, token: string = '') => {
    let axiosMethod = axios.get;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/orders/${id}`,
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token?.length > 0 ? token : localStorage.getItem("token")}` } }
    );
    return handleResponse(res);
}

export const createOrderWithoutToken = async (order: TCreateOrder) => {
    let axiosMethod = axios.post;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/orders/create`,
        JSON.stringify(order),
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    return handleResponse(res);
}

export const getPaymentStatus = async (payment_id: string) => {
    let axiosMethod = axios.get;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/orders/payment/status?payment_id=${payment_id}`,
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } }
    );
    return handleResponse(res);
}

export const retryOrder = async (transaction_id: TOrder) => {
    let axiosMethod = axios.post;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/orders/retry`,
        JSON.stringify(transaction_id),
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    return handleResponse(res);
}

