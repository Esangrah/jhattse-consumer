import React, { useEffect, useState } from "react";
import { BackBar } from "@components/header/backbar";
import { Title } from "@components/header/title";
import { passwordReset } from "@api/authentication";
import { TPasswordReset } from "@components/types";
import { navigate } from 'vite-plugin-ssr/client/router';
import { usePageContext } from "@renderer/usePageContext";

export const Page = () => {
    const [state, setState] = useState<TPasswordReset>();
    const [valid, setValid] = useState<Boolean>();
    const pageContext = usePageContext();

    useEffect(() => {
        if (pageContext.urlParsed?.search?.token?.length > 0) {
            let token = pageContext.urlParsed?.search?.token;
            setState({ ...state, token: token })
        }
    }, [pageContext.urlOriginal])

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [evt.target.name]: evt.target.value });
        let input = evt.target.value
        if (evt.target.name == "new_password") {
            setValid(input.length >= 8);
            // input.match(/[a-z]/g) && input.match(/[A-Z]/g) && input.match(/[0-9]/g) && input.match(/[^a-zA-Z\d]/g) && 
        }
    }
    return (
        <div>
            <BackBar />
            <Title title="Reset Password" />
            <div className="flex flex-col justify-center items-center bg-neutral-50">
                <div className="flex flex-col w-full gap-4 p-4">
                    <p className="text-base text-neutral-900">Please set secure new password.</p>
                    <div className="flex flex-col">
                        <label className="font-semibold whitespace-nowrap">New Password</label>
                        <input className="mt-1 block w-full px-3 py-2 bg-neutral-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" type="password" name="new_password" placeholder="type new password" onChange={handleChange} value={state?.new_password} />
                        <p className="text-neutral-300 text-xs">Password should be atleast 8 characters</p>
                    </div>
                    <div className="">
                        <button className={`text-base bg-neutral-900 text-neutral-50 font-semifold p-2 w-full rounded-full`} onClick={() => passwordReset(state).then((res) => navigate("/screen/reset-successful"))} disabled={!valid}>Update Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}