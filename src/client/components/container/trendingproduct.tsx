import { TrendingProductCard } from "@components/cards/product/trending";
import { TProduct } from "@components/types";
import React from "react";

interface Props {
    products: TProduct[];
    element?: React.ElementType;
}

export const TrendingProductContainer: React.FC<Props> = ({ products, element }) => {

    let RepeatElement = element == undefined || element == null ? TrendingProductCard : element;
    return (
        <div className="flex flex-col gap-1 rounded-t-xl">
            {/* <div className="p-2 bg-neutral-800 text-neutral-50 font-semibold text-lg rounded-t-xl">{title}</div> */}
            <div className="flex flex grid grid-cols-2 md:grid-cols-1 gap-4 rounded-xl">
                {products && products.map((product: TProduct) => (
                    <RepeatElement product={product} key={product.id}></RepeatElement>
                ))}
            </div>
        </div>
    )
}