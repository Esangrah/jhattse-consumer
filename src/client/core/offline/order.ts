import { onlineSyncTable, orderTable } from "@db";
import { TComponent, TCreateOrder, TOrder, TOrderItem } from "#components/types";
import axios from 'axios';
import { SERVER_HOST, handleResponse } from '#api';
import { confirmSync } from './synconline';
import { OrderStatus } from '#components/contants';


export const getStoreOrdersOffline = async (store_id: number, status: OrderStatus = OrderStatus.ALL) => {
    const result: TOrder[] = await orderTable.where("store_id").equals(store_id).and((item) => { return status == OrderStatus.ALL || status == item.status }).toArray();
    return result;
}

export const getOrderOffline = async (id: string) => {
    const result: TOrder = await orderTable.where("id").equals(id).first();
    return result;
}

export const getOrdersOffline = async (status: OrderStatus[], ids: string[] = []) => {
    if (status.length == 0) {
        const result: TOrder[] = await orderTable.filter((item) => { return (ids.length === 0 || ids.includes(item.id)); }).toArray();
        return result;
    } else {
        const result: TOrder[] = await orderTable.where("status").anyOfIgnoreCase(status).and((item) => { return (ids.length === 0 || ids.includes(item.id)); }).toArray();
        return result;
    }
}

export const getOrderOverallOffline = async (store_id: number) => {
    const all = await orderTable.filter((item) => { return item.store_id === store_id }).count();
    const created = await orderTable.where("status").equals("Created").filter((item) => { return item.store_id === store_id }).count();
    const processing = await orderTable.where("status").equals("Processing").filter((item) => { return item.store_id === store_id }).count();
    const completed = await orderTable.where("status").equals("Completed").filter((item) => { return item.store_id === store_id }).count();
    const cancelled = await orderTable.where("status").equals("Cancelled").filter((item) => { return item.store_id === store_id }).count();
    return { "pending": created, "processing": processing, "delivered": completed, "total": all, "pickup": all, "delivery": 0, "cancelled": cancelled }
}

export const saveOrderItem = async (orderItem: TOrderItem) => {
    const order: TOrder = await orderTable.where("id").equals(orderItem?.order_id || '').first();
    const curIndex = order?.orderitems?.findIndex((oi) => oi.id === orderItem?.id);
    if (curIndex !== undefined && order.orderitems) {
        order.orderitems[curIndex] = orderItem;
    }
    await orderTable.put(order, order?.id);
    return orderItem;
}

export const saveOrderOffline = async (order: TOrder) => {
    const _order: TOrder = await orderTable.where("id").equals(order?.id || '').first();
    await orderTable.put(order, _order?.id);
    return order;
}


export const syncOrdersOnline = async () => {
    let orders: TOrder[] = await orderTable.toArray();
    orders.forEach(async (order: TOrder) => {
        const existingSyncOrder = await onlineSyncTable.where("id").equals(order.id || '').first();

        if (existingSyncOrder == null) {

            let orderComponents = Array<TComponent>();
            order.orderitems?.map((item) => {
                let x = { inventory_id: item?.inventory?.id, quantity: item.quantity, is_delivery: false } as TComponent;
                orderComponents.push(x);
            })
            const _order: TCreateOrder = {
                id: order.id,
                components: orderComponents,
                user: order?.user,
                address_id: null,
                payment_mode: order?.payment_mode,
                currency: "INR",
                added_on: order.added_on,
            }
            if (typeof (navigator) === "undefined" || navigator.onLine) {
                let axiosMethod = axios.post;
                axiosMethod(`${SERVER_HOST}/api/v1/orders/`,
                    JSON.stringify(_order),
                    {
                        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` }
                    }).then((res) => {
                        let o = handleResponse(res);
                        if (_order.id !== undefined) {
                            confirmSync(_order?.id, o);
                        }
                    });
            }
        }
    })
}