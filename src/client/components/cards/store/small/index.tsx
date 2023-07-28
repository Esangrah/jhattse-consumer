import { Image } from "@renderer/image";;
import { Link } from '@renderer/Link';
import { MdOutlineLocationOn} from "react-icons/md";
import { TStore } from '@components/types';
import { Star } from '@components/star';
import { getSafeUrl, sanityIoImageLoader } from '@core/utils';


type Props = {
    store: TStore;
}


export const SmallStoreCard = ({ store }: Props) => {
    const localDistance = store?.address?.distance;
    return (
        <div className="flex flex-col w-full grid grid-cols-3 p-2 gap-2 bg-neutral-50 rounded-md" >
            <div className="col-span-1">
                <div className="px-2 w-max rounded-r-lg mt-1">
                </div>
                <div className="flex justify-center relative" >
                    <Link href={`/store/${store?.id}/${getSafeUrl(store?.name)}`}>
                        <Image
                            loader={sanityIoImageLoader}
                            src={store?.image || "assets/esangrah-profile.png"}
                            alt="picture of store"
                            width="150"
                            height="150"
                            className="border rounded-lg aspect-square"
                        />
                    </Link>
                </div>
            </div>
            <div className="col-span-2 leading-tight gap-1">
                <Link href={`/store/${store?.id}/${getSafeUrl(store?.name)}`}>
                    <div className="font-semibold text-base line-clamp-2 leading-tight">{store?.name}</div>
                </Link>
                {store?.category?.name !== undefined ?
                    <p className="text-sm sm:text-xs text-neutral-900 py-1"><span className="font-medium text-custom_gray">{store?.category?.name}</span></p> : null
                }
                {store?.stats?.rating_overall ? <div className="py-2">
                    <Star rating={store?.stats?.rating_overall} />
                </div> :
                    <div className="py-1">
                        <div className="text-neutral-500">No Ratings</div>
                    </div>
                }
                <div className="flex flex-row gap-2 py-1">
                    {store?.is_pickup && <button className="bg-storepickup text-sm sm:text-xs text-bannerText font-bold px-2 py-1 rounded-sm whitespace-nowrap" >PICKUP</button>}
                    {store?.is_delivery && <button className="bg-delivery text-sm sm:text-xs text-bannerText font-bold px-2 py-1 rounded-sm whitespace-nowrap" >DELIVERY</button>}
                </div>
                <div className="flex flex-row text-sm sm:text-xs items-center">
                    <div className="text-neutral-600"><MdOutlineLocationOn className="text-sm sm:text-xs" /></div><p className="text-sm sm:text-xs text-neutral-600">{store?.address?.street_name}, {store?.address?.city?.name}{(localDistance != undefined && localDistance < 10000) && <><span className="text-neutral-700"> | </span><span className="text-sm sm:text-xs text-neutral-600 font-semibold whitespace-nowrap">{localDistance < 1000 ? localDistance.toFixed(0).toString() + " m" : (localDistance < 10000 ? (localDistance / 1000).toFixed(1).toString() + " km" : null)}</span></>}</p>
                </div>
                <div className="flex items-center text-sm sm:text-xs text-custom_golden font-bold underline-offset-4 py-1">
                    <Link href={`http://www.google.com/maps/place/${store?.address?.latitude},${store?.address?.longitude}`} target="_blank">
                        VIEW LOCATION
                    </Link>
                </div>
            </div>
        </div>
    )
}