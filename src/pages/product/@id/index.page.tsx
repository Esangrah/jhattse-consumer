import Head from 'react-helmet';
import { Image } from "@renderer/Image";
import React, { useState, useEffect } from 'react'
import { Container } from "@components/container"
import { Header } from "@components/header"
import { Navbar } from "@components/navbar"
import { Section } from "@components/section";
import { TImage, TInventory, TProduct, TVariant } from "@components/types";
import { getDetailProduct, getSimilarProducts } from '@api/product'
import { RichCard } from "@components/cards";
import { Star } from '@components/star';
import { getFirst, getLength, getSafeUrl, humanizeCurrency, sanityIoImageLoader, trimToLength } from '@core/utils';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Footer } from '@components/footer';
import { CarouselContainer } from '@components/container/carousel';
import { MdOutlineCircle, MdCheckCircle } from 'react-icons/md';
import { SwiperSlide } from 'swiper/react';
import { CartButton } from '@components/cartbutton/special';
import { getCombinedName, inventoryByVariantId } from '@components/variant/variantSelector';
import { RatingWidget } from '@components/widget/rating';
import { usePageContext } from '@renderer/usePageContext';
import { Link } from '@renderer/Link';
import type { PageContextBuiltIn } from 'vite-plugin-ssr/types';

interface Props {
    initialProduct: TProduct
}

export async function onBeforeRender(pageContext: PageContextBuiltIn) {
    const { id } = pageContext.routeParams;
    const res = await getDetailProduct(parseInt(id));
    const initialProduct: TProduct = res;

    return {
        pageContext: {
            pageProps: {
                initialProduct,
            },
            documentProps: {
                title: `${initialProduct?.name} - Jhattse`,
                description: `Get ${initialProduct?.name} from nearby local stores on Jhattse`,
                image: getFirst(initialProduct?.images),
                keywords: `Local Products,Local Services,${initialProduct?.name},Jhattse`,
                canonical: `https://jhattse.com/product/${initialProduct.id}/${getSafeUrl(initialProduct?.name)}`,
            }
        },

    }
}

