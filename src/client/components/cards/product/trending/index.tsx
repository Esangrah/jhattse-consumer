import React from "react";
import { Image } from "@renderer/Image";
import { Link} from "@renderer/Link"
import { Star } from "@components/star"
import { TProduct } from "@components/types";
import { getFirst, getImageObject, getSafeUrl, humanizeCurrency, sanityIoImageLoader } from '@core/utils';
import { CartButtonV2 } from "@components/cartbutton/v2";

type Props = {
    product: TProduct;
};


export const TrendingProductCard: React.FC<Props> = ({ product }) => {

    return (
        <div className="flex flex-col bg-neutral-50 rounded-md">
            {product.tag &&
                <div className="absolute top-3 right-0 z-10 w-max rounded-l-md font-medium text-neutral-700 bg-brand-500 py-0.5 px-2 select-none">
                    {product.tag}
                </div>
            }
            <div className="grid grid-cols-3 p-2 gap-4">
                <div className="col-span-1">
                    <div className="relative flex justify-center max-h-44">
                        <Link href={`/product/${product.id}/${getSafeUrl(product.name)}`}>
                            <Image
                                loader={sanityIoImageLoader}
                                src={getImageObject(product.images)?.url}
                                alt={getImageObject(product.images)?.description || product.name || ''}
                                width="200"
                                height="200"
                                className="w-full h-full object-cover scale-100 hover:scale-105 focus:scale-105 ease-in duration-200"
                            />
                        </Link>
                    </div>
                </div>
                <div className="col-span-2 leading-tight">
                    <div className="font-bold font-simple overflow-hidden">
                        <p className="font-medium truncate text-ellipsis text-lg sm:text-base  text-custom_black pt-2">{product.name}</p>
                        {
                            product?.stats != null && product?.stats != undefined ?
                                <div className="py-2">
                                    <div className="pb-1">
                                        <Star rating={product?.stats?.rating_overall} />
                                        {/* <p className="text-neutral-500">{product?.stats?.rating_count}+ ratings</p> */}
                                    </div>
                                </div>
                                :
                                <div className="py-2">
                                    <div className="text-neutral-500">No Ratings</div>
                                </div>
                        }
                        <div className=" flex flex-col gap-4 justify-between py-0.5">
                            <div className="text-neutral-900 font-bold text-custom_black text-lg">
                                <span>{humanizeCurrency(product.mrp)}</span>
                            </div>
                            {product?.inventories?.length != 0 ?
                                <div className="flex flex-row gap-4 items-center pt-1 w-full">
                                    <CartButtonV2 product={product} inventory={getFirst(product?.inventories)} mode={"trending"}></CartButtonV2>
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