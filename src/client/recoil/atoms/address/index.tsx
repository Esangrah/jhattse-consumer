import { atom, selector } from 'recoil';
import { Atoms } from "#recoil/constants";
import { TAddress } from '#components/types';

const localStorage = typeof window !== `undefined` ? window.localStorage : null

export const internalAddressState = atom < TAddress > ({
    key: Atoms.InternalAddress,
    default: JSON.parse(localStorage?.getItem(Atoms.Address.toString()) || "{}"),
});

// export const addressState = atom<TAddress> ({
//     key: Atoms.Address,
//     default: null, 
// });
export const addressState = selector({
    key: Atoms.Address,
    get: ({ get }) => get(internalAddressState),
    set: ({ set }, newValue) => {
        set(internalAddressState, newValue);
        localStorage?.setItem(Atoms.Address.toString(), JSON.stringify(newValue));
    },
});

