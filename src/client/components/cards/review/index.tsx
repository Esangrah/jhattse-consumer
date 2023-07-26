import { Star } from "@components/star";
import { TReview } from "@components/types";
import { getColor, sanityIoImageLoader } from "@core/utils";
import Moment from "moment";
import { Image } from "@renderer/image";


type Props = {
  review: TReview;
};


export const ReviewCard: React.FC<Props> = ({ review }) => {
  return (
    <div className="bg-neutral-50 p-4 w-full ">
      <div className="flex flex-row justify-between">
        <div className="flex justify-start gap-2">
          <Image
            loader={sanityIoImageLoader}
            src={review.user.profile_image || "/icons/circular-logo.png"}
            width="24"
            height="24"
            alt="logo"
            loading="eager"
          />

          <h3 className="">{review.user.first_name} {review.user.last_name}  </h3>
        </div>
        <Star rating={review.rating} />
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
