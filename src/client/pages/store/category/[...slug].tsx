import React, { useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import dynamic from 'next/dynamic'
import Head from 'react-helmet';
import { Container, Title } from "@components";
import { SmallStoreCard } from "@components/cards";
import { SearchContainer } from "@components/container"
import { TStore, TStoreCategory } from "@components/types";
import { getNearestStores } from "@api/store";
import { getStoreCategory } from "@api/storecategory";
import { getSafeUrl } from "@core/utils";
import { BiStore } from "react-icons/bi";
import { useLocation } from "react-router-dom";

const Header = dynamic(() => import("../../../src/components/header").then((mod) => mod.Header), {
    ssr: false,
})

const Navbar = dynamic(() => import("../../../src/components/navbar").then((mod) => mod.Navbar), {
    ssr: false,
})

interface Props {
    initialStoreCategory?: TStoreCategory
}


export const getServerSideProps: GetServerSideProps<{ initialStoreCategory: TStoreCategory }> = async (context) => {
    const { slug } = context.params;
    const initialStoreCategory: TStoreCategory = await getStoreCategory(parseInt(slug[0] as string));

    return {
        props: {
            initialStoreCategory,
        },
    }
}


const StoreList: React.FC = ({ initialStoreCategory }: Props) => {
    const [stores, setStores] = useState<TStore[]>([]);
    const [storeCategory, setStoreCategory] = useState<TStoreCategory>(initialStoreCategory);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const pageSize = 10;

    useEffect(() => {
        let id = queryParams?.get("slug");
        if (id == storeCategory?.id.toString()) {
            return
        }
        const res: Promise<TStoreCategory> = getStoreCategory(parseInt(id));
        res.then((store) => { setStoreCategory(store); });
    }, [location])


    useEffect(() => {
        if (storeCategory?.id !== undefined) {
            const res: Promise<TStore[]> = getNearestStores(storeCategory?.id, pageNumber * pageSize, pageSize);
            res.then((allStores) => 
            {
                setIsLoadMore(allStores.length == pageSize)
                setStores([...stores, ...allStores]);
            })
           
        }
    }, [storeCategory, pageNumber])


    return (
        <Container>
            <Head>
                <title>{`${storeCategory.name} Near You - Jhattse`}</title>
                <meta name="Keywords" content={`${storeCategory.name} around me,Stores around me,Local Services,Online Shopping,Jhattse`} />
                <meta name="Description" content={`Find ${storeCategory.name} stores and services around you whether local or online. Jhattse provides best price and all available deals and offers.`} />
                <link rel="canonical" href={`https://jhattse.com/store/category/${storeCategory.id}/${getSafeUrl(storeCategory.name)}`} />
                <meta property="og:title" content={`${storeCategory.name} Near You - Jhattse`} />
                <meta property="og:description" content={`Find ${storeCategory.name} and services around me whether local or online. Jhattse provides product visiblity, best price discovering and all available deals and offers.`} />
                <meta property="og:url" content={`https://jhattse.com/store/category/${storeCategory.id}/${getSafeUrl(storeCategory.name)}`} />
            </Head>
            <Header />
            <Title title={`Stores near you > ${storeCategory.name}`} />
            <div className="flex p-2">
                        <SearchContainer searchresults={stores} element={SmallStoreCard} 
                        isLoadMore={isLoadMore}
                        isLoading={isLoading}
                        pageNumber={pageNumber} 
                        noResult={<div className="flex justify-center p-3 h-full  w-full sm:w-full">
                        <div>
                            <BiStore
                                className="h-52 w-full font-normal"
                            />
                            <div>
                                <h3 className="flex justify-center text-2xl">Result not found</h3>
                                {/* <p className="flex justify-center text-2xl text-neutral-900">Looks like you have not added anything to your cart.</p> */}
                            </div>
                        </div>
                    </div>} 
                    setPageNumber={setPageNumber} 
                    />
            </div>
            <Navbar />
        </Container>
    );
};

export default StoreList;