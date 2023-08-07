import React, { useState } from 'react';
import { MdOutlineLocationOn} from 'react-icons/md';
import { TCartItem } from '#components/types';
import { CartItemCard } from '#components/cards/cartitem';
import { Link } from '#renderer/Link';
import { getFirst, getLength, getSafeUrl } from '#core/utils';
import { InstructionForm } from '#components/instruction';

interface Props {
    cartItems: TCartItem[]
}

export const StoreCartContainer = ({ cartItems }: Props) => {
    const [instruction, setInstruction] = useState(false);
    const firstCartItem = getFirst(cartItems);
    return (
        (
        getLength(cartItems) > 0) ?
        <div className="divide-y divide-solid">
            {!cartItems[0].deliverable &&
                <div className="">
                    <div className="flex justify-between bg-teal-500 px-2 py-1 rounded-t-lg">
                        <span className="font-semibold text-base text-neutral-50">Pickup From</span>
                        <div className="flex font-semibold text-base text-neutral-50">
                            <span>{firstCartItem?.inventory?.store?.address?.street_name}</span>
                            <p className="text-neutral-50 text-lg font-bold mt-1"><a href={`http://www.google.com/maps/place/${firstCartItem?.inventory?.store?.address?.latitude},${firstCartItem?.inventory?.store?.address?.longitude}`} target="_blank"><MdOutlineLocationOn/></a></p>
                        </div>
                    </div>
                    <div className="flex justify-start items-center bg-neutral-50 px-2 py-1 gap-2">
                        <span className="font-semibold text-sm text-slate-700">Sold by</span>
                        <Link href={`/store/${firstCartItem?.inventory?.store?.id}/${getSafeUrl(getFirst(cartItems)?.inventory?.store?.name)}`}><span className="font-semibold text-sm text-sky-400">{firstCartItem?.inventory?.store?.name}</span></Link>
                    </div>
                </div>
            }
            <div className="divide-y-2 divide-solid">
                {cartItems?.map((cartItem: TCartItem) => (
                    <div key={cartItem?.product?.id} className="shadow-sm">
                        <CartItemCard cartItem={cartItem} showStore={false} />
                    </div>
                ))}
            </div>
            <div className="flex bg-neutral-50 justify-end text-sky-400 font-semibold py-1 px-2"><button onClick={() => { setInstruction(!instruction) }}>{instruction == true ? "Cancel" : "Add instructions"}</button>
            </div>
            {instruction == true ?
                <div className="bg-neutral-50"><InstructionForm /></div> :
                <></>
            }
        </div>
        :
        <></>
    )
}
