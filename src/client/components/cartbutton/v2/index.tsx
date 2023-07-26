import React from "react";
import { TInventory, TProduct } from "@components/types";
import { useRecoilState } from "recoil";
import { cartState } from "@recoil/atoms";
import { Link} from "react-router-dom"
import { variantState } from "@recoil/atoms/variant";

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
  const [cart, setCart] = useRecoilState(cartState);
  const [Variant, setVariant] = useRecoilState(variantState);

  const onClickAdd = (product: TProduct) => {
    if (product?.variants.length !== 0 && typeof window !== "undefined") {
      setVariant({
        Isvariant: true,
        product: product,
        showModal: true,
        quantity: 0,
      });
    }
  };
  return inventory?.external_link?.length > 0 ? (
    <div
      className={`flex justify-center items-center max-w-lg min-w-full`}
    >
      <Link
        href={inventory?.external_link}
        className="bg-brand-500 py-2 px-9 sm:px-2 text-lg sm:text-sm text-center text-neutral-50 font-bold sm:w-full whitespace-nowrap select-none rounded"
      >
        BUY NOW
      </Link>
    </div>
  ) : (
    <div
      className={`flex justify-center items-center max-w-lg min-w-full`}
    >
      <button
        onClick={() => onClickAdd(product)}
        className="bg-brand-500 py-2 px-9 sm:px-2 text-lg sm:text-sm text-center text-neutral-50 font-bold sm:w-full whitespace-nowrap select-none rounded"
      >
        ADD
      </button>
    </div>
  );
};
