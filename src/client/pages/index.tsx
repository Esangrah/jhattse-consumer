import React from "react";
import { Image } from "@renderer/image";
import { Link} from "react-router-dom"
import { Container, Section } from "@components";
import { BrandCard, CategoryCard, RichCard } from "@components/cards";
import { TBrand, TProduct, TProductCategory } from "@components/types";
import { getPopularProducts, getProductCategories } from "@api/product";
import Head from 'react-helmet';
import { getProductBrands } from "@api/brand";
import { Header, Navbar } from "@components";
import { Footer } from "@components/footer";
import { staticImageLoader } from "@core/utils";
import { CarouselContainer } from "@components/container/carousel";
import { SwiperSlide } from "swiper/react";

type Props = {
    popularProducts: TProduct[];
    productCategories: TProductCategory[];
    popularBrands: TBrand[];
};

export const getStaticProps = async () => {
    const popularProducts: TProduct[] = await getPopularProducts();
    const productCategories: TProductCategory[] = await getProductCategories(
        null,
        true
    );
    const popularBrands: TBrand[] = await getProductBrands();
    return {
        props: {
            popularProducts,
            productCategories,
            popularBrands,
        },
    };
};

const Home: React.FC<Props> = ({
    popularProducts,
    productCategories,
    popularBrands,
}: Props) => {
    return (
        <Container>
            <Head>
                <title>Online Shopping - Jhattse</title>
                <meta
                    name="Keywords"
                    content="Local Stores,Local+Online,Online Stores,Shopping Sites,Local Services,Online Shopping,Jhattse"
                />
                <meta
                    name="Description"
                    content="Discover products and services around me whether local or online. Find Stores and Product on Jhattse an online platform which provides product visiblity, best price discovering and all available deals and offers."
                />
                <link rel="canonical" href="https://jhattse.com" />
                <meta property="og:title" content="Online Shopping - Jhattse" />
                <meta
                    property="og:description"
                    content="Discover products and services around you whether local or online. Jhattse provides product visiblity, best price discovering and all available deals and offers."
                />
                <meta
                    name="og:image"
                    content="https://jhattse.com/consumer/square-logo-4x.png"
                />
                <meta property="og:url" content="https://jhattse.com" />
            </Head>
            <div className="flex justify-center">
                <Header />
            </div>
            <div className="h-6"></div>
            <div className="px-20 sm:px-3">
                <div className="flex flex-col justify-center gap-4 w-full">
                    <div className="section select-none bg-neutral-50 pb-2 text-neutral-900">
                        <CarouselContainer>
                            <SwiperSlide style={{ width: "auto" }} className="min-w-0">
                                <div className="shrink-0 w-[500px] sm:w-[300px] h-[270px] sm:h-[162px]">
                                    <Link to="https://jhattse.com/category/1/grocery-gourmet-foods">
                                        <Image
                                            loader={staticImageLoader}
                                            width="500"
                                            height="270"
                                            className="flex items-center justify-center w-full h-full object-cover rounded-t-xl"
                                            src="public/consumer/grocery_banner.png"
                                            alt="Grocery Products on Jhattse"
                                        />
                                    </Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide style={{ width: "auto" }} className="min-w-0">
                                <div className="shrink-0 w-[500px] sm:w-[300px] h-[270px] sm:h-[162px]">
                                    <Link to="https://jhattse.com/category/2819/food">
                                        <Image
                                            loader={staticImageLoader}
                                            src="public/consumer/food_banner.png"
                                            width="500"
                                            height="270"
                                            className="flex items-center justify-center w-full h-full object-cover rounded-t-xl"
                                            alt="Food Restaurants on Jhattse"
                                        />
                                    </Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide style={{ width: "auto" }} className="min-w-0">
                                <div className="shrink-0 w-[500px] sm:w-[300px] h-[270px] sm:h-[162px]">
                                    <Link to="https://jhattse.com/store">
                                        <Image
                                            loader={staticImageLoader}
                                            width="500"
                                            height="270"
                                            className="flex items-center justify-center w-full h-full object-cover rounded-t-xl"
                                            src="public/consumer/store_banner.png"
                                            alt="Local Stores on Jhattse"
                                        />
                                    </Link>
                                </div>
                            </SwiperSlide>
                        </CarouselContainer>
                    </div>
                    <div className="rounded-xl md:flex-shrink-0 md:hidden">
                        <Link to="https://business.jhattse.com/products">
                            <Image
                                loader={staticImageLoader}
                                className="h-full w-full object-contain"
                                src="public/consumer/business_banner.png"
                                width="1544"
                                height="268"
                                priority={true}
                                alt="Start selling on Jhattse"
                                loading="eager"
                                quality={100}
                            />
                        </Link>
                    </div>
                    <div className="rounded-xl relative hidden md:flex h-[220px]">
                        <Link to="https://business.jhattse.com/products">
                            <Image
                                loader={staticImageLoader}
                                className="h-full w-full object-contain"
                                src="public/consumer/business_banner_mobile.png"
                                width="368"
                                height="220"
                                priority={true}
                                alt="Start selling on Jhattse"
                                quality={100}
                            />
                        </Link>
                    </div>
                </div>
                <div className="h-6"></div>
                <Section
                    title="Recent Buys"
                    products={popularProducts}
                    element={RichCard}
                    isCarousel={true}
                    style="bg-neutral-50 pb-2 text-neutral-900 px-3"
                    headStyle="text-xl py-1 font-bold font-manrope"
                />
                <div className="h-6"></div>
                <Section
                    title="Popular Categories"
                    viewUrl="/category/list/trending"
                    products={productCategories}
                    isCarousel={true}
                    element={CategoryCard}
                    intent="productcategory"
                    style="bg-neutral-50 pb-2 text-neutral-900 px-3"
                    headStyle="text-xl py-1 font-bold font-manrope"
                />
                <div className="h-4"></div>
                <Section
                    title="Explore Brands"
                    viewUrl="/brand/explore"
                    products={popularBrands}
                    element={BrandCard}
                    isCarousel={true}
                    style="bg-neutral-50 pb-2 text-neutral-900 px-3"
                    headStyle="text-xl py-1 font-bold font-manrope"
                />
                <div className="h-4"></div>
                <Section
                    title="Popular Products"
                    viewUrl="/product/trending"
                    products={popularProducts}
                    element={RichCard}
                    isCarousel={true}
                    style="bg-neutral-50 pb-4 text-neutral-900 px-3"
                    headStyle="text-xl py-1 font-bold font-manrope"
                />
            </div>
            <Navbar />
            <Footer />
        </Container>
    );
};

export default Home;
