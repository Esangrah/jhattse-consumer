import { TSearch, TData } from "@components/types";
import { AutoComplete, Input } from "antd";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { getSafeUrl } from "@core/utils";
import { Link} from "@renderer/Link";
import { navigate } from 'vite-plugin-ssr/client/router';
import { usePageContext } from "@renderer/usePageContext";

import { getSearch } from "@api/graphql/search";

interface Props {
    mode?: string;
    callback?: Function;
    theme?: string;
}

const renderTitle = (title: string, identifier: string) => (
    <span className="font-semibold font-md sm:font-sm">
        {title}
        <a
            className="text-sky-500"
            style={{ float: "right" }}
            href={`/search?q=&intent=${identifier}`}
        >
            more
        </a>
    </span>
);

const urlMap: Map<string, string> = new Map<string, string>([
    ["store", "store"],
    ["product", "product"],
    ["productcategory", "category"],
    ["brand", "brand"],
]);

const renderItem = (title: string, id: any, category: string) => ({
    value: title,
    label: (
        <Link
            href={
                id == 0
                    ? `/${category}`
                    : `/${urlMap.get(category)}/${id}/${getSafeUrl(title)}`
            }
        >
            <div className="flex">
                <span className="text-sm sm:text-xs">{title}</span>
            </div>
        </Link>
    ),
});

const initialOptions = new Map<string, any>([
    [
        "product",
        {
            label: renderTitle("Products", "product"),
            options: [renderItem("Trending Products", 0, "product/trending")],
        },
    ],
    [
        "store",
        {
            label: renderTitle("Stores", "store"),
            options: [renderItem("Nearby Stores", 0, "store")],
        },
    ],
    [
        "productcategory",
        {
            label: renderTitle("Product Category", "productcategory"),
            options: [renderItem("Trending Categories", 0, "category/list/trending")],
        },
    ],
    [
        "brand",
        {
            label: renderTitle("Brands", "brand"),
            options: [renderItem("Trending Brands", 0, "brand/explore")],
        },
    ],
]);

export const Searchbar: React.FC<Props> = ({ mode, callback, theme }) => {
    const [query, setQuery] = useState<TSearch>();
    const [options, setOptions] = useState<Map<string, any>>();
    const [searchInput, setSearchInput] = useState("");
    const pageContext = usePageContext();
    const queryParmas = pageContext.urlParsed?.search;
    const updateOptions = (identifier: string, result: TData[]) => {
        return {
            ...initialOptions.get(identifier),
            options: result
                .map((x: TData) => renderItem(x?.name, x?.id, identifier))
                .slice(0, 5),
        };
    };
    useEffect(() => {
        if (searchInput.length == 0) {
            setOptions(initialOptions);
        }
    }, [searchInput]);

    useEffect(() => {
        let q = queryParmas?.q;
        let intent = queryParmas?.intent;

        if (intent != undefined || mode != undefined) {
            let lookup = intent || mode;

            setOptions(new Map([[lookup, initialOptions.get(lookup)]]));
        } else {
            setOptions(initialOptions);
        }
        setQuery({
            ...query,
            descriptor: { ...query?.descriptor, q: q, intent: intent || "product" },
        });
    }, [pageContext.urlOriginal]);

    useEffect(() => {
        if (query?.descriptor?.q !== undefined && query?.descriptor?.q !== "") {
            const intent = mode !== undefined ? mode : "all"; // Set the intent to "all" if mode is undefined

            getSearch(query?.descriptor?.q, intent)
                .then((response) => {
                    const storeValues = response?.get_stores?.map((store: TData) => ({
                        name: store.name,
                        id: store.id,
                    }));

                    const productValues = response?.get_products?.map((product: TData) => ({
                        name: product.name,
                        id: product.id,
                    }));
                    const productCategoryValues = response?.get_productcategories?.map(
                        (productcategory: TData) => ({
                            name: productcategory.name,
                            id: productcategory.id,
                        })
                    );
                    const brandValues = response?.get_brands?.map(
                        (brand: TData) => ({
                            name: brand.name,
                            id: brand.id,
                        })
                    );

                    let newOptions = new Map<string, any>();
                    if (storeValues.length > 0) {
                        newOptions.set("store", updateOptions("store", storeValues));
                    }
                    if (productValues.length > 0) {
                        newOptions.set("product", updateOptions("product", productValues));
                    }
                    if (productCategoryValues.length > 0) {
                        newOptions.set(
                            "productcategory",
                            updateOptions("productcategory", productCategoryValues)
                        );
                    }
                    if (brandValues.length > 0) {
                        newOptions.set("store", updateOptions("brand", brandValues)
                        );
                    }
                    setOptions(newOptions);
                })
                .catch((err) => console.log("Error", err));
        }
    }, [query?.descriptor?.q]);

    const handleSearch = async (q: string) => {
        setQuery({
            ...query,
            descriptor: { ...query?.descriptor, q: q },
            context: {},
        });
    };

    const handleSelect = async (element, option) => {
        console.log(element, option)
        if (option?.label?.props?.href != undefined) {
            navigate(option?.label?.props?.href)
        }
    }

    return (
        <div className="search flex flex-row w-full grow-1 justify-center rounded-lg">
            <AutoComplete
                defaultActiveFirstOption
                popupClassName="p-1"
                style={{ width: "100%", borderRadius: "2px" }}
                popupMatchSelectWidth={true}
                options={Array.from(options === undefined ? [] : options.values())}
                notFoundContent={options && options.size === 0 && "No results found"}
                onSearch={handleSearch}
                onSelect={handleSelect}
            >
                <Input
                    size="large"
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={
                        mode == "product"
                            ? "Search Products in store"
                            : "Search Shop or Product"
                    }
                    className="text-neutral-700"
                    prefix={<MdSearch className="font-bold" size="1.5em" />}
                />
            </AutoComplete>
        </div>
    );
};
