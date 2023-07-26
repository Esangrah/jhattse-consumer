import { atom } from 'recoil';
import { Atoms } from "@recoil/constants";

export const connectionState = atom < boolean > ({
    key: Atoms.Connection,
    default: true
});