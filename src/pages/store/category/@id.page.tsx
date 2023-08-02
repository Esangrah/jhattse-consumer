import React, { useEffect, useRef, useState } from "react";
import Head from 'react-helmet';
import { Container } from "@components/container"
import { Header } from "@components/header"
import { Navbar } from "@components/navbar";
import { Title } from "@components/header/title";
import { SmallStoreCard } from "@components/cards";
import { SearchContainer } from "@components/container"
import { TStore, TStoreCategory } from "@components/types";
import { getNearestStores } from "@api/store";
import { getStoreCategory } from "@api/storecategory";
import { getSafeUrl } from "@core/utils";
import { MdStorefront } from "react-icons/md";
import { usePageContext } from "@renderer/usePageContext";
import type { PageContextBuiltIn } from 'vite-plugin-ssr/types';


interface Props {
    initialStoreCategory: TStoreCategory
}


export async function onBeforeRender(pageContext: PageContextBuiltIn) {
    const { id } = pageContext.routeParams;
    const initialStoreCategory: TStoreCategory = await getStoreCategory(parseInt(id));

    return {
        pageContext: {
            pageProps: {
                initialStoreCategory,
            }
        },
    }
}


const StoreList: React.FC<Props> = ({ initialStoreCategory }: Props) => {
    const [stores, setStores] = useState<TStore[]>([]);
    const [storeCategory, setStoreCategory] = useState<TStoreCategory>(initialStoreCategory);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const pageContext = usePageContext()
    const pageSize = 10;

    useEffect(() => {
        // TODO:
        let id = pageContext.routeParams?.id;
        if (id === undefined || id == storeCategory?.id.toString()) {
            return
        }
        const res: Promise<TStoreCategory> = getStoreCategory(parseInt(id));
        res.then((store) => { setStoreCategory(store); });
    }, [pageContext.urlOriginal])


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
                        noResult={<div className="flex justify-center p-3 h-full  w-full lt-sm:w-full">
                        <div>
                            <MdStorefront
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