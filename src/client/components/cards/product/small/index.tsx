import { Star } from '@components/star';
import { TProduct, TVariant } from '@components/types';
import { Image } from "@renderer/Image";;
import { Link } from '@renderer/Link';
import { getFirst, getImageObject, getImageUrl, getLength, getSafeUrl, humanizeCurrency, sanityIoImageLoader, trimToLength } from '@core/utils';
import { AddToCart } from '@components/addtocart';
import { useState } from 'react';
import { getCombinedName, inventoryByVariantId } from '@components/variant/variantSelector';

type Props = {
    product: TProduct;
};

export const SmallProductCard = ({ product }: Props) => {
    const [variant, setVariant] = useState<TVariant>(product?.variants?.find((variant) => getFirst(inventoryByVariantId(variant, product))?.is_available == true) as TVariant)

    return (
        <div className="flex flex-col bg-neutral-50 rounded-md">
            <div className="grid grid-cols-3 items-start px-2 py-2 sm:px-0 gap-4" >
                <div className="col-span-1">
                    <div className="relative flex justify-center max-h-44" >
                        <Link href={`/product/${product.id}/${getSafeUrl(product.name)}`}>
                            <Image
                                loader={sanityIoImageLoader}
                                src={getImageObject(product.images)?.url}
                                alt={getImageObject(product.images)?.description || product.name || 'Product'}
                                width="150"
                                height="150"
                                className="w-full h-full object-cover max-h-44"
                            />
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-4 justify-start col-span-2">
                    <div className="flex flex-col gap-2 leading-tight">
                        <Link href={`/product/${product.id}/${getSafeUrl(product?.name)}`}>
                            <div className="font-medium truncate text-ellipsis text-base sm:text-base">{trimToLength(getCombinedName(product, variant?.id), 40)}</div>
                        </Link>
                        {product?.stats?.rating_overall ?
                            <div>
                                <Star rating={product?.stats?.rating_overall} />
                            </div>
                            :
                            <div className="text-neutral-500">No Reviews</div>
                        }
                        {getLength(product?.inventories) > 0 ?
                            <div className="price">
                                <span className="text-custom_black font-bold text-xl sm:text-base">{humanizeCurrency(getFirst(product?.inventories)?.price || product?.mrp)}</span>
                                {/* <span className="font-bold text-success-300">{product.offer}</span> */}
                            </div>
                            :
                            <p className="text-error-400">Unavailable</p>
                        }
                    </div>
                    {getLength(product?.inventories) > 0 ?
                        <div className="flex flex-row gap-4 items-center w-32">
                            <AddToCart product={product} inventory={getFirst(product?.inventories)} ></AddToCart>
                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    )
}
