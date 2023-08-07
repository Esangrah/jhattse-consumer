import { atom, selector } from 'recoil';
import { Atoms } from "#recoil/constants";
import { TCartItem } from '#components/types';

const localStorage = typeof window !== `undefined` ? window.localStorage : null

// https://stackoverflow.com/a/56150320/19911813
function replacer(key: string, value: TCartItem) {
    if (value instanceof Map) {
        return Array.from(value.entries()) // or with spread: value: [...value]
    } else {
        return value;
    }
}

export const internalCartState = atom<Map<string, TCartItem>>({
    key: Atoms.InternalCart,
    default: localStorage?.getItem(Atoms.InternalCart.toString()) == null ? new Map<string, TCartItem>() : new Map<string, TCartItem>(Object?.entries<[string, TCartItem]>(JSON.parse(localStorage?.getItem(Atoms.InternalCart.toString()) || "{}")).map((a) => a[1])),
});

export const cartState = selector({
    key: Atoms.Cart,
    get: ({ get }) => get(internalCartState),
    set: ({ set }, newValue) => {
        set(internalCartState, newValue);
        localStorage?.setItem(Atoms.InternalCart.toString(), JSON.stringify(newValue, replacer));
    },
});

export const cartDetailsState = selector({
    key: Atoms.CartDetail,
    get: ({ get }) => {
        const cart = get(internalCartState);
        console.log(cart);
        var storePayments = Array.from(cart?.keys()).map((key: string) => {
            return { store: cart.get(key)?.inventory?.store?.name, discountedValue: (cart.get(key)?.inventory?.price || cart.get(key)?.inventory?.mrp || cart.get(key)?.product?.mrp || 0) * (cart.get(key)?.quantity || 0), mrpValue: (cart.get(key)?.product?.mrp || 0) * (cart.get(key)?.quantity || 0) };
        });
        var sortedStorePayments = storePayments.sort((a, b) => b.discountedValue - a.discountedValue);
        var sortedStores = sortedStorePayments.map((key) => { return key.store });
        console.log(storePayments)
        const discountedTotal = storePayments.reduce((prevTotal, current) => prevTotal + current.discountedValue, 0);
        const total = storePayments.reduce((prevTotal, current) => prevTotal + current.mrpValue, 0);
        const savings = total - discountedTotal;
        return {
            discountedTotal,
            savings,
            sortedStores,
            total,
        };
    },
});