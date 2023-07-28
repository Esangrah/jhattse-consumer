import React from 'react'
import { Container } from "@components/container";
import { Header } from "@components/header";
import { CartDetails } from '@components/cartinfo/summary';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import AddressPanel from '@components/address';
import { cartState } from '@recoil/atoms';
import { useRecoilValue } from 'recoil';
import { Image } from "@renderer/image";;
import { getImageUrl, humanizeCurrency, sanityIoImageLoader, trimToLength } from '@core/utils';
import { navigate } from 'vite-plugin-ssr/client/router';

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
            <div className="px-20 sm:px-2 sm:hidden">
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
            <div><h1 className="font-bold text-lg text-custom_black font-manrope px-20 sm:px-4 sm:text-base">Select Delivery Address</h1></div>
            <div className="h-4"></div>
            <div className="flex flex-row grow h-full justify-between gap-4 sm:flex-col px-20 sm:px-0">
                <div className="flex flex-col gap-1 w-full">
                    <AddressPanel isDone={() => { }} />
                </div>
                <div className="sm:sticky sm:z-40 flex flex-col gap-4" style={{ bottom: "20px" }}>
                    <div className="flex flex-col gap-2 sm:hidden">
                        <h2 className="font-bold text-custom_black text-lg pb-1 pt-1">Order Summary</h2>
                        {
                            cartValues.map((item => {
                                return <div className="bg-neutral-50 rounded-md text-custom_black p-2 flex gap-2  w-96 items-center justify-between">
                                    <div className='flex gap-2 items-center'>
                                        <Image
                                            loader={sanityIoImageLoader}
                                            src={getImageUrl(item.product?.images)}
                                            alt={item?.product?.name}
                                            height="50"
                                            width="50"
                                            className="rounded-sm"
                                        />
                                        <div >
                                            <h4 className="text-base font-medium text-custom_black">{getCombinedName(item?.product, item?.inventory?.variant_id) ? trimToLength(getCombinedName(item?.product, item?.inventory?.variant_id), 20) :
                                                trimToLength(item?.product?.name, 20)}</h4>
                                            <p className="text-base font-bold text-custom_black">{humanizeCurrency(item?.inventory?.price || item?.product.mrp)}</p>
                                        </div>
                                    </div>
                                    <div className="pt-1" style={{ alignSelf: "flex-start" }}>
                                        {
                                            item?.deliverable ? <span className="bg-delivery rounded px-2 py-1 text-sm font-bold text-bannerText">DELIVERY</span> :
                                                <span className="bg-storepickup rounded px-2 py-1 text-sm font-bold text-bannerText">PICKUP</span>
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