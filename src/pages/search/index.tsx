import React, { useEffect, useState } from "react";
import { search } from "@api/search";
import {
  ProductCategoryCard,
  SmallProductCard,
  SmallStoreCard,
} from "@components/cards";
import { SearchContainer } from "@components/container";
import { BackBar, Searchbar } from "@components";
import {
  TInventory,
  TProduct,
  TProductCategory,
  TSearchResult,
  TStore,
} from "@components/types";
import { MdSearch } from "react-icons/md";
import { motion } from "framer-motion";
import { usePageContext } from "@renderer/usePageContext";

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1,
  repeat: Infinity,
};

export const Page: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const pageContext = usePageContext()
  const [searchresult, setSearchResult] = useState<TSearchResult[]>();
  const [storeType, setStoreType] = useState("All");
  const [filteredResult, setFilteredResults] = useState<TSearchResult[]>();

  let q = pageContext.urlParsed?.search?.q;
  let intent = pageContext.urlParsed?.search?.intent;

  useEffect(() => {
    if (storeType == "All") {
      setFilteredResults(searchresult);
    } else {
      if (intent == "product") {
        setFilteredResults(
          (searchresult as TProduct[]).filter(
            (x: TProduct) =>
              x.inventories.filter((i: TInventory) => i.store.type == storeType)
                .length > 0
          )
        );
      } else if (intent == "store") {
        setFilteredResults(
          (searchresult as TStore[]).filter((x: TStore) => x.type == storeType)
        );
      } else {
        setFilteredResults(searchresult as TProductCategory[]);
      }
    }
  }, [searchresult, storeType, intent]);

  useEffect(() => {
    if (q != undefined) {
      setLoading(true);
      const res: Promise<TSearchResult[]> = search({
        descriptor: { q, intent },
        context: {},
      });
      res.then((searchresult) => {
        setSearchResult(searchresult);
        setLoading(false);
      });
    }
  }, [q, intent]);

  return (
    <div className="h-screen">
      <BackBar />
      <div className="px-20 sm:px-0">
        <div className="p-2">
          <div className="flex justify-center">
            <Searchbar />
          </div>
          <div className="grid grid-cols-2 py-2">
            <h3 className="flex justify-start sm:text-sm gap-1 text-bold inline mt-2">
              Showing results for
              <span className="font-semibold text-neutral-900 inline">{q}</span>
            </h3>
            <h3 className="flex justify-end sm:text-sm text-bold mt-2 ">
              <span className="font-semibold text-neutral-900">Total:</span>{" "}
              {filteredResult?.length}
            </h3>
          </div>
          {intent != "productcategory" && (
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => {
                  setStoreType("All");
                }}
                className="border-2 border-solid border-error-500 text-error-500 bg-turnery hover:bg-error-500 hover:text-neutral-50 focus:bg-error-500 focus:text-neutral-50"
              >
                All
              </button>
              <button
                onClick={() => {
                  setStoreType("Local");
                }}
                className="border-2 border-solid border-error-500 text-error-500 bg-turnery hover:bg-error-500 hover:text-neutral-50 focus:bg-error-500 focus:text-neutral-50"
              >
                Local
              </button>
              <button
                onClick={() => {
                  setStoreType("Online");
                }}
                className="border-2 border-solid border-error-500 text-error-500 bg-turnery hover:bg-error-500 hover:text-neutral-50 focus:bg-error-500 focus:text-neutral-50"
              >
                Online
              </button>
            </div>
          )}
        </div>
        {loading ? (
          <div className="flex h-44 justify-center items-center">
            <div className="relative">
              <motion.span
                className="block box-border rounded-full w-12 h-12 border-2 border-solid border-ternary border-t-golden"
                animate={{ rotate: 360 }}
                transition={spinTransition}
              />
            </div>
          </div>
        ) : (
          <div>
            {filteredResult?.length != 0 ? (
              <div>
                {intent == "product" && (
                  <SearchContainer
                    searchresults={filteredResult}
                    element={SmallProductCard}
                  />
                )}
                {intent == "store" && (
                  <SearchContainer
                    searchresults={filteredResult}
                    element={SmallStoreCard}
                  />
                )}
                {intent == "productcategory" && (
                  <SearchContainer
                    searchresults={filteredResult}
                    element={ProductCategoryCard}
                  />
                )}
              </div>
            ) : (
              <div className="flex h-screen justify-center animate-pulse duration-1000 p-3 h-full w-full">
                <div>
                  <MdSearch className="h-36 w-full font-normal" />
                  <div>
                    <h3 className="flex justify-center text-xl">
                      OOPS ! NO RESULTS FOUND
                    </h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
