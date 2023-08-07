import { useState } from 'react';
import { Container } from "#components/container";
import { Header } from "#components/header"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { cartState } from '#recoil/atoms';
import { CartInfo } from '#components/cartinfo';
import { CartDetails } from '#components/cartinfo/summary';

export function Page() {
    const [dineinOrTakeaway, setDineinOrTakeaway] = useState("DINEIN");
    const cart = useRecoilValue(cartState)
    let tableInfo = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("tableInfo") || '{}') : null;

    const onDineinOrTakeaway = (value: string) => {
        setDineinOrTakeaway(value);
        localStorage.setItem("tableInfo", JSON.stringify({ source: tableInfo?.source, table: tableInfo?.table, table_id: tableInfo?.table_id, is_ac: tableInfo?.is_ac, dineinOrTakeaway: value, timeStamp: Date.now() }))
    }

    return (
        <div>
            <Container>
                <Header />
                <div className="md:px-20 px-2 lt-sm:hidden">
                    <div className="h-4"></div>
                    <Breadcrumb className="font-normal text-lg list-none text-breadcrumbs">
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem className='select-none font-normal text-ellipsis text-left break-words line-clamp-1' isCurrentPage>
                            <BreadcrumbLink href={`/cart`}>Cart</BreadcrumbLink>
                            <ol className="p-0 list-none"></ol>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="h-4"></div>
                <div className="hidden md:flex"><h1 className="font-bold text-lg text-custom_black font-manrope px-20 lt-sm:px-2">Cart</h1></div>
                <div className="h-4 sm:hidden"></div>
                {/* {
                    address && <div>
                        Address
                    </div>
                } */}
                {(tableInfo?.table !== null && tableInfo?.table !== undefined) && <div className='md:hidden flex gap-10 items-center px-2 pb-4'>
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

                <div className="flex md:flex-row grow justify-between gap-8 flex-col md:px-20 px-2 pb-2">
                    <CartInfo />
                    {cart?.size > 0 && <CartDetails btnName="PROCEED TO BUY" />}
                </div>
            </Container>
        </div>
    );
}