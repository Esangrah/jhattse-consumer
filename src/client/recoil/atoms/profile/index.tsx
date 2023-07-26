import { atom } from 'recoil';
import { Atoms } from "@recoil/constants";
import { TIdentity } from "@components/types";

export const profileState = atom < TIdentity > ({
    key: Atoms.Profile,
    default: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("profile")) : {} as TIdentity
});

export const isLoggedIn = atom < boolean > ({
    key: Atoms.IsLogin,
    default: typeof window !== 'undefined' ? localStorage.getItem("token")?.length > 0 : false
});