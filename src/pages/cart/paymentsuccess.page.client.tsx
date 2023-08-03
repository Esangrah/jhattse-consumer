import { getOrderById } from '@api/order';
import { Container } from '@components/container';
import { Header } from '@components/header';
import { TOrder } from '@components/types';
import { getLength, sanityIoImageLoader } from '@core/utils';
import Head from 'react-helmet';
import { Image } from "@renderer/Image";;
import { useEffect, useState } from 'react'
import { MdCheckCircle } from 'react-icons/md';
import { navigate } from 'vite-plugin-ssr/client/router';
import { cartState } from '@recoil/atoms';
import { useRecoilValue } from 'recoil';
import { OrderItemWidget } from '@components/widget/orderitems';

export const Page = () => {
    const orderId = typeof window !== "undefined" && localStorage.getItem("orderId");
    const [orderDetails, setOrderDetails] = useState<TOrder>();
    const cart = useRecoilValue(cartState)
    const cartValues = Array.from(cart.values());
   


    useEffect(() => {
        getOrderById(orderId || '').then((res) => {
            setOrderDetails(res);
            console.log("payment", res);
        })
    }, [])


    const onViewOrder = () => {
        navigate('/cart/vieworder')
    }


    return (
        <Container>
            <Head>
                <meta name="robots" content="noindex,nofollow" />
            </Head>
            <Header />
            <div className='w-full grow flex flex-col gap-10 font-manrope md:px-20 md:py-10 px-4'>
                <div className='flex justify-center md:p-3 px-0 py-0 w-full rounded-lg bg-business-100'>
                    <div className='lt-sm:hidden flex justify-center p-3'>
                        <Image
                            loader={sanityIoImageLoader}
                            priority={"true"}
                            className='object-contain w-full h-full'
                            src='https://jhattse.com/public/assets/payment_successful.png'
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
                                        <h2 className='text-2xl lt-sm:text-lg font-bold text-custom_black lt-sm:py-2'>{orderDetails?.payment_mode === "Cash" ? "Please pay at the counter" : "Payment Successful!"}</h2>
                                    </div>
                                    <div className='flex flex-col gap-2 items-center'>
                                        <p className='text-6xl text-green-500 '>
                                            <MdCheckCircle size={30} />
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <button className='w-full bg-brand-500 text-neutral-50 px-8 py-2 text-base font-bold font-manrope whitespace-nowrap rounded-lg' onClick={() => onViewOrder()}>
                                        VIEW ORDER
                                    </button>
                                </div>
                            </div>
                            <span>
                                <p className="text-lg text-darkGray lt-sm:text-sm">
                                {`Your order for ${(orderDetails?.orderitems || [])[0]?.inventory?.product?.name} 
                                    ${getLength(orderDetails?.orderitems) > 1 ? "+" : ""} 
                                    ${getLength(orderDetails?.orderitems) > 1 ? `${getLength(orderDetails?.orderitems) - 1} items` : ""}`}
                                </p>
                                <p className="text-lg text-darkGray lt-sm:text-sm">has been placed</p>
                            </span>
                        </div>
                    </div>
                </div>
                <OrderItemWidget cartValues={cartValues} title="Order Items" />
            </div>
        </Container>
    )
}