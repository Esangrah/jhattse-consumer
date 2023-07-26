import React, { useState } from "react";
import { BackBar, Title } from "@components";
import { passwordRecovery } from "@api/authentication";
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const [email, setEmail] = useState<string>();
    const [valid, setValid] = useState<Boolean>();
    const [message, setMessage] = useState<string>();
    const navigate = useNavigate()

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(evt.target.value);
        setMessage("");
        setValid(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(evt.target.value))
    }
    return (
        <div>
            <BackBar />
            <Title title="Forgot Password" />
            <div className="flex flex-col justify-center items-center bg-neutral-50">
                <div className="flex flex-col gap-4 p-4">
                    <p className="text-md text-neutral-900">You are requesting for the password change.<br />You will recieve your mail in your requested emailid.</p>
                    <div className="flex flex-col">
                        <label className="font-semibold whitespace-nowrap">Your Email</label>
                        <input className="mt-1 block w-full px-3 py-2 bg-neutral-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" type="email" name="email" placeholder="Enter your email" onChange={handleChange} value={email} />
                    </div>
                    <div className="px-2 mt-1">
                        <button className={`text-base bg-black text-neutral-50 font-semifold p-2 w-full rounded-full`} onClick={() => passwordRecovery(email).then((result) => { navigate("/screen/forgot-password"); }).catch(() => setMessage("Email not found"))} disabled={!valid}>Send Mail</button>
                        <p className="text-error-900">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;