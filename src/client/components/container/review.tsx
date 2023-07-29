import { ReviewCard } from "@components/cards";
import React from "react";
import { TReview } from "@components/types";


interface Props {
  reviews: TReview[],
  element?: React.ElementType;

}

export const ReviewContainer: React.FC<Props> = ({element, reviews}: Props) => {
  let RepeatElement = element == undefined || element == null? ReviewCard: element;
  return (
    <div className="flex flex grid gap-4 rounded-xl ">
      {reviews && reviews.map((review: TReview) => (
        <RepeatElement review={review} key={review?.id} ></RepeatElement>
      ))}
    </div>
  )
}