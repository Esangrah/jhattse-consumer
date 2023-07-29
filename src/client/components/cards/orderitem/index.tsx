
import React from 'react'
import { Image } from "@renderer/Image";
import { TOrderItem } from '@components/types';
import { getImageObject, sanityIoImageLoader } from '@core/utils';


interface Props {
    orderItem: TOrderItem
};


export const OrderItemCard = ({ orderItem }: Props) => {


    return (
        <div className="grid grid-cols-6 sm:grid-cols-5 gap-2 bg-neutral-50" >
            <div className="flex grow col-span-1 justify-start max-h-20 sm:max-h-16" >
                <Image
                    loader={sanityIoImageLoader}
                    src={getImageObject(orderItem?.inventory?.product?.images)?.url}
                    alt={getImageObject(orderItem?.inventory?.product?.images)?.description || orderItem?.inventory?.product?.name || 'Product'}                        
                    width="100"
                    height="100"
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="grid col-span-4 grid-row">
                <div className="flex flex-row gap-1">
                    <span className="font-semibold text-sm sm:line-clamp-2 lg:line-clamp-2">{orderItem?.inventory?.product?.name}</span>
                    <span className="text-neutral-400 text-sm ">{" x "}</span>
                    <span className="text-green-400 text-sm font-bold whitespace-nowrap">{orderItem.quantity}</span>
                </div>
                <div><span className="text-slate-500 font-semibold text-sm">{"Total Price: "}</span><span className="text-neutral-900 text-sm font-semibold"> ₹ {orderItem.total_cost} </span></div>
            </div>
        </div>
    )
}