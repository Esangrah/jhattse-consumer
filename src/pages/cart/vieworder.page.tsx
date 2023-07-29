import { useEffect, useState } from 'react'
import { Container } from "@components/container";
import { Header } from "@components/header"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { getOrders } from '@api/order';
import { TOrder } from '@components/types';
import { sanityIoImageLoader, humanizeCurrency, trimToLength, getFirst } from '@core/utils';
import { Image } from "@renderer/Image";;
import moment from 'moment';
import { variantNameFromOrderItem } from '@components/variant/variantSelector';
import { navigate } from 'vite-plugin-ssr/client/router';


const formatTime = (dateString: string) => {
    const date = moment.utc(dateString).local();
    const formattedDate = date.format('D MMMM YYYY, h:mm a');
    return formattedDate;
}

export const Page = () => {
    const [orderDetails, setOrderDetails] = useState<TOrder[]>([]);
    const transaction_id = typeof window !== 'undefined' ? localStorage.getItem("transaction_id") : null;
    

    useEffect(() => {

        if (transaction_id !== null) {
            const result: Promise<TOrder[]> = getOrders([], [], transaction_id);
            result.then((res: TOrder[]) => {
                setOrderDetails(res);
            })
        }
    }, [transaction_id])

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
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/cart'>Cart</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem className='select-none font-normal text-ellipsis text-left break-words line-clamp-1' isCurrentPage>
                            <BreadcrumbLink href={`/cart/vieworder`}>View Order</BreadcrumbLink>
                            <ol className="p-0 list-none"></ol>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="h-4"></div>
                <>
                    {orderDetails?.map((order: TOrder) => {
                        return (
                            <div key={order?.id} className='px-20 sm:px-4 font-manrope flex flex-col grow justify-between'>
                                <div>
                                    <div className='flex flex-col gap-2'>
                                        <div><h1 className="font-bold text-lg text-custom_black font-manrope 
                sm:text-base">Order #{order?.short_id}</h1></div>
                                        <div><h1 className="font-bold text-lg text-custom_black font-manrope 
                sm:text-base">{order?.store?.name}</h1></div>
                                        <div><p className='text-sm text-darkGray font-normal'>{order?.store?.address?.house_number},{order?.store?.address?.street_name}</p></div>
                                    </div>
                                    <div className='h-4'></div>
                                    <div>
                                        <p className='text-sm text-customGray font-semibold'>{order?.added_on !== undefined && formatTime(order?.added_on)}</p>
                                    </div>
                                    <div className="h-10"></div>
                                    <h2 className="font-bold text-base sm:text-sm text-custom_black pb-4">Order Details</h2>

                                    <div className='flex flex-col gap-4 divide-y'>
                                        <div className='flex flex-col gap-2'>
                                            {
                                                order?.orderitems?.map((orderItem) => {
                                                    return <div className='w-full flex justify-between items-center'>
                                                        <div className='flex gap-2 items-center text-bannerText font-medium'>
                                                            <Image
                                                                loader={sanityIoImageLoader}
                                                                src={getFirst(orderItem?.inventory?.product?.images)?.url || "https://jhattse.com/assets/noimage.png"}
                                                                alt={orderItem?.inventory?.product?.name || 'order item'}
                                                                width="50"
                                                                height="50"
                                                                className="rounded-sm"
                                                            />
                                                            <div className='flex items-center gap-2'>
                                                                <p className="text-ellipsis text-left break-words line-clamp-1 sm:text-sm text-bannerText">{trimToLength(variantNameFromOrderItem(getFirst(orderDetails)), 20)}</p>
                                                                <span>{` x ${orderItem?.quantity}`}</span>
                                                            </div>
                                                        </div>
                                                        <div className="px-0">
                                                            <p className="text-custom_black">{humanizeCurrency(orderItem?.price)}</p>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div>
                                            <div className='flex items-center justify-between py-2'>
                                                <span><p className='text-sm text-bannerText font-medium'>Order Total</p></span>
                                                <span><p className='text-sm text-custom_black font-medium'>{humanizeCurrency(order?.cost)}</p></span>
                                            </div>
                                            {order?.tax !== undefined && order?.tax > 0 &&
                                                <div className='flex items-center justify-between py-2'>
                                                    <span><p className='text-sm text-bannerText font-medium'>GST</p></span>
                                                    <span><p className='text-sm text-custom_black font-medium'>{order?.tax?.toFixed(2)}</p></span>
                                                </div>
                                            }
                                            {order?.service_charge !== undefined && order?.service_charge > 0 &&
                                                <div className='flex items-center justify-between py-2'>
                                                    <span><p className='text-sm text-bannerText font-medium'>Service Charge</p></span>
                                                    <span><p className='text-sm text-custom_black font-medium'>{order?.service_charge?.toFixed(2)}</p></span>
                                                </div>
                                            }
                                        </div>
                                        <div>
                                            <div className='flex items-center justify-between py-2'>
                                                <span><p className='text-sm text-bannerText font-bold'>Total</p></span>
                                                <span><p className='text-sm text-custom_black'>{humanizeCurrency(order?.payable)}</p></span>
                                            </div>
                                            <p className='text-sm text-secondaryCustomGray font-medium'>Paid through {order?.payment_mode}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full py-4'>
                                    <button className='bg-store_yellow font-manrope border-yellow-300 font-bold sm:text-sm text-neutral-900 sm:px-1 px-2 py-2 rounded w-full' onClick={() => { navigate(`/order/${order?.id}`); }}>VIEW BILL</button>
                                </div>
                            </div>

                        )
                    })}
                </>

            </Container>
        </div>
    )
}