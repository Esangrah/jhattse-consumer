import { getprofile, updateProfile, uploadProfileImage } from '@api/authentication'
import { TIdentity, TOtp } from '@components/types'
import React, { useEffect, useState } from 'react'
import { Image } from "@renderer/image";
import { CgClose } from 'react-icons/cg'
import { MdEdit, MdVerified } from 'react-icons/md'
import { useRecoilState } from 'recoil'
import { profileState } from '@recoil/atoms'
import { requestLogin, sanityIoImageLoader } from '@core/utils'
import { AiFillCamera } from 'react-icons/ai'
import { verifyMobile } from '@api/verification'
import { motion } from "framer-motion";
import FileUploadPopup from '@components/popup/fileupload'
import { useLocation, useNavigate } from 'react-router-dom'

export const ProfileCard = () => {
    const [user, setUser] = useRecoilState<TIdentity>(profileState);
    const [isedit, setIsEdit] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [imageFile, setImageFile] = useState<File>(null);
    const [otp, setOtp] = useState<TOtp>();
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()
    const mobile = user?.phone;

    // Loader spinTransition
    const spinTransition = {
        loop: Infinity,
        ease: "easeInOut",
        duration: 1,
        repeat: Infinity
    };

    const handleInput = async (evt: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [evt.target.name]: evt.target.value });
    }

    const updateUser = async () => {
        const res: Promise<TIdentity> = updateProfile(user);
        res.then((result) => setUser(result));
        res.then((result) => localStorage.setItem("profile", JSON.stringify(result)))
    }

    useEffect(() => {
        const res: Promise<TIdentity> = getprofile();
        res.then((result) => setUser(result))
    }, [])

    useEffect(() => {
        setOtp({ ...otp, "key": user?.phone, "type": "m" })
    }, [user])

    const handleVerify = () => {
        if (user?.phone !== undefined) {
            const result = verifyMobile(otp);
            result.then((res: TOtp) => { navigate(res.link) }).catch((e) => {
                if (e.response?.status === 401) {
                    requestLogin(location.pathname);
                }
            })
        }

    }
    const handleOnclickProfile = () => {
        setShowModel(true)
    }

    const uploadNewImage = () => {
        if (imageFile !== null && imageFile !== undefined) {
            uploadProfileImage(imageFile).then(() => {
                setIsLoading(true)
                const res: Promise<TIdentity> = getprofile();
                res.then((result) => {
                    setUser(result)
                    setIsLoading(false)
                })
            })
        }
    }
    useEffect(() => {
        uploadNewImage()
    }, [imageFile])

    return (
        <div className="grid grid-flow-col grid-cols-6 place-content-center sm:place-content-start min-h-screen bg-neutral-50">
            <div className="grid gap-2 col-start-3 col-span-2 lg:col-start-2 lg:col-span-4 sm:col-start-1 sm:col-span-6 sm:rounded-none rounded-lg  border bg-neutral-50 p-6 ">
                <div className="flex justify-center p-4">
                    <div className="relative">
                        {isLoading ? <div className="flex h-44 w-full justify-center items-center">
                            <div className="relative">
                                <motion.span className="block box-border rounded-full w-12 h-12 border-2 border-solid border-ternary border-t-golden"
                                    animate={{ rotate: 360 }}
                                    transition={spinTransition}
                                />
                            </div>
                        </div> :
                            <div className="cursor-pointer" onClick={() => handleOnclickProfile()}>
                                <Image
                                    loader={sanityIoImageLoader}
                                    src={user?.profile_image || "assets/esangrah-profile.png"}
                                    alt={user?.first_name}
                                    width="100"
                                    height="100"
                                    className="rounded-full aspect-square"
                                />
                            </div>}
                        <div className="absolute right-0 bottom-2 flex h-6 items-center p-1 rounded-full bg-neutral-400"><AiFillCamera /></div>
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    {isedit == true ?
                        <div className="flex flex-flow-row gap-2 items-center text-sky-700 cursor-pointer" onClick={() => { setIsEdit(false) }}><span className="text-xl font-semibold">Cancel</span><span className="text-2xl font-semibold"><CgClose /></span></div>
                        :
                        <div className="flex flex-flow-row gap-2 items-center text-sky-600 cursor-pointer" onClick={() => { setIsEdit(true) }}><span className="text-xl font-semibold">Edit</span><span className="text-2xl font-semibold"><MdEdit /></span></div>
                    }
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-4">
                        <label className=" block text-base text-neutral-600">First Name</label>
                        <input className={`w-full p-2 text-base text-neutral-700 border border-neutral-900 rounded ${isedit == true ? "" : "cursor-not-allowed"}`} type="text" name="first_name" value={user?.first_name} required placeholder={user?.first_name} onChange={(evt) => handleInput(evt)} disabled={isedit == true ? false : true} aria-label=""></input>
                    </div>
                    <div className="grid gap-4">
                        <label className=" block text-base text-neutral-600">Last Name</label>
                        <input className={`w-full p-2 text-base text-neutral-700 border border-neutral-900 rounded ${isedit == true ? "" : "cursor-not-allowed"}`} type="text" name="last_name" value={user?.last_name} required placeholder={user?.last_name} onChange={(evt) => handleInput(evt)} disabled={isedit == true ? false : true} aria-label=""></input>
                    </div>
                    <div className="grid gap-4">
                        <label className=" block text-base text-neutral-600">Email</label>
                        <input className={`w-full p-2 text-base text-neutral-700 border border-neutral-900 rounded ${isedit == true ? "" : "cursor-not-allowed"}`} type="text" name="email" value={user?.email} required placeholder={user?.email} onChange={(evt) => handleInput(evt)} disabled={isedit == true ? false : true} aria-label=""></input>
                    </div>
                    <div className="grid gap-4">
                        <div className="flex gap-2">
                            <label className=" block text-base text-neutral-600">Mobile Number</label>
                            {
                                user?.phone_verified === true ?
                                    <span className="flex items-center text-lg text-green-500"><MdVerified /></span>
                                    :
                                    <button onClick={() => { handleVerify() }} ><span className="text-sm text-sky-500">Verify</span></button>
                            }
                        </div>
                        <input className={`w-full p-2 text-base text-neutral-700 border border-neutral-900 rounded ${isedit == true ? "" : "cursor-not-allowed"}`} type="text" name="phone" value={user?.phone} required placeholder={user?.phone} onChange={(evt) => handleInput(evt)} disabled={isedit == true ? false : true} aria-label=""></input>
                    </div>
                    <div className="grid gap-4">
                        {/* <button className="bg-brand-500 px-4 py-2 text-neutral-50 text-base rounded-md " onClick={() =>{setIsEdit(true)}}>Edit</button> */}
                        <button className="bg-brand-500 hover:bg-brand-500 focus:bg-brand-500 px-4 py-2 text-neutral-50 text-base rounded-md" disabled={!isedit} onClick={() => { updateUser(); setIsEdit(false) }}>{isedit == true ? "Save" : "Saved"}</button>

                    </div>
                </div>
            </div>
            <FileUploadPopup showModal={showModel} setShowModal={setShowModel} btnName='UPLOAD' setImageFile={setImageFile} />
        </div>
    )
}
