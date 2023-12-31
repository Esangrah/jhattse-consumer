import { CarouselContainer } from '@components/container/carousel'
import { TInventory, TProduct, TVariant } from '@components/types'
import { getFirst, getImageObject, humanizeCurrency, sanityIoImageLoader, trimToLength } from '@core/utils'
import { cartState } from '@recoil/atoms'
import { variantState } from '@recoil/atoms/variant'
import { Image } from "@renderer/Image";
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { SwiperSlide } from 'swiper/react'
import { inventoryByVariantId } from './variantSelector'
import { FaMinus, FaPlus } from 'react-icons/fa'

interface Props {
    showModal: boolean,
    setShowModal?: Function,
    product: TProduct,
    btnName?: string,
    inventory?: TInventory,
    quantity?: number
}

const Variant: React.FC<Props> = ({ showModal, product }) => {
    const [variant, setVariant] = useState<TVariant>(product?.variants?.find((variant) => getFirst(inventoryByVariantId(variant, product))?.is_available == true) as TVariant);
    const [Isvariant, setIsVariant] = useRecoilState(variantState);
    const [cart, setCart] = useRecoilState(cartState);
    const variantId = getFirst(inventoryByVariantId(variant, product))?.variant_id;
    const [productQyt, setProductQyt] = useState(variantId != undefined && cart.get(variantId.toString())?.quantity || 1)

    const onClickVariant = (value: TVariant) => {
        setVariant(value);
    }

    const onAddToCart = (product: TProduct, inventory: TInventory, productQyt: number) => {
        setIsVariant({ Isvariant: false, product: product, showModal: showModal, quantity: productQyt });
        (variantId !== null && variantId !== undefined) && setCart((cart) => {
            if (cart.has(variantId?.toString())) {
                let newQuantity = productQyt;
                if (newQuantity == 0 || newQuantity == undefined) {
                    cart.delete(variantId?.toString())
                }
                else {
                    cart.set(variantId?.toString(), { product: product, quantity: newQuantity, inventory: inventory, deliverable: inventory?.store?.is_delivery || false })

                }
            } else {
                cart.set(inventory?.variant_id?.toString() || '', { product: product, quantity: productQyt, inventory: inventory, deliverable: inventory?.store?.is_delivery || false })
            }
            return new Map(cart);
        }
        )
    }

    const increase = (quantity: number) => {
        return setProductQyt(productQyt + quantity);
    };
    return (
        <div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none p-4 focus:outline-none font-manrope lt-sm:items-end lt-sm:p-0"
                        onClick={() => {
                            setIsVariant({ Isvariant: false, product: product, showModal: showModal, quantity: productQyt })
                        }
                        }
                    >
                        <div
                            className="relative mx-auto max-w-2/3 lt-sm:max-w-full lt-sm:w-full"
                            onClick={e => e.stopPropagation()}
                        >
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-neutral-100 outline-none focus:outline-none">
                                {/*body*/}
                                <div className="relative px-4 py-4 lt-sm:px-2 flex-auto">
                                    <div className={`flex gap-2 items-center pb-4 ${product?.name !== undefined && product?.name?.length < 40 ? "w-96" : "w-full"} lt-sm:w-full`}>
                                        <Image
                                            loader={sanityIoImageLoader}
                                            src={getImageObject(product.images)?.url || "https://jhattse.com/assets/noimage.png"}
                                            alt={product?.name || ''}
                                            width="50"
                                            height="50"
                                            className="rounded"
                                        />
                                        <span className="text-neutral-900 font-semibold text-base">{trimToLength(product?.name, 80)}</span>
                                    </div>
                                    <div className="p-2">
                                        <h3 className="font-medium text-lg py-2 lt-sm:text-sm">Variants</h3>
                                        <CarouselContainer>
                                            {product?.variants?.length !== 0 && product?.variants?.map((item, index: number) => {
                                                return <SwiperSlide style={{ width: "auto" }} className="min-w-0" key={index}>
                                                    <div className={getFirst(inventoryByVariantId(item, product))?.is_available ? `bg-neutral-50 py-2 px-4 rounded-md cursor-pointer lt-sm:w-full  ${item?.id == variant?.id ? 'border-2 border-brand-500' : ''}` : "bg-neutral-50 py-2 px-4 rounded-md lt-sm:w-full opacity-75"} onClick={() => getFirst(inventoryByVariantId(item, product))?.is_available && onClickVariant(item)
                                                    }>
                                                        <div className="flex flex-col gap-2 ">
                                                            <div className="flex justify-start gap-2 py-2 border-b">
                                                                <h4 className="text-lg font-semibold text-custom_black text-sm line-clamp-1">{trimToLength((item?.name || product?.name), 20)}</h4>
                                                            </div>
                                                            <span className="text-xl py-1 font-bold text-custom_black lt-sm:text-lg">{humanizeCurrency(getFirst(inventoryByVariantId(item, product))?.price || getFirst(inventoryByVariantId(item, product))?.mrp || item?.mrp || 0)}</span>
                                                            <p className={getFirst(inventoryByVariantId(item, product))?.is_available ? "font-bold text-sm text-success-400" : "font-bold text-sm text-error-400"}>{getFirst(inventoryByVariantId(item, product))?.is_available ? "In Stock" : "Out of stock"}</p>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            })}
                                        </CarouselContainer>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-center gap-2 px-4 py-2 lt-sm:px-2 rounded-b">
                                    <div className="flex flex-1 flex-row gap-4 items-center align-bottom">
                                        <div className={`grid grid-cols-3 font-bold rounded shadow justify-center items-center border-2 border-brand-500 text-brand-500 min-w-full lt-sm:text-sm`}>
                                            <div className="col-span-1 flex justify-center items-center">
                                                <button disabled={productQyt == 1} onClick={(event) => increase(-1)}>
                                                    <FaMinus />
                                                </button>
                                            </div>
                                            <div className="col-span-1 justify-center items-center p-2 text-center"><span>{productQyt}</span></div>
                                            <div className="col-span-1 flex justify-center items-center h-full">
                                                <button onClick={(event) => increase(1)}><FaPlus /></button>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="flex-1 uppercase text-sm p-2 border-2 border-brand-500 text-neutral-50 bg-brand-500 rounded font-bold"
                                        type="button"
                                        onClick={() => onAddToCart(product, getFirst(inventoryByVariantId(variant, product)) as TInventory, productQyt)}
                                    >
                                        {`ADD TO CART | ${humanizeCurrency((getFirst(inventoryByVariantId(variant, product))?.price || getFirst(inventoryByVariantId(variant, product))?.mrp || variant?.mrp || 0) * productQyt || 0)}`}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-neutral-900"></div>
                </>
            ) : null}
        </div>
    )
}

export default Variant