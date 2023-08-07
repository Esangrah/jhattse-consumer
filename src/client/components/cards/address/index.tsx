import { removeAddress } from '#api/address';
import PopupComponent from '#components/popup';
import { TAddress } from '#components/types';
import { requestLogin } from '#core/utils';
import React, { useState } from 'react'
import { usePageContext } from '#renderer/usePageContext';
import { MdDelete, MdEdit } from 'react-icons/md';

type Props = {
    address: TAddress,
    isChecked: boolean,
    open: Function,
    selectAddress: Function,
    removeCallback: Function,
};


export const AddressCard: React.FC<Props> = ({ address, isChecked, open, selectAddress, removeCallback }) => {
    const [showModel, setShowModel] = useState(false);
    const pageContext = usePageContext()

    const handleRemoveAddress = async () => {
        setShowModel(true);
        if (address.id !== undefined) {
            const result = removeAddress(address.id);
            result.then((address: TAddress) => { removeCallback(address) }).catch((e) => {
                if (e.response?.status === 401) {
                    requestLogin(pageContext.urlOriginal);
                }
            })
        }
    }

    const onRemoveAddress = () => {
        setShowModel(true);
    }

    return (
        <div className="bg-neutral-100 border border-neutral-300 flex flex-col gap-2 rounded-lg font-manrope p-2 w-full cursor-pointer" onClick={() => { selectAddress(address) }}>
            <div className="flex gap-4 items-start p-2 py-4">
                <div className="radio pt-1">
                    <label>
                        <input type="radio" value={address.id} checked={isChecked} />
                    </label>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className="text-neutral-700 font-bold text-base">{address.type && address.type.length > 0 ? address.type : "Home"}</h2>
                    <p className="text-neutral-500 font-bold text-base">{`${address?.house_number}, ${address?.street_name}`}, {address?.locality}, {`${address?.city?.name}, ${address?.state?.name}, ${address?.pincode}`}</p>
                    <div className="flex items-center gap-4">
                        <button className="bg-brand-500 hover:opacity-80 focus:opacity-80 py-1 md:px-6 px-2 text-base text-center text-neutral-50 font-bold whitespace-nowrap select-none rounded flex items-center gap-2" onClick={() => { open() }}><MdEdit className="text-neutral-50 text-lg" /> Edit</button>
                        <button className="bg-neutral-50 hover:opacity-80 focus:opacity-80 py-1 md:px-6 px-2 text-base text-center text-brand-500 font-bold whitespace-nowrap select-none rounded border border-brand-500 flex items-center gap-2" onClick={onRemoveAddress}><MdDelete className="text-brand-500 text-lg" /> Delete</button>
                    </div>
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

