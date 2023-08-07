import axios from "axios";
import { handleResponse, SERVER_HOST } from "#api";
import { TPaymentMethod } from "#components/types";

export const getStorePayments = async (store_id: number) => {
    const res = await axios.get(`${SERVER_HOST}/api/v1/storepayments/?store_id=${store_id}`);
    const payments: TPaymentMethod[] = handleResponse(res)
    return payments;

}

export const addStorePayment = async (payment: TPaymentMethod) => {
    let axiosMethod = payment.id == null ? axios.post : axios.put;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/storepayments/${payment.id == null ? "" : payment.id}`, JSON.stringify(payment),
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    return handleResponse(res);
}

export const deleteStorePayment = async (id: number) => {
    const res = await axios.delete(`${SERVER_HOST}/api/v1/storepayments/${id}`,
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } });
    const payments: TPaymentMethod[] = handleResponse(res)
    return payments;
}