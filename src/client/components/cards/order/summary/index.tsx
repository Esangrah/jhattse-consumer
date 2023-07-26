
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
        <div className="bg-neutral-50 flex flex-col divide-y rounded-md" data-order-id={order?.id}>
            <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <Link to={`/store/${order?.store.id}/${getSafeUrl(order?.store?.name)}`}><h2 className="text-lg font-semibold text-custom_black">{order.store.name}</h2></Link>
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

