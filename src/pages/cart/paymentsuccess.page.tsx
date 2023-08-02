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
import { useRecoilState } from 'recoil';

export const Page = () => {
    const orderId = typeof window !== "undefined" && localStorage.getItem("orderId");
    const [orderDetails, setOrderDetails] = useState<TOrder>();
    const [cart, setCart] = useRecoilState(cartState);


    useEffect(() => {
        getOrderById(orderId || '').then((res) => {
            setOrderDetails(res);
            console.log("payment", res);
        })
        // setCart((cart) => {
        //     cart?.clear();
        //     return new Map(cart);
        // });

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
            <div className='w-full h-full grow flex flex-col justify-center items-center font-manrope px-20 lt-sm:px-0'>
                <div className='flex w-full justify-center lt-sm:grow'>
                    <div className='lt-sm:hidden flex flex-1 justify-center p-3'>
                        <Image
                            loader={sanityIoImageLoader}
                            priority={"true"}
                            className='object-cover h-full'
                            src='https://jhattse.com/public/assets/payment_successful.png'
                            alt={'payment_successful.png'}
                            width='400'
                            height='200'
                        />
                    </div>
                    <div className='flex flex-1 justify-center p-3 lt-sm:px-0 lt-sm:py-0'>
                        <div className='bg-neutral-50 flex flex-col w-2/3 lt-sm:w-full justify-around lt-sm:justify-between items-center p-4 rounded-md gap-2 lt-sm:bg-neutral-100'>
                            <div className='flex flex-col gap-8 lt-sm:gap-2 items-center text-center lt-sm:grow lt-sm:justify-center'>
                                <div className='flex flex-col gap-2 items-center pb-8'>
                                    <p className='text-6xl text-green-500 '>
                                        <MdCheckCircle size={30} />
                                    </p>
                                </div>
                                <h2 className='text-2xl lt-sm:text-lg font-bold text-custom_black lt-sm:py-2'>{orderDetails?.payment_mode === "Cash" ? "Please pay at the counter" : "Payment Successful!"}</h2>
                                <span>
                                    <p className="text-lg text-darkGray lt-sm:text-sm">
                                        {`Your order for ${(orderDetails?.orderitems || [])[0]?.inventory?.product?.name} 
                                    ${getLength(orderDetails?.orderitems) > 1 ? "+" : ""} 
                                    ${getLength(orderDetails?.orderitems) > 1 ? `${getLength(orderDetails?.orderitems) - 1} items` : ""}`}
                                    </p>
                                    <p className="text-lg text-darkGray lt-sm:text-sm">has been placed</p>
                                </span>
                            </div>
                            <button className='w-full bg-store_yellow border-yellow-300 text-custom_black rounded-sm p-2 text-base lt-sm:text-sm font-bold whitespace-nowrap' onClick={() => onViewOrder()}>
                                VIEW ORDER
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}