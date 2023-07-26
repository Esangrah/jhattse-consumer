import Dexie from "dexie";

export const database = new Dexie("database");
database.version(1).stores({
    inventory: 'id,store_id,product.name,product.gtin',
    orders: 'id,short_id,store_id,status',
    store: 'id',
    customer: 'phone',
    onlineSync: 'id,changed_id',
});


export const inventoryTable = database.table('inventory');
export const orderTable = database.table('orders');
export const storeTable = database.table('store');
export const customerTable = database.table('customer');
export const onlineSyncTable = database.table('onlineSync');