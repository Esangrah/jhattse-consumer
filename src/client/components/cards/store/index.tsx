import { useEffect, useState } from 'react'
import { Link } from '@renderer/Link'
import { getDistance } from 'geolib'
import { MdLocationPin, MdShare } from 'react-icons/md';
import { Star } from '@components/star'
import { TStore, TStoreImage } from '@components/types'
import { getLocation } from '@core/geolocation'
import { getSafeUrl, sanityIoImageLoader } from '@core/utils'
import { RWebShare } from 'react-web-share'
import { StoreTiming } from '@components/storetiming'
import { FaPhoneAlt } from 'react-icons/fa'
import { CarouselContainer } from '@components/container/carousel'
import { SwiperSlide } from 'swiper/react'
import { Image } from "@renderer/Image";
import { getStoreImages } from '@api/store'


interface Props {
    store: TStore;
    storeTimings: any;
}

export const StoreTopCard = ({ store, storeTimings }: Props) => {
    const [localDistance, setLocalDistance] = useState<number>();
    const [storeImages, setStoreImages] = useState<TStoreImage[]>([])

    useEffect(() => {
        if (store?.id !== undefined) {
            getStoreImages(store?.id).then((result) => {
                setStoreImages(result);
            })
        }
    }, [store])

    useEffect(() => {
        if (store?.address !== undefined && store?.address?.latitude !== null) {
            getLocation().then((userLocation) => {
                console.log(userLocation);
                let distance = getDistance({ lat: userLocation?.latitude, lng: userLocation?.longitude }, { lat: store?.address?.latitude || 0, lng: store?.address?.longitude || 0 })
                setLocalDistance(distance);
            });
        }
    }, [store?.address])

    return (
        <>
            <CarouselContainer >
                <SwiperSlide style={{ width: "auto" }} className="min-w-0">
                    <div className="p-1 flex-shrink-0">
                        <Image
                            loader={sanityIoImageLoader}
                            src={store?.image || "https://jhattse.com/assets/noimage.png"}
                            className="rounded-sm w-auto h-60"
                            alt={store?.name}
                            priority={"true"}
                            width="200"
                            height="200"
                            loading="eager"
                        />
                    </div>
                </SwiperSlide>
                {
                    storeImages?.map((storeImage) => {
                        return <SwiperSlide style={{ width: "auto" }} className="min-w-0">
                            <div className="p-1 flex-shrink-0">
                                <Image
                                    loader={sanityIoImageLoader}
                                    src={storeImage?.url || "https://cdn.jhattse.com/public/assets/noimage.png"}
                                    className="rounded-sm w-auto h-60"
                                    alt={store?.name}
                                    priority={"true"}
                                    width="200"
                                    height="200"
                                    loading="eager"
                                />
                            </div>
                        </SwiperSlide>
                    })
                }
            </CarouselContainer>
            <div className="h-2"></div>
            <div className="lt-sm:flex-col relative w-full flex flex-row justify-between font-manrope" data-store-id={store?.id} >
                <div className="p-2 pb-1 w-full flex flex-col gap-1.5 leading-tight">
                    <h3 className="text-custom_black font-bold text-xl lt-sm:text-base">{store?.name}</h3>
                    <p className="text-custom_black font-normal lt-sm:text-sm">{store?.category?.name}</p>
                    <div className="flex flex-row gap-2 py-1">
                        {store?.is_pickup && <button className="bg-customer-100 hover:opacity-80 px-2 py-1 text-sm lt-sm:text-xs text-custom_black font-semibold rounded-sm" >PICKUP</button>}
                        {store?.is_delivery && <button className="bg-business-100 hover:opacity-80 px-2 py-1 text-sm lt-sm:text-xs text-custom_black font-semibold rounded-sm" >DELIVERY</button>}
                    </div>
                    <StoreTiming storeTimings={storeTimings} />
                    <div className="flex flex-row gap-2 items-center">
                        <p className="text-custom_black font-medium text-base lt-sm:text-xs"><a href={`tel:${store?.phone}`}><FaPhoneAlt /></a></p>
                        <p className="text-custom_black font-medium text-base lt-sm:text-xs">{store?.phone}</p>
                    </div>
                    <div className="flex flex-row gap-2 items-center pb-1">
                        <p className="flex justify-between items-center text-ellipsis text-custom_black text-base font-medium lt-sm:text-xs"><MdLocationPin className='mr-1' />{`${store?.address?.street_name}, ${store?.address?.city?.name}`}
                            {(localDistance != undefined && localDistance < 100 * 1000) && <div className="inline-flex whitespace-nowrap px-1 gap-1">({localDistance < 1000 ? localDistance.toFixed(0).toString() + " m away" : (localDistance < 10000 ? (localDistance / 1000).toFixed(1).toString() + " km away" : (localDistance > 100 * 1000 ? null : (localDistance / 1000).toFixed(0).toString() + " km away"))}) {store?.address?.latitude != undefined && <Link href={`http://www.google.com/maps/place/${store?.address?.latitude},${store?.address?.longitude}`} target="_blank" className="inline-flex text-golden text-base font-medium lt-sm:text-xs whitespace-nowrap items-center">
                                VIEW LOCATION
                            </Link>}</div>}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col lt-sm:flex-row justify-between text-right py-1 px-2 font-manrope text-xs">
                    <div className="flex flex-col lt-sm:flex-row gap-2 items-end lt-sm:items-center tracking-wide">
                        {store?.stats?.rating_overall ?
                            <Star rating={store?.stats?.rating_overall} />
                            :
                            <div className="grid grid-row grid-flow-col text-custom_gray lt-sm:grid-flow-row">No Reviews</div>
                        }
                        {store?.stats?.rating_count ?
                            <div>
                                <Link href={`/store/${store?.id}/reviews/${getSafeUrl(store?.name)}`}>
                                    <span className="text-golden whitespace-nowrap font-semibold text-underline select-none">SEE REVIEWS</span>
                                </Link>
                            </div>
                            :
                            <div>
                                <Link href={`/store/${store?.id}/reviews/${getSafeUrl(store?.name)}`}>
                                    <span className="text-golden whitespace-nowrap font-semibold text-underline">ADD REVIEW</span>
                                </Link>
                            </div>
                        }
                    </div>
                    <div className="flex items-center justify-end lt-sm:justify-start">
                        <RWebShare
                            data={{
                                text: `${store?.name} is on Jhattse`,
                                url: `https://jhattse.com/store/${store?.id}/${getSafeUrl(store?.name)}`,
                                title: "Store",
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <button className="flex gap-1 items-center justify-center text-golden font-bold text-base"><MdShare /> <span className='lt-sm:hidden'>SHARE</span></button>
                        </RWebShare>
                    </div>
                </div>
            </div>
        </>
    )
}