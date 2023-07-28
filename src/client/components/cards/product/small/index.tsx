import { Star } from '@components/star';
import { TProduct, TVariant } from '@components/types';
import { Image } from "@renderer/image";;
import { Link } from '@renderer/Link';
import { getImageObject, getImageUrl, getSafeUrl, humanizeCurrency, sanityIoImageLoader, trimToLength } from '@core/utils';
import { AddToCart } from '@components/addtocart';
import { useState } from 'react';
import { getCombinedName, inventoryByVariantId } from '@components/variant/variantSelector';

type Props = {
    product: TProduct;
};

export const SmallProductCard = ({ product }: Props) => {
    const [variant, setVariant] = useState<TVariant>(product?.variants?.length > 0 && product?.variants?.filter((variant) => inventoryByVariantId(variant, product)[0]?.is_available == true)[0])

    return (
        <div className="flex flex-col bg-neutral-50 rounded-md">
            <div className="grid grid-cols-3 items-start px-2 py-2 sm:px-0 gap-4" >
                <div className="col-span-1">
                    <div className="relative flex justify-center max-h-44" >
                        <Link href={`/product/${product.id}/${getSafeUrl(product.name)}`}>
                            <Image
                                loader={sanityIoImageLoader}
                                src={getImageObject(product.images)?.url}
                                alt={getImageObject(product.images)?.description || product.name}
                                width="150"
                                height="150"
                                className="w-full h-full object-cover max-h-44"
                            />
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-4 justify-start col-span-2">
                    <div className="flex flex-col gap-2 leading-tight">
                        <Link href={`/product/${product.id}/${getSafeUrl(product.name)}`}>
                            <div className="font-medium truncate text-ellipsis text-base sm:text-base">{trimToLength((variant?.id !== undefined ? getCombinedName(product, variant?.id) : product?.name), 40)}</div>
                        </Link>
                        {product?.stats?.rating_overall ?
                            <div>
                                <Star rating={product?.stats?.rating_overall} />
                            </div>
                            :
                            <div className="text-neutral-500">No Reviews</div>
                        }
                        {/* <div className="text-slate-500">
                            MRP ₹<span className={`${product?.inventories?.length > 0 && product?.mrp <= product?.inventories[0]?.price ? "" : "line-through"}`}>{product.mrp}</span>
                        </div> */}
                        {product?.inventories?.length > 0 ?
                            <div className="price">
                                <span className="text-custom_black font-bold text-xl sm:text-base">{humanizeCurrency(product?.inventories[0]?.price || product?.mrp)}</span>
                                {/* <span className="font-bold text-success-300">{product.offer}</span> */}
                            </div>
                            :
                            <p className="text-error-400">Unavailable</p>
                        }
                    </div>
                    {product?.inventories?.length > 0 ?
                        <div className="flex flex-row gap-4 items-center w-32">
                            <AddToCart product={product} inventory={product?.inventories?.length > 0 ? product?.inventories[0] : null} ></AddToCart>
                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    )
}
