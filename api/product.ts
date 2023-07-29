import { handleResponse, SERVER_HOST } from "@api";
import { TProduct, TProductCategory } from "@components/types";
import fetch from 'cross-fetch';
import axios from "axios";

export const getPopularProducts = async (pageNumber: number = 0, pageSize: number = 10) => {
    const res = await fetch(`${SERVER_HOST}/api/v1/products/popular/?lat=0&lon=0&skip=${pageNumber * pageSize}&limit=${pageSize}`)
    const products: TProduct[] = await res.json()
    return products;
}


export const getFeaturedProducts = async (category: number = 0, store: number = 0, brand: number = 0, pageNumber: number = 0, pageSize: number = 20) => {
    let params = new URLSearchParams()
    if (category > 0) {
        params.append('category_id', category.toString());
    }
    if (store > 0) {
        params.append('store_id', store.toString());
    }
    if (brand > 0) {
        params.append('brand_id', brand.toString());
    }
    if (pageNumber > 0) {
        params.append('skip', (pageNumber * pageSize).toString());
    }
    if (pageSize > 0) {
        params.append('limit', pageSize.toString());
    }
    const res = await fetch(`${SERVER_HOST}/api/v1/products/popular/?${params.toString()}`)
    const products: TProduct[] = await res.json()
    return products;
}


export const getStoreProducts = async (category: number, store: number, name: string = "", pageNumber: number = 0, pageSize: number = 10) => {
    const res = await fetch(`${SERVER_HOST}/api/v1/products/inventory?${category > 0 ? `category_id=${category}&` : ""}${store > 0 ? `store_id=${store}&` : ""}${name === null || name?.trim().length == 0 ? "" : `name=${name}`}&skip=${pageNumber * pageSize}&limit=${pageSize}`)
    const result = await res.json();
    // const storeProducts = result?.map((inventory: TInventory) => { let product = inventory.product; return { ...product, inventories: [inventory] } });
    const products: TProduct[] = result;
    return products;
}

export const getDetailProduct = async (id: any) => {
    const res = await axios.get(`${SERVER_HOST}/api/v1/products/${id}`)
    const product: TProduct = handleResponse(res);
    return product;
}

export const getSimilarProducts = async (id: number) => {
    let axiosMethod = axios.get;
    const res = await axiosMethod(`${SERVER_HOST}/api/v1/products/similar?product_id=${id}`)
    const products: TProduct[] = handleResponse(res);
    return products;
}


export const getProductCategories = async (master_id: number = 0, root: boolean = false) => {
    const res = await fetch(`${SERVER_HOST}/api/v1/productcategories/?root=${root}${master_id == 0 ? "" : "&master_id=" + master_id.toString()}`)
    const products: TProductCategory[] = await res.json()
    return products;
}

export const getProductCategory = async (category: number) => {
    const res = await fetch(`${SERVER_HOST}/api/v1/productcategories/${category}`)
    const products: TProductCategory = await res.json()
    return products;
}

export const getAllProductCategory = async (type: string = "", pageNumber: number = 0, pageSize: number = 20) => {
    const res = await fetch(`${SERVER_HOST}/api/v1/productcategories/?${type}&root=false&skip=${pageNumber * pageSize}&limit=${pageSize}`)
    const products: TProductCategory[] = await res.json()
    return products;
}

export const getProductCategoriesList = async (id: number, pageNumber: number = 0, pageSize: number = 20) => {
    const res = await axios.get(`${SERVER_HOST}/api/v1/productcategories/?store_id=${id}&skip=${pageNumber * pageSize}&limit=${pageSize}`)
    const productCategoriesList = handleResponse(res);
    return productCategoriesList;
}
