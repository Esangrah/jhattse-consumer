import { TReview } from "@components/types";
import { sanityIoImageLoader } from "@core/utils";
import Moment from "moment";
import { Image } from "@renderer/Image";


type Props = {
  review: TReview;
};


export const StoreReviewCard: React.FC<Props> = ({ review }) => {
  return (
    <div className="bg-neutral-50 p-4 w-full ">
      <div className="grid grid-row grid-flow-col">
        <div className="flex justify-start gap-2">
          <Image
            loader={sanityIoImageLoader}
            src={review.user.profile_image || "/consumer/circular-logo.png"}
            width="24"
            height="24"
            alt="logo"
            loading="eager"
          />

          <h3 className="">{review.user.first_name} {review.user.last_name}  </h3>
        </div>

        <span className="flex justify-end ">
          <div className="rating flex flex-row h-6 gap-0.5 bg-success-500 border-solid border-2 border-green-500  shadow-md rounded-md px-1 w-max ">
            <div className="align-middle gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="black"
                strokeWidth="2" className="w-4 h-4 " viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
              </svg>
            </div>
            <div className="text-neutral-50 text-sm font-semibold">{review.rating}</div>
          </div>
        </span>
      </div>
      <div>
        <h4>{review.comment}</h4>
      </div>
      <div>
        <p>Posted on: {Moment(review.added_on).format('DD/MM/YY')} at {Moment(review.added_on).format('HH:mm')}</p>
      </div>
    </div>
  )

}
