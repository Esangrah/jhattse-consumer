import React, { useState } from 'react'
import { TInventory, TProduct } from '@components/types'
import { useRecoilState } from 'recoil'
import { cartState } from '@recoil/atoms'
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from '@renderer/Link';
import { variantState } from '@recoil/atoms/variant';
import { getLength } from '@core/utils';

type Props = {
    product: TProduct;
    inventory: TInventory;
    mode: string;
    btnSize?: string;
    btnStyle?: string;
    Isvariant?: boolean;
    variantId?: number;
}

export const CartButton = ({ product, inventory, mode, btnSize, btnStyle, Isvariant = true, variantId }: Props) => {
    const [cart, setCart] = useRecoilState(cartState);
    const [showModal, setShowModal] = useState(true);
    const [Variant, setVariant] = useRecoilState(variantState);

    const increase = (product: TProduct, quantity: number = 1) => {
        if (getLength(product?.variants) > 0 && typeof window !== 'undefined') {
            setVariant({ Isvariant: Isvariant, product: product, showModal: showModal, quantity: productQuantity })
        }
        (inventory?.variant_id !== undefined && inventory?.variant_id !== null) && setCart((cart) => {
            if (cart.has(inventory?.variant_id?.toString() || '')) {
                let newQuantity = (cart.get(inventory?.variant_id?.toString() || '')?.quantity || 0) + quantity;
                if (newQuantity == 0 || newQuantity == undefined) {
                    cart.delete(inventory?.variant_id?.toString() || '')
                }
                else {
                    cart.set(inventory?.variant_id?.toString() || '', { product: product, quantity: newQuantity, inventory: inventory, deliverable: inventory?.store?.is_delivery || false })
                }
            }
            else {
                cart.set(inventory?.variant_id?.toString() || '', { product: product, quantity: quantity, inventory: inventory, deliverable: inventory?.store?.is_delivery || false })
            }
            return new Map(cart);
        }
        )
    };
    const productQuantity = inventory?.variant_id != undefined ? cart.get(inventory?.variant_id?.toString())?.quantity : 0;
    return (
        (productQuantity == 0 || productQuantity == undefined) ?
            (inventory?.external_link !== undefined && inventory?.external_link?.length > 0 ?
                <div className={`grid ${(productQuantity == 0 || productQuantity == undefined) ? "grid-cols-1" : "grid-cols-3 divide-x rounded shadow"} justify-start items-center max-w-lg min-w-full`}>
                    <Link href={inventory?.external_link} className="bg-brand-500 hover:opacity-80 focus:opacity-80 py-2 px-8 text-xl lg:text-lg lt-sm:text-sm text-center text-neutral-50 font-bold whitespace-nowrap select-none rounded lt-sm:w-full">BUY NOW</Link>
                </div>
                :
                <div className={`flex flex-row ${(productQuantity == 0 || productQuantity == undefined) ? "" : "divide-x rounded shadow"} justify-start items-center max-w-lg min-w-full`}>
                    <button onClick={() => increase(product)} className="bg-brand-500 hover:opacity-80 focus:opacity-80 py-2 px-8 text-xl lg:text-lg lt-sm:text-sm text-center text-neutral-50 font-bold whitespace-nowrap select-none rounded lt-sm:w-full">Add to Cart</button>
                </div>)
            :
            <div className={`flex flex-row ${(productQuantity == 0 || productQuantity == undefined) ? "" : "font-bold rounded shadow"} p-2 text-xl lg:text-lg lt-sm:text-sm justify-between items-center ${btnStyle ? btnStyle : "bg-brand-500 hover:opacity-80 focus:opacity-80 text-neutral-50"} min-w-full`}>
                <div className="col-span-1 flex justify-center items-center">
                    <button onClick={(event) => increase(product, -1)}>
                        {productQuantity == 1 ? <MdOutlineDelete /> : <FaMinus />}
                    </button>
                </div>
                <div className="col-span-1 flex justify-center items-center px-2 text-center"><span>{productQuantity}</span></div>
                <div className="col-span-1 flex justify-center items-center h-full">
                    <button onClick={(event) => increase(product)}><FaPlus /></button>
                </div>
            </div>
    )
}