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
        <div className="flex flex-col bg-neutral-50 rounded-lg border border-neutral-300 overflow-hidden w-full">
            {product.tag &&
                <div className="absolute top-3 right-0 z-10 w-max rounded-l-md font-medium text-neutral-700 bg-brand-500 py-0.5 px-2 select-none">
                    {product.tag}
                </div>
            }
            <div className="flex flex-row gap-4">
                <Link href={`/product/${product.id}/${getSafeUrl(product.name)}`}>
                    <div className="relative flex justify-center w-40 h-40">
                            <Image
                                loader={sanityIoImageLoader}
                                src={getImageObject(product.images)?.url}
                                alt={getImageObject(product.images)?.description || product.name || ''}
                                width="200"
                                height="200"
                                className="w-40 h-full object-contain scale-100 hover:scale-105 focus:scale-105 ease-in duration-200"
                            />
                    </div>
                </Link>
                <div className="p-2 leading-tight w-full font-bold overflow-hidden">
                    <p className="font-medium truncate text-ellipsis md:text-lg text-base text-neutral-900 pt-2">{product.name}</p>
                    <div className="flex flex-row gap-2">
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
                                    <div className="text-error-300">No Ratings</div>
                                </div>
                        }
                    </div>
                    <div className=" flex flex-col gap-4 justify-between py-0.5">
                        <div className="text-neutral-700 font-bold text-custom_black text-lg">
                            <span>{humanizeCurrency(product.mrp)}</span>
                        </div>
                        {product?.inventories?.length != 0 ?
                            <div className="flex flex-row gap-4 pt-1 w-full">
                                <CartButtonV2 product={product} inventory={getFirst(product?.inventories)} mode={"trending"}></CartButtonV2>
                            </div>
                            :
                            <></>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}