import { TOrder } from "#components/types";
import { onlineSyncTable, orderTable } from "@db"

export const confirmSync = async (order_id: string, order: TOrder) => {
    await onlineSyncTable.add({ id: order_id, is_sync: true, changed_id: order.id });
}