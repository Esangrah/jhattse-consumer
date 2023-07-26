
import React from "react";
import { OrderItemCard } from "@components/cards";
import { TOrderItem } from "@components/types";



interface Props {
    ordersItems: TOrderItem[];
    element?: React.ElementType;
}

export const OrderItemContainer: React.FC<Props> = ({ ordersItems, element }) => {


    let RepeatElement = element == undefined || element == null ? OrderItemCard : element;
    return (
        <div className="flex flex grid gap-1 rounded-xl">
            {ordersItems && ordersItems.map((orderItem: TOrderItem) => (
                <RepeatElement orderItem={orderItem} key={orderItem.id}></RepeatElement>
            ))}
        </div>
    )
}
