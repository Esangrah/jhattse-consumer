import React from "react";
import { Image } from "@renderer/image";
import { Link} from "react-router-dom"
import { TProductCategory } from "@components/types";
import { getSafeUrl, sanityIoImageLoader } from '@core/utils';
import { AiOutlineForward } from "react-icons/ai";


type Props = {
    element: TProductCategory;
};


export const ProductCategoryCard = ({ element }: Props) => {

    return (
        <div className="flex flex-col w-full bg-neutral-50">
            <div className="flex grow justify-center min-h-32 w-full">
                <Link to={`/category/${element?.id}/${getSafeUrl(element?.name)}`}>
                    <Image
                        loader={sanityIoImageLoader}
                        src={element?.image || "assets/esangrah-profile.png"}
                        alt={element?.name}
                        width="200"
                        height="200"
                        className="w-full h-full object-cover scale-100 hover:scale-105 focus:scale-105 ease-in duration-200"
                    />
                </Link>
            </div>
            <div className="leading-tight grid gap-1">
                <div className="font-simple text-left overflow-hidden">
                    <p className="text-sm text-neutral-900 text-ellipsis font-bold break-words line-clamp-1 md:line-clamp-none leading-tight">{element?.name}</p>
                    <p className="flex gap-1 text-neutral-500 text-sm">Total Products<span className="text-orange-800 font-semibold text-sm">{element?.total_products < 10 ? `${element?.total_products}` : `${Math.round(element?.total_products / 10) * 10}+`}</span></p>
                </div>
                <div className="bg-black text-neutral-50 w-full text-sm font-semibold py-1 flex flex-row whitespace-nowrap justify-center">
                    <Link to={`/category/${element?.id}/${getSafeUrl(element?.name)}`} className="flex flex-row items-center">See Products <AiOutlineForward /></Link>
                </div>
            </div>
        </div>
    )
}