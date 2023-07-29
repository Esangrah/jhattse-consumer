
import { TScreenInfo } from "@components/types";
import { getOrders, getPaymentStatus } from '@api/order';
import { TOrder } from '@components/types';
import { getFirst, getLength, sanityIoImageLoader } from '@core/utils';
import Head from 'react-helmet';
import { Image } from "@renderer/Image";;
import React, { useEffect, useState } from 'react'
import { variantNameFromOrderItem } from "@components/variant/variantSelector";
import { navigate } from 'vite-plugin-ssr/client/router';



interface Props extends TScreenInfo {
    actionText: string;
    message: string;
    next?: string;
    image_url?: string;
    order_info?: string;
    icon?: React.ReactNode
}

export const PaymentStatus: React.FC<Props> = ({ actionText, message, next, image_url, order_info, icon }: Props) => {
    const [orderDetails, setOrderDetails] = useState<TOrder[]>([]);
    const payment_id = typeof window !== 'undefined' ? localStorage.getItem("payment_id") : null;
    const transaction_id = typeof window !== 'undefined' ? localStorage.getItem("transaction_id") : null
    ;

    const getOrderPaymentStatus = async (id: string) => {
        getOrders([], [], id).then((result: TOrder[]) => {
            setOrderDetails(result);
            console.log(result)
        })
    }

    useEffect(() => {
        if (payment_id !== null) {
            getPaymentStatus(payment_id).then((result: TOrder) => {
                if (result?.id !== undefined && result?.id?.length > 0) {
                    getOrderPaymentStatus(result?.id)
                    localStorage.setItem("transaction_id", result?.id)
                }
            })
        } else if (transaction_id !== null) {
            getOrderPaymentStatus(transaction_id)
        }
    }, [payment_id])

    return (
        <div className="flex flex-col grow">
            <Head>
                <meta name="robots" content="noindex,nofollow" />
            </Head>
            <div className='w-full h-full grow flex flex-col justify-center items-center font-manrope px-20 sm:px-0'>
                <div className='flex w-full justify-center sm:grow'>
                    <div className='sm:hidden flex flex-1 justify-center p-3'>
                        <Image
                            loader={sanityIoImageLoader}
                            priority={"true"}
                            className='object-cover h-full'
                            src={image_url}
                            alt={'payment_successful.png'}
                            width='400'
                            height='200'
                        />
                    </div>
                    <div className='flex flex-1 justify-center p-3 sm:px-0 sm:py-0'>
                        <div className='bg-neutral-50 flex flex-col w-2/3 sm:w-full justify-around sm:justify-between items-center p-4 rounded-md gap-2 sm:bg-neutral-100'>
                            <div className='flex flex-col gap-8 sm:gap-2 items-center text-center sm:grow sm:justify-center'>
                                <div className='flex flex-col gap-2 items-center pb-8'>
                                    <p>
                                        {icon}
                                    </p>
                                </div>
                                <h2 className='text-2xl sm:text-lg font-bold text-custom_black sm:py-2'>{message}</h2>
                                <span>

                                    <p className="text-lg text-darkGray sm:text-sm">
                                        {`Your order for ${getLength(orderDetails[0]?.orderitems) > 0 && variantNameFromOrderItem(getFirst(orderDetails[0]?.orderitems))} 
                                            ${getLength(orderDetails[0]?.orderitems) > 1 ? "+" : ""} 
                                            ${getLength(orderDetails[0]?.orderitems) > 1 ? (getLength(orderDetails[0]?.orderitems) - 1).toString() + "items" : ""}`}
                                    </p>
                                    <p className="text-lg text-darkGray sm:text-sm">{order_info}</p>

                                </span>
                            </div>
                            <button className='w-full bg-store_yellow border-yellow-300 text-custom_black rounded-sm p-2 text-base sm:text-sm font-bold whitespace-nowrap' onClick={() => navigate(`${next}`)}>
                                {actionText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
