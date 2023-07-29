import React from "react";
import { Image } from "@renderer/Image";
import { Link} from "@renderer/Link"
import { TProductCategory } from "@components/types";
import { getSafeUrl, sanityIoImageLoader } from "@core/utils";

type Props = {
    product: TProductCategory;
};


export const SmallCategoryCard: React.FC<Props> = ({ product }) => {
    return (
        <div className="relative flex-shrink-0 w-28">
            <div className="p-2 w-full flex flex-col justify-end">
                <div className="flex justify-center">
                    <Link href={`/category/${product.id}/${getSafeUrl(product.name)}`}>
                        <Image
                            loader={sanityIoImageLoader}
                            src={product.image || "assets/esangrah-profile.png"}
                            alt={product.name}
                            width="40"
                            height="40"
                            className="rounded-full aspect-square"
                        />
                    </Link>
                </div>
                <Link href={`/category/${product.id}/${getSafeUrl(product.name)}`}>
                    <div className="font-semibold font-simple overflow-hidden line-clamp-2 md:line-clamp-none">
                        <p className="text-neutral-900 text-xs text-ellipsis text-center">{product.name}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}