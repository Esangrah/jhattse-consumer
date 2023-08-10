import { OrderStatus, WSMessageType } from "./contants";

declare global {
    interface Window {
        invokePayment: any;
    }
}

export type TCategory = {
    name: string;
    image: string;
    master_id: number;
    id: number;
};

export type TImage = {
    url?: string;
    description: string;
    type: string;
    product_id: number;
    id: number;
    file: string[];
};

export type TStoreImage = {
    url: string
    description?: string
    priority: number
    store_id: number
    id: number
}

export type TStat = {
    order_count: number;
    sales_count: number;
    rating_count: number;
    rating_overall: number;
};

export type TInventory = {
    price?: number;
    cost_price?: number;
    quantity?: number;
    is_live?: boolean;
    store_id: number;
    added_on?: number;
    id?: number;
    is_available?: boolean;
    product_id?: number;
    product?: TProduct;
    tag?: string;
    updated_on?: number;
    store?: TStore;
    tax_exclusive?: boolean;
    tax_rate?: number;
    external_link?: string;
    variant?: TVariant;
    variant_id?: number;
    mrp?: number;
};

export type TCartItem = {
    product?: TProduct;
    quantity: number;
    inventory: TInventory;
    deliverable: boolean;
    variant_id?: number;
};

export type TProduct = {
    name?: string;
    gtin?: string;
    brand?: TBrand;
    brand_id?: number;
    category_id?: number;
    mrp?: number;
    private?: boolean;
    id?: number;
    owner_id?: number;
    category?: TCategory;
    images?: TImage[];
    tag?: string;
    stats?: TStat;
    description?: string;
    inventories?: TInventory[];
    added_on?: number;
    updated_on?: number;
    variants?: TVariant[];
};

export type TVariant = {
    description?: string;
    gtin?: string;
    id?: number;
    name?: string;
    mrp?: number;
    product_id?: number;
    added_on?: number;
    updated_on?: number;
};

export interface TIsVariant {
    Isvariant: boolean;
    product: TProduct;
    showModal: boolean;
    quantity?: number;
    inventory?: TInventory;
}

export type TProductCategory = {
    name: string;
    image: null;
    master_id: number;
    id: number;
    total_products?: number;
    products?: TProduct[];
};

export interface TIdentity {
    id?: number;
    access_token?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    password1?: string;
    phone?: string;
    full_name?: string;
    profile_image?: string;
    is_business?: boolean;
    is_verified?: boolean;
    phone_verified?: boolean;
}

export interface TScreenInfo {
    actionText: string;
    message: string;
    next?: string;
    image_url?: string;
    icon?: React.ReactNode;
    order_info?: string;
}

export type TReview = {
    comment: string;
    rating: number;
    product_id?: number;
    id: number;
    user_id: number;
    added_on: number;
    updated_on: number;
    user: TIdentity;
    store_id?: number;
};

export type TAddReviews = {
    comment?: string;
    product_id?: number;
    store_id?: number;
    rating?: number;
    id?: number;
};

export type TState = {
    name: string;
};

export interface TCity extends TState { }

export type TAddress = {
    distance?: number;
    street_name?: string;
    locality?: string;
    city_id?: number;
    state_id?: number;
    latitude?: number;
    longitude?: number;
    city?: TCity;
    state?: TState;
    house_number?: string;
    pincode?: string;
    type?: string;
    is_default?: boolean;
    id?: number;
    user_id?: number;
};

export type TStore = {
    name: string;
    category_id: number;
    category: TStoreCategory;
    phone: string;
    email: string;
    gstin: string;
    image: string;
    logo: string;
    type: string;
    is_delivery: boolean;
    is_pickup: boolean;
    address_id: number;
    address: TAddress;
    id: number;
    manager_id: number;
    added_on: number;
    updated_on: number;
    stats: TStat;
    table_count: number;
};

export type TOrderOverall = {
    id: number;
    pending: number;
    processing: number;
    completed: number;
    total: number;
    pickup: number;
    delivery: number;
    cancelled: number;
};

export type TInventoryOverall = {
    id: number;
    total: number;
    total_live: number;
    total_unavailable: number;
};

export interface TStoreCategory extends TProductCategory { }

export type TSearchDescriptor = {
    q: string;
    intent: string;
};

export type TSearchContext = {
    app?: string;
    city?: string;
    country?: string;
    action?: string;
    version?: string;
    timestamp?: string;
};

export type TSearch = {
    descriptor: TSearchDescriptor;
    context: TSearchContext;
};

export type TSearchResult = TProduct | TStore;

export type TGeoLocation = {
    last_updated: number;
    latitude: number;
    longitude: number;
};
export type TAddAddress = {
    house_number: string;
    street_name: string;
    locality: string;
    city_id: number;
    pincode: string;
    latitude: number;
    longitude: number;
    state_id: number;
    type: boolean;
    is_default: boolean;
};

export type TStates = {
    name: string;
    id: number;
};

export type TCities = {
    name: string;
    state_id: number;
    id: number;
};

