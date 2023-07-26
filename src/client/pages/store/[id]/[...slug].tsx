import React, { useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'react-helmet';
import { getProductCategoriesList, getStoreProducts } from '@api/product';
import { getStore } from '@api/store';
import { SmallProductCard, StoreTopCard } from '@components/cards';
import { SearchContainer } from '@components/container';
import { Header } from '@components';
import { TProduct, TStore, TOption, TProductCategory, TProductCategoryControl, TData, TSearchResult } from '@components/types'
import { getFilteredResults, getSafeUrl } from '@core/utils';
import { getStoreTiming } from '@api/storetiming';
import { AutoComplete, Button, Collapse, Input } from 'antd';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { Footer } from '@components/footer';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Center,
    BreadcrumbItem,
    Breadcrumb,
    BreadcrumbLink,
} from '@chakra-ui/react'
import { Accordion } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom';
import { CategoryWidget } from '@components/widget/category';
import IntersectionObserverWrapper from '@components/intersectionObserverWrapper';
import { useLocation } from 'react-router-dom';


interface Props {
    initialStore?: TStore
}

// Antd Collapse Panel
const { Panel } = Collapse;

export const getServerSideProps: GetServerSideProps<{ initialStore: TStore }> = async (context) => {
    const { slug } = context.params;
    const res = getStore(parseInt(slug[0] as string));
    const initialStore: TStore = await res;

    return {
        props: {
            initialStore,
        },
    }
}

