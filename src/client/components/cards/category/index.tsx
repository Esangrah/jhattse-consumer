import React from "react";
import { Image } from "@renderer/image";
import { Link} from "@renderer/Link"
import { TProductCategory } from "@components/types";
import { getSafeUrl, sanityIoImageLoader } from "@core/utils";

type Props = {
    product: TProductCategory;
};


export const CategoryCard: React.FC<Props> = ({ product }) => {
    return (
        <div className="relative flex-shrink-0 w-32">
            <div className="p-2 w-full text-center flex flex-col justify-end gap-1">
                <div className="flex justify-center rounded-full bg-brand-100 p-1">
                    <Link href={`/category/${product.id}/${getSafeUrl(product.name)}`}>
                        <Image
                            loader={sanityIoImageLoader}
                            src={product.image || "assets/esangrah-profile.png"}
                            alt={product.name}
                            width="128"
                            height="128"
                            className="rounded-full aspect-square"
                        />
                    </Link>
                </div>
                <Link href={`/category/${product.id}/${getSafeUrl(product.name)}`}>
                    <div className="font-bold font-simple overflow-hidden line-clamp-2 md:line-clamp-none">
                        <p className="text-neutral-900 text-sm text-ellipsis text-center leading-tight">{product.name}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}