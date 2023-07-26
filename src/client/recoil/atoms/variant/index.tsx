import { TInventory, TIsVariant, TProduct } from "@components/types";
import { Atoms } from "@recoil/constants";
import { atom, selector } from 'recoil';

const localStorage = typeof window !== `undefined` ? window.localStorage : null

const initialVariantState: TIsVariant = {
  Isvariant: false,
  product: {} as TProduct,
  showModal: false,
  quantity: 0,
};

export const internalVariantState = atom<TIsVariant>({
  key: Atoms.InternalVariant,
  default: initialVariantState,
});

export const variantState = selector({
  key: Atoms.Variant,
  get: ({ get }) => get(internalVariantState),
  set: ({ set }, newValue) => {
    set(internalVariantState, newValue);
    localStorage?.setItem(Atoms.Variant.toString(), JSON.stringify(newValue));
  },
});