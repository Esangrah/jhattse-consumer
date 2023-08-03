
import React, { useState } from "react";
import { TAddress } from "@components/types";
import { AddressCard } from "@components/cards/address";
import { useRecoilState } from "recoil";
import { addressState } from "@recoil/atoms";


interface Props {
  title?: string,
  open: Function,
  savedAddress: TAddress[],
  selectAddressCallback: Function,
  removeCallback: Function,
  element?: React.ElementType;
  customStyle?: string;

}

export const AddressContainer: React.FC<Props> = ({ element, open, savedAddress, selectAddressCallback, title, removeCallback, customStyle }: Props) => {
  const [selectedAddress, setSelectedAddress] = useRecoilState<TAddress>(addressState)

  const doDoubleSet = (address: TAddress) => {
    setSelectedAddress(address);
    if (typeof selectAddressCallback == "function") {
      selectAddressCallback(address);
    }
  }

  let RepeatElement = element == undefined || element == null ? AddressCard : element;
  return (
    <div className={customStyle ? customStyle : "flex flex-col gap-4 rounded-xl"}>
      {title && <div className="p-2 mx-4 bg-neutral-800 text-neutral-50 font-semibold text-lg">{title}</div>}
      {savedAddress && savedAddress.map((address: TAddress) => (
        <RepeatElement key={address.id} address={address} isChecked={selectedAddress?.id === address.id} open={open} selectAddress={doDoubleSet} removeCallback={removeCallback}></RepeatElement>
      ))}
    </div>
  )
}
