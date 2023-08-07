import { SmallProductCard, SmallStoreCard } from "#components/cards";
import { ProductCardWithProvider } from "#components/cards/productcardwithprovider";
import { TStore, TProduct, TSearchResult } from "#components/types";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
    searchresults: TSearchResult[],
    element?: React.ElementType;
    noResult?: React.ReactNode;
    pageNumber?: number;
    setPageNumber?: any;
    isLoadMore?: boolean;
    isLoading?: boolean;
    isStorePage?:boolean;
}

export const SearchContainer: React.FC<Props> = ({ element, noResult = <span>Result not found</span>, searchresults, pageNumber, setPageNumber, isLoading, isLoadMore = true, isStorePage }: Props) => {
    let RepeatElement = element == undefined || element == null ? SmallProductCard : element;
    const { ref, inView } = useInView({
        threshold: 0,
        delay: 50
    });

    // Loader spinTransition
    const spinTransition = {
        loop: Infinity,
        ease: "easeInOut",
        duration: 1,
        repeat: Infinity
    };

    useEffect(() => {
        if (inView) {
            console.log("Load more triggered.")
            handleLoadMore();
        }
    }, [inView]);

    const handleLoadMore = () => {
        if (isLoadMore && pageNumber !== undefined) {
            setPageNumber(pageNumber + 1);
        }
    }
    
    return (
        <div className={(isLoading == false && searchresults?.length == 0) ? "flex flex-col w-full" : "flex flex-col"}>
            <>
                <div className={`grid md:grid-cols-2 grid-cols-1 gap-4 md:py-2 px-0 rounded-xl ${isStorePage && "divide-y"}`}>
                    {searchresults && searchresults?.map((searchresult: TSearchResult, index: number) => {
                        if (RepeatElement == SmallStoreCard) {
                            return (<RepeatElement store={searchresult as TStore} key={searchresult?.id}></RepeatElement>)
                        } else if (RepeatElement == SmallProductCard) {
                            return (<RepeatElement product={searchresult as TProduct} key={searchresult?.id}></RepeatElement>)
                        } else if (RepeatElement == SmallProductCard) {
                            return (<RepeatElement product={searchresult as TProduct} key={searchresult?.id}></RepeatElement>)
                        } else if (RepeatElement == ProductCardWithProvider) {
                            return (<RepeatElement product={searchresult as TProduct} key={searchresult?.id}></RepeatElement>)
                        } else {
                            return <RepeatElement element={searchresult} key={searchresult?.id}></RepeatElement>
                        }
                    })}
                </div>
                {
                    (isLoading == false && searchresults?.length == 0) ? <div className="flex w-full justify-center items-center">{noResult}</div> :
                        (isLoading == true ? <div className="flex h-44 w-full justify-center items-center">
                            <div className="relative">
                                <motion.span className="block box-border rounded-full w-12 h-12 border-2 border-solid border-ternary border-t-golden"
                                    animate={{ rotate: 360 }}
                                    transition={spinTransition}
                                />
                            </div>
                        </div>
                            :
                            (isLoadMore ?
                                <div className="flex flex-col items-center p-2" ref={ref}>
                                    <button disabled={!isLoadMore} className={!isLoadMore ? "white text-neutral active:bg-neutral-50 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border border-neutral-300 opacity-60" : "white text-neutral active:bg-neutral-50 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border border-neutral-300"} onClick={() => handleLoadMore()}>{!isLoadMore ? "No more products" : "Load More"}</button>
                                </div> : null))
                }
            </>
        </div>
    )
}