import React, { useEffect, useState } from "react";
import { Image } from "@renderer/Image";
import { Link} from "@renderer/Link"
import { TIdentity } from "@components/types";
import { signup, socialSignup } from "@api/authentication";
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import { sanityIoImageLoader, staticImageLoader } from "@core/utils";
import { navigate } from 'vite-plugin-ssr/client/router';

interface Props {
    type: string
}

export const SignUp: React.FC<Props> = ({ type }: Props) => {
    const [message, setMessage] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [state, setState] = useState<TIdentity>();

    const handleInput = async (evt: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [evt.target.name]: evt.target.value });
        if (((evt.target.name == 'password1' && state?.password == evt.target.value) || (evt.target.name == 'password' && state?.password1 == evt.target.value)) && state?.password !== undefined) {
            setIsPasswordMatch(true);
        } else {
            setIsPasswordMatch(false);
        }
        setMessage("");
    }

    const handleSignup = async () => {
        console.log(state);
        let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        let phoneRegex = new RegExp(/^(\+91)?(0)?\d{10}$/);
        if (state?.email === undefined || state?.email.length == 0) {
            setMessage("Please provide email");
            return;
        } else if (!emailRegex.test(state?.email)) {
            setMessage("Please provide correct email");
        }

        if (state?.phone === undefined || state?.phone.length == 0) {
            setMessage("Please provide phone number");
            return;
        } else if (!phoneRegex.test(state?.phone)) {
            setMessage("Please provide correct phone number");
            return;
        }

        if (state?.password === undefined) {
            setMessage("Please provide password");
            return;
        }

        if (state?.password1 !== state?.password) {
            setMessage("Password didn't match");
            return;
        }

        if (state !== undefined) {
            const res = signup(state);
            handleSignupPromise(res);
        }
    }
    const handleSignupPromise = (promise: Promise<any>) => {
        promise.then((result) => {
            navigate("/screen/complete/signup");
        }).catch((result) => {
            console.log(result);
            if (typeof (result.response.data.detail) == "string") {
                setMessage(result.response.data.detail);
            } else {
                setMessage("Some error occurred.");
            }
        })
    
    }

    useEffect(() => {
        setState({ ...state, is_business: type.toLowerCase() === "business" });
    }, [type])

    const handleSocialSignup = (provider: string) => {
        const handle = async (response: any) => {
            const res = socialSignup(provider, response.access_token);
            handleSignupPromise(res);
        }
        return handle;
    }

    const loginGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => handleSocialSignup('google')(tokenResponse),
        onError: errorResponse => console.log(errorResponse),
    });

    return (
        <div className="w-full lt-sm:h-full shadow lt-sm:overflow-hidden lt-sm:rounded-md">
            <div className="bgneutral-50 p-4 lt-sm:p-6">
                <div className="grid grid-cols-6 gap-1">
                    <div className="col-span-6">
                        <div className="flex justify-center items-center">
                            <h1 className="text-xl font-bold mr-2">Register as <span className="capitalize">{type}</span></h1>
                            <Link href="/">
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
                    <div className="col-span-6 my-2">
                        <button className="w-full flex items-center justify-center bg-neutral-50 p-1 gap-2 whitespace-nowrap border border-neutral-300 rounded-md font-bold" onClick={() => loginGoogle()}>
                            <span className="text-neutral-700">Signup with Google </span><span><FaGoogle /></span>
                        </button>
                    </div>
                    <div className="col-span-6">
                        <label className="block">
                            <span className="block text-sm font-medium text-slate-700">Email*</span>
                            <input type="email" name="email" value={state?.email} onChange={(evt) => handleInput(evt)} required className="mt-1 block w-full px-3 py-2 bg-neutral-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "/>
                        </label>
                    </div>
                    <div className="col-span-6">
                        <label className="block">
                            <span className="block text-sm font-medium text-slate-700">Phone*</span>
                            <input type="tel" name="phone" value={state?.phone} placeholder="+91999999999" onChange={(evt) => handleInput(evt)} required className="peer mt-1 block w-full px-3 py-2 bg-neutral-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "/>
                        </label>
                    </div>
                    <div className="col-span-6">
                        <label className="block">
                            <span className="block text-sm font-medium text-slate-700">First Name</span>
                            <input type="text" name="first_name" value={state?.first_name} onChange={(evt) => handleInput(evt)} className="mt-1 block w-full px-3 py-2 bg-neutral-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "/>
                        </label>
                    </div>
                    <div className="col-span-6">
                        <label className="block">
                            <span className="block text-sm font-medium text-slate-700">Last Name</span>
                            <input type="text" name="last_name" value={state?.last_name} onChange={(evt) => handleInput(evt)} className="mt-1 block w-full px-3 py-2 bg-neutral-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
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
                            <input type="password" name="password" value={state?.password} onChange={(evt) => handleInput(evt)} required className="mt-1 block w-full px-3 py-2 bg-neutral-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "/>
                        </label>
                    </div>
                    <div className="col-span-6">
                        <label className="block mt-4">
                            <span className="block text-sm font-medium text-slate-700">Confirm Password*</span>
                            <input type="password" name="password1" value={state?.password1} onChange={(evt) => handleInput(evt)} required className={`mt-1 block w-full px-3 py-2 bg-neutral-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${isPasswordMatch ? "ring-1 ring-green-400" : "focus:ring-1 focus:ring-sky-500"}
                    `} />
                        </label>
                    </div>
                    <div className="col-span-6">
                        <p className="text-error-900 font-semibold text-center h-4">{message}</p>
                    </div>
                </div>
                <div className="mt-4 text-right">
                    <button onClick={() => handleSignup()} className="block w-full inline-flex justify-center rounded-md border border-transparent bg-yellow-400 py-1 px-4 text-base font-medium text-neutral shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2">Sign Up</button>
                </div>
                <div className=" mt-4 text-right">
                    <p>Already have an Account? <Link href="/login"><span className="font-medium text-sky-500">Login</span></Link></p>
                </div>
            </div>
        </div>
    )
}