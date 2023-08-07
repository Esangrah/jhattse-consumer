import { TBrand } from '#components/types'
import React, { useState, useEffect } from 'react'
import { BrandContainer } from "#components/container/brandcontainer"
import { getProductBrands } from '#api/brand'
import { Dropdown, MenuProps, Space, Typography } from "antd";
import { FaFilter } from "react-icons/fa";

export const Brands = () => {
    const [brands, setBrands] = useState<TBrand[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const pageSize = 10;

    const handleLoadMore = () => {
        if (isLoadMore) {
            setPageNumber(pageNumber + 1);
        }
    }

    useEffect(() => {
        const res: Promise<TBrand[]> = getProductBrands('', pageNumber, pageSize);
        res.then((result) => {
            setIsLoadMore(result.length == pageSize)
            setBrands([...brands, ...result])
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
        <>
            <div className="bg-neutral-50">
                <div className="flex justify-between px-4 py-2">
                    <div className="text-neutral-900 font-bold text-lg">Explore Brands</div>
                    <div className="flex- items-center">
                        <Dropdown menu={{ items, selectable: true, defaultSelectedKeys: ['1'] }} trigger={['click']} >
                            <Typography.Link>
                                <Space>
                                    <FaFilter className="text-neutral-900 font-bold text-lg" />
                                </Space>
                            </Typography.Link>
                        </Dropdown>
                    </div>
                </div>
                <BrandContainer brands={brands} />
            </div>
            {
                isLoadMore ?
                    <div className="flex flex-col items-center p-2">
                        <button disabled={!isLoadMore} className={!isLoadMore ? "white text-neutral active:bg-neutral-50 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border border-neutral-300 opacity-60" : "white text-neutral active:bg-neutral-50 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border border-neutral-300"} onClick={() => handleLoadMore()}>{!isLoadMore ? "No more products" : "Load more.."}</button>
                    </div> : null
            }
        </>
    )
}