const StoreDetail: React.FC = ({ initialStore }: Props) => {
    const location = useLocation();
    const params = useParams()
    const queryParams = new URLSearchParams(location.search);
    const [store, setStore] = useState<TStore>(initialStore)
    const [searchQuery, setSearchQuery] = useState<string>(null)
    const [storeTimings, setStoreTimings] = useState([]);
    const [productSuggestions, setProdcutSuggestions] = useState<TOption[]>([]);
    const [productCategoriesList, setProductCategoriesList] = useState<TProductCategoryControl[]>([]);
    const [selectedProductCategory, setSelectedProductCategory] = useState<TProductCategoryControl>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [accordionIndexes, setAccordionIndexes] = useState<number[]>([]);
    const [activeSectionId, setActiveSectionId] = useState<string>('');
    const [SearchResult, setSearchResult] = useState<TSearchResult[]>();

    const pageSize = 10;

    const sectionRefs = useRef<{ [key: string]: React.RefObject<HTMLElement> }>({});

    const updateCategoryAndProduct = (category_id: number, products: TProduct[], allFetched: boolean) => {
        let index = productCategoriesList.findIndex((r => r.id == category_id));
        let categoryProduct = null;
        if (index === -1) {
            console.log("Some weird problem");
        } else {
            categoryProduct = productCategoriesList[index]
            if (categoryProduct.isLoadMore) {
                categoryProduct.products = [...categoryProduct.products, ...products];
                categoryProduct.isLoadMore = !allFetched;
                categoryProduct.pageNumber = categoryProduct.pageNumber + 1;
            }
        }
        setProductCategoriesList([...productCategoriesList])
    }

    // Get All Products
    const getResults = (store_id: number, name: string, category_id: number = null, extend: boolean = true) => {
        let index = productCategoriesList.findIndex((r => r.id == category_id));
        let categoryProduct = null;
        if (index === -1) {
            console.log("Some weird problem");
        } else {
            categoryProduct = productCategoriesList[index]
            setIsLoading(true)
            const res: Promise<TProduct[]> = getStoreProducts(category_id, store_id, name, categoryProduct?.pageNumber, pageSize);
            res.then((result) => {
                let allFetched = result?.length != pageSize;
                setIsLoading(false)
                updateCategoryAndProduct(category_id, result, allFetched)
            });

        }
    }

    // Get Store Timing
    const getAllStoreTiming = (store_id: number) => {
        if (store_id) {
            getStoreTiming(store_id).then((result) => {
                setStoreTimings(result);
            })
        }
    }

    const handleCategoryClick = (value: number) => {
        let index = accordionIndexes.indexOf(value);
        if (index >= 0) {
            setAccordionIndexes([...accordionIndexes.filter((a: number) => a !== value)])
        } else {
            let array = accordionIndexes;
            array.unshift(value);
            setAccordionIndexes([...array])
        }
    }

    // Handle Accordion button fun
    const handleAccordionButton = (category: TProductCategory, value: number) => {
        handleCategoryClick(value);
        setSelectedProductCategory(category);
    }

    // handleSidebarLinkClick Fun
    const handleSidebarLinkClick = (sectionId: string) => {
        const sectionRef = sectionRefs.current[sectionId];
        if (sectionRef && sectionRef.current) { // Check if ref exists and has a current value
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Handle Category list button
    const handleCategoryButton = (category: TProductCategory, value: number) => {
        handleCategoryClick(value);
        setSelectedProductCategory(category);
    }

    // ******* Start useEffects *******
    useEffect(() => {
        let id = params.id;
        if (id == store?.id?.toString()) {
            return
        }
        const res: Promise<TStore> = getStore(parseInt(id));
        res.then((store) => { setStore(store); });
        if (queryParams?.get("source") && queryParams?.get("table_id")) {
            localStorage.setItem("tableInfo", JSON.stringify({ source: queryParams?.get("source"), table: queryParams?.get("table"), table_id: queryParams?.get("table_id"), is_ac: queryParams?.get("is_ac") }));
        }
    }, [location])

    useEffect(() => {
        if (store != undefined) {
            getAllStoreTiming(store?.id)
            if (selectedProductCategory?.id !== undefined) {
                getResults(store?.id, null, selectedProductCategory?.id);
            }
        }
    }, [store])


    // Handle Product Search Function
    const handleProductSearch = (value: string) => {
        setSearchQuery(value);
    };

    useEffect(() => {
        getStoreProducts(null, store?.id, searchQuery, 0, 10).then((result: TProduct[]) => {
            setProdcutSuggestions(getFilteredResults(searchQuery, result as TData[]));
            setSearchResult(result)
        })
        setProductCategoriesList(productCategoriesList.sort((a: TProductCategory, b: TProductCategory) => a.id - b.id).map((r: TProductCategory) => { return { ...r, products: [] as TProduct[], isLoadMore: true, pageNumber: 0 }; }));
        if (productCategoriesList?.length > 0) {
            setSelectedProductCategory({ ...productCategoriesList[0], products: [], isLoadMore: true, pageNumber: 0 })
        }
    }, [searchQuery])

    // Fetch products on pagenumber change
    useEffect(() => {
        if (selectedProductCategory?.id !== undefined && selectedProductCategory?.isLoadMore == true) {
            getResults(store.id, searchQuery, selectedProductCategory.id, selectedProductCategory?.pageNumber != 0);
        }
    }, [selectedProductCategory])


    useEffect(() => {
        // Get overall Inventory
        if (store?.id != undefined) {
            // Get products category list 
            getProductCategoriesList(store?.id).then((result) => {
                setProductCategoriesList(result.sort((a: TProductCategory, b: TProductCategory) => a.id - b.id).map((r: TProductCategory) => { return { ...r, products: [] as TProduct[], isLoadMore: true, pageNumber: 0 }; }));
                if (result?.length > 0) {
                    setSelectedProductCategory({ ...result.sort((a: TProductCategory, b: TProductCategory) => a.id - b.id)[0], products: [], isLoadMore: true, pageNumber: 0 });
                }
            })
        }
    }, [store])

    return (
        store != undefined ?
            <div className="font-manrope">
                <Head>
                    <title>{`${store?.name} - Jhattse`}</title>
                    <meta name="Keywords" content={`Local Stores,${store?.name},Jhattse`} />
                    <meta name="Description" content={`${store?.name} offering products and services on Jhattse`} />
                    <link rel="canonical" href={`https://jhattse.com/store/${store.id}/${getSafeUrl(store?.name)}`} />
                    <meta property="og:title" content={`${store?.name} on Jhattse`} />
                    <meta name="og:description" content={`${store?.name} offering products and services on Jhattse`} />
                    <meta name="og:image" content={`${store?.image}`} />
                    <meta property="og:url" content={`https://jhattse.com/store/${store.id}/${getSafeUrl(store?.name)}`} />
                </Head>
                <Header />
                <div className="sm:px-0 px-10">
                    <div className="sm:hidden h-20 flex items-center text-sm text-manrope">
                        <Breadcrumb className="font-normal text-lg list-none text-breadcrumbs">
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/store'>Stores</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem className='font-normal text-ellipsis text-left break-words line-clamp-1' isCurrentPage>
                                <BreadcrumbLink href={`/store/${store.id}/${getSafeUrl(store?.name)}`}>{store?.name.length > 80 ? `${store?.name.slice(0, 80)}...` : store?.name}</BreadcrumbLink>
                                <ol className="p-0 list-none"></ol>
                            </BreadcrumbItem>
                        </Breadcrumb>

                    </div>
                    <StoreTopCard storeTimings={storeTimings} store={store} />
                    <div className="sm:h-4 h-6"></div>

                    {/* Categories */}
                    <div className="sm:hidden flex gap-2 p-2 divide-x">
                        <div className="flex flex-1 flex-col gap-2 w-4/5 pr-6">
                            <div className='w-full sticky top-8 flex flex-col gap-2'>
                                <div className="flex flex-col gap-2 py-2">
                                    <div className='sm:hidden'>
                                        <h2 className='font-bold text-base leading-6'>
                                            Products
                                        </h2>
                                    </div>

                                </div>
                                {
                                    productCategoriesList?.map((item, index) => {
                                        return <a href={`#${item.id.toString()}`} key={item.id}
                                            className={activeSectionId === item.id.toString() ? 'p-2 bg-neutral-50 text-custom_gray border-1 border-neutral-400 rounded-sm cursor-pointer border-r-8 border-golden rounded-r' : "p-2 bg-neutral-50 text-neutral-900 border-1 border-neutral-400 rounded-sm cursor-pointer"}>
                                            <p className={activeSectionId === item.id.toString() ? "text-golden font-bold" : "text-custom_gray font-medium"} onClick={() => {
                                                handleCategoryButton(item, index);
                                                handleSidebarLinkClick(item.id.toString());
                                            }}>{item.name}</p></a>
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex flex-3">
                            <div className="flex flex-col gap-1 flex-grow">
                                {
                                    searchQuery === null || searchQuery === '' ? productCategoriesList?.map((item: any, index: number) => {
                                        return <div id={item.id.toString()} className="pl-6" key={item.id}>
                                            <IntersectionObserverWrapper
                                                onChange={(inView) => {
                                                    if (inView) {
                                                        setActiveSectionId(item.id.toString());
                                                    }
                                                }}
                                            >
                                                <div className="flex flex-row justify-between items-center">
                                                    <h2 className="flex justify-start sm:text-sm text-base gap-1 text-bold p-2 text-custom_black font-semibold">{item.name}</h2>
                                                    {index === 0 &&
                                                        <div className="sm:hidden flex justify-center w-2/5">
                                                            <AutoComplete
                                                                popupClassName="p-1"
                                                                style={{ width: "100%", borderRadius: "5px" }}
                                                                popupMatchSelectWidth={true}
                                                                options={productSuggestions}
                                                                value={searchQuery}
                                                                onSearch={handleProductSearch}
                                                                onSelect={(value, option) => setSearchQuery(option?.label)}
                                                            >
                                                                <Input size="large" placeholder="Search in Store" prefix={<AiOutlineSearch className='font-bold' size="1.5em" />} />
                                                            </AutoComplete>
                                                        </div>
                                                    }
                                                </div>
                                                <SearchContainer
                                                    pageNumber={item?.pageNumber}
                                                    setPageNumber={(i: number) => { getResults(store.id, searchQuery, item.id, item?.pageNumber != 0) }}
                                                    isLoadMore={item?.isLoadMore}
                                                    searchresults={item?.products
                                                    }
                                                    element={SmallProductCard}
                                                />
                                            </IntersectionObserverWrapper>
                                        </div>
                                    })
                                        :
                                        <div>
                                            <div className="snap-y flex flex-col w-full">
                                                <div className="flex flex-row justify-between items-center">
                                                    <h2 className="flex justify-start sm:text-sm text-base gap-1 text-bold p-2 text-custom_black font-bold">Search Results...</h2>
                                                    <div className="sm:hidden flex justify-center w-2/5">
                                                        <AutoComplete
                                                            popupClassName="p-1"
                                                            style={{ width: "100%", borderRadius: "5px" }}
                                                            popupMatchSelectWidth={true}
                                                            options={productSuggestions}
                                                            value={searchQuery}
                                                            onSearch={handleProductSearch}
                                                            onSelect={(value, option) => setSearchQuery(option?.label)}
                                                            autoFocus
                                                        >
                                                            <Input size="large" placeholder="Search in Store" prefix={<AiOutlineSearch className='font-bold' size="1.5em" />} autoFocus />
                                                        </AutoComplete>
                                                    </div>
                                                </div>
                                            </div>
                                            <SearchContainer
                                                searchresults={SearchResult}
                                                element={SmallProductCard}
                                                isLoadMore={false}
                                            />
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:block flex flex-col items-center gap-2 w-full p-2">
                        <Accordion defaultIndex={[0]} index={accordionIndexes} allowMultiple>
                            {
                                productCategoriesList?.map((item, index) => {
                                    return <CategoryWidget getNextResults={(page: number) => { getResults(store.id, searchQuery, item.id, item?.pageNumber != 0) }} handleAccordionButton={handleAccordionButton} handleAccordionItem={() => setSelectedProductCategory(item)} index={index} isLoading={isLoading && selectedProductCategory.id == item.id} productCategoryItem={item} />
                                })
                            }
                        </Accordion>
                    </div>
                    <div className="h-16"></div>
                    <div className='hidden sm:block fixed bottom-10 left-1/3 z-20'>
                        <Menu
                            onClose={() => setIsCategoryOpen(false)}
                            onOpen={() => setIsCategoryOpen(true)}
                            boundary="scrollParent">
                            <MenuButton as={Button} className="bg-neutral-50 font-bold font-sm tracking-wide text-custom_gray border-neutral-400 rounded-sm">
                                {!isCategoryOpen ? "CATEGORIES" : <div className='flex flex-row gap-1 items-center'> <AiOutlineClose className="inline" /> CLOSE</div>}
                            </MenuButton>
                            <Center>
                                <MenuList className='bg-neutral-50 p-2 mx-auto'>
                                    {
                                        productCategoriesList?.map((item, index) => {
                                            return <MenuItem className='p-1 text-custom_gray font-medium leading-5 tracking-wide' onClick={() => handleCategoryButton(item, index)}><Link to={`#${item.name}`}>{item.name}</Link></MenuItem>
                                        })
                                    }
                                </MenuList>
                            </Center>
                        </Menu>
                    </div>
                </div>
                <div className='sm:hidden'>
                    <Footer />
                </div>

            </div>
            :

            <div>
                <div className="w-full">
                    <div className="h-12 bg-neutral-200 full dark:bg-neutral-700 max-w-[480px] mb-2.5"></div>
                </div>
                <div className="h-2"></div>
                <div className="space-y-8 m-5 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
                    <div className="flex justify-center items-center w-96 h-48 bg-neutral-300 rounded dark:bg-neutral-700">
                        <svg className="w-12 h-12 text-neutral-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>

                    </div>
                    <div className="w-full">
                        <div className="h-2.5 bg-neutral-200 rounded-full dark:bg-neutral-700 w-48 mb-4 "></div>
                        <div className="h-2 bg-neutral-200 rounded-full dark:bg-neutral-700 max-w-[480px] mb-2.5"></div>
                        <div className="h-2 bg-neutral-200 rounded-full dark:bg-neutral-700 mb-2.5"></div>
                        <div className="h-2 bg-neutral-200 rounded-full dark:bg-neutral-700 max-w-[440px] mb-2.5"></div>
                        <div className="h-2 bg-neutral-200 rounded-full dark:bg-neutral-700 max-w-[460px] mb-2.5"></div>
                        <div className="h-2 bg-neutral-200 rounded-full dark:bg-neutral-700 max-w-[360px]"></div>
                        <div className="h-2"></div>
                        <div className="h-2 bg-neutral-200 rounded-full dark:bg-neutral-700 max-w-[460px] mb-2.5"></div>
                        <div className="h-2 bg-neutral-200 rounded-full dark:bg-neutral-700 max-w-[460px] mb-2.5"></div>
                        <div className="h-2 bg-neutral-200 rounded-full dark:bg-neutral-700 max-w-[460px] mb-2.5"></div>

                    </div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
    )
}

export default StoreDetail;