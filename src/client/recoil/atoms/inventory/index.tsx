import { TInventory } from "@components/types";
import { Atoms } from "@recoil/constants";
import { atom } from "recoil";



export const inventoryState = atom < TInventory > ({
    key: Atoms.Inventory,
    default: null,
});