import { TProduct } from '@components/types'
import React, { useState, useEffect } from 'react'
import { TrendingProductContainer } from "@components/container/trendingproduct"
import { getPopularProducts } from '@api/product'
import { Dropdown, MenuProps, Space, Typography } from "antd";
import { FaFilter } from "react-icons/fa";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

export const TrendingProducts = () => {
    const [products, setProducts] = useState<TProduct[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const pageSize = 10;

    const handleLoadMore = () => {
        if (isLoadMore) {
            setPageNumber(pageNumber + 1);
        }
    }

    useEffect(() => {
        const res: Promise<TProduct[]> = getPopularProducts(pageNumber, pageSize);
        res.then((result) => {
            setIsLoadMore(result.length == pageSize)
            setProducts([...products, ...result])
        })
    }, [pageNumber])

    const items: MenuProps['items'] = [
        {
            label: <button >Price: high to low</button>,
            key: '1',
        },
        {
            label: <button >Price: low to high</button>,
            key: '2',
        },
        {
            label: <button >Discount: low to high</button>,
            key: '3',
        },
        {
            label: <button >Rating: high to low</button>,
            key: '4',
        },

    ];
    return (
        <div className="bg-neutral-100 px-20 sm:px-0">
            <div className="h-20 flex flex-col justify-center sm:hidden">
                <Breadcrumb className="font-normal text-lg list-none text-breadcrumbs">
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='/trending'>Trending</BreadcrumbLink>
                        <ol className="p-0 list-none"></ol>
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="flex justify-between item-center py-2">
                <div>
                    <h1 className="font-bold text-2xl text-custom_black">Trending Products</h1>
                </div>
                <div className="flex items-center">
                    <Dropdown menu={{ items, selectable: true, defaultSelectedKeys: ['1'] }} trigger={['click']} >
                        <Typography.Link>
                            <Space>
                                <FaFilter className="text-neutral-900 font-bold text-lg" />
                            </Space>
                        </Typography.Link>
                    </Dropdown>
                </div>
            </div>
            <TrendingProductContainer products={products} />
            {
                isLoadMore ?
                    <div className="flex flex-col items-center p-2">
                        <button disabled={!isLoadMore} className={!isLoadMore ? "white text-neutral active:bg-neutral-50 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border border-neutral-300 opacity-60" : "white text-neutral active:bg-neutral-50 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border border-neutral-300"} onClick={() => handleLoadMore()}>{!isLoadMore ? "No more products" : "Load more.."}</button>
                    </div> : null
            }
        </div>
    )
}
