import { useEffect, useState } from "react";
import { navigate } from 'vite-plugin-ssr/client/router';

const ReferAndEarn = () => {
    const [refLink, setRefLink] = useState<string>("");
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        const profile = localStorage.getItem("profile") || '{}';
        if (profile != undefined) {
            setRefLink(`https://jhattse.com?ref_code=${JSON.parse(profile)?.referral_code}`)
        }
    }, [])

    return (
        <div className="w-full h-44 px-2 flex justify-center items-center bg-emerald-200">
            <div className="flex flex-col gap-4 justify-center items-center text-center">
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-emerald-800 underline decoration-sky-500">Refer and Earn with Jhattse</h2>
                    <p className="font-semibold text-blue-800">Refer businesses on Jhattse marketplace.</p>
                    <p className="font-semibold text-blue-800">On successful signup and conversion get 10% commission upto ₹150.</p>
                </div>
                <div className="flex flex-col justify-center">
                    {refLink != null ?
                        <>
                            <button type="button" className="w-48 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-semibold text-neutral-50 p-1" onClick={() => { navigator.clipboard.writeText(refLink); setMessage("Link Copied"); }}>
                                Copy Link
                            </button>
                            <p className="text-green-700 text-xs h-4">{message}</p>
                        </>
                        :

                        <button type="button" className="w-48 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md font-semibold text-neutral-50 p-1" onClick={() => { navigate('/signup'); }}>
                            Signup Today
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default ReferAndEarn