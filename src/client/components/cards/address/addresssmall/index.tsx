import { TAddress } from "#components/types"
import { addressState } from "#recoil/atoms"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { navigate } from 'vite-plugin-ssr/client/router';

export const AddressSmallCard = () => {
  const [address, setAddress] = useState < TAddress > ()
  const defaultaddress = useRecoilValue < TAddress > (addressState)

  useEffect(() => {
    setAddress(defaultaddress)
  }, [])

  const AddAddress = () => {
    navigate('/account/addresses')
  }


  return (
    <div className="flex flex-row justify-between px-2 py-1 bg-neutral-50">
      {address?.city_id == undefined ?
        <button className="py-1 px-2 border-md border border rounded-md" onClick={AddAddress}>Add Delivery Address</button>
        :
        <div className="">
          <div><span className="font-semibold">{address?.type && address?.type.length > 0 ? address?.type : "Home"}</span></div>
          <div className="flex text-base">{`${address?.house_number}, ${address?.street_name}, ${address?.locality}, ${address?.city?.name}, ${address?.state?.name}, ${address?.pincode}`}</div>
        </div>
      }
    </div>
  )
}

