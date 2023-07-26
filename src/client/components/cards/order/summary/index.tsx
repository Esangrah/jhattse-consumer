
import { OrderItemContainer } from '@components/container';
import { TOrder } from '@components/types';
import { humanizeCurrency, trimToLength } from '@core/utils';
import { getSafeUrl } from '@core/utils';
import moment from 'moment';
import { Link } from 'react-router-dom';
import React from 'react'
import { MdCheckCircle } from 'react-icons/md';
import { MdPayments } from 'react-icons/md';
import { RiShoppingBagFill } from 'react-icons/ri';


type Props = {
    editable?: boolean
    order: TOrder
};


export const OrderSummaryCard = ({ order }: Props) => {


    return (
        // <div className="bg-neutral-50 shadow-md" data-order-id={order?.id} >
        //     <div className="flex flex-row justify-between px-2">
        //         <div>
        //             <span className={`${order.delivery_mode == "Delivery" ? "bg-cyan-500" : "bg-success-500"} text-neutral-50 -ml-2 px-2 py-0.5 rounded-r-md font-semibold text-md`}>{order.delivery_mode}</span>
        //             <span className="text-neutral-400"> from </span>
        //             <Link to={`/store/${order.store.id}/${getSafeUrl(order.store?.name)}`}><span className="text-sky-500 font-semibold text-md">{order.store.name}</span></Link>
        //         </div>
        //         <div className="flex flex-col w-32 text-right">
        //             <span className="text-yellow-600 font-semibold text-md">{order.status}</span>
        //             <span className="text-sm font-semibold text-teal-600">{order.updated_on != null ? `Updated ${moment(order.updated_on).fromNow()}` : moment(order.added_on).fromNow()}</span>
        //         </div>
        //     </div>
        //     <div className="divide-y divide-dashed">
        //         <div className="p-2">
        //             <OrderItemContainer ordersItems={order.orderitems} />
        //         </div>
        //         <div className="flex flex-row justify-between p-2">
        //             <div><span className="text-neutral-500 font-semibold select-none">Total Cost: </span><span className="text-neutral-900 font-semibold text-md">{"₹"}{order.cost}</span></div>
        //             <div><span className="text-neutral-400 select-none">Paid via </span><span className="text-sky-400 font-semibold text-md">{order.payment_mode}</span></div>
        //         </div>
        //     </div>
        // </div>
        <div className="bg-neutral-50 flex flex-col divide-y rounded-md" data-order-id={order?.id}>
            <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <Link to={`/store/${order.store.id}/${getSafeUrl(order.store?.name)}`}><h2 className="text-lg font-semibold text-custom_black">{order.store.name}</h2></Link>
                    {
                        order.delivery_mode == "Delivery" ? <span className="bg-delivery rounded px-2 py-1 text-sm font-bold text-bannerText">DELIVERY</span> :
                            <span className="bg-storepickup rounded px-2 py-1 text-sm font-bold text-bannerText">PICKUP</span>
                    }
                </div>
                <p className="text-base text-custom_gray font-normal">{`${order?.store?.address?.street_name}, ${order?.store?.address?.city?.name}`}</p>
                <div className="flex justify-between items-center">
                    <span className="text-lg text-custom_gray font-bold">{humanizeCurrency(order?.cost)}</span>
                    <p className="text-base text-custom_gray font-medium flex gap-1 items-center"><MdPayments /><span>{order?.payment_mode}</span></p>
                </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
                <h2 className="text-base font-bold text-customGrayTwo">{order.updated_on != null ? `Updated ${moment(order?.updated_on).format("MMMM DD, YYYY | h:mm A")}` : moment(order?.added_on).format("MMMM DD, YYYY | h:mm A")}</h2>
                <div>
                    {order.orderitems?.length > 1 ? <span className="text-base text-custom_gray font-normal">
                        {`${trimToLength(order.orderitems[0]?.inventory?.product?.name, 10)} + ${order.orderitems?.length} items`}
                    </span>
                        : <span className="text-base text-custom_gray font-normal">{trimToLength(order.orderitems[0]?.inventory?.product?.name, 20)}</span>
                    }
                </div>

            </div>
            <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <h2 className="flex gap-1 items-center text-base font-normal text-green-600">{order?.status === "Completed" ? <MdCheckCircle className="text-green-600" /> : <FaShoppingBag className="text-golden" />} <span className="text-custom_gray">Order {order?.status}</span></h2>
                    <button className="text-custom_golden font-bold text-base">REORDER</button>
                </div>
            </div>
        </div>
    )
}

