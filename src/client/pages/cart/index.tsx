import React, { useState } from 'react';
import dynamic from 'next/dynamic'
import { Container } from "@components";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { cartState } from '@recoil/atoms';


const Header = dynamic(() => import("../../src/components/header").then((mod) => mod.Header), {
    ssr: false,
});

const CartInfo = dynamic(() => import("../../src/components/cartinfo").then((mod) => mod.CartInfo), {
    ssr: false,
});

const CartDetails = dynamic(() => import("../../src/components/cartinfo/summary").then((mod) => mod.CartDetails), {
    ssr: false,
});


function Cart() {
    const [dineinOrTakeaway, setDineinOrTakeaway] = useState("DINEIN");
    const cart = useRecoilValue(cartState)

    let tableInfo = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("tableInfo")) : null;

    const onDineinOrTakeaway = (value: string) => {
        setDineinOrTakeaway(value);
        localStorage.setItem("tableInfo", JSON.stringify({ source: tableInfo?.source, table: tableInfo?.table, table_id: tableInfo?.table_id, is_ac: tableInfo?.is_ac, dineinOrTakeaway: value, timeStamp: Date.now() }))
    }

    return (
        <div>
            <Container>
                <Header />
                <div className="px-20 sm:px-2 sm:hidden">
                    <div className="h-4"></div>
                    <Breadcrumb className="font-normal text-lg list-none text-breadcrumbs">
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem className='font-normal text-ellipsis text-left break-words line-clamp-1' isCurrentPage>
                            <BreadcrumbLink href={`/cart`}>Cart</BreadcrumbLink>
                            <ol className="p-0 list-none"></ol>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="h-4"></div>
                <div className="sm:hidden"><h1 className="font-bold text-lg text-custom_black font-manrope px-20 sm:px-2">Cart</h1></div>
                <div className="h-4 sm:hidden"></div>
                {(tableInfo?.table !== null && tableInfo?.table !== undefined) && <div className='hidden flex gap-10 items-center px-2 pb-4 sm:flex'>
                    <div className='flex gap-2 items-center'>
                        <input name="DineinAndTakeaway" type="radio" value="DINEIN" onChange={(e) => {
                            onDineinOrTakeaway(e.target.value)
                        }
                        } checked={dineinOrTakeaway == "DINEIN"} />
                        <label htmlFor="DINEIN" className="font-bold font-sm text-bannerText">DINE IN</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input name="DineinAndTakeaway" type="radio" value="TAKEAWAY" onChange={(e) => {
                            onDineinOrTakeaway(e.target.value)
                        }} checked={dineinOrTakeaway == "TAKEAWAY"} />
                        <label htmlFor="TAKEAWAY" className="font-bold font-sm text-bannerText">TAKEAWAY</label>
                    </div>
                </div>}

                <div className="flex flex-row grow justify-between gap-4 sm:flex-col px-20 sm:px-2 pb-2">
                    <CartInfo />
                    {cart?.size > 0 && <CartDetails btnName="PROCEED TO BUY" />}
                </div>
            </Container>
        </div>
    );
}

export default Cart;