import React from "react";
import { Image } from "@renderer/Image";
import { Link } from "@renderer/Link"
import { Star } from "@components/star";
import { TProduct } from "@components/types";
import {
    getFirst,
    getImageObject,
    getLength,
    getSafeUrl,
    humanizeCurrency,
    sanityIoImageLoader,
} from "@core/utils";
import { AddToCart } from "@components/addtocart";

type Props = {
    product: TProduct;
};

export const RichCard: React.FC<Props> = ({ product }) => {
    return (
        <div className="relative flex-shrink-0 w-60 sm:w-40 bg-neutral-50 border-neutral-200 rounded-lg border">
            {product.tag && (
                <div className="absolute top-3 right-2 z-10 w-max rounded font-medium text-neutral-50 bg-brand-900 py-0.5 px-2 select-none uppercase">
                    {product.tag}
                </div>
            )}
            <div className="w-full h-full text-center flex flex-col">
                <div className="flex grow justify-center h-44 sm:h-28">
                    <Link href={`/product/${product.id}/${getSafeUrl(product.name)}`}>
                        <Image
                            loader={sanityIoImageLoader}
                            src={getImageObject(product.images)?.url}
                            alt={getImageObject(product.images)?.description || product.name || 'Product'}
                            width="200"
                            height="200"
                            className="flex items-center justify-center w-60 sm:w-40 h-full object-cover rounded-t-xl"
                        />
                    </Link>
                </div>
                <div className="flex flex-col gap-2 p-2">
                    <div className="leading-tight py-2 font-medium font-simple overflow-hidden">
                        <p className="text-lg sm:text-sm text-neutral-700 text-left break-words line-clamp-2 leading-tight py-1 h-12">
                            {product.name}
                        </p>
                    </div>
                    {product?.stats?.rating_overall ? (
                        <Star rating={product?.stats?.rating_overall} />
                    ) : (
                        <div className="flex flex-row gap-1 justify-between items-center text-neutral-500">
                            No Reviews
                        </div>
                    )}
                    <div className="flex flex-row gap-1 justify-between items-center">
                        {getLength(product?.inventories) > 0 ? (
                            <div className="flex flex-row gap-1 flex-1">
                                <div className="text-lg sm:text-sm text-neutral-700 font-bold flex flex-1 gap-1 justify-start">
                                    {humanizeCurrency(getFirst(product?.inventories)?.price) || humanizeCurrency(getFirst(product?.inventories)?.mrp)}
                                    {getFirst(product?.inventories)?.price !== getFirst(product?.inventories)?.mrp &&
                                        <div className="text-base sm:text-xs text-neutral-500 font-bold justify-start line-through flex items-center">
                                            {humanizeCurrency(getFirst(product?.inventories)?.mrp || product.mrp)}
                                        </div>
                                    }
                                </div>

                            </div>
                        ) : (
                            <div>
                                <p className="text-sm text-error-400">Unavailable</p>
                            </div>
                        )}
                        {product?.inventories?.length != 0 ? (
                            <div className="flex flex-1 flex-row gap-4 items-center align-bottom">
                                <AddToCart
                                    addToCartBag={false}
                                    product={product}
                                    inventory={getFirst(product?.inventories)}
                                ></AddToCart>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
