import { handleResponse, SERVER_HOST } from "#api";
import { TOrderItem } from "#components/types";
import { saveOrderItem } from "#core/offline/order";
import axios from "axios";


export const updateOrderItem = async (orderItem: TOrderItem) => {
    if (typeof(navigator) === "undefined" || navigator.onLine) {
        let axiosMethod = axios.put;
        const res = await axiosMethod(`${SERVER_HOST}/api/v1/orderitems/${orderItem.id}`,
            JSON.stringify(orderItem),
            { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
        return handleResponse(res);
    } else {
        await saveOrderItem(orderItem);
        return orderItem;
    }
}