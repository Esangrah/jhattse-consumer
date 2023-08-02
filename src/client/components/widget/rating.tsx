import { getReviews } from "@api/rating"
import { Star } from "@components/star"
import { TReview, TProduct } from "@components/types"
import { getColor, getSafeUrl } from "@core/utils"
import { Link} from "@renderer/Link"
import { useEffect, useState } from "react"



interface Props {
    isLoading?: boolean
    product: TProduct
}

export const RatingWidget = ({ isLoading, product }: Props) => {
    const [reviews, setReviews] = useState<TReview[]>([]);

    useEffect(() => {
        if (product?.id !== undefined && product?.id > 0) {
            getReviews(product?.id, 3).then((res: TReview[]) => {
                setReviews(res)
            })
        }
    }, [product?.id])

    return (
        <div className="flex flex-col gap-2">
            <div><h3 className="text-lg lt-sm:text-base text-neutral-700 font-bold">Reviews</h3></div>
            <div className="flex flex-row divide-x">
                <div className="flex flex-col">
                    <div className="flex flex-row gap-4 text-5xl lt-sm:text-3xl">
                        <div className={`font-extrabold ${getColor(product?.stats?.rating_overall) == 1 ? "text-error-500" : (getColor(product?.stats?.rating_overall) == 2 ? "text-primary_yellow" : "text-success-500")}`}>{product?.stats?.rating_overall?.toFixed(1)}</div>
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
                    <div className="text-lg lt-sm:text-sm text-neutral-600">{product?.stats?.rating_count !== undefined && product?.stats?.rating_count > 0 ? `${product?.stats?.rating_count} Reviews` : 'No Reviews'}</div>
                </div>
            </div>
            <div className="flex flex-col gap-4 divide-y">
                {reviews?.map((review: TReview) => {
                    return <div className="flex flex-row gap-4 py-2">
                        <Star rating={review?.rating} /><div><p className="text-neutral-700 text-sm">{review?.comment}</p></div>
                    </div>
                })}
            </div>
            {product?.stats?.rating_count !== undefined && product?.stats?.rating_count <= 3 ?
                <div className="text-xs font-bold text-brand-500">
                    <Link href={`/product/${product?.id}/reviews/${getSafeUrl(product?.name)}`}>
                        Add Product Review
                    </Link>
                </div>
                :
                <div className="text-xs font-bold text-brand-500">
                    <Link href={`/product/${product?.id}/reviews/${getSafeUrl(product?.name)}`}>
                        All {product?.stats?.rating_count} Reviews
                    </Link>
                </div>
            }
        </div>)
}