import { CartButton } from "@components/cartbutton";
import { CartButtonV2 } from "@components/cartbutton/v2";
import { TCartItem, TInventory, TProduct } from "@components/types";
import { cartState } from "@recoil/atoms/cart";
import { Link} from "@renderer/Link"
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

interface Props {
    product: TProduct
    inventory?: TInventory
    addToCartBag?: boolean
    btnStyle?: string
}

export const AddToCart = ({ product, inventory, addToCartBag = true, btnStyle }: Props) => {
    const cart = useRecoilValue(cartState);
    const [localCart, setLocalCart] = useState<Map<string, TCartItem>>();

    useEffect(() => {
        setLocalCart(cart)
    }, [cart])

    return (
        <>
            {
                product?.variants?.length > 1 ? <CartButtonV2 product={product} inventory={inventory} mode={""} btnStyle={btnStyle}></CartButtonV2> : <CartButton Isvariant={false} product={product} inventory={inventory} mode={""} btnStyle={btnStyle}></CartButton>
            }
            {localCart == undefined || localCart?.size == 0 || addToCartBag == false ?
                <div></div>
                :
                <Link href="/cart">
                    <div className="flex bg-sky-100 py-2 flex-row text-sm rounded-xl px-3 hover:bg-sky-200">
                        {/* <p className="lg:hidden text-neutral-900 font-semibold py-1 mr-2 whitespace-nowrap select-none">CHECK BAG</p> */}
                        <div className="flex flex-row gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#1599D1" className="w-6 h-6 self-center" viewBox="0 0 448 512"><path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 96c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zm200-24c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24z" /></svg>
                            <span className="bagItemCount self-center font-bold font-bigger pl-1 inline">{localCart?.get(product.id.toString())?.quantity}</span>
                        </div>
                    </div>
                </Link>
            }
        </>
    )
}