export interface TOrder {
    status?: OrderStatus;
    store_id?: number;
    delivery_mode?: string;
    payment_mode: string;
    id?: string;
    bill_id?: string;
    short_id?: number;
    is_paid?: boolean;
    cost?: number;
    service_charge?: number;
    tax?: number;
    payable?: number;
    store?: TStore;
    orderitems?: TOrderItem[];
    added_on?: string;
    updated_on?: string;
    user_id?: number;
    user?: TIdentity;
    link?: string;
    info?: TOrderInfo;
    transaction_id?: string;
    address_id?: number;
    address?: TAddress;
    billing_address_id?: number;
    billing_address?: TAddress;
    shipping_address_id?: number;
    shipping_address?: TAddress;
}

export type TOrderItem = {
    id?: string;
    is_fulfilled?: boolean;
    quantity?: number;
    inventory_id?: number;
    total_cost?: number;
    total_payable?: number;
    total_tax?: number;
    mrp?: number;
    price?: number;
    order_id?: string;
    inventory?: TInventory;
    added_on?: string;
    updated_on?: string;
};

export interface TOrderPayment {
    id: string;
    payment_mode?: string;
    cost?: number;
    added_on?: string;
    updated_on?: string;
    user?: TIdentity;
}

export type TCreateOrderRetry = {
    transaction_id?: string;
    payment_mode: string;
};

export type TCreateOrder = {
    id?: string;
    components: TComponent[];
    address_id?: number | null;
    payment_mode: string;
    currency: string;
    user?: TIdentity;
    added_on?: string;
    info?: TOrderInfo;
};

export type TOrderInfo = {
    source?: string;
    table?: string;
    table_id?: number;
    is_AC?: boolean;
    dinein_or_takeaway?: string;
    ref_by?: string
    gstin?: string
    address?: string
    place_of_supply?: string
    first_name?: string
    last_name?: string
    gst?: boolean
    template?: string
    gst_response?: gst_response
}

export type gst_response = {
    IRN?: string
    AckNo?: number
    qrcode?: string
}

export type TComponent = {
    quantity: number;
    inventory_id: number;
    is_delivery: boolean;
};

export interface TData {
    id: number | string;
    name: string;
}

export interface TOption {
    value: string;
    label: string;
}
export interface TSearchOption {
    product_id: string;
    product_value: string;
}

export interface TPasswordReset {
    new_password: string;
    token: string;
    password?: string;
}

export interface RefObject {
    fetchObjects: () => void;
}

export type TBrand = {
    name: string;
    acronym: string;
    description: string;
    id: number;
    image: string;
    info?: any;
    private: boolean;
    total_products: number;
    added_by_id: number;
    added_on: number;
    updated_on: number;
    about?: string;
    social_accounts?: TSocialAccount[];
};

export type TFeedback = {
    brand_id?: number;
    store_id?: number;
    page_url?: string;
    feedback?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
};

export type TSocialAccount = {
    name?: string;
    link?: string;
    followers?: number;
    brand_id?: number;
    store_id?: number;
    id?: number;
};

export type TCard = {
    title: string;
    subtitle?: string;
    url: string;
    image?: string;
    priority?: number;
};

export type TPaymentMethod = {
    id?: number;
    bank_name?: string;
    is_upi?: boolean;
    ifsc?: string;
    account_number?: string;
    upi?: string;
    priority?: number;
    store_id?: number;
    store?: TStore;
};

export type TSales = {
    id?: number;
    store_id?: number;
    order_count?: number;
    order_value?: number;
    duration?: number;
    duration_start?: number;
    date?: number;
    added_on?: number;
    updated_on?: number;
    duration_identifier?: string;
};

export type TOtp = {
    otp_id?: number;
    key?: string;
    type?: string;
    link?: string;
    msg?: string;
    success?: string;
    otp?: string;
};

export type TStoreCustomer = {
    store_id: number;
    user_id: number;
    info?: TStoreCustomerInfo;
    id?: number;
    added_on?: string;
    updated_on?: string;
    user: TIdentity;
};

export type TStoreCustomerInfo = {
    week: {
        count: number;
        value: number;
    };
    month: {
        count: number;
        value: number;
    };
    year: {
        count: number;
        value: number;
    };
    tags: string[];
};
export interface TCustomer {
    key: React.Key;
    name: string;
    LastVisited: string;
    WeeklyCount: number;
    WeeklyValue: number;
    MonthlyCount: number;
    MonthlyValue: number;
    YearlyCount: number;
    YearlyValue: number;
    tags: string[];
}

export interface TStoreTiming {
    open_time: string;
    close_time: string;
    day_of_week: number;
    store_id: number;
}

export interface TWSMessage {
    type: WSMessageType;
    content: TOrder | TOrderPayment | TSales;
}

export interface TFilter {
    startDate?: string;
    endDate?: string;
    status?: OrderStatus;
}

export interface TProductCategoryControl extends TProductCategory {
    pageNumber?: number;
    isLoadMore?: boolean;
}


export interface ImageLoaderProps {
    src: string
    width: number | string
    height?: number | string
    quality?: number
}
