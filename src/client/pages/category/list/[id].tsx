import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Header, Navbar } from "@components";
import { TProductCategory } from '@components/types'
import { getAllProductCategory } from '@api/product'
import { requestLogin } from '@core/utils'
import { ProductCategoryContainer } from '@components/container'
import { useLocation } from 'react-router-dom';

const TrendingCategory: React.FC = () => {
    const [productCategories, setProductCategories] = useState<TProductCategory[]>([])
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [kind, setKind] = useState("trending");
    const [pageNumber, setPageNumber] = useState(0);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const pageSize = 20;

    const handleLoadMore = () => {
        if (isLoadMore) {
            setPageNumber(pageNumber + 1);
        }
    }

    const getAllProductsOfCategory = (extend: boolean = true) => {
        const res: Promise<TProductCategory[]> = getAllProductCategory(null, pageNumber, pageSize);
        res.then((result) => {
            setIsLoadMore(result.length == pageSize);
            if (extend) {
                setProductCategories([...productCategories, ...result])
            } else {
                setProductCategories(result);
            }

        }).catch((e) => {
            if (e.response?.status === 401) {
                requestLogin(location.pathname);
            }
        })
    }


    useEffect(() => {
        if (queryParams?.get("id")) {
            setKind(queryParams?.get("id"))
        }
    }, [location])

    useEffect(() => {
        getAllProductsOfCategory(pageNumber != 0);
    }, [pageNumber])

    useEffect(() => {
        if (pageNumber == 0) {
            getAllProductsOfCategory(pageNumber != 0);
        } else {
            setPageNumber(0);
        }
    }, [kind])


    return (
        <div className="bg-neutral-50">
            <Header />
            <div className="flex justify-center gap-4 pt-6 pb-4">
                <Link to={`/category/list/trending`} className={`${kind == "trending" ? "text-neutral-900 border-black border-b-2" : "text-neutral-400 no-underline"} font-bold text-xs hover:text-neutral-900 hover:underline focus:underline focus:text-neutral-900`}>TRENDING</Link>
                <Link to={`/category/list/bestseller`} className={`${kind == "bestseller" ? "text-neutral-900 border-black border-b-2" : "text-neutral-400 no-underline"} font-bold text-xs hover:text-neutral-900 hover:underline focus:underline focus:text-neutral-900`}>BESTSELLER</Link>
                <Link to={`/category/list/popular`} className={`${kind == "popular" ? "text-neutral-900 border-black border-b-2" : "text-neutral-400 no-underline"} font-bold text-xs hover:text-neutral-900 hover:underline focus:underline focus:text-neutral-900`}>POPULAR</Link>
            </div>
            <ProductCategoryContainer categories={productCategories} />

            {
                isLoadMore ?
                    <div className="mt-2 flex flex-col items-center p-2">
                        <button disabled={!isLoadMore} className={!isLoadMore ? "white text-neutral active:bg-neutral-50 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border border-gray-300 opacity-60" : "white text-neutral active:bg-neutral-50 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border border-gray-300"} onClick={() => handleLoadMore()}>{!isLoadMore ? "No more products" : "Load more.."}</button>
                    </div> : null
            }
            <Navbar />
        </div>
    )
}

export default TrendingCategory