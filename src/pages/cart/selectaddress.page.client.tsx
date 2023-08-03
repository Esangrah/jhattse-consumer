import React from 'react'
import { Container } from "@components/container";
import { Header } from "@components/header";
import { CartDetails } from '@components/cartinfo/summary';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import AddressPanel from '@components/address';
import { cartState } from '@recoil/atoms';
import { useRecoilValue } from 'recoil';
import { Image } from "@renderer/Image";;
import { getImageUrl, humanizeCurrency, sanityIoImageLoader, trimToLength } from '@core/utils';
import { navigate } from 'vite-plugin-ssr/client/router';
import { getCombinedName } from '@components/variant/variantSelector';
import { TProduct } from '@components/types';

interface Props {
    title?: string
    isDone: Function
}

export const Page: React.FC<Props> = ({ isDone, title }) => {
    const cart = useRecoilValue(cartState)
    const cartValues = Array.from(cart.values());
    

    const onProceed = () => {
        navigate('/cart/paymentmethod');
    }
    return (
        <Container>
            <Header />
            <div className="px-20 lt-sm:px-2 lt-sm:hidden">
                <div className="h-4"></div>
                <Breadcrumb className="font-normal text-lg list-none text-breadcrumbs">
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/cart'>Cart</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem className='select-none font-normal text-ellipsis text-left break-words line-clamp-1' isCurrentPage>
                        <BreadcrumbLink href={`/cart/selectaddress`}>Select Address</BreadcrumbLink>
                        <ol className="p-0 list-none"></ol>
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="h-4"></div>
            <div><h1 className="font-bold text-lg text-custom_black font-manrope px-20 lt-sm:px-4 lt-sm:text-base">Select Delivery Address</h1></div>
            <div className="h-4"></div>
            <div className="flex flex-row grow h-full justify-between gap-8 lt-sm:flex-col px-20 lt-sm:px-0">
                <div className="flex flex-col w-full">
                    <AddressPanel isDone={() => { }} />
                </div>
                <div className="lt-sm:sticky lt-sm:z-40 flex flex-col gap-4" style={{ bottom: "20px" }}>
                    <div className="flex flex-col gap-2 lt-sm:hidden px-4">
                        <h2 className="font-bold text-custom_black text-lg pb-1 pt-1">Order Summary</h2>
                        {
                            cartValues.map((item => {
                                return <div className="bg-neutral-100 border border-neutral-300 rounded-lg p-2 flex gap-2 w-96 items-center justify-between h-20 font-manrope">
                                    <div className='flex gap-2 items-center'>
                                        <Image
                                            loader={sanityIoImageLoader}
                                            src={getImageUrl(item.product?.images || [])}
                                            alt={item?.product?.name || 'product'}
                                            height="150"
                                            width="150"
                                            className="rounded-sm h-16 w-16"
                                        />
                                        <div >
                                            <h4 className="text-base font-bold text-neutral-600">{trimToLength(getCombinedName(item?.product as TProduct, item?.inventory?.variant_id), 20)}</h4>
                                            <p className="text-lg font-medium text-neutral-700">{humanizeCurrency(item?.inventory?.price || item?.product?.mrp as number)}</p>
                                        </div>
                                    </div>
                                    <div className="pt-1" style={{ alignSelf: "flex-start" }}>
                                        {
                                            item?.deliverable ? <span className="bg-business-100 rounded px-2 py-1 text-sm font-bold text-bannerText">DELIVERY</span> :
                                                <span className="bg-customer-100 rounded px-2 py-1 text-sm font-bold text-bannerText">PICKUP</span>
                                        }
                                    </div>
                                </div>
                            }))
                        }
                    </div>
                    <div className="px-4">
                        <CartDetails isHidden={true} actionFun={onProceed} btnName="PROCEED" />
                    </div>
                </div>
            </div>
        </Container>

    );
}