import React, { useState, useEffect } from 'react'
import { Image } from "@renderer/Image";
import { Link } from '@renderer/Link'
import { getSafeUrl, sanityIoImageLoader } from '@core/utils';
import { ReviewCard } from '@components/cards';
import { getStoreReviews, getMyStoreReview } from '@api/rating';
import { ReviewContainer } from '@components/container';
import { TReview, TStore } from "@components/types";
import { Container } from "@components/container"
import { Navbar } from "@components/navbar";
import { BackBar } from "@components/header/backbar";
import { getStore } from '@api/store';
import { AddStoreReview } from '@components/addreview/store';
import { usePageContext } from '@renderer/usePageContext';
import type { PageContextBuiltIn } from 'vite-plugin-ssr/types';

interface Props {
    initialStore: TStore
    initialReviews: TReview[]
}

export async function onBeforeRender(pageContext: PageContextBuiltIn) {
    const { id } = pageContext.routeParams;
    const res = await getStore(parseInt(id as string));
    const initialStore: TStore = res;
    const initialReviews = await getStoreReviews(parseInt(id));

    return {
        pageContext: {
            pageProps: {
                initialStore,
                initialReviews
            },
            documentProps: {
                title: `${initialStore?.name} Reviews - Jhattse`,
                description: `${initialStore?.name} offering products and services on Jhattse`,
                image: initialStore?.image,
                keywords: `Local Stores,${initialStore?.name},${initialStore?.name} Reviews,Jhattse`,
                canonicalURL: `https://jhattse.com/store/${initialStore.id}/reviews/${getSafeUrl(initialStore?.name)}`,
            }
        }
    }
}

export const Page: React.FC<Props> = ({ initialReviews, initialStore }: Props) => {
    const [store, setStore] = useState<TStore>(initialStore);
    const [reviews, setReviews] = useState<TReview[]>(initialReviews);
    const [myReview, setMyReview] = useState<TReview>();
    const pageContext = usePageContext()


    const addReviewToList = (review: TReview) => {
        let reviewArray: TReview[] = reviews;
        const res: Promise<TStore> = getStore(store.id);
        res.then((store) => setStore(store));
        setMyReview(review);
        reviewArray = reviewArray.filter(r => r.id != review.id)
        reviewArray.unshift(review);
        setReviews([...reviewArray]);
    }


    useEffect(() => {
        // TODO:
        let id = pageContext.urlParsed?.search.id;
        if (id === undefined || id == store?.id.toString()) {
            return
        }
        const res: Promise<TStore> = getStore(parseInt(id));
        res.then((store) => setStore(store));
    }, [pageContext.urlOriginal])


    useEffect(() => {
        if (store != undefined) {
            getStoreReviews(store.id).then((reviews) => {
                setReviews(reviews);
            });
            getMyStoreReview(store.id).then((review) => {
                if (review !== null) {
                    setMyReview(review);
                }
            });
        }
    }, [store])




    return (
        (store != undefined) ?
            <Container>
                <title>{`${store?.name} Reviews - Jhattse`}</title>
                <BackBar />
                <div className="lt-sm:grid-rows lg:grid-rows">
                    <div className="grid grid-row grid-flow-col w-full bg-yellow-400 p-2 font-bold text-lg">
                        {store?.stats?.rating_overall ?
                            <div className="flex gap-1">
                                <span className="text-base">Avg Rating - {store?.stats?.rating_overall}</span><span className="text-base text-neutral-900">|</span><span className="text-base">Reviews - {store?.stats?.rating_count}</span>
                            </div>
                            :
                            <div className="flex">
                                <span className="text-base">No reviews </span>
                            </div>
                        }
                    </div>
                    <div className=" bg-yellow-400 p-2">
                        <div className="flex gap-4 flex-row p-4 rounded-xl bg-yellow-200 lt-sm:flex-wrap " >
                            <div className="flex-shrink-0">
                                <div className="flex" >
                                    <Link href={`/store/${store.id}/${getSafeUrl(store?.name)}`}>
                                        <Image
                                            loader={sanityIoImageLoader}
                                            priority={"true"}
                                            src={store.image || "assets/esangrah-profile.png"}
                                            alt={store.name}
                                            width="80"
                                            height="100"
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="bg-yellow-200">
                                <Link href={`/store/${store.id}/${getSafeUrl(store?.name)}`}><div className="font-bold text-lg mb-1 mb-1">{store.name}</div></Link>
                                <div className="opacity-75">
                                    <span className="text-neutral-900">{store?.category?.name}</span>
                                </div>
                                <div className="h-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-4"></div>
                <AddStoreReview store_id={store.id} callback={addReviewToList} review={myReview} />
                <div className="h-4"></div>
                <ReviewContainer reviews={reviews} element={ReviewCard} />
                <div className="h-4"></div>
                <Navbar />
            </Container>
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