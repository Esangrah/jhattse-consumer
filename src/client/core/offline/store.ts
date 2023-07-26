import { getMyStores } from "@api/store";
import { storeTable } from "@db";
import { TStore } from "@components/types";

export const saveStoresOffline = async () => {
    if (typeof(navigator) === "undefined" || navigator.onLine) {
        const results = await getMyStores();
        storeTable.bulkPut(results, { allKeys: true });
        return results;
    }
}

export const getMyStoresOffline = async () => {
    const result: TStore[] = await storeTable.toArray();
    return result;
}

export const getStoreOffline = async (store_id: number) => {
    const result: TStore = await storeTable.where("id").equals(store_id).first();
    return result;
}