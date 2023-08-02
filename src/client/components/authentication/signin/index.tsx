import React, { useEffect, useState } from "react";
import { Image } from "@renderer/Image";
import { Link} from "@renderer/Link"
import { TIdentity } from "@components/types";
import { login, getprofile, socialLogin } from "@api/authentication";
import { isLoggedIn } from "@recoil/atoms";
import { useRecoilState } from "recoil";
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from '@react-oauth/google';
import { getBusinessUrl, staticImageLoader } from "@core/utils";
import { navigate } from 'vite-plugin-ssr/client/router';
import { usePageContext } from "@renderer/usePageContext";



export const SignIn: React.FC = () => {
    const [message, setMessage] = useState("");
    const [state, setState] = useState < TIdentity > ();
    const [isLogin, setIsLogin] = useRecoilState(isLoggedIn)
    const pageContext = usePageContext()
    const [userType, setUserType] = useState(null);

    const handleInput = async (evt: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [evt.target.name]: evt.target.value });
        setMessage("");
    }

    const handleLoginPromise = (promise: Promise<any>) => {
        promise.then((result) => {
            console.log(result);
            localStorage.setItem("token", result.access_token);
            const res_profile = getprofile();
            res_profile.then((profile) => {
                console.log(profile);
                localStorage.setItem("profile", JSON.stringify(profile));
                setUserType(JSON.parse(localStorage.getItem("profile") || '{}')?.is_business)
            })
        }).catch((result) => {
            console.log(result);
            setMessage(result.response.data.detail);
        });
    }

    const handleLogin = async () => {
        if (state?.email === undefined && state?.phone === undefined) {
            setMessage("Please provide email or phone number");
            return;
        }
        if (state?.password === undefined) {
            setMessage("Please provide password");
            return;
        }
        if (state !== undefined) {
            const res = login(state)
            handleLoginPromise(res);
        }
    }

    const handleSocialLogin = (provider: string) => {
        const handle = async (response: any) => {
            const res = socialLogin(response.access_token);
            handleLoginPromise(res);
        }
        return handle;
    }

    const loginGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => handleSocialLogin('google')(tokenResponse),
        onError: errorResponse => console.log(errorResponse),
    });


    useEffect(() => {
        if (userType != null) {
            setIsLogin(true);
            let nextLink = pageContext.urlParsed?.search?.next !== undefined ? pageContext.urlParsed?.search?.next : "/";
            console.log("Route after login" + nextLink);
            navigate(nextLink || (userType == true ? getBusinessUrl("/") : "/"));
        }
    }, [userType])

    return (
        <div className="w-full lt-sm:h-full shadow lt-sm:overflow-hidden lt-sm:rounded-md">
            <div className="bgneutral-50 p-6 lt-sm:p-6">
                <div className="grid grid-cols-6 gap-1">
                    <div className="col-span-6">
                        <div className="flex justify-center items-center">
                            <h1 className="text-xl font-bold mr-2">Login</h1>
                            <Link href="/" >
                                <Image
                                    priority={"true"}
                                    loader={staticImageLoader}
                                    src="public/jhattse-logo.svg"
                                    width="100"
                                    height="40"
                                    alt="Jhattse logo"
                                    loading="eager"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <label className="block">
                            <span className="block text-sm font-medium text-slate-700">Email</span>
                            <input type="email" name="email" value={state?.email} onChange={(evt) => handleInput(evt)} className="mt-1 block w-full px-3 py-2 bg-neutral-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                "/>
                        </label>
                    </div>
                    <div className="col-span-6">
                        <label className="block mt-2">
                            <span className="block text-sm font-medium text-center text-slate-700">OR</span>
                        </label>
                    </div>
                    <div className="col-span-6">
                        <label className="block">
                            <span className="block text-sm font-medium text-slate-700">Phone</span>
                            <input type="tel" name="phone" value={state?.phone} onChange={(evt) => handleInput(evt)} className="peer mt-1 block w-full px-3 py-2 bg-neutral-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                "/>
                        </label>
                    </div>
                    <div className="col-span-6">
                        <label className="block mt-4">
                            <span className="block text-sm font-medium text-slate-700">Password*</span>
                            <input type="password" name="password" required value={state?.password} onChange={(evt) => handleInput(evt)} className="mt-1 block w-full px-3 py-2 bg-neutral-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                "/>
                        </label>
                    </div>
                    <div className="col-span-6">
                        <p className="text-error-900 font-semibold text-center">{message}</p>
                    </div>
                </div>
                <div className="bg-neutral-50 mt-4 text-right">
                    <button onClick={() => handleLogin()} className="block w-full inline-flex justify-center rounded-md border border-transparent bg-brand-500 py-1 px-4 text-base font-medium text-neutral-50 shadow-sm hover:bg-brand-900 focus:outline-none focus:ring-brand-500 focus:ring-2 focus:bg-brand-500 focus:ring-offset-2">Login</button>
                </div>
                <div className="grid grid-cols-2 mt-4">
                    <div className="grid-colspan-1  text-sm text-left">
                        <p>
                            <Link href="/account/forgot-password"><span className="font-medium text-sky-500">Forgot Password</span></Link></p>
                    </div>
                    <div className="grid-colspan-1  text-sm text-right">
                        <p>New User? <Link href="/signup"><span className="font-medium text-sky-500">Create Account</span></Link></p>
                    </div>
                </div>
                <div className="col-span-6 mt-2">
                    <button className="w-full flex items-center justify-center p-1 gap-2 bg-neutral-50 whitespace-nowrap border border-neutral-300 rounded-md font-bold" onClick={() => loginGoogle()}>
                        <span>Login with Google </span><span><FaGoogle /></span>
                    </button>
                </div>
            </div>
        </div>
    )
}