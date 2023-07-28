import React, { useState, useEffect } from 'react'
import { TAddReviews, TReview } from '@components/types'
import { addStoreReviews } from "@api/rating";
import { requestLogin, sanityIoImageLoader } from "@core/utils";
import Moment from "moment";
import { Image } from "@renderer/image";
import { usePageContext } from '@renderer/usePageContext';

type Props = {
    store_id: number;
    callback: Function;
    review: TReview;
};

function StarIcon(props: any) {
    const { fill = 'none' } = props;
    return (
        // <svg className="w-6 h-6" fill={fill} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
        <svg aria-hidden="true" className="w-6 h-6" fill={fill} stroke="#D8AC0F" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    );
}

function RatingIcon(props: any) {
    const {
        index,
        rating,
        hoverRating,
        onMouseEnter,
        onMouseLeave,
        onSaveRating,
    } = props;
    const fill = React.useMemo(() => {
        if (hoverRating >= index) {
            return '#D8AC0F';
        } else if (!hoverRating && rating >= index) {
            return '#D8AC0F';
        }
        return 'none';
    }, [rating, hoverRating, index]);
    return (
        <div
            className="cursor-pointer"
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={() => onMouseLeave()}
            onClick={() => onSaveRating(index)}>
            <StarIcon fill={fill} />
        </div>
    )
}




export const AddStoreReview: React.FC<Props> = ({ store_id, callback, review }) => {
    const [rating, setRating] = React.useState(0);
    const [hoverRating, setHoverRating] = React.useState(0);
    const [message, setMessage] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const [state, setState] = useState < TAddReviews > ({});
    const pageContext = usePageContext()

    const onMouseEnter = (index: number) => {
        setHoverRating(index);
    };

    const onMouseLeave = () => {
        setHoverRating(0);
    };

    const onSaveRating = (index: number) => {
        setRating(index);
        setState({ ...state, rating: index })
    };

    const handleComment = async (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState({ ...state, [evt.target.name]: evt.target.value });
    }

    const handleAddReview = async () => {
        if (state?.comment === undefined || state?.comment.length == 0) {
            setMessage("Please write something");
            return;
        } else {
            setMessage("")
        }
        if (state?.rating === undefined || state?.rating == 0) {
            setMessage("Please provide rating");
            return;
        }
        if (state !== undefined) {
            const result = addStoreReviews(state);
            result.then((review) => { callback(review); setMessage("review submitted"); setUpdateMode(false) }).catch((e) => {
                setMessage("Some error occurred.");
                if (e.response?.status === 401) {
                    requestLogin(pageContext.urlOriginal);
                }
            })
            console.log("comment is ", result);
        }

    }

    useEffect(() => {
        setState({ comment: review?.comment, rating: review?.rating, id: review?.id, store_id: store_id })
    }, [review])

    return (
        <div className="grid grid-rows w-full p-2 bg-sky-800">
            {

                review == null || updateMode ?
                    <>
                        <div>
                            <h4 className="text-lg px-3 text-golden font-semibold">Write a review</h4>
                        </div>
                        <div className="relative w-full px-2">
                            <div className="box flex">
                                {[1, 2, 3, 4, 5].map((index) => {
                                    return (
                                        <RatingIcon
                                            index={index}
                                            rating={rating}
                                            hoverRating={hoverRating}
                                            onMouseEnter={onMouseEnter}
                                            onMouseLeave={onMouseLeave}
                                            onSaveRating={onSaveRating}
                                        />
                                    )
                                })}
                            </div>
                            <div className="h-2"></div>
                            {/* <span className="block text-sm font-medium text-slate-700">Comment*</span> */}
                            <textarea maxLength={300} name="comment" id="comment"
                                value={state?.comment} onChange={(evt) => handleComment(evt)}
                                rows={1}
                                cols={80}
                                className="border-0 px-2 py-2  placeholder-neutral-900 text-neutral-800 rounded-xl text-sm shadow focus:outline-none w-full"
                                placeholder="Write a review" required>
                            </textarea>
                        </div>
                        <div className="px-2 mt-1">
                            <button id="feedbackBtn" onClick={() => handleAddReview()}
                                className="bg-golden text-neutral-900 text-center mx-auto active:bg-yellow-400 text-sm uppercase p-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                type="submit">Submit
                            </button>
                            <p className="text-error-900">{message}</p>
                        </div>
                    </> :
                    <>
                        <div> <h4 className="text-xl mb-4 text-golden font-semibold">Your Review</h4>
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
                                    <div className="flex justify-end">
                                        <button className="text-blue-900" onClick={() => { setUpdateMode(true) }}>Edit</button>
                                    </div>

                                </div>
                                <div>
                                    <h4>{review.comment}</h4>
                                </div>
                                <div>
                                    <p>Posted on: {Moment(review.added_on).format('DD/MM/YY')} at {Moment(review.added_on).format('HH:mm')}</p>
                                </div>
                            </div>
                        </div>
                    </>
            }

        </div>
    )
}
