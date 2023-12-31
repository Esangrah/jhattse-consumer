import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '@recoil/atoms';
import { Image } from "@renderer/Image";;
import { Link } from '@renderer/Link';
import { CartButton } from '@components/cartbutton';
import { TCartItem, TProduct } from "@components/types";
import { Star } from '@components/star';
import { getImageUrl, getSafeUrl, humanizeCurrency, sanityIoImageLoader } from '@core/utils';
import { MdDelete, MdOutlineShoppingCart } from 'react-icons/md';
import PopupComponent from '@components/popup';
import { cartInventoryFilter, getCombinedName } from '@components/variant/variantSelector';


export const CartInfo: React.FC = () => {
    const [cart, setCart] = useRecoilState(cartState);
    const [cartItems, setCartItems] = useState<TCartItem[]>([]);
    const [removeCartItemId, setRemoveCartItemId] = useState<TCartItem>()
    const [showModel, setShowModel] = useState(false)

    let tableInfo = typeof window !== "undefined" && JSON.parse(localStorage.getItem("tableInfo") || '{}');

    useEffect(() => {
        setCartItems(Array.from(cart?.values()));
    }, [cart])

    const removeFromCart = (cartItem: TCartItem | undefined) => {
        let variantId = cartInventoryFilter(cartItem)?.id || 0;
        if (variantId !== undefined) {
            setCart((cart) => {
                cart.delete(variantId.toString());
                return new Map(cart);
            });
        }
    }


    const toggleDeliveryMode = (cartItem: TCartItem) => {
        let variantId = cartInventoryFilter(cartItem)?.id || 0;
        if (variantId !== undefined) {
            setCart((cart) => {
                if (cart.has(variantId?.toString())) {
                    let newMode = !cart.get(variantId?.toString())?.deliverable;
                    cart.set(variantId?.toString(), { product: cartItem.product, quantity: cartItem.quantity, inventory: cartItem.inventory, deliverable: newMode })
                }
                return new Map(cart);
            })
        }
    };

    return (
        <div className="font-manrope w-3/4 lt-sm:w-full">
            {/* <Title title="Your Bag/Shopping List" /> */}
            <div className="grid grid-flow-row gap-4 font-manrope">
                {cartItems == null || cartItems?.length == 0
                    ? <div className="flex justify-center animate-pulse duration-1000 p-3 h-screen  w-full lt-sm:w-full">
                        <div>
                            <MdOutlineShoppingCart
                                className="h-52 w-full font-normal"
                            />
                            <div>
                                <h3 className="flex justify-center text-2xl">Your cart is empty</h3>
                                {/* <p className="flex justify-center text-2xl text-neutral-900">Looks like you have not added anything to your cart.</p> */}
                            </div>
                        </div>
                    </div>
                    : cartItems?.map((cartItem) => (
                        <div key={cartItem?.product?.id} className="grid items-center bg-neutral-100 w-full grid-cols-3 lt-sm:w-full gap-2 rounded-lg border border-neutral-300">
                                        <div className="relative col-span-1">
                                            <div className="flex justify-center items-center w-full h-full">
                                                <Link href={`/product/${cartItem?.product?.id}/${getSafeUrl(cartItem?.product?.name)}`}>
                                                    <Image
                                                        loader={sanityIoImageLoader}
                                                        src={getImageUrl(cartItem?.product?.images || [])}
                                                        alt={cartItem?.product?.name || ''}
                                                        width="150"
                                                        height="150"
                                                        className="w-44 sm:w-full object-cover h-full sm:max-h-44"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="absolute grid mx-2 bottom-0 grid-row grid-flow-col">
                                                {cartItem?.product?.stats?.rating_overall ?
                                                    <Star rating={cartItem?.product?.stats?.rating_overall} />
                                                    :
                                                    <></>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-span-2 flex flex-col justify-between gap-2 p-2">
                                            <div className="flex flex-col gap-2 leading-tight">
                                                <Link href={`/product/${cartItem?.product?.id}/${getSafeUrl(cartItem?.product?.name)}`}>
                                                    <p className="text-custom_black font-bold text-base line-clamp-2 lt-sm:text-sm">{getCombinedName(cartItem?.product as TProduct, cartItem?.inventory?.variant_id || 0)}</p>
                                                </Link>
                                                {/* <p className="text-custom_gray text-sm sm:hidden">Sold by: <Link href={`/store/${cartItem.inventory?.store?.id}/${getSafeUrl(cartItem.inventory?.store?.name)}`}><span className="text-custom_gray">{cartItem.inventory?.store?.name}</span></Link></p> */}
                                                <div>
                                                    <p><span className="text-neutral-900 font-bold text-xl lt-sm:text-base pt-1">{humanizeCurrency(cartItem?.inventory?.price || cartItem.inventory?.mrp || cartItem?.product?.mrp)}</span></p>
                                                </div>
                                                {tableInfo?.table === null || tableInfo?.table === undefined &&
                                                    <div className="flex flex-row gap-8 py-2 items-center">
                                                        {cartItem.inventory?.store?.is_delivery && cartItem.inventory?.store?.is_pickup ? <>
                                                            <div className="flex gap-2">
                                                                <input type="radio" value="PICKUP" className="cursor-pointer" onChange={() => {
                                                                    toggleDeliveryMode(cartItem);
                                                                }} checked={cartItem?.deliverable !== true} />
                                                                <label htmlFor="pickupanddelivery" className="text-sm font-bold text-bannerText">PICK UP</label>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <input type="radio" className="cursor-pointer"
                                                                    onChange={() => {
                                                                        toggleDeliveryMode(cartItem);
                                                                    }}
                                                                    value="DELIVERY" checked={cartItem?.deliverable === true} />
                                                                <label htmlFor="pickupanddelivery" className="text-sm font-bold text-bannerText">DELIVERY</label>
                                                            </div>
                                                        </> :
                                                            cartItem.inventory?.store?.is_delivery ? <div className="flex gap-2">
                                                                <input type="radio" className="cursor-pointer"
                                                                    onChange={() => {
                                                                        toggleDeliveryMode(cartItem);
                                                                    }}
                                                                    value="DELIVERY" checked={cartItem?.deliverable === true} />
                                                                <label htmlFor="pickupanddelivery" className="text-sm font-bold text-bannerText">DELIVERY</label>
                                                            </div> :
                                                                <div className="flex gap-2">
                                                                    <input type="radio" className="cursor-pointer"
                                                                        onChange={() => {
                                                                            toggleDeliveryMode(cartItem);
                                                                        }}
                                                                        value="PICKUP" checked={cartItem?.deliverable !== true} />
                                                                    <label htmlFor="pickupanddelivery" className="text-sm font-bold text-bannerText">PICK UP</label>
                                                                </div>


                                                        }
                                                    </div>}
                                            </div>
                                            <div className="flex flex-col-2 gap-4 pt-2">
                                                <div className="w-32">
                                                    <CartButton product={cartItem.product as TProduct} Isvariant={false} inventory={cartItem.inventory} mode={''} btnStyle='bg-none border-none' />
                                                </div>
                                                <div className="flex items-center"><button onClick={() => {
                                                    setRemoveCartItemId(cartItem)
                                                    setShowModel(true)
                                                }} className="mx-3 flex items-center gap-2 text-custom_gray lt-sm:px-1 px-3 py-2 rounded-md"><MdDelete className="text-custom_gray text-lg" /> Delete</button></div>
                                            </div>
                                        </div>
                                    </div>
                    ))}
                                </div>
                                <PopupComponent showModal={showModel}
                                    setShowModal={setShowModel}
                                    ActionFun={() => {
                                        removeFromCart(removeCartItemId)
                                        setShowModel(false)
                                    }} message="Are you sure you want to remove this item from cart?" btnName="YES, REMOVE ITEM" closeBtnName="CANCEL" />
                            </div>
                            );
};