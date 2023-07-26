import { removeAddress } from '@api/address';
import PopupComponent from '@components/popup';
import { TAddress } from '@components/types';
import { requestLogin } from '@core/utils';
import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';

type Props = {
    address: TAddress,
    isChecked: boolean,
    open: Function,
    selectAddress: Function,
    removeCallback: Function,
};


export const AddressCard: React.FC<Props> = ({ address, isChecked, open, selectAddress, removeCallback }) => {
    const [showModel, setShowModel] = useState(false);
    const location = useLocation();

    const handleRemoveAddress = async () => {
        setShowModel(true);
        if (address.id !== undefined) {
            const result = removeAddress(address.id);
            result.then((address: TAddress) => { removeCallback(address) }).catch((e) => {
                if (e.response?.status === 401) {
                    requestLogin(location.pathname);
                }
            })
        }
    }

    const onRemoveAddress = () => {
        setShowModel(true);
    }

    return (
        <div className="bg-neutral-50 flex flex-col gap-2 rounded-lg font-manrope p-2 w-full cursor-pointer" onClick={() => { selectAddress(address) }}>
            <div className="flex gap-4 items-start p-2 py-4">
                <div className="radio pt-1">
                    <label>
                        <input type="radio" value={address.id} checked={isChecked} />
                    </label>
                </div>
                <div>
                    <h2 className="text-custom_black, font-semibold text-lg">{address.type && address.type.length > 0 ? address.type : "Home"}</h2>
                    <p className="text-custom_gray font-medium text-lg">{`${address?.house_number}, ${address?.street_name}`}, {address?.locality}, {`${address?.city?.name}, ${address?.state?.name}, ${address?.pincode}`}</p>
                </div>
            </div>
            <div className="p-2 border-t flex divide-x">
                <div className="flex-1 flex justify-center items-center">
                    <button className="font-bold text-custom_golden text-base" onClick={() => { open() }}>EDIT</button>
                </div>
                <div className="flex-1 flex justify-center items-center" onClick={onRemoveAddress}>
                    <button className="font-bold text-custom_golden text-base">DELETE</button>
                </div>
            </div>
            <PopupComponent
                setShowModal={setShowModel}
                showModal={showModel} message="Are you sure you want to remove this address?"
                btnName="YES, REMOVE address"
                ActionFun={handleRemoveAddress}
                closeBtnName="CANCEL" />
        </div>

    )
}

