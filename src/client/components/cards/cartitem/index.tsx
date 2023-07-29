import React from 'react';
import { Image } from "@renderer/Image";;
import { Link } from '@renderer/Link';
import { TCartItem } from '@components/types';
import { getImageUrl, getSafeUrl, sanityIoImageLoader } from '@core/utils';
import { Star } from '@components/star';


interface Props {
    cartItem: TCartItem;
    showStore: boolean;
};


export const CartItemCard = ({ cartItem, showStore }: Props) => {
    return (
        <div key={cartItem?.product?.id} className="grid bg-neutral-50 p-2 gap-2 grid-cols-3">
            <div className="relative flex col-span-1">
                <div className="flex justify-center items-center w-full max-h-36">
                    <Link href={`/product/${cartItem?.product?.id}/${getSafeUrl(cartItem?.product?.name)}`}>
                        <Image
                            loader={sanityIoImageLoader}
                            src={getImageUrl(cartItem?.product?.images || [])}
                            alt={cartItem?.product?.name || 'Cart Item'}
                            height="150"
                            width="150"
                            className="w-full h-full object-cover max-h-36"
                        />
                    </Link>
                </div>
                <div className="absolute grid mx-2 bottom-0 grid-row grid-flow-col">
                    {cartItem?.product?.stats?.rating_overall ?
                        <Star rating={cartItem?.product?.stats?.rating_overall} />
                        :
                        <></>
                    }
                </div>
            </div>
            <div className="col-span-2">
                <Link href={`/product/${cartItem?.product?.id}/${getSafeUrl(cartItem?.product?.name)}`}>
                    <p className="text-neutral-900 font-semibold text-base line-clamp-2">{cartItem?.product?.name}</p>
                </Link>
                {showStore && <p className="text-slate-500">Sold by <Link href={`/store/${cartItem?.inventory?.store?.id}`}><span className="text-sky-500">{cartItem?.inventory?.store?.name}</span></Link></p>}
                <div>
                    <p className="text-slate-500 text-sm">Qty: <span className="text-neutral-900 font-semibold">{cartItem.quantity}</span></p>
                </div>
                <div>
                    <p className="text-slate-500 text-sm">Price ₹ <span className="text-neutral-900 font-semibold">{cartItem.inventory.price || cartItem?.product?.mrp}</span></p>
                </div>
            </div>
        </div>
    )
}

