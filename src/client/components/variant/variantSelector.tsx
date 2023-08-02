import { variantState } from "@recoil/atoms/variant";
import Variant from "@components/variant";
import { useRecoilValue } from "recoil";
import { TCartItem, TInventory, TOrderItem, TProduct, TVariant } from "@components/types";

export function VariantSelector() {
    const IsVariant = useRecoilValue(variantState);
    console.log("varint select", IsVariant);
    
    return IsVariant && IsVariant.Isvariant ? <Variant showModal={IsVariant.showModal} product={IsVariant.product} inventory={IsVariant?.inventory} quantity={IsVariant?.quantity} /> : null;
}

export function inventoryByVariantId(item: TVariant, product: TProduct): TInventory[] {
    return product?.inventories?.filter((inventory) => inventory?.variant_id == item?.id) || []
}

export function variantNameFromOrderItem(orderItem: TOrderItem) {
    return `${orderItem?.inventory?.product?.name}, ${orderItem?.inventory?.product?.variants?.filter((variant) => variant?.id == orderItem?.inventory?.variant_id)[0]?.name}`
}

export function cartInventoryFilter(cartItem: TCartItem | undefined) { return cartItem?.product?.variants?.find((variant) => variant?.id == cartItem?.inventory?.variant_id) }

export function getCombinedName(product: TProduct, variant_id: number | undefined) {
    let combinedName = '';
    let variantName = product?.variants?.find((variant) => variant?.id == variant_id)?.name;
    if (variantName !== undefined && variantName !== null && variantName?.length > 0) {
        combinedName = `${product?.name}, ${variantName}`;
    } else {
        combinedName = product?.name || ''
    }
    return combinedName;
}