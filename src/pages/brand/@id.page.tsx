import Head from 'react-helmet';
import React, { useEffect, useState } from "react";
import { Image } from "@renderer/Image";
import { Container } from "@components/container"
import { Header } from "@components/header";
import { Section } from "@components/section";
import { RichCard, SmallProductCard } from "@components/cards";
import { SearchContainer } from "@components/container";
import { Footer } from "@components/footer";
import {
    TBrand,
    TFeedback,
    TIdentity,
    TProduct,
    TProductCategory,
    TSocialAccount,
} from "@components/types";
import { getFeaturedProducts } from "@api/product";
import {
    getLength,
    getSafeUrl,
    humanizeNumber,
    requestLogin,
    sanityIoImageLoader,
} from "@core/utils";
import { getBestSeller, getBrand, getBrandCategories } from "@api/brand";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { addFeedback } from "@api/feedback";
import { isLoggedIn } from "@recoil/atoms/profile";
import { useRecoilValue } from "recoil";
import { message } from "antd";
import { SocialIcon } from "react-social-icons";
import { usePageContext } from "@renderer/usePageContext";
import { Link } from '@renderer/Link';
import type { PageContextBuiltIn } from 'vite-plugin-ssr/types';

interface Props {
    initialBrand: TBrand;
    initialProductList: TProduct[];
}

export const onBeforeRender = async (pageContext: PageContextBuiltIn) => {
    const { id } = pageContext.routeParams;
    const res = await getBrand(parseInt(id));
    const initialBrand: TBrand = res;
    const resProductList = await getFeaturedProducts(0, 0, parseInt(id));
    const initialProductList: TProduct[] = resProductList;

    return {
        pageContext: {
            pageProps: {
                initialBrand,
                initialProductList,
            }
        },
    };
};