export const Page: React.FC<Props> = ({ initialProduct }: Props) => {
    const [product, setProduct] = useState<TProduct>(initialProduct);
    const [mainImage, setMainImage] = useState<TImage>(getFirst(initialProduct?.images));
    const [similarProducts, setSimilarProducts] = useState<TProduct[]>([]);
    const [selectedInventory, setselectedInventory] = useState<TInventory>(getFirst(initialProduct?.inventories))
    const [variant, setVariant] = useState<TVariant>((selectedInventory?.is_available && selectedInventory?.variant !== undefined) ? selectedInventory?.variant : product?.variants?.find((variant) => getFirst(inventoryByVariantId(variant, product))?.is_available == true) as TVariant);
    const pageContext = usePageContext();
    let content = null

    const onClickVariant = (value: TVariant) => {
        setVariant(value);
        setselectedInventory(getFirst(inventoryByVariantId(value, product)))
    }

    useEffect(() => {
        let id = pageContext.routeParams?.id;
        if (id === undefined || id == product?.id?.toString()) {
            return
        }
        const res: Promise<TProduct> = getDetailProduct(parseInt(id));
        res.then((product) => {
            setProduct(product);
            setselectedInventory(getFirst(product.inventories))
            setMainImage(getFirst(product?.images))
        });
    }, [pageContext.urlOriginal])

    useEffect(() => {
        if (product?.id != undefined) {
            const res: Promise<TProduct[]> = getSimilarProducts(product?.id);
            res.then((products) => setSimilarProducts(products));
        }
    }, [product?.category_id, pageContext.urlOriginal])

    if (product) {
        content =
            <Container>
                <Head>
                    <title>{`${product?.name} - Jhattse`}</title>
                </Head>
                <Header />
                <div className="flex flex-col text-manrope gap-2 px-20 lt-sm:px-4">
                    <div className="flex flex-col justify-center px-0 lt-sm:hidden h-20">
                        <Breadcrumb className="font-normal text-lg list-none text-breadcrumbs">
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/product/trending'>Product</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem className='select-none font-normal text-ellipsis text-left break-words line-clamp-1' isCurrentPage>
                                <BreadcrumbLink href={`/product/${product.id}/${getSafeUrl(product?.name || '')}`}>{trimToLength(product?.name, 80)}</BreadcrumbLink>
                                <ol className="p-0 list-none"></ol>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="flex flex-row item-center gap-4 lt-sm:gap-2 lt-sm:py-4 lt-sm:flex-col font-manrope">
                        <div className="flex flex-row lt-sm:flex-col-reverse gap-3 max-h-60 sticky lt-sm:relative top-0">
                            <div className="2xl:flex flex-col lt-sm:flex-row gap-3 lt-sm:hidden overflow-x-scroll no-scrollbar">
                                <CarouselContainer direction="vertical">
                                    {product?.images?.map((image) => {
                                        return <SwiperSlide style={{ width: "auto", height: "auto" }} className="min-w-0" onClick={(e) => setMainImage(image)}>
                                            <div className="shrink-0 w-12 h-12">
                                                <Image
                                                    loader={sanityIoImageLoader}
                                                    width="200"
                                                    height="200"
                                                    className="flex items-center justify-center w-full h-full object-cover rounded-t-xl"
                                                    src={image?.url}
                                                    alt={image?.description || product?.name || 'product'}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    })}
                                </CarouselContainer>
                            </div>
                            <div className="flex flex-col gap-4 items-center">
                                {product?.tag != undefined && product?.tag?.length > 0 && <div className="px-2 w-max rounded-r-lg mt-1 bg-brand-500">
                                    {product.tag}
                                </div>}
                                <div className="flex justify-center bg-neutral-50 rounded item-center w-56 lt-sm:w-full">
                                    <Image
                                        loader={sanityIoImageLoader}
                                        priority={"true"}
                                        src={mainImage?.url || "assets/noimage.png"}
                                        alt={mainImage?.description || product.name || 'product'}
                                        width="200"
                                        height="200"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between col-span-2 gap-8 text-manrope">
                            <div className="flex flex-col leading-tight">
                                <div className="text-ellipsis text-left break-words leading-tight pb-2.5 max-w-2xl lt-sm:max-w-full">
                                    <h1 className="text-neutral-800 lg:text-3xl md:text-xl text-lg font-extrabold line-clamp-2 md:line-clamp-none">{getCombinedName(product, variant?.id || 0)}</h1>
                                </div>
                                {product?.brand &&
                                    <div className="flex flex-row text-ellipsis text-left break-words leading-tight pb-5 lt-sm:pb-3 max-w-2xl lt-sm:max-w-full">
                                        <span className="text-neutral-500 lg:text-xl md:text-lg text-base font-bold line-clamp-2 md:line-clamp-none">Brand:</span>&nbsp;<Link href={`/brand/${product?.brand?.id}/${getSafeUrl(product?.brand?.name)}`} ><span className="text-brand-500 lg:text-xl md:text-lg text-base font-bold">{product?.brand?.name}</span></Link>
                                    </div>
                                }
                                <div className="flex flex-row gap-2 items-center pb-5 lt-sm:pb-3 lt-sm:text-xs lt-sm:py-2">
                                    {product?.stats?.rating_overall ?
                                        <Star rating={product?.stats?.rating_overall} />
                                        :
                                        <div className="grid grid-row grid-flow-col text-custom_gray lt-sm:grid-flow-row">No Reviews</div>
                                    }
                                </div>
                                {
                                    selectedInventory?.store !== undefined && selectedInventory?.store?.id > 0 ?
                                        <p className="text-neutral-500 font-bold text-base lt-sm:text-sm leading-tight pb-3">
                                            Sold By: {" "}
                                            <Link href={`/store/${selectedInventory?.store?.id}/${getSafeUrl(selectedInventory?.store?.name)}`}><span className="font-bold text-brand">{selectedInventory?.store?.name}</span></Link>
                                        </p>
                                        :
                                        <p className="text-error-300 font-bold text-base lt-sm:text-sm leading-tight pb-5">Unavailable</p>
                                }


                                {getLength(product?.inventories) > 0 ?
                                    <div className="flex flex-row items-center gap-4 pb-6 text-base lt-sm:text-sm">
                                        <span className="text-neutral-800 font-extrabold text-3xl lg:text-xl lt-sm:text-lg">{humanizeCurrency(selectedInventory?.price || product?.inventories?.find((inventory) => inventory.variant_id == variant?.id)?.price || selectedInventory?.mrp || 0)}</span>
                                        {(selectedInventory?.price !== null && selectedInventory?.mrp !== selectedInventory?.price) && <span className="line-through text-neutral-400 font-extrabold text-3xl lg:text-xl lt-sm:text-lg">{humanizeCurrency(selectedInventory?.mrp || product?.inventories?.find((inventory) => inventory.variant_id == variant?.id)?.mrp || 0)}</span>}
                                        {product.mrp !== undefined && selectedInventory?.price !== undefined && selectedInventory?.price < product.mrp ?
                                            <div className="text-green-500">({Math.trunc((product.mrp - (selectedInventory?.price || 0)) / product.mrp * 100)}% off)</div>
                                            :
                                            <div></div>
                                        }
                                    </div>
                                    :
                                    <></>
                                }

                                {selectedInventory?.store?.id && selectedInventory?.store?.id > 0 ?
                                    <div className="flex flex-row gap-4 items-center align-bottom w-44 lt-sm:w-full pb-12">
                                        <CartButton mode={""} Isvariant={false} product={product} variantId={variant?.id} inventory={selectedInventory}></CartButton>
                                    </div>
                                    :
                                    <></>
                                }

                                {/* Bottom Section Start */}
                                <div className="flex flex-col w-full">
                                    {getLength(product.inventories) > 0 && getLength(product?.variants) > 1 ?
                                        <div>
                                            <h3 className="font-bold text-lg py-2">Variants</h3>
                                            <CarouselContainer>
                                                {getLength(product?.variants) > 0 && product?.variants?.map((item, index: number) => {
                                                    return <SwiperSlide style={{ width: "auto" }} className="min-w-0" key={index}>
                                                        <div className={getFirst(inventoryByVariantId(item, product))?.is_available ? `bg-neutral-50 rounded-md cursor-pointer lt-sm:w-full border ${item?.id == variant?.id ? 'border-brand-500' : 'border-neutral-300'}` : "cursor-pointer border border-neutral-300 rounded-md lt-sm:w-full opacity-75"} onClick={() => onClickVariant(item)}>
                                                            <div className="flex flex-col gap-2 ">
                                                                <div className="flex justify-start gap-2 py-4 px-5 border-b">
                                                                    <h4 className="text-lg lg:text-base font-semibold text-neutral-700 line-clamp-1">{trimToLength((item?.name || product?.name), 20)}</h4>
                                                                </div>
                                                                <div className="pb-4 px-5 h-14">
                                                                    <span className="text-xl lg:text-lg font-extrabold text-neutral-800">{humanizeCurrency(product?.inventories?.find((inventory) => inventory.variant_id == item.id)?.price || product?.inventories?.find((inventory) => inventory.variant_id == item.id)?.mrp) || "Unavailable"}</span>
                                                                    <p className={getFirst(inventoryByVariantId(item, product))?.is_available ? "font-bold text-xs text-success-500" : "font-bold text-xs text-error-400"}>{getFirst(inventoryByVariantId(item, product))?.is_available ? "In Stock" : "Out of stock"}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                })}
                                            </CarouselContainer>
                                        </div>
                                        :
                                        <></>}
                                    <div className="h-6 lt-sm:h-4"></div>
                                    {getLength(inventoryByVariantId(variant, product)) > 0 ?
                                        <div className="lt-sm:hidden">
                                            <h3 className="font-bold text-lg py-2">Offers and Pricing</h3>
                                            <CarouselContainer>
                                                {inventoryByVariantId(variant, product).map((inventory: TInventory, index: number) => {
                                                    return (
                                                        <SwiperSlide style={{ width: "auto" }} className="min-w-0" key={index}>
                                                            <div key={inventory.id} className={`bg-neutral-50 p-2 rounded-md cursor-pointer w-60 lt-sm:w-full border-2 ${selectedInventory?.id == inventory.id ? 'border-brand-500' : 'border-neutral-300'}`} onClick={() => { setselectedInventory(inventory) }}>
                                                                <div className="flex flex-col gap-2 ">
                                                                    <div className="flex justify-start font-bold gap-2 line-clamp-1">
                                                                        {inventory?.store?.name}
                                                                    </div>
                                                                    {inventory.store?.stats?.rating_overall ?
                                                                        <Star rating={inventory.store?.stats?.rating_overall} />
                                                                        :
                                                                        <div className="grid grid-row grid-flow-col text-custom_gray lt-sm:grid-flow-row">No Reviews</div>
                                                                    }
                                                                    <div className="flex flex-row justify-between">
                                                                        <div className="flex justify-start font-extrabold">{humanizeCurrency(inventory?.price || inventory?.mrp || product?.mrp)}</div>
                                                                        {
                                                                            (selectedInventory?.id == inventory.id) && <span className="text-brand-500"><MdCheckCircle /></span>
                                                                        }

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    )
                                                })}
                                            </CarouselContainer>
                                        </div>
                                        :
                                        <></>
                                    }

                                    {/* For Mobile Device Start */}
                                    {getLength(inventoryByVariantId(variant, product)) > 0 ?
                                        <div className="hidden lt-sm:block">
                                            <h3 className="font-bold text-lg py-2">Offers and Pricing</h3>
                                            {inventoryByVariantId(variant, product).map((inventory: TInventory) => {
                                                return (
                                                    <div className='flex flex-row gap-2 item-center'>
                                                        <div className="radio flex flex-row items-center w-full gap-2">
                                                            <div className='flex flex-row gap-1 items-center' onClick={() => { setselectedInventory(inventory) }}>
                                                                {
                                                                    (selectedInventory?.id == inventory.id) ?
                                                                        <span className="text-brand-500 text-base"><MdCheckCircle /></span>
                                                                        :
                                                                        <span className="text-base text-radioButtonBorder">
                                                                            <MdOutlineCircle />
                                                                        </span>
                                                                }
                                                            </div>
                                                            <div key={inventory.id} className={`bg-neutral-50 p-2 rounded-md mt-1 mb-2 w-full ${selectedInventory?.id == inventory.id ? 'border-2 border-brand-500' : ''}`} onClick={() => { setselectedInventory(inventory) }}>
                                                                <div className="flex flex-row gap-2 items-center justify-between">
                                                                    <div className="flex justify-start items-center gap-2 text-xs">
                                                                        {inventory?.store?.name}
                                                                        {product?.stats?.rating_overall ?
                                                                            <Star rating={product?.stats?.rating_overall} />
                                                                            :
                                                                            <div className="grid grid-row grid-flow-col text-custom_gray lt-sm:grid-flow-row">No Reviews</div>
                                                                        }
                                                                    </div>
                                                                    <div className="flex flex-row justify-between text-sm">
                                                                        <div className="flex justify-start font-bold font-neutral-700">{humanizeCurrency(inventory?.price || inventory?.mrp || product?.mrp || 0)}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        :
                                        <></>
                                    }
                                    <div className="h-6 lt-sm:h-4"></div>
                                    {product?.stats?.rating_count !== undefined && product?.stats?.rating_count > 0 && <RatingWidget product={product}></RatingWidget>}
                                </div>
                                {/* Bottom Section End */}

                            </div>
                        </div>
                    </div>
                    {/* For Mobile Device End */}
                    <div className="h-10 lt-sm:h-4"></div>
                    <Section title="Similar Products" products={similarProducts} element={RichCard} isCarousel={true} style="pb-2 text-netural-800 px-3" headStyle="text-xl py-1 font-bold" />
                    <div className="h-10 lt-sm:h-4"></div>
                </div>
            </Container>
    } else {
        content = <div>
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
    }


    return (
        <div>
            {content}
            <Navbar />
            <Footer />
        </div>
    )

}