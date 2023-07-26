export const enum WSMessageType {
    ORDER = "ORDER",
    PAYMENT = "PAYMENT",
    NOTIFICATION = "NOTIFICATION",
    STORESALE = "STORESALE"
}

export const enum OrderStatus {
    ALL = "All",
    COMPLETED = "Completed",
    CANCELLED = "Cancelled",
    CREATED = "Created",
    DISPATCHED = "Dispatched",
    PROCESSING = "Processing"
}