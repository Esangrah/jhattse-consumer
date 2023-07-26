import { ExporeBrandCard } from "@components/cards/brands/explore";
import { TBrand } from "@components/types";
import React from "react";

interface Props {
    brands: TBrand[];
    element?: React.ElementType;
}

export const BrandContainer: React.FC<Props> = ({ brands, element }) => {

    let RepeatElement = element == undefined || element == null ? ExporeBrandCard : element;
    return (
        <div className="flex flex-col gap-1 rounded-t-xl p-4">
            {/* <div className="p-2 bg-neutral-800 text-neutral-50 font-semibold text-lg rounded-t-xl">{title}</div> */}
            <div className="grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-3 grid-cols-5 gap-4 rounded-t-xl">
                {brands && brands.map((brand: TBrand) => (
                    <RepeatElement brand={brand} key={brand.id}></RepeatElement>
                ))}
            </div>
        </div>
    )
}