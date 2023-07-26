import React from "react";
import { PaymentCard } from "@components/cards";
import { TPaymentMethod } from "@components/types";


interface Props {
    payments: TPaymentMethod[],
    element?: React.ElementType;

}

export const PaymentContainer: React.FC<Props> = ({ element, payments }: Props) => {
    let RepeatElement = element == undefined || element == null ? PaymentCard : element;
    return (
        <div className="flex flex grid gap-4 rounded-xl ">
            {payments && payments.map((payment: TPaymentMethod) => (
                <RepeatElement payment={payment} ></RepeatElement>
            ))}
        </div>
    )
}