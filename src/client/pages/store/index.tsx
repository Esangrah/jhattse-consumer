import dynamic from 'next/dynamic';
import Head from 'react-helmet';
import React, { useEffect, useRef, useState } from "react";
import { Container, Title } from "@components";
import { SmallStoreCard } from "@components/cards";
import { SearchContainer } from "@components/container"
import { TCategory, TStore } from "@components/types";
import { getNearestStores } from "@api/store";
import { getStoreCategories } from "@api/storecategory";
import gsap from "gsap";
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import { BiStore } from 'react-icons/bi';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

const Header = dynamic(() => import("../../src/components/header").then((mod) => mod.Header), {
    ssr: false,
})

const Navbar = dynamic(() => import("../../src/components/navbar").then((mod) => mod.Navbar), {
    ssr: false,
})

const StoreList: React.FC = () => {
    const [stores, setStores] = useState<TStore[]>([]);
    const [categories, setCategories] = useState<TCategory[]>([]);
    let scrl = useRef(null);
    const [categoryId, setCategoryId] = useState(null);
    const [scrollX, setscrollX] = useState(0);
    const [scrolEnd, setscrolEnd] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const pageSize = 10;

    //Slide click
    const slide = (shift: number) => {
        scrl.current.scrollLeft += shift;
        setscrollX(scrollX + shift);

        if (
            Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
            scrl.current.offsetWidth
        ) {
            setscrolEnd(true);
        } else {
            setscrolEnd(false);
        }
    };


    const anim = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        gsap.from(e.target, { scale: 1 });
        gsap.to(e.target, { scale: 1.25 });
    };
    const anim2 = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        gsap.from(e.target, { scale: 1.25 });
        gsap.to(e.target, { scale: 1 });
    };

    const scrollCheck = () => {
        setscrollX(scrl.current.scrollLeft);
        if (
            Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
            scrl.current.offsetWidth
        ) {
            setscrolEnd(true);
        } else {
            setscrolEnd(false);
        }
    };

    const getAllNearestStores = (extend: boolean = true) => {
        setIsLoading(true)
        const res: Promise<TStore[]> = getNearestStores(categoryId, pageNumber, pageSize);
        res.then((result) => {
            setIsLoadMore(result?.length == pageSize);
            setIsLoading(false)
            if (extend) {
                setStores([...stores, ...result])
            } else {
                setStores(result);
            }
        });
    }

    useEffect(() => {
        const result: Promise<TCategory[]> = getStoreCategories();
        result.then((categories) => setCategories(categories));
    }, [])


    useEffect(() => {
        getAllNearestStores(pageNumber != 0);
    }, [pageNumber])

    useEffect(() => {
        if (pageNumber == 0) {
            getAllNearestStores(pageNumber != 0);
        } else {
            setPageNumber(0);
        }
    }, [categoryId])

    const handleCategory = (category_id: number) => {
        setCategoryId(category_id);
    }

    return (
        <Container>
            <Head>
                <title>Stores Near You - Jhattse</title>
                <meta name="Keywords" content="Local Stores,Local+Online Stores,Stores near you,Local Services,Online Shopping,Jhattse" />
                <meta name="Description" content="Find Stores and services near me whether local or online. Jhattse provides product visiblity, best price discovering and all available deals and offers." />
                <link rel="canonical" href={`https://jhattse.com/store`} />
                <meta property="og:title" content="Stores Near You - Jhattse" />
                <meta property="og:description" content="Find Stores and services around you whether local or online. Jhattse provides product visiblity, best price discovering and all available deals and offers." />
                <meta property="og:url" content={`https://jhattse.com/store`} />
            </Head>
            <Header />
            <div className="px-20 sm:px-2">
                <div className="sm:hidden h-20 flex items-center text-sm text-manrope">
                    <Breadcrumb className="font-normal text-lg list-none text-breadcrumbs">
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem className='font-normal text-ellipsis text-left break-words line-clamp-1' isCurrentPage>
                            <BreadcrumbLink href={`/store`}>Stores Near You</BreadcrumbLink>
                            <ol className="p-0 list-none"></ol>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <Title title="Stores near you" customStyle="text-lg font-bold select-none text-bannerText sm:pt-2" />
                <div className="h-4"></div>
                <div className="flex flex-row gap-2">
                    {scrollX !== 0 && (
                        <button
                            className="prev text-neutral-900 font-semibold p-1 text-xs bg-neutral-50 hover:bg-neutral-100 focus:bg-neutral-100 rounded-full"
                            onClick={() => slide(-200)}
                            onMouseEnter={(e) => anim(e)}
                            onMouseLeave={(e) => anim2(e)}
                        >
                            <GrFormPrevious />
                        </button>
                    )}
                    <div ref={scrl} onScroll={scrollCheck} className="flex flex-row overflow-x-scroll no-scrollbar gap-2">
                        <div className="shrink-0 ">
                            <button className={`text-neutral-900 font-semibold p-1 text-xs bg-neutral-50 hover:bg-neutral-900 hover:text-neutral-50 focus:bg-neutral-900 focus:text-neutral-50 rounded-sm ${categoryId == null && "bg-neutral-900 text-neutral-50"}`} onClick={() => { handleCategory(null); }}>All</button>
                        </div>

                        {categories && categories.map((category: TCategory) =>
                            <div key={category?.id} className="shrink-0 ">
                                <button className="text-neutral-900 font-semibold p-1 text-xs bg-neutral-50 hover:bg-neutral-900 hover:text-neutral-50 focus:bg-neutral-900 focus:text-neutral-50 rounded-sm" onClick={() => { handleCategory(category?.id) }}>{category?.name}</button>
                            </div>
                        )}
                    </div>
                    {!scrolEnd && (
                        <button
                            className="next text-neutral-900 font-semibold p-1 text-xs bg-neutral-50 hover:bg-neutral-100 focus:bg-neutral-100 rounded-full"
                            onClick={() => slide(+200)}
                            onMouseEnter={(e) => anim(e)}
                            onMouseLeave={(e) => anim2(e)}
                        >
                            <GrFormNext className="text-neutral-50" />
                        </button>
                    )}
                </div>
                <div className="flex py-2">
                    <SearchContainer
                        searchresults={stores}
                        element={SmallStoreCard}
                        noResult={
                            <div className="flex justify-center p-3 h-full  w-full sm:w-full">
                                <div>
                                    <BiStore
                                        className="h-52 w-full font-normal"
                                    />
                                    <div>
                                        <h3 className="flex justify-center text-2xl">Result not found</h3>
                                        {/* <p className="flex justify-center text-2xl text-neutral-900">Looks like you have not added anything to your cart.</p> */}
                                    </div>
                                </div>
                            </div>
                        }
                        isLoading={isLoading}
                        isLoadMore={isLoadMore}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber} />
                </div>
            </div>
            <Navbar />
        </Container>
    );
};

export default StoreList;
