import React from "react";
import { Image } from "@renderer/image";
import { Link} from "react-router-dom"
import { TBrand } from "@components/types";
import { getSafeUrl, sanityIoImageLoader } from "@core/utils";

type Props = {
  product: TBrand;
};

export const BrandCard: React.FC<Props> = ({ product }) => {
  return (
    <div
      key={product.id}
      className="bg-neutral-50 border-neutral-200 rounded-xl border shrink-0 w-40 pb-2 h-60"
    >
      <div className="flex h-44">
        <Link to={`/brand/${product.id}/${getSafeUrl(product.name)}`}>
          <Image
            loader={sanityIoImageLoader}
            src={product.image || "assets/esangrah-profile.png"}
            className="w-40 h-40 rounded-t-xl"
            alt={product.name}
            width="180"
            height="250"
            loading="eager"
          />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center font-bold overflow-hidden">
        <h3 className="text-xl text-darkGray text-ellipsis break-words line-clamp-2 md:line-clamp-none leading-tight py-2">
          {product.name}
        </h3>
      </div>
    </div>
  );
};
