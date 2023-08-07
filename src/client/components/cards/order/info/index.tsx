import React from 'react'
import { useRecoilValue } from 'recoil';
import { cartDetailsState } from '#recoil/atoms';



export const OrderInfoCard = () => {
    const { discountedTotal, savings, sortedStores } = useRecoilValue(cartDetailsState);

    return (
        <div className="bg-neutral-50 p-3 lt-sm:w-full">
            <div className="flex justify-between">
                <div className="">
                    <div><p className="text-neutral-500">Total: ₹ <span className="text-neutral-900 text-lg font-bold">{discountedTotal}</span></p></div>
                    <div><p className="text-green-500 font-semibold">Savings: ₹ <span className="text-green-500"> {savings}</span></p></div>
                </div>
            </div>
            <div><p className="text-neutral-500">Paying To:<span className="text-neutral-900 font-semibold"> {sortedStores[0]} {" "}</span>{(sortedStores.length > 1) && <><span>and </span><span className="text-neutral-900 font-semibold inline">{`+${sortedStores.length - 1} Other${sortedStores.length > 2 ? "s" : ""}`}</span></>}</p></div>
        </div>
    )
}
