import { variantState } from "@recoil/atoms/variant";
import Variant from "@components/variant";
import { useRecoilValue } from "recoil";
import { TCartItem, TOrder, TProduct, TVariant } from "@components/types";

export function VariantSelector() {
    const IsVariant = useRecoilValue(variantState);
    return IsVariant && IsVariant.Isvariant ? <Variant showModal={IsVariant.showModal} product={IsVariant.product} inventory={IsVariant?.inventory} quantity={IsVariant?.quantity} /> : null;
}

export function inventoryByVariantId(item: TVariant, product: TProduct) {
    return (product.inventories && product.inventories.length > 0) && product?.inventories?.filter((inventory) => inventory?.variant_id == item?.id)
}

export function variantNameFromOrderItem(orderDetails: TOrder[]) {
    return (orderDetails?.length > 0 && `${orderDetails[0]?.orderitems[0]?.inventory?.product?.name}, ${orderDetails[0]?.orderitems[0]?.inventory?.product?.variants?.filter((variant) => variant?.id == orderDetails[0]?.orderitems[0]?.inventory?.variant_id)[0]?.name}`)
}

export function cartInventoryFilter(cartItem: TCartItem) { return (cartItem?.product?.variants?.length > 0 && cartItem?.product?.variants.filter((variant) => variant?.id == cartItem?.inventory?.variant_id)[0]) }

export function getCombinedName(product: TProduct, variant_id: number) {
    let combinedName;
    if (product?.variants.length > 0) {
        let variantName = product?.variants?.filter((variant) => variant?.id == variant_id)[0]?.name;
        if (variantName !== undefined && variantName !== null && variantName !== '') {
            combinedName = `${product?.name}, ${variantName}`;
        }else combinedName = product?.name
    }
    return combinedName;
}