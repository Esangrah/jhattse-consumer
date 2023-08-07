import { atom } from 'recoil';
import { Atoms } from "#recoil/constants";

export const orderLastIds = atom<string[]> ({
    key: Atoms.OrderLastIds
});