import React from "react";
import { Image } from "@renderer/Image";
import { Link} from "@renderer/Link"
import { TProduct } from "@components/types";
import { getImageObject, getSafeUrl, sanityIoImageLoader } from '@core/utils';

type Props = {
    product: TProduct;
};


export const SimpleCard: React.FC<Props> = ({ product }) => {
    return (
        <div key={product.id} className="bg-neutral-50 rounded-xl shrink-0 h-max w-52 sm:w-40 p-2">
            <div className="flex justify-center h-36 sm:h-32">
                <Link href={`/product/${product.id}/${getSafeUrl(product.name)}`}>
                    <Image
                        loader={sanityIoImageLoader}
                        priority ={true}
                        className="w-full h-full object-cover"
                        src={getImageObject(product.images)?.url}
                        alt={getImageObject(product.images)?.description || product.name || ''}
                        width="150"
                        height="150"
                        loading="eager"
                    />
                    {/* <Carousel images={product.images} /> */}
                </Link>
            </div>
            <div className="font-bold overflow-hidden h-12"><p className="text-sm text-neutral-900 text-ellipsis break-words line-clamp-2 md:line-clamp-none leading-tight">{product.name}</p></div>
        </div>
    )
}