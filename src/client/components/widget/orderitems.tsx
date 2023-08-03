import { TCartItem, TProduct } from "@components/types"
import { getCombinedName } from "@components/variant/variantSelector"
import { getImageUrl, humanizeCurrency, sanityIoImageLoader, trimToLength } from "@core/utils"
import { Image } from "@renderer/Image"



interface Props {
    cartValues: TCartItem[]
    title: string
    classes?: string
}

export const OrderItemWidget = ({ title, cartValues, classes }: Props) => {

    return (
        cartValues?.length > 0 ? 
        <div className={`flex flex-col gap-2 lt-sm:hidden px-4 ${classes !== undefined ? classes: ""}`}>
            <h2 className="font-bold text-neutral-700 text-lg pb-1 pt-1">{title}</h2>
            {
                cartValues.map((item => {
                    return <div className="bg-neutral-100 border border-neutral-300 rounded-lg flex gap-2 w-96 items-center justify-between h-20 font-manrope overflow-hidden">
                        <div className='flex gap-2 items-center'>
                            <Image
                                loader={sanityIoImageLoader}
                                src={getImageUrl(item.product?.images || [])}
                                alt={item?.product?.name || 'product'}
                                height="150"
                                width="150"
                                className="rounded-sm h-20 w-20"
                            />
                            <div className="p-2">
                                <h4 className="text-base font-bold text-neutral-600 line-clamp-2">{getCombinedName(item?.product as TProduct, item?.inventory?.variant_id)}</h4>
                                <p className="text-lg font-semibold text-neutral-700">{humanizeCurrency(item?.inventory?.price || item?.product?.mrp as number)}</p>
                            </div>
                        </div>
                        <div className="p-2" style={{ alignSelf: "flex-start" }}>
                            {
                                item?.deliverable ? <span className="bg-business-100 rounded px-2 py-1 text-xs font-bold text-bannerText">DELIVERY</span> :
                                    <span className="bg-customer-100 rounded px-2 py-1 text-xs font-bold text-bannerText">PICKUP</span>
                            }
                        </div>
                    </div>
                }))
            }
        </div>
        :
        <></>
    )
}