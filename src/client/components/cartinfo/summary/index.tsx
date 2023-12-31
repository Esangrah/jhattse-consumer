import React from 'react';
import { useRecoilValue } from 'recoil';
import { cartDetailsState, cartState, isLoggedIn } from '@recoil/atoms';
import { humanizeCurrency } from '@core/utils';
import { TOrder } from '@components/types';
import { navigate } from 'vite-plugin-ssr/client/router';

type Props = {
    placeOrder?: string;
    btnName?: string;
    actionFun?: Function;
    isHidden?: boolean;
    isShowTaxes?: boolean;
    orderDetails?: TOrder[];
}

export const CartDetails = ({ placeOrder = '/cart/paymentmethod', btnName, actionFun, isHidden = false, isShowTaxes = false, orderDetails }: Props) => {
    const { discountedTotal, savings } = useRecoilValue(cartDetailsState);
    const cart = useRecoilValue(cartState)
    const cartValues = Array.from(cart.values());
    const hasDeliveryItem = cartValues.some(item => item.deliverable);
    const totalTax = cartValues.reduce((prevTax, currentTax) => prevTax + (currentTax?.inventory?.tax_exclusive ? (((currentTax?.inventory?.price || 0) * (currentTax.inventory?.tax_rate || 0)) / 100 * currentTax.quantity) : (((currentTax.inventory?.tax_rate || 0) * ((currentTax?.inventory?.price || 0) / (1 + (currentTax.inventory?.tax_rate || 0) / 100))) / 100 * currentTax.quantity)), 0)
    let tableInfo = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("tableInfo") || '{}') : null;
    const retryDiscountedTotal = orderDetails !== undefined ? orderDetails?.reduce((prevTotal, current) => prevTotal + (current?.payable || 0), 0) : 0;
    const retryTotalTax = orderDetails !== undefined ? orderDetails?.reduce((prevTax, currentTax) => prevTax + (currentTax?.tax || 0), 0): 0;
    const retryTotal = retryDiscountedTotal + retryTotalTax;




    const goToOrderPage = () => {
        if (tableInfo?.table !== null && tableInfo?.table !== undefined || !hasDeliveryItem) {
            navigate(placeOrder);
        } else {
            isLoggedIn ? navigate("/cart/selectaddress") : navigate("/login")
        }

    }

    return <div className="flex flex-col relative lt-sm:grow md:w-96 w-full font-manrope">

        {
            <div className={`flex flex-col gap-2 w-full lt-sm:grow sticky top-5 ${isHidden ? "lt-sm:justify-end" : "lt-sm:justify-between"}`}>
                <div className={`bg-neutral-100 border border-neutral-300 px-3 py-4 lt-sm:w-full rounded-lg ${isHidden && "lt-sm:hidden"}`}>
                    <div className="flex flex-col gap-2 justify-between divide-y">
                        <span><p className="font-bold text-custom_black text-lg">Order Total</p></span>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row justify-between pt-2 gap-2">
                                <span className="text-base font-medium text-custom_gray">Price</span>
                                <span className="text-base font-medium text-custom_black">{cart?.size == 0 ? humanizeCurrency(retryDiscountedTotal) : humanizeCurrency(discountedTotal)}</span>
                            </div>
                            {savings > 0 && <div className="flex flex-row justify-between gap-2">
                                <span className="text-green-500 font-semibold">Savings</span>
                                <span className="text-green-500"> {humanizeCurrency(savings)}</span>
                            </div>}
                            {isShowTaxes && <div className="flex flex-row justify-between gap-2">
                                <span className="text-base font-medium text-custom_gray">Total Tax (CGST + SGST) </span>
                                <span className="text-base font-medium text-custom_black">{cart?.size == 0 ? humanizeCurrency(retryTotalTax) : humanizeCurrency(totalTax)}</span>
                            </div>}
                        </div>
                        <div className="flex flex-row justify-between pt-2 gap-2">
                            <span className="text-lg font-bold text-custom_gray">Total Amount</span>
                            <span className="text-lg font-bold text-custom_black">{cart?.size == 0 ? humanizeCurrency(retryTotal) : isShowTaxes ? humanizeCurrency(discountedTotal + totalTax) : humanizeCurrency(discountedTotal)}</span>
                        </div>
                    </div>
                </div>
                <div className='w-full md:pb-4 pt-10'>
                    <button onClick={() => { actionFun ? actionFun() : goToOrderPage() }} className="bg-brand-500 border-brand-500 font-bold lt-sm:text-sm text-neutral-50 lt-sm:px-1 px-2 py-2 rounded w-full" >{btnName ? btnName : "PLACE ORDER"}</button>
                </div>
            </div>
        }
    </div>
};