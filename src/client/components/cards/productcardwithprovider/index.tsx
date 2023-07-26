import React from "react";
import { Image } from "@renderer/image";
import { Link} from "react-router-dom"
import { Star } from "@components/star"
import { TProduct } from "@components/types";
import { getImageObject, getSafeUrl, humanizeCurrency, sanityIoImageLoader } from '@core/utils';
import { AiTwotoneStar } from "react-icons/ai";
import { AddToCart } from "@components/addtocart";

type Props = {
    product: TProduct;
};


export const ProductCardWithProvider: React.FC<Props> = ({ product }) => {
    let storeRating = product?.inventories?.length > 0 ? product?.inventories[0]?.store?.stats?.rating_overall : undefined;
    let isFnB = product?.inventories?.length > 0 && product?.inventories[0]?.store?.category_id == 1;
    let externalLink = product?.inventories?.length > 0 ? product?.inventories[0]?.external_link : "";
    let isOnline = externalLink?.length > 0;

    return (
        <div className="flex flex-col bg-neutral-50 rounded-md p-4 sm:p-2 font-manrope">
            {isOnline &&
                <div className="flex justify-between items-center p-2 border-b">
                    <span className="font-semibold text-lg text-custom_gray sm:text-base">{product?.inventories[0]?.store?.name}
                    </span>
                    {externalLink?.length > 0 &&
                        <div className="flex gap-1 items-center">
                            <Link to={externalLink} >
                                <Image
                                    loader={sanityIoImageLoader}
                                    src={product?.inventories[0]?.store?.logo || "https://cdn.jhattse.com/public/assets/noimage.png"}
                                    width="100"
                                    height="40"
                                    alt={product?.inventories[0]?.store?.name}
                                />
                            </Link>
                        </div>
                    }
                </div>
            }
            {isFnB &&
                <div className="flex justify-between items-center p-2 border-b">
                    <span className="font-semibold text-lg text-custom_gray sm:text-base">{product?.inventories[0]?.store?.name}
                    </span>
                    {storeRating > 0 &&
                        <div className="flex gap-1 items-center">
                            <p className="font-bold text-custom_gray text-base pr-1">{storeRating?.toFixed(1)}</p>
                            {
                                Array.from({ length: storeRating }).map((_, i) => (
                                    <span className="text-custom_yellow"><AiTwotoneStar key={i} /></span>
                                ))
                            }
                            {
                                Array.from({ length: 5 - storeRating }).map((_, i) => (
                                    <span className="text-radioButtonBorder"><AiTwotoneStar key={i} /></span>
                                ))
                            }
                        </div>
                    }
                </div>
            }
            {product?.tag &&
                <div className="absolute top-3 right-0 z-10 w-max rounded-l-md font-medium text-neutral-700 bg-brand-500 py-0.5 px-2 select-none">
                    {product.tag}
                </div>
            }
            <div className="h-2"></div>
            <div className="grid grid-cols-3 p-2 gap-4 sm:items-center">
                <div className="col-span-1">
                    <div className="relative flex justify-center max-h-44">
                        <Link to={`/product/${product?.id}/${getSafeUrl(product?.name)}`}>
                            <Image
                                loader={sanityIoImageLoader}
                                src={getImageObject(product?.images)?.url}
                                alt={getImageObject(product?.images)?.description || product?.name}
                                width="200"
                                height="200"
                                className="w-full h-full object-cover scale-100 hover:scale-105 focus:scale-105 ease-in duration-200 rounded-md"
                            />
                        </Link>
                    </div>
                </div>
                <div className="col-span-2 leading-tight">
                    <div className="font-bold font-simple overflow-hidden">
                        <p className="font-medium truncate text-ellipsis text-lg sm:text-base  text-custom_black pt-2">{product?.name}</p>
                        {
                            product?.stats != null && product?.stats != undefined && product?.stats?.rating_count > 0 ?
                                <div className="py-2">
                                    <div className="pb-1">
                                        <Star rating={product?.stats?.rating_overall} />
                                        {/* <p className="text-neutral-500">{product?.stats?.rating_count}+ ratings</p> */}
                                    </div>
                                </div>
                                :
                                <div className="py-2">
                                    <div className="text-neutral-500 sm:text-sm">No Ratings</div>
                                </div>
                        }
                        <div className=" flex flex-col gap-4 justify-between py-0.5 sm:flex-row sm:items-center">
                            <div className="text-neutral-800 font-bold text-lg sm:text-base">
                                <span>{humanizeCurrency(product?.mrp)}</span>
                            </div>
                            {product?.inventories?.length != 0 ?
                                <div className="flex flex-row gap-4 items-center pt-1 w-full">
                                    <AddToCart addToCartBag={false} product={product}  inventory={product?.inventories?.length > 0 ? product?.inventories[0] : null}></AddToCart>
                                </div>
                                :
                                <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}