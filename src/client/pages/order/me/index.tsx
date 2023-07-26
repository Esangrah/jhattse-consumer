import { useEffect, useState } from "react";
import { getOrders } from "@api/order";
import { OrderSummaryContainer } from "@components/container"
import { OrderStatus } from "@components/contants";
import { BackBar } from "@components/index";
import { TOrder } from "@components/types";
import { requestLogin } from "@core/utils";
import { FaBox } from "react-icons/fa";
import { useLocation } from "react-router-dom";


const MyOrders = () => {
    const [currentorders, setCurrentOrders] = useState<TOrder[]>();
    const [pastorders, setPastOrders] = useState<TOrder[]>();
    const location = useLocation()

    useEffect(() => {
        const res: Promise<TOrder[]> = getOrders([OrderStatus.CREATED, OrderStatus.PROCESSING]);
        res.then((result) => setCurrentOrders(result)).catch((e) => {
            if (e.response?.status === 401) {
                requestLogin(location.pathname);
            }
        })
    }, [])

    useEffect(() => {
        const res: Promise<TOrder[]> = getOrders([OrderStatus.COMPLETED, OrderStatus.CANCELLED]);
        res.then((result) => setPastOrders(result)).catch((e) => {
            if (e.response?.status === 401) {
                requestLogin(location.pathname);
            }
        })
    }, [])


    return (
        <>
            <BackBar />
            <div className="grid gap-6 py-2 px-20 sm:px-4">
                {currentorders?.length == 0 && pastorders?.length == 0 ?
                    <div className="flex justify-center animate-pulse duration-1000 p-3 h-full  w-full sm:w-full">
                        <div>
                            <FaBox
                                className="h-52 w-full font-normal"
                            />
                            <div>
                                <h3 className="flex justify-center text-2xl">No orders right now. Start shopping</h3>
                                {/* <p className="flex justify-center text-2xl text-neutral-900">Looks like you have not added anything to your cart.</p> */}
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        {currentorders?.length == 0 ?
                            <></>
                            :
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-custom_black py-4 font-manrope">Current Orders</h2>
                                <OrderSummaryContainer orders={currentorders} />
                            </div>
                        }
                        {pastorders?.length == 0 ?
                            <></>
                            :
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-custom_black py-4 font-manrope">Past Orders</h2>
                                <OrderSummaryContainer orders={pastorders} />
                            </div>
                        }
                    </div>
                }
            </div>

        </>
    )
}

export default MyOrders;