export const Page: React.FC<Props> = ({ initialBrand, initialProductList }: Props) => {
    const isLogin = useRecoilValue(isLoggedIn);
    const [userInfo, setUserInfo] = useState<TIdentity>(
        typeof window !== "undefined" && JSON.parse(localStorage.getItem("profile") || '{}')
    );
    const [feedback, setFeedback] = useState<TFeedback>();
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [brand, setBrand] = useState<TBrand>(initialBrand);
    const [products, setProducts] = useState<TProduct[]>(initialProductList);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [bestSellerProducts, setBestSellerProducts] = useState<TProduct[]>([]);
    const [brandCategories, setBrandCategories] = useState<TProductCategory[]>([]);
    const pageSize = 20;
    const pageContext = usePageContext();

    const handleTabsChange = (index: number) => {
        setTabIndex(index);
    };

    const getAllProducts = (id: any) => {
        const resProducts: Promise<TProduct[]> = getFeaturedProducts(parseInt(id), 0, 0, pageNumber, pageSize);
        resProducts.then((result) => {
            setIsLoadMore(result?.length == pageSize);
            setProducts([...products, ...result]);
        });
    };

    const getAllBestSeller = (id: number) => {
        getBestSeller(id).then((res) => {
            setBestSellerProducts(res);
        });
    };

    const getAllBrandCategories = (id: number) => {
        getBrandCategories(id).then((res) => {
            setBrandCategories(res);
        });
    };

    useEffect(() => {
        if (brand?.id) {
            getAllBestSeller(brand?.id);
            getAllBrandCategories(brand?.id);
        }
    }, [brand]);

    useEffect(() => {
        let id = pageContext.routeParams?.id;
        if (id === undefined || id == brand?.id.toString()) {
            return;
        }
        const res: Promise<TBrand> = getBrand(parseInt(id));
        res.then((brand) => {
            setBrand(brand);
            setFeedback({
                page_url: pageContext.urlOriginal,
                brand_id: brand.id,
                first_name: userInfo?.first_name,
                last_name: userInfo?.last_name,
            });
        });
        getAllProducts(id);
    }, [pageContext.urlOriginal]);

    useEffect(() => {
        let id = pageContext.routeParams?.id;
        if (id != undefined && id?.length > 0 && id == brand?.id.toString()) {
            return;
        }
        getAllProducts(id);
    }, [pageNumber]);

    const handleInput = async (name: string, value: any) => {
        setFeedback({ ...feedback, [name]: value });
    };

    const submitFeedback = async () => {
        if (feedback?.feedback !== undefined && feedback?.feedback?.length > 0) {
            addFeedback(feedback)
                .then((res) => {
                    message.success("Message Submitted");
                    setSubmitted(true);
                })
                .catch((e: any) => {
                    message.error(e?.response?.data?.detail || "Some Error Occured");
                    if (e.response?.status === 401) {
                        requestLogin(pageContext.urlOriginal);
                    }
                });
        } else {
            message.error("Message shouldn't be empty.");
            return;
        }
    };

    return (
        <Container>
            <Head>
                <title>{`${brand?.name} products - Jhattse`}</title>
                <meta name="Keywords" content={`Local Products,Local Services,Buy ${brand?.name},${brand?.name},Jhattse`} />
                <meta name="Description" content={`Get ${brand?.name} products from nearby local stores on Jhattse`} />
                <link rel="canonical" href={`https://jhattse.com/brand/${brand?.id}/${getSafeUrl(brand?.name)}`} />
                <meta property="og:title" content={`${brand?.name} products on Jhattse`} />
                <meta name="og:description" content={`Get ${brand?.name} products from nearby local stores on Jhattse`} />
                <meta name="og:image" content={`${brand?.image}`} />
                <meta property="og:url" content={`https://jhattse.com/brand/${brand?.id}/${getSafeUrl( brand?.name)}`} />
            </Head>
            <Header />
            <div className="px-20 sm:px-2 font-manrope">
                <div className="sm:hidden h-20 flex items-center text-sm text-manrope">
                    <Breadcrumb className="font-normal text-lg list-none text-breadcrumbs">
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/brand/explore">Brand</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem
                            className="font-normal text-ellipsis text-left break-words line-clamp-1"
                            isCurrentPage
                        >
                            <BreadcrumbLink
                                href={`/brand/${brand?.id}/${getSafeUrl(brand?.name)}`}
                            >
                                {brand?.name.length > 80
                                    ? `${brand?.name.slice(0, 80)}...`
                                    : brand?.name}
                            </BreadcrumbLink>
                            <ol className="p-0 list-none"></ol>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="py-2">
                    <h2 className="text-custom_black font-bold text-xl sm:text-base">
                        {brand?.name}
                    </h2>
                </div>
                {/* Brand Banner */}
                <div className="w-full py-2">
                    <Image
                        loader={sanityIoImageLoader}
                        src={brand?.image || "https://jhattse.com/assets/noimage.png"}
                        alt={brand?.name}
                        width="600"
                        height="150"
                        quality={100}
                        className="w-full h-full max-h-96 sm:max-h-40 object-cover rounded-2xl"
                    />
                </div>

                {/* Tabs */}
                <div className="h-4"></div>
                <div className="flex flex-col gap-4 flex-grow sticky top-0">
                    <Tabs index={tabIndex} onChange={handleTabsChange}>
                        <TabList className="gap-8 border-b">
                            <Tab
                                _selected={{
                                    borderBottom: "2px solid #313131",
                                    fontWeight: "700",
                                }}
                                className="text-darkGray font-medium text-lg py-2"
                            >
                                Our Products
                            </Tab>
                            <Tab
                                _selected={{
                                    borderBottom: "2px solid #313131",
                                    fontWeight: "700",
                                }}
                                className="text-darkGray font-medium text-lg py-2"
                            >
                                About Us
                            </Tab>
                            <Tab
                                _selected={{
                                    borderBottom: "2px solid #313131",
                                    fontWeight: "700",
                                }}
                                className="text-darkGray font-medium text-lg py-2"
                            >
                                Our Performance
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel className="py-4">
                                <div className="pt-4">
                                    <h4 className="text-xl text-custom_black font-bold py-2 sm:text-base">
                                        Our Categories
                                    </h4>
                                    <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 pt-2">
                                        {brandCategories?.map((item) => {
                                            return (
                                                <Link
                                                    href={`/category/${item?.id}/${getSafeUrl(
                                                        item?.name
                                                    )}`}
                                                >
                                                    <div className="py-1 rounded-lg flex justify-center items-center relative">
                                                        <Image
                                                            loader={sanityIoImageLoader}
                                                            src={
                                                                item?.image ||
                                                                "https://jhattse.com/assets/noimage.png"
                                                            }
                                                            alt={item?.name}
                                                            width="150"
                                                            height="150"
                                                            className="w-full max-h-60 object-cover rounded-lg"
                                                        />
                                                        <span className="absolute text-neutral-50 font-bold text-lg bottom-0 left-0  bg-gradient-to-b from-transparent via-transparent to-neutral-900 w-full px-4 h-20 flex items-center rounded-lg">
                                                            <p>{item?.name}</p>
                                                        </span>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                    <div className="h-16 sm:h-8"></div>
                                    <Section
                                        title="Bestsellers"
                                        products={bestSellerProducts}
                                        element={RichCard}
                                        isCarousel={true}
                                        style="mt-2 pb-2"
                                        headStyle="text-xl py-1 font-bold sm:text-base"
                                    />
                                    <div className="h-16 sm:h-8"></div>
                                    <div className="flex flex-col py-2">
                                        <h4 className="text-xl py-2 font-bold sm:text-base">
                                            All Products
                                        </h4>
                                        <SearchContainer
                                            searchresults={products}
                                            element={SmallProductCard}
                                            isLoadMore={isLoadMore}
                                            pageNumber={pageNumber}
                                            setPageNumber={setPageNumber}
                                        />
                                    </div>
                                    <div></div>
                                </div>
                            </TabPanel>
                            <TabPanel className="py-4">
                                <div className="pt-4">
                                    <div className="w-full">
                                        <div className="w-full flex flex-col gap-2">
                                            <ReactMarkdown
                                                className="text-neutral-900"
                                                components={{
                                                    p: ({ children }) => (
                                                        <p className="text-custom_black">{children}</p>
                                                    ),
                                                }}
                                            >
                                                {brand?.about}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className="py-4">
                                <div className="pt-4">
                                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-2 py-2">
                                        {(brand?.info || {})?.products && (
                                            <div className="bg-neutral-50 p-8 sm:p-2 rounded-lg flex flex-col gap-2">
                                                <h4 className="text-neutral-900 font-bold text-2xl sm:text-xl">
                                                    {(brand?.info || {})?.products}
                                                </h4>
                                                <p className="text-neutral-900 font-medium text-lg sm:text-base">
                                                    Listed Products
                                                </p>
                                            </div>
                                        )}
                                        {(brand?.info || {})?.customers && (
                                            <div className="bg-neutral-50 p-8 sm:p-2 rounded-lg flex flex-col gap-2">
                                                <h4 className="text-neutral-900 font-bold text-2xl sm:text-xl">
                                                    {(brand?.info || {})?.customers}
                                                </h4>
                                                <p className="text-neutral-900 font-medium text-lg sm:text-base">
                                                    Satisfied Customers
                                                </p>
                                            </div>
                                        )}
                                        {(brand?.info || {})?.sales && (
                                            <div className="bg-neutral-50 p-8 sm:p-2 rounded-lg flex flex-col gap-2">
                                                <h4 className="text-neutral-900 font-bold text-2xl sm:text-xl">
                                                    {(brand?.info || {})?.sales}
                                                </h4>
                                                <p className="text-neutral-900 font-medium text-lg sm:text-base">
                                                    Products Sold
                                                </p>
                                            </div>
                                        )}
                                        {(brand?.info || {})?.established && (
                                            <div className="bg-neutral-50 p-8 sm:p-2 rounded-lg flex flex-col gap-2">
                                                <h4 className="text-neutral-900 font-bold text-2xl sm:text-xl">
                                                    {(brand?.info || {})?.established}
                                                </h4>
                                                <p className="text-neutral-900 font-medium text-lg sm:text-base">
                                                    Established
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="h-4"></div>
                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 py-2">
                                        <div className="bg-neutral-50 p-8 sm:p-2 rounded-lg flex flex-col gap-2">
                                            <h4 className="text-neutral-900 font-bold text-lg sm:text-sm">
                                                Interest Meter
                                            </h4>
                                            <p>
                                                {(brand?.info || {})?.interest > 0 ? (
                                                    <span className="text-4xl sm:text-2xl font-bold text-custom_cyan tracking-wider">
                                                        {(brand?.info || {})?.interest}/100
                                                    </span>
                                                ) : (
                                                    <span className="text-4xl sm:text-2xl font-bold text-custom_cyan tracking-wider">
                                                        Not Available Yet
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <div className="p-8 sm:p-2 flex flex-col gap-4">
                                            {getLength(brand?.social_accounts) > 0 &&
                                                brand?.social_accounts?.map((item) => {
                                                    return (
                                                        <span className="select-none">
                                                            <SocialIcon url={item?.link} />{" "}
                                                            {`${humanizeNumber(item?.followers || 0)} ${item?.followers !== undefined && item?.followers < 2 ? "follower" : "followers"
                                                                }`}
                                                        </span>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
            <div className="h-4"></div>
            {tabIndex == 1 && (
                <div className="bg-storepickup p-8 px-20 sm:px-2">
                    {!submitted ? (
                        <>
                            <h2 className="font-bold text-lg text-neutral-900 select-none">
                                Get In Touch
                            </h2>
                            <div className="grid grid-cols-2 gap-8 justify-between sm:flex flex-col py-2">
                                <div className="flex flex-col gap-4">
                                    {!isLogin ? (
                                        <>
                                            <div className="flex-row gap-2">
                                                <div className="inline-block w-1/2 pr-1">
                                                    <label className=" block text-sm text-neutral-600">
                                                        First name
                                                    </label>
                                                    <input
                                                        className="w-full p-1 text-neutral-700 bg-neutral-100 border rounded"
                                                        value={feedback?.first_name}
                                                        onChange={(evt) =>
                                                            handleInput(evt.target.name, evt.target.value)
                                                        }
                                                        id="first_name"
                                                        name="first_name"
                                                        type="text"
                                                        placeholder="First name"
                                                        autoComplete="off"
                                                        required
                                                    />
                                                </div>
                                                <div className="inline-block w-1/2 pr-1">
                                                    <label className=" block text-sm text-neutral-600">
                                                        Last name
                                                    </label>
                                                    <input
                                                        className="w-full p-1 text-neutral-700 bg-neutral-100 border rounded"
                                                        value={feedback?.last_name}
                                                        onChange={(evt) =>
                                                            handleInput(evt.target.name, evt.target.value)
                                                        }
                                                        id="last_name"
                                                        name="last_name"
                                                        type="text"
                                                        placeholder="Last name"
                                                        autoComplete="off"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <input
                                        className="bg-neutral-50 p-2 text-neutral-600"
                                        placeholder="Your Email Address"
                                        name="email"
                                        value={feedback?.email || userInfo?.email}
                                        onChange={(evt) =>
                                            handleInput(evt.target.name, evt.target.value)
                                        }
                                    />
                                    <textarea
                                        className="bg-neutral-50 p-2 text-neutral-600"
                                        placeholder="Your Message upto 500 chars"
                                        rows={3}
                                        maxLength={500}
                                        name="feedback"
                                        value={feedback?.feedback}
                                        onChange={(evt) =>
                                            handleInput(evt.target.name, evt.target.value)
                                        }
                                    />
                                    <div>
                                        <button
                                            className="text-neutral-900 font-bold font-manrope text-lg py-1 px-4 bg-custom_yellow rounded-sm"
                                            onClick={() => {
                                                submitFeedback();
                                            }}
                                        >
                                            SUBMIT
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 sm:grid grid-cols-2">
                                    {getLength(brand?.social_accounts) > 0 &&
                                        brand?.social_accounts?.map((item: TSocialAccount) => {
                                            return (
                                                <div className="flex gap-4 items-center">
                                                    <span className="select-none">
                                                        <SocialIcon url={item?.link} />{" "}
                                                        {`${humanizeNumber(item.followers || 0)}${item.followers !== undefined && item.followers < 2 ? " follower" : "+ followers"
                                                            }`}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-row justify-center items-center p-4">
                            <div>
                                <p>Message submitted successfully</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <Footer />
        </Container>
    );
};
