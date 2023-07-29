import React from "react";
import { Image } from "@renderer/Image";
import { sanityIoImageLoader } from "@core/utils";

type Props = {
  title: string;
  url: string,
  paragraphs: string[];
};


export const FeatureCard: React.FC<Props> = ({title, paragraphs, url}) => {
  return (
    <div className="bg-neutral-100 flex flex-col p-4 rounded-xl" key={title}>
      <div className="self-center">
          <Image loader={sanityIoImageLoader} src={url} width="80" height="80" alt={title} />
      </div>
      <div className="text-neutral-900 font-semibold text-xl text-center pb-2 select-none">{title}</div>
      {paragraphs.map((sent:string, index:number) => {
        return <p className="text-base text-neutral-900 select-none" key={index}>{sent}</p>
      })}
    </div>
  )
}
