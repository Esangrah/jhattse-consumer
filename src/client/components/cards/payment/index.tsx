import { useState } from "react";
import { message } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { BsCheckSquare, BsCheckSquareFill } from "react-icons/bs";
import { deleteStorePayment } from "@api/payment";
import { TPaymentMethod } from "@components/types";


type Props = {
    payment: TPaymentMethod;
};


export const PaymentCard = ({ payment }: Props) => {
    const [isShown, setIsShown] = useState(true);

    const handleDelete = (payment: TPaymentMethod) => {
        deleteStorePayment(payment.id).then((result) => {
            setIsShown(false);
            message.success("Deleted Payment method", 2);
        }).catch(() => {
            message.error("Error while deleting payment method", 2);
        })
    }

    return (
        isShown &&
        <div className="bg-neutral-50 p-2 w-full">
            <div className="grid grid-cols-5">
                <div className="col-span-1 overflow-hidden"><span className="text-md sm:text-sm text-neutral-900 font-semibold">{payment.is_upi ? "UPI" : payment.bank_name}</span></div>
                <div className="col-span-1 overflow-hidden"><span className="text-md sm:text-sm text-neutral-900">{payment.is_upi ? "UPI" : payment.ifsc}</span></div>
                <div className="col-span-2 overflow-hidden px-2 text-right"><span className="text-md sm:text-sm text-neutral-900">{payment.is_upi ? payment.upi : payment.account_number}</span></div>
                <div className="col-span-1 flex flex-row justify-between items-center"><span className="text-neutral-900">{payment.is_upi ? <BsCheckSquareFill /> : <BsCheckSquare />}</span><span className="text-neutral-900" onClick={() => handleDelete(payment)}><AiFillDelete>Delete</AiFillDelete></span></div>
            </div>
        </div>
    )
}
