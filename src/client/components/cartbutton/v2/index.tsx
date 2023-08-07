import React from "react";
import { TInventory, TProduct } from "#components/types";
import { useRecoilState } from "recoil";
import { cartState } from "#recoil/atoms";
import { Link} from "#renderer/Link"
import { variantState } from "#recoil/atoms/variant";
import { getLength } from "#core/utils";

type Props = {
  product: TProduct;
  inventory: TInventory;
  mode: string;
  btnSize?: string;
  btnStyle?: string;
};

export const CartButtonV2 = ({
  product,
  inventory,
  mode,
  btnSize,
  btnStyle,
}: Props) => {
  const [Variant, setVariant] = useRecoilState(variantState);

  const onClickAdd = (product: TProduct) => {
    if (getLength(product?.variants) > 0 && typeof window !== "undefined") {
      setVariant({
        Isvariant: true,
        product: product,
        showModal: true,
        quantity: 0,
      });
      console.debug("cartState", Variant);
    }
  };
  return inventory?.external_link !== undefined && inventory?.external_link?.length > 0 ? (
    <div
      className={`flex items-center max-w-lg min-w-full`}
    >
      <Link
        href={inventory?.external_link}
        className="bg-brand-500 py-2 px-9 lt-sm:px-2 text-lg lt-sm:text-sm text-center text-neutral-50 font-bold lt-sm:w-full whitespace-nowrap select-none rounded"
      >
        BUY NOW
      </Link>
    </div>
  ) : (
    <div
      className={`flex items-center max-w-lg min-w-full`}
    >
      <button
        onClick={() => onClickAdd(product)}
        className="bg-brand-500 py-2 px-9 lt-sm:px-2 md:text-lg text-sm text-center text-neutral-50 lt-sm:w-full whitespace-nowrap select-none rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};
