import React from "react";
import { Image } from "#renderer/Image";
import { Link} from "#renderer/Link"
import { Star } from "#components/star"
import { TProduct } from "#components/types";
import { getFirst, getImageObject, getSafeUrl, humanizeCurrency, sanityIoImageLoader } from '#core/utils';
import { FaStar } from "react-icons/fa";
import { AddToCart } from "#components/addtocart";

type Props = {
    product: TProduct;
};


export const ProductCardWithProvider: React.FC<Props> = ({ product }) => {
    let firstInventory = getFirst(product?.inventories)
    let storeRating = firstInventory?.store?.stats?.rating_overall;
    let isFnB = firstInventory?.store?.category_id == 1;
    let externalLink = firstInventory?.external_link || "";
    let isOnline = externalLink?.length > 0;

    return (
        <div className="flex flex-col bg-neutral-50 border border-neutral-300 rounded-lg md:p-4 p-2 font-manrope">
            {isOnline &&
                <div className="flex justify-between items-center p-2 border-b">
                    <span className="font-semibold md:text-lg text-neutral-900 text-base">{firstInventory?.store?.name}
                    </span>
                    {externalLink?.length > 0 &&
                        <div className="flex gap-1 items-center">
                            <Link href={externalLink} >
                                <Image
                                    loader={sanityIoImageLoader}
                                    src={firstInventory?.store?.logo || "https://cdn.jhattse.com/public/assets/noimage.png"}
                                    width="100"
                                    height="40"
                                    alt={firstInventory?.store?.name || ''}
                                />
                            </Link>
                        </div>
                    }
                </div>
            }
            {isFnB &&
                <div className="flex justify-between items-center p-2 border-b">
                    <span className="font-semibold text-lg text-custom_gray lt-sm:text-base">{firstInventory?.store?.name}
                    </span>
                    {storeRating !== undefined && storeRating > 0 &&
                        <div className="flex gap-1 items-center">
                            <p className="font-bold text-custom_gray text-base pr-1">{storeRating?.toFixed(1)}</p>
                            {
                                Array.from({ length: storeRating }).map((_, i) => (
                                    <span className="text-custom_yellow" key={i}><FaStar key={i} /></span>
                                ))
                            }
                            {
                                Array.from({ length: 5 - storeRating }).map((_, i) => (
                                    <span className="text-radioButtonBorder" key={i}><FaStar key={i} /></span>
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
            <div className="grid grid-cols-3 gap-4 lt-sm:items-center">
                <div className="col-span-1">
                    <div className="relative flex justify-center max-h-44">
                        <Link href={`/product/${product?.id}/${getSafeUrl(product?.name)}`}>
                            <Image
                                loader={sanityIoImageLoader}
                                src={getImageObject(product?.images)?.url}
                                alt={getImageObject(product?.images)?.description || product?.name || 'Product'}
                                width="200"
                                height="200"
                                className="w-full h-full object-cover scale-100 hover:scale-105 focus:scale-105 ease-in duration-200 rounded-md"
                            />
                        </Link>
                    </div>
                </div>
                <div className="col-span-2 leading-tight p-2 pl-0">
                    <div className="font-bold font-simple overflow-hidden">
                        <p className="font-semibold truncate text-ellipsis md:text-lg text-base text-neutral-900 pt-2">{product?.name}</p>
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
                                    <div className="text-error-300 lt-sm:text-sm">No Ratings</div>
                                </div>
                        }
                        <div className=" flex flex-col gap-4 justify-between py-0.5 lt-sm:flex-row lt-sm:items-center">
                            <div className="text-neutral-800 font-bold text-lg lt-sm:text-base">
                                <span>{humanizeCurrency(product?.mrp)}</span>
                            </div>
                            {product?.inventories?.length != 0 ?
                                <div className="flex flex-row gap-4 items-center pt-1 w-full">
                                    <AddToCart addToCartBag={false} product={product}  inventory={getFirst(product?.inventories)}></AddToCart>
                                </div>
                                :
                                <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}