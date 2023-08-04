import React, { useState, useEffect } from 'react'
import { TOrder, TOrderItem, TProduct } from '@components/types';
import { getOrderById } from "@api/order";
import { MdPhoneEnabled, MdOutlineLocationOn } from 'react-icons/md';
import Moment from "moment";
import { calculateCost, calculateTax, groupBy, requestLogin, trimToLength } from '@core/utils';
import { Navbar } from '@components/navbar';
import { getCombinedName } from '@components/variant/variantSelector';
import { usePageContext } from '@renderer/usePageContext';
import { Header } from '@components/header';

interface Props {
    initialOrder: TOrder
}


export const Page: React.FC<Props> = ({ initialOrder }: Props) => {
    const [order, setOrder] = useState<TOrder>(initialOrder);
    const pageContext = usePageContext();
    let content = null;
    let mode = pageContext.urlParsed?.search?.mode;

    const discountedTotal = order?.orderitems !== undefined ? order?.orderitems.reduce((prevTotal, current: TOrderItem) => prevTotal + ((current.price || 0) * (current.quantity || 0)), 0) : 0;
    const total = order?.orderitems !== undefined ? order?.orderitems.reduce((prevTotal, current: TOrderItem) => prevTotal + ((current.mrp || 0) * (current.quantity || 0)), 0) : 0;
    const savings = total - discountedTotal;
    // const totalTax = order?.orderitems?.reduce((prevTax, currentTax) => prevTax + (currentTax?.inventory?.tax_exclusive ? ((currentTax.price * currentTax.inventory.tax_rate) / 100 * currentTax.quantity) : ((currentTax.inventory.tax_rate * (currentTax.price / (1 + (currentTax.inventory.tax_rate) / 100))) / 100 * currentTax.quantity)), 0)
    // const grandTotal = order?.orderitems?.reduce((prevTax, currentTax) => prevTax + (currentTax?.inventory?.tax_exclusive ? ((((currentTax.price * currentTax.inventory.tax_rate) / 100) + currentTax?.price) * currentTax.quantity) : (currentTax?.price * currentTax.quantity)), 0)
    const grandTotal = order?.orderitems?.reduce((prev, current: TOrderItem) => prev + (current?.inventory !== undefined && current.inventory?.tax_exclusive === true ? (current?.total_cost || 0) : (current?.total_payable || 0)), 0)

    const taxGroup = groupBy(order?.orderitems || [], (oi) => {
        return oi.inventory?.tax_rate
    })
    const taxCalculate = Object.entries(taxGroup).map((element) => {
        let tax = parseFloat(element[0]);
        let orderItems = element[1];
        return {
            "SGST": tax / 2,
            "CGST": tax / 2,
            "tax": calculateTax(orderItems) / 2,
            "amount": calculateCost(orderItems)
        }
    })
    const roundOff = Math.round(order?.payable || 0) - (order?.payable || 0);

    useEffect(() => {
        // TODO:
        let id = pageContext.routeParams?.id;
        let token = pageContext.urlParsed?.search.token;
        if (id === order?.id) {
            return
        }
        const res: Promise<TOrder> = getOrderById(id as string, token as string);
        res.then((order) => setOrder(order)).catch((e) => {
            if (e.response?.status === 401) {
                requestLogin(pageContext?.urlOriginal);
            }
        })
    }, [pageContext?.urlOriginal, order?.id])

    if (order) {
        content =
            <div className="">
                <Header />
                <div className="flex justify-center py-4 bg-neutral-50">
                    <div className="grid gap-1 w-1/3 lt-sm:w-full p-4 bg-neutral-50">
                        <div className="flex justify-center text-neutral-900 font-semibold text-base leading-tight">Invoice/ Bill</div>
                        <div className="grid pb-1 border-neutral-900 border-b border-dashed gap-1">
                            <div className="flex flex-col gap-1 pb-1 border-b border-neutral-900 border-dashed">
                                <div className="flex justify-between gap-2">
                                    <div className="text-neutral-900 text-sm font-semibold">
                                        <span className="text-neutral-700 text-xs font-semibold">Sold By: </span>{order?.store?.name}
                                    </div>
                                    {
                                        mode == "Pickup" ?
                                            <div className="flex justify-end text-neutral-900 items-start print:hidden whitespace-nowrap">
                                                <span className="text-xs print:hidden">Mob : {order?.store?.phone} </span>
                                            </div>
                                            :
                                            <div className="flex justify-end text-sky-500 items-start print:hidden">
                                                <a href={`tel:${order?.store?.phone}`} className="flex items-center bg-sky-500 text-neutral-50 px-2 rounded-full leading-tight select-none"><span className="text-sm print:hidden">Call </span><MdPhoneEnabled /></a>
                                            </div>
                                    }
                                </div>
                                <div className="flex justify-between gap-2">
                                    <div className="text-xs">
                                        <span className="text-neutral-700 font-semibold">Shop Address : </span>
                                        {[order?.store?.address?.house_number, order?.store?.address?.street_name, order?.store?.address?.locality, order?.store?.address?.city?.name, order?.store?.address?.state?.name, order?.store?.address?.pincode].filter((x) => x != undefined).join(", ")}
                                    </div>
                                    {
                                        mode == "Delivery" ?
                                            <div className="flex justify-end text-sky-500 items-start print:hidden">
                                                <a href={`http://www.google.com/maps/place/${order?.store?.address?.latitude},${order?.store?.address?.longitude}`} className="flex items-center bg-green-700 text-neutral-50 px-2 rounded-full leading-tight whitespace-nowrap select-none" target="_blank"><span className="text-sm print:hidden">Location </span><MdOutlineLocationOn /></a>
                                            </div>
                                            :
                                            <></>
                                    }
                                </div>
                                {order?.store?.gstin != null ?
                                    <div className="text-neutral-900 text-sm font-semibold">
                                        <span className="text-neutral-700 text-xs font-semibold">GSTIN: </span>{order?.store?.gstin}
                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between gap-2">
                                    <div className="text-neutral-900 text-xs font-semibold"><span className="text-neutral-700 text-xs font-semibold">Customer Name: </span>{order?.user?.full_name}</div>
                                    {
                                        mode == "Delivery" ?

                                            <div className="flex gap-1 justify-end text-sky-500 items-start print:hidden">
                                                <a href={`tel:${order?.user?.phone}`} className="flex items-center bg-sky-500 text-neutral-50 px-2 rounded-full leading-tight select-none"><span className="text-sm print:hidden">Call </span><MdPhoneEnabled /></a>
                                            </div>
                                            :
                                            <div className="flex justify-end text-neutral-900 items-start print:hidden whitespace-nowrap">
                                                <span className="text-xs print:hidden">Mob : {order?.user?.phone} </span>
                                            </div>
                                    }
                                </div>
                                {order?.address != null ?
                                    <div className="flex justify-between gap-2">
                                        <div className="text-xs">
                                            <span className="text-neutral-700 font-semibold">Delivery Address: </span>
                                            {[order?.address?.house_number, order?.address?.street_name, order?.address?.locality, order?.address?.city?.name, order?.address?.state?.name, order?.address?.pincode].filter((x) => x != undefined).join(", ")}
                                        </div>
                                        <div className="flex gap-1 justify-end text-sky-500 items-start print:hidden">
                                            <a href={`http://www.google.com/maps/place/${order?.address?.latitude},${order?.address?.longitude}`} className="flex items-center bg-green-700 text-neutral-50 px-2 rounded-full leading-tight whitespace-nowrap select-none" target="_blank"><span className="text-sm print:hidden">Location </span><MdOutlineLocationOn /></a>
                                        </div>
                                    </div> :
                                    <></>
                                }
                            </div>
                        </div>
                        <div className="grid border-b border-neutral-900 border-dashed">
                            {order?.bill_id && <div className="text-sm"><span className="font-medium text-neutral-600">Bill Id: </span>{order?.bill_id}</div>}
                            <div className="text-sm"><span className="font-semibold text-neutral-600">Order Id: </span>#{order?.short_id || order?.id}</div>
                            <div className="text-sm"><span className="font-semibold text-neutral-600">Date:</span> {Moment(order.added_on).format('YYYY-MM-DD')} {Moment(order.added_on).format('HH:mm')}</div>
                            {order?.info?.table && <div className="text-sm"><span className="font-medium text-neutral-600">Table No: </span>{order?.info?.table}</div>}
                        </div>
                        <div className="bg-neutral-50 ">
                            <div className="grid grid-cols-6 border-neutral-900 border-b border-dashed bg-neutral-50 p-1">
                                <div className="grid col-span-2">
                                    <div className='flex text-neutral-900 font-semibold text-sm'>Item</div>
                                    <div className='flex text-neutral-900 font-semibold text-sm'>Item Code</div>
                                </div>
                                <div className="col-span-2 text-neutral-900 font-semibold flex justify-center text-sm">Qty </div>
                                <div className="grid col-span-2">
                                    <div className="text-neutral-900 font-semibold flex justify-end text-sm">Unit Amt</div>
                                    <div className="text-neutral-900 font-semibold flex justify-end text-sm">Total Amt</div>
                                </div>
                                {/* <div className="text-neutral-900 font-semibold flex justify-center text-sm">Rate(₹)</div> */}

                            </div>
                            {order?.orderitems && order?.orderitems.map((orderItem: TOrderItem) => {
                                return (
                                    <div className="grid grid-cols-6 border-b border-neutral-900 border-dashed w-full items-start p-1" data-orderitem-id={orderItem.id}>
                                        <div className="grid col-span-2">
                                            <div className="flex text-neutral-900 line-clamp-2 text-xs overflow-hidden">{trimToLength(getCombinedName(orderItem?.inventory?.product as TProduct, orderItem?.inventory?.variant_id), 20)}</div>
                                            <div className="flex text-neutral-900 text-xs overflow-hidden">{orderItem?.inventory?.product?.gtin}</div>
                                        </div>
                                        <div className="col-span-2 text-neutral-900 flex justify-center text-xs">{orderItem?.quantity} </div>
                                        <div className="grid col-span-2">
                                            <div className="text-neutral-900 flex justify-end text-xs">₹{orderItem?.price?.toFixed(2)}</div>
                                            <div className="text-neutral-900 font-semibold flex justify-end text-xs">₹{orderItem?.total_cost?.toFixed(2)}</div>
                                        </div>
                                    </div>

                                )
                            })}
                            <div className="grid grid-cols-6 border-b border-neutral-900 border-dashed w-full items-start p-1">
                                <div className="grid col-span-3 text-sm text-neutral-900">
                                    Total Qty : {order?.orderitems?.length}
                                </div>
                                <div className="grid justify-end col-span-3 text-sm text-neutral-900">
                                    Total : ₹{grandTotal?.toFixed(2)}
                                </div>
                            </div>
                            {
                                order?.tax != 0 ?
                                    <div className="grid border-b border-neutral-900 border-dashed w-full items-start p-1 gap-1">
                                        <div className="text-neutral-900 font-semibold text-base">Tax Information</div>
                                        {taxCalculate?.map((taxComponent) => {
                                            if (taxComponent?.tax > 0) {
                                                return (
                                                    <div className="grid" key={taxComponent?.tax}>
                                                        <div className="flex flex-row items-center justify-between">
                                                            <span className="text-neutral-900 text-xs font-semibold">Taxable amount</span>
                                                            <span className="text-xs text-neutral-900">₹{taxComponent?.amount?.toFixed(2)}</span>
                                                        </div>
                                                        <div className="flex flex-row items-center justify-between">
                                                            <span className="text-neutral-900 text-xs">CGST  {taxComponent?.CGST}%</span>
                                                            <span className="text-xs text-neutral-900">₹{taxComponent?.tax?.toFixed(2)}</span>
                                                        </div>
                                                        <div className="flex flex-row items-center justify-between">
                                                            <span className="text-neutral-900 text-xs">SGST  {taxComponent?.SGST}%</span>
                                                            <span className="text-xs text-neutral-900">₹{taxComponent?.tax?.toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                        }
                                        <div className="flex flex-row justify-between">
                                            <span className="text-neutral-900 font-semibold text-sm">Total Tax</span>
                                            <span className="text-sm text-neutral-900">₹{order?.tax?.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    : <></>
                            }
                            <div className="grid border-b border-neutral-900 border-dashed w-full items-start p-1">
                                {
                                    savings != 0 ?
                                        <div className="flex flex-row justify-between">
                                            <span className="text-neutral-900 font-semibold text-sm">Savings</span>
                                            <span className="text-sm text-neutral-900">₹{savings?.toFixed(2)}</span>
                                        </div>
                                        : <></>
                                }
                                {/* <div className="flex flex-row justify-between">
                                    <span className="text-neutral-900 font-semibold text-sm">Total Tax</span>
                                    <span className="text-sm text-neutral-900">₹{totalTax.toFixed(2)}</span>
                                </div> */}
                                {roundOff != 0 && <div className="flex flex-row justify-between">
                                    <span className="text-neutral-900 text-xs">Round Off</span>
                                    <span className="text-xs text-neutral-900">{roundOff.toFixed(2)}</span>
                                </div>}
                                <div className="flex flex-row justify-between">
                                    <span className="text-neutral-900 font-semibold text-sm">Grand Total</span>
                                    <span className="text-sm text-neutral-900 font-semibold">₹{Math.round(order?.payable || 0).toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="grid border-b border-neutral-900 border-dashed w-full items-start p-1">
                                <div className="flex justify-center text-base font-semibold text-neutral-900">Powered by</div>
                                <div className="flex justify-center text-base font-semibold text-neutral-900">Jhattse</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Navbar />
            </div>
    }
    return (
        <div>{content}</div>
    )
}