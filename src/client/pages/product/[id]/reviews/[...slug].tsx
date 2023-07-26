import { GetServerSideProps } from 'next';
import Head from 'react-helmet';
import { Image } from "@renderer/image";
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { BackBar, Container, Header, Navbar } from "@components";
import { ReviewCard } from '@components/cards';
import { getReviews, getMyReview } from '@api/rating';
import { getDetailProduct } from '@api/product';
import { ReviewContainer } from '@components/container';
import { AddReview } from '@components/addreview';
import { TProduct, TReview } from "@components/types";
import { getColor, getImageObject, getImageUrl, getSafeUrl, sanityIoImageLoader } from '@core/utils';
import { Footer } from '@components/footer';
import { useLocation } from 'react-router-dom';

interface Props {
    initialProduct?: TProduct
}

export const getServerSideProps: GetServerSideProps<{ initialProduct: TProduct }> = async (context) => {
    const { id } = context.params;
    const res = getDetailProduct(parseInt(id as string));
    const initialProduct: TProduct = await res;

    return {
        props: {
            initialProduct,
        },
    }
}

const ProductReview: React.FC = ({ initialProduct }: Props) => {
    const [product, setProduct] = useState<TProduct>(initialProduct)
    const location = useLocation();
    const parmas = useParams();
    const queryParams = new URLSearchParams(location.search);
    let content = null
    const [reviews, setReviews] = useState<TReview[]>()
    const [myReview, setMyReview] = useState<TReview>()


    const addReviewToList = (review: TReview) => {
        let reviewArray = reviews;
        const res: Promise<TProduct> = getDetailProduct(product.id);
        res.then((product) => setProduct(product));
        setMyReview(review);
        reviewArray = reviewArray?.filter(r => r.id != review.id)
        reviewArray?.unshift(review);
        setReviews([...reviewArray]);
    }


    useEffect(() => {
        let id = parmas.id;
        if (id == product?.id.toString()) {
            return
        }
        const res: Promise<TProduct> = getDetailProduct(id);
        res.then((product) => setProduct(product));
    }, [location])


    useEffect(() => {
        if (product?.id != undefined) {
            const res: Promise<TReview[]> = getReviews(product.id);
            res.then((review) => {
                setReviews(review);
            });
            const result: Promise<TReview> = getMyReview(product.id);
            result.then((review) => {
                setMyReview(review);
            });
        }
    }, [product?.id])




    if (product) {
        content =
            <Container>
                <Head>
                    <title>{`${product?.name} Reviews - Jhattse`}</title>
                    <meta name="Keywords" content={`Local Products, Local Services,${product?.name},${product?.name} Reviews,Jhattse`} />
                    <meta name="Description" content={`Read ${product?.name} reviews on Jhattse`} />
                    <link rel="canonical" href={`https://jhattse.com/product/${product.id}/reviews/${getSafeUrl(product?.name)}`} />
                    <meta property="og:title" content={`${product?.name} reviews on Jhattse`} />
                    <meta name="og:description" content={`Read ${product?.name} reviews on Jhattse`} />
                    <meta name="og:image" content={`${getImageUrl(product.images)}`} />
                    <meta property="og:url" content={`https://jhattse.com/product/${product.id}/reviews/${getSafeUrl(product?.name)}`} />
                </Head>
                <div className="flex justify-center">
                    <Header />
                </div>
                <div className="flex flex-col px-20 sm:px-3">
                    <div className="sm:grid-rows lg:grid-rows">
                        <div className=" bg-neutral-50 p-2">
                            <div className="flex gap-4 flex-row p-4 rounded-xl bg-neutral-100 xs:flex-wrap" >
                                <div className="flex-shrink-0">
                                    <div className="px-2 w-max rounded-r-lg mt-1  bg-brand-500">
                                        {product.tag}
                                    </div>
                                    <div className="flex">
                                        <Link to={`/product/${product.id}/${getSafeUrl(product.name)}`}>
                                            <Image
                                                loader={sanityIoImageLoader}
                                                src={getImageObject(product.images)?.url}
                                                alt={getImageObject(product.images)?.description || product.name}
                                                width="100"
                                                height="100"
                                                className="rounded-md"
                                            />
                                        </Link>
                                    </div>
                                </div>
                                <div className="bg-neutral-100">
                                    <Link to={`/product/${product.id}/${getSafeUrl(product.name)}`}><div className="font-bold text-lg sm:text-md text-neutral-800 leading-tight py-1"><h1>{product.name}</h1></div></Link>
                                    <div className="text-neutral-700">
                                        Price ₹<span>{product.mrp}</span>
                                    </div>
                                    <div className="h-2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-4"></div>
                    <div className="flex flex-row divide-x p-2">
                        <div className="flex flex-col">
                            <div className="flex flex-row gap-4 text-5xl sm:text-3xl">
                                <div className={`text-lg font-extrabold ${getColor(product?.stats?.rating_overall) == 1 ? "text-error-500" : (getColor(product?.stats?.rating_overall) == 2 ? "text-primary_yellow" : "text-success-500")}`}>{product?.stats?.rating_overall?.toFixed(1)}</div>
                                <div className="flex flex-col items-center justify-center">
                                    <div className="align-middle">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            stroke="#327251"
                                            strokeWidth="2"
                                            className="w-12 h-12"
                                            viewBox="0 0 576 512"
                                        >
                                            <path fill="#327251" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="text-lg sm:text-sm text-neutral-600">{product?.stats?.rating_count > 0 ? `${product?.stats?.rating_count} Reviews` : 'No Reviews'}</div>
                        </div>
                    </div>
                    <AddReview product_id={product.id} callback={addReviewToList} review={myReview} />
                    <div className="h-4"></div>
                    <ReviewContainer reviews={reviews} element={ReviewCard} />
                    <div className="h-4"></div>
                </div>
                <Navbar />
                <Footer />
            </Container>
    } else {
        content = <div>
            <div className="w-full">
                <div className="h-12 bg-neutral-200 full dark:bg-neutral-700 max-w-[480px] mb-2.5"></div>
            </div>
            <div className="h-2"></div>
            <div className="space-y-8 m-5 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
                <div className="flex justify-center items-center  w-96 h-48 bg-neutral-300 rounded dark:bg-neutral-700">
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
        </div>
    )
}

export default ProductReview;