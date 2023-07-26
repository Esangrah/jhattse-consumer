import { handleResponse, SERVER_HOST } from "@api";
import { TBrand, TProduct } from "@components/types";
import axios from "axios";

export const getProductBrands = async (name: string = null, pageNumber: number = 0, pageSize: number = 10) => {
    let axiosMethod = axios.get;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/brands/?${name == null ? "" : `name=${name}`}&skip=${pageNumber * pageSize}&limit=${pageSize}`,)
    return handleResponse(res);
}

export const getBrand = async (id: number) => {
    let axiosMethod = axios.get;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/brands/${id}`,)
    return handleResponse(res);
}

export const getBestSeller = async (id: number) => {
    const res = await fetch(`${SERVER_HOST}/api/v1/products/popular/?brand_id=${id}`)
    const products: TProduct[] = await res.json()
    return products;
}

export const getBrandCategories = async (brand_id: number, pageNumber: number = 0, pageSize: number = 20) => {
    const res = await axios.get(`${SERVER_HOST}/api/v1/productcategories/?brand_id=${brand_id}&skip=${pageNumber * pageSize}&limit=${pageSize}`)
    const productCategoriesList = handleResponse(res);
    return productCategoriesList;
}