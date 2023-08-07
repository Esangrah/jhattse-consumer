import { Image } from "#renderer/Image";;
import { Link } from '#renderer/Link';
import { MdOutlineLocationOn} from "react-icons/md";
import { TStore } from '#components/types';
import { Star } from '#components/star';
import { getSafeUrl, sanityIoImageLoader } from '#core/utils';


type Props = {
    store: TStore;
}


export const SmallStoreCard = ({ store }: Props) => {
    const localDistance = store?.address?.distance;
    return (
        <div className="flex flex-row gap-2 w-full bg-neutral-50 rounded-lg border border-neutral-300 overflow-hidden min-w-72 h-40" >
            <div className="w-40">
                <div className="flex relative h-full">
                    <Link href={`/store/${store?.id}/${getSafeUrl(store?.name)}`}>
                        <Image
                            loader={sanityIoImageLoader}
                            src={store?.image || "assets/esangrah-profile.png"}
                            alt="picture of store"
                            width="150"
                            height="150"
                            className="border rounded-l-lg aspect-square h-full"
                        />
                    </Link>
                </div>
            </div>
            <div className="leading-tight p-2 px-0 flex flex-col gap-1.5 font-manrope">
                <Link href={`/store/${store?.id}/${getSafeUrl(store?.name)}`}>
                    <div className="font-bold text-base line-clamp-2 leading-tight text-neutral-900">{store?.name}</div>
                </Link>
                {store?.category?.name !== undefined ?
                    <p className="font-semibold text-sm text-neutral-500">{store?.category?.name}</p> : null
                }
                {store?.stats?.rating_overall ? <div className="">
                    <Star rating={store?.stats?.rating_overall} />
                </div> :
                    <div className="">
                        <div className="text-error-500 text-sm">No Ratings</div>
                    </div>
                }
                <div className="flex flex-row gap-2">
                    {store?.is_pickup && <button className="bg-brand-100 text-xs text-bannerText font-bold px-2 py-1 rounded-sm whitespace-nowrap" >PICKUP</button>}
                    {store?.is_delivery && <button className="bg-business-100 text-xs text-bannerText font-bold px-2 py-1 rounded-sm whitespace-nowrap" >DELIVERY</button>}
                </div>
                <Link href={`http://www.google.com/maps/place/${store?.address?.latitude},${store?.address?.longitude}`} target="_blank">
                    <div className="flex flex-row text-xs font-bold gap-1 text-ellipsis">
                        <div className="text-brand-500"><MdOutlineLocationOn className="text-xs" /></div>
                        <div>
                            <p className="text-xs text-brand-500">{store?.address?.street_name}, {store?.address?.city?.name}{(localDistance != undefined && localDistance < 10000) && <><span className="text-neutral-700"> | </span><span className="text-sm lt-sm:text-xs text-neutral-600 font-semibold whitespace-nowrap">{localDistance < 1000 ? localDistance.toFixed(0).toString() + " m" : (localDistance < 10000 ? (localDistance / 1000).toFixed(1).toString() + " km" : null)}</span></>}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}