import { handleResponse, SERVER_HOST } from "@api";
import { TFeedback } from "@components/types";
import axios from "axios";

export const addFeedback = async (order: TFeedback) => {
    let axiosMethod = axios.post;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/feedbacks/`,
        JSON.stringify(order),
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    return handleResponse(res);
}