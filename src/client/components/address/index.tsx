
import { TAddress } from '@components/types';
import React, { useEffect, useState } from 'react'
import Addaddress from '@components/address/add'
import { AddressContainer } from '@components/container/address';
import { getAddresses } from '@api/address';
import { useRecoilState } from 'recoil';
import { addressState } from '@recoil/atoms';
import { requestLogin } from '@core/utils';
import { FaPlus } from 'react-icons/fa';

interface Props {
  title?: string
  isDone?: Function
  heading?: string
  btnPlacedButtom?: boolean
  customStyle?: string
}

const AddressPanel: React.FC<Props> = ({ isDone, title, heading, btnPlacedButtom = false, customStyle }) => {
  const [savedAddress, setSavedAddress] = useState<TAddress[]>([])
  const [isShown, setIsShown] = useState(false)
  const [selectAddress, setSelectedAddress] = useRecoilState<TAddress>(addressState)
  const [isEdit, setIsEdit] = useState(true)

  const addAddressToList = (address: TAddress) => {
    let addressArray = savedAddress.filter((a) => a.id != address?.id)
    addressArray.unshift(address);
    setSavedAddress(addressArray);
    setSelectedAddress(address)
  }

  const removeAddressFromList = (address: TAddress) => {
    let addressArray = savedAddress.filter((a) => a.id != address?.id)
    setSavedAddress(addressArray);
  }


  const handleAddClick = () => {
    setIsShown(true);
    setIsEdit(false);
  };

  const toggle = (state: boolean) => {
    setIsShown(state);
    setIsEdit(true)
  }

  useEffect(() => {
    const res: Promise<TAddress[]> = getAddresses();
    res.then((savedAddress) => setSavedAddress(savedAddress)).catch((e) => {
      if (e.response?.status === 401) {
        requestLogin(router.asPath);
      }
    })
    console.log("my address", savedAddress)
  }, [])

  useEffect(() => {
    if (selectAddress !== null && selectAddress !== undefined && isShown === false) {
      isDone(true);
    } else {
      isDone(false);
    }
  }, [isShown, selectAddress])

  return (
    <>
      {/* <BackBar /> */}
      {/* <Title title={title} /> */}
      <div className="flex flex-col justify-center w-full font-manrope sm:px-4">
        {!isShown &&
          <div className="w-full justify-center">
            <div className="flex items-center justify-between py-2">
              {
                heading ? <h2 className="font-bold text-custom_black text-xl">{heading}</h2> : null
              }
              <button onClick={handleAddClick}
                className={`text-golden font-bold flex items-center gap-2 ${btnPlacedButtom && "sm:hidden"}`}>
                <span><FaPlus /></span>
                <span>ADD NEW ADDRESS</span>
              </button>

            </div>
            <div className="h-2"></div>
            {savedAddress?.length > 0 &&
              <AddressContainer customStyle={customStyle} savedAddress={savedAddress} open={() => { toggle(true) }} selectAddressCallback={setSelectedAddress} removeCallback={(address: TAddress) => removeAddressFromList(address)} />
            }
          </div>}
        {isShown &&
          <div className="w-full justify-center">
            <Addaddress addressCallback={(address: TAddress) => addAddressToList(address)} close={() => { toggle(false) }} initialAddress={isEdit ? selectAddress : null} isEdit={isEdit} />
          </div>}
      </div>
      <div className={`hidden ${btnPlacedButtom && "sm:block"} items-center align-bottom w-full sm:fixed bottom-10 z-40 sm:py-4 sm:px-4`}>
        <button onClick={handleAddClick}
          className="text-golden font-bold flex items-center gap-2 sm:w-full sm:bg-store_yellow sm:border-yellow-300 sm:text-custom_black sm:rounded-sm sm:text-sm p-2 sm:justify-center">
          <span>ADD NEW ADDRESS</span>
        </button>
      </div>
    </>
  );
}

export default AddressPanel