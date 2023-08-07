
import { TScreenInfo } from "#components/types";
import { getOrders, getPaymentStatus } from '#api/order';
import { TOrder } from '#components/types';
import { getFirst, getLength, sanityIoImageLoader } from '#core/utils';
import { Helmet } from 'react-helmet-async';
import { Image } from "#renderer/Image";;
import React, { useEffect, useState } from 'react'
import { variantNameFromOrderItem } from "#components/variant/variantSelector";
import { navigate } from 'vite-plugin-ssr/client/router';
import { OrderItemWidget } from "#components/widget/orderitems";
import { useRecoilValue } from "recoil";
import { cartState } from "#recoil/atoms/cart";



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
    const transaction_id = typeof window !== 'undefined' ? localStorage.getItem("transaction_id") : null;
    const cart = useRecoilValue(cartState)
    const cartValues = Array.from(cart.values());

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
            <Helmet>
                <meta name="robots" content="noindex,nofollow" />
            </Helmet>
            <div className='w-full grow flex flex-col gap-10 font-manrope md:px-20 md:py-10 px-4'>
                <div className='flex justify-center md:p-3 px-0 py-0 w-full rounded-lg bg-error-100'>
                    <div className='lt-sm:hidden flex justify-center p-3'>
                        <Image
                            loader={sanityIoImageLoader}
                            priority={"true"}
                            className='object-contain w-full h-full'
                            src={image_url}
                            alt={'payment_successful.png'}
                            width='200'
                            height='100'
                        />
                    </div>
                    <div className='flex flex-col w-full p-4 gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className="flex flex-row items-center justify-between">
                                <div className="flex flex-row items-center gap-4">
                                    <div>
                                        <h2 className='text-2xl lt-sm:text-lg font-bold text-custom_black lt-sm:py-2'>{message}</h2>
                                    </div>
                                    <div className='flex flex-col gap-2 items-center'>
                                        <p>
                                            {icon}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <button className='w-full bg-brand-500 text-neutral-50 px-8 py-2 text-base font-bold font-manrope whitespace-nowrap rounded-lg' onClick={() => navigate(`${next}`)}>
                                        {actionText}
                                    </button>
                                </div>
                            </div>
                            <span>
                                <p className="text-lg text-darkGray lt-sm:text-sm">
                                    {`Your order for ${getLength(orderDetails[0]?.orderitems) > 0 && variantNameFromOrderItem(getFirst(orderDetails[0]?.orderitems))}
                                        ${getLength(orderDetails[0]?.orderitems) > 1 ? "+" : ""}
                                        ${getLength(orderDetails[0]?.orderitems) > 1 ? (getLength(orderDetails[0]?.orderitems) - 1).toString() + "items" : ""}`}
                                </p>
                                <p className="text-lg text-darkGray lt-sm:text-sm">{order_info}</p>

                            </span>
                        </div>
                    </div>
                </div>
                <OrderItemWidget cartValues={cartValues} title="Order Items" classes="grayscale" />
            </div>
        </div>
    )
};
