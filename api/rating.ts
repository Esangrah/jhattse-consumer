import axios from "axios";
import { handleResponse, SERVER_HOST } from "@api";
import { TAddReviews, TReview } from "@components/types"

export const getReviews = async (product_id: number, size: number = 10, ordering: string = 'high') => {
    const res = await axios.get(`${SERVER_HOST}/api/v1/productratings/?product_id=${product_id}&ordering=${ordering}&limit=${size}`);
    const reviews: TReview[] = handleResponse(res)
    return reviews;

}

export const getMyReview = async (product_id: number) => {
    if (JSON.parse(localStorage.getItem("profile") || '{}')?.id == null) {
        return null
    }
    const res = await axios.get(`${SERVER_HOST}/api/v1/productratings/?product_id=${product_id}&user_id=${JSON.parse(localStorage.getItem("profile") || '{}')?.id}`)
    const reviews: TReview[] = handleResponse(res);
    return reviews.length > 0 ? reviews[0] : null;
}


export const addReviews = async (addReview: TAddReviews) => {
    let axiosMethod = addReview.id == null ? axios.post : axios.put;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/productratings/${addReview.id == null ? "" : addReview.id}`, JSON.stringify(addReview),
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    return handleResponse(res);
}

export const getStoreReviews = async (store_id: number) => {
    const res = await axios.get(`${SERVER_HOST}/api/v1/storeratings/?store_id=${store_id}`);
    const reviews: TReview[] = handleResponse(res)
    return reviews;

}

export const getMyStoreReview = async (store_id: number) => {
    if (JSON.parse(localStorage.getItem("profile") || '{}')?.id == null) {
        return null
    }
    const res = await axios.get(`${SERVER_HOST}/api/v1/storeratings/?store_id=${store_id}&user_id=${JSON.parse(localStorage.getItem("profile") || '{}')?.id}`)
    const reviews: TReview[] = handleResponse(res);
    return reviews.length > 0 ? reviews[0] : null;
}

export const addStoreReviews = async (addReview: TAddReviews) => {
    let axiosMethod = addReview.id == null ? axios.post : axios.put;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/storeratings/${addReview.id == null ? "" : addReview.id}`, JSON.stringify(addReview),
        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    return handleResponse(res);
}