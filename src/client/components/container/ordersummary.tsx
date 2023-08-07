import { OrderSummaryCard } from "#components/cards/order/summary";
import { TOrder } from "#components/types";
import React from "react";

interface Props {
    orders: TOrder[];
    title?: string,
    element?: React.ElementType;
}

export const OrderSummaryContainer = ({ orders, element, title }: Props) => {

    let RepeatElement = element == undefined || element == null ? OrderSummaryCard : element;
    return (
        <div className="flex flex-col gap-1 rounded-t-xl">
            {title && <div className="p-2 bg-neutral-800 text-neutral-50 font-semibold text-lg rounded-t-xl">{title}</div>}
            <div className="grid grid-cols-2 lt-sm:grid-cols-1 gap-4">
                {orders && orders.map((order: TOrder) => (
                    <RepeatElement order={order} key={order.id}></RepeatElement>
                ))}
            </div>
        </div>
    )
}