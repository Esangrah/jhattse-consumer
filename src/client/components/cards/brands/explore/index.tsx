import React from "react";
import { Image } from "@renderer/image";
import { Link} from "@renderer/Link"
import { TBrand } from "@components/types";
import { getSafeUrl, sanityIoImageLoader } from '@core/utils';
import { AiOutlineForward } from "react-icons/ai";


type Props = {
    brand: TBrand;
};


export const ExporeBrandCard = ({ brand }: Props) => {

    return (
        <div className="flex flex-col rounded scale-100 hover:scale-105 focus:scale-105 ease-in duration-200 w-full bg-neutral-50">
            <div className="flex grow justify-center min-h-32 w-full">
                <Link href={`/brand/${brand.id}/${getSafeUrl(brand.name)}`}>
                    <Image
                        loader={sanityIoImageLoader}
                        src={brand?.image || "assets/esangrah-profile.png"}
                        alt={brand?.name}
                        width="200"
                        height="200"
                        className="w-full h-full rounded-t object-cover"
                    />
                </Link>
            </div>
            <div className="leading-tight rounded-b border border-gray-300 grid gap-1 p-4">
                <div className="font-simple text-left overflow-hidden">
                    <Link href={`/brand/${brand.id}/${getSafeUrl(brand.name)}`}>
                        <p className="text-sm select-none text-neutral-900 text-ellipsis font-bold break-words line-clamp-1 md:line-clamp-none leading-tight">{brand?.name}</p>
                    </Link>
                    <p className="flex gap-1 select-none text-neutral-500 text-sm">Total Products<span className="text-orange-800 font-semibold text-sm">{brand?.total_products == null ? 0 : brand?.total_products < 10 ? `${brand?.total_products}` : `${Math.round(brand?.total_products / 10) * 10}+`}</span></p>
                </div>
                {/* <div className="bg-black text-neutral-50 w-full text-sm font-semibold py-1 flex flex-row whitespace-nowrap justify-center">
                    <Link href={`/category/${brand?.id}/${getSafeUrl(brand?.name)}`} className="flex flex-row items-center">See Products <AiOutlineForward /></Link>
                </div> */}
            </div>
        </div>
    )
}