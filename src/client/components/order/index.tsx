import { createOrder, getOrders } from "@api/order";
import { OrderSummaryContainer } from "@components/container/ordersummary";
import { TComponent, TCreateOrder, TOrder } from "@components/types";
import { requestLogin } from "@core/utils";
import { addressState, cartState, orderLastIds } from "@recoil/atoms";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BackBar } from "@components";
import { usePageContext } from "@renderer/usePageContext";

interface Props {
    title?: string
    shallCreate: boolean
}

export const OrderPanel: React.FC<Props> = ({ shallCreate, title }) => {
    let [currentOrder, setCurrentOrder] = useState < TCreateOrder > ();
    const [orders, setOrders] = useState < TOrder[] > ([]);
    const [cart, setCart] = useRecoilState(cartState);
    const [lastOrderIds, setLastOrderIds] = useRecoilState(orderLastIds);
    const address = useRecoilValue(addressState);
    const pageContext = usePageContext();

    useEffect(() => {
        if (shallCreate && cart.size > 0) {
            console.log(cart);
            let components = Array < TComponent > ();
            Array.from(cart.values()).map((item) => {
                let x = { inventory_id: item.inventory.id, quantity: item.quantity, is_delivery: item.deliverable } as TComponent;
                components.push(x);
            })
            setCurrentOrder(
                currentOrder = {
                    components: components,
                    address_id: address?.id,
                    payment_mode: "Cash",
                    currency: "INR"
                },
            )
            const res: Promise<TOrder[]> = createOrder(currentOrder);
            res.then((result) => { setOrders(result); setLastOrderIds(result.map((order) => order.id)); setCart(new Map()); }).catch((e) => {
                if (e.response?.status === 401) {
                    requestLogin(pageContext.urlOriginal);
                }
            })
        } else {
            const res: Promise<TOrder[]> = getOrders(null, lastOrderIds);
            res.then((result) => setOrders(result)).catch((e) => {
                if (e.response?.status === 401) {
                    requestLogin(pageContext.urlOriginal);
                }
            })
        }
    }, [])

    return (
        <div>
            <BackBar />
            <OrderSummaryContainer orders={orders} title={title || "Order Summary"} />
        </div>
    )
}