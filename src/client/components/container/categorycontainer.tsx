import { ProductCategoryCard } from "@components/cards";
import { TProductCategory } from "@components/types";
import React from "react";

interface Props {
    categories: TProductCategory[];
    element?: React.ElementType;
}

export const ProductCategoryContainer: React.FC<Props> = ({ categories, element }) => {

    let RepeatElement = element == undefined || element == null ? ProductCategoryCard : element;
    return (
        <div className="flex flex-col gap-1 rounded-t-xl px-4">
            <div className="grid grid-flow-row-dense lt-sm:grid-cols-2 md:grid-cols-3 grid-cols-6 gap-4 rounded-t-xl">
                {categories && categories.map((category: TProductCategory) => (
                    <RepeatElement element={category} key={category.id}></RepeatElement>
                ))}
            </div>
        </div>
    )
}