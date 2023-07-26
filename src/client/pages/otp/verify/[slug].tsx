import { Button } from 'antd'
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { TOtp, TIdentity } from '@components/types';
import { verifyMobileOtp, verifyMobile } from '@api/verification';
import { requestLogin } from '@core/utils';
import { getprofile } from '@api/authentication';
import { useRecoilState } from 'recoil'
import { profileState } from '@recoil/atoms'
import Countdown from 'react-countdown';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
    const [code, setcode] = useState(new Array(6).fill(""));
    const [otp, setOtp] = useState < TOtp > ();
    const [id, setId] = useState(null);
    const [user, setUser] = useRecoilState < TIdentity > (profileState);
    const [message, setMessage] = useState("");
    const [resend, setResend] = useState(true);
    const [sendOtp, setSendOtp] = useState < TOtp > ();
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);

    useEffect(() => {
        let id = queryParams.get('slug');
        setId(id);
    }, [location])

    const handleChange = (element: any, index: number) => {
        if (isNaN(element.value)) return false;
        setcode([...code.map((d, indx) => (indx === index ? element.value : d))]);
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    useEffect(() => {
        setOtp({ ...otp, "otp": code.join('') })
    }, [code])

    const handleProceed = () => {
        console.log("otp", otp)
        const result = verifyMobileOtp(id, otp);
        result.then((res: TOtp) => { res.success == "true" ? updateUser() : setMessage(res.msg) }).catch((e) => {
            if (e.response?.status === 401) {
                requestLogin(location.pathname);
            }
        })
    }


    const updateUser = async () => {
        const res: Promise<TIdentity> = getprofile();
        res.then((result) => setUser(result));
        res.then((result) => localStorage.setItem("profile", JSON.stringify(result)))
        res.then(() => { navigate('/account/profile') })
    }

    const renderer = ({ seconds, completed }: any) => {
        if (completed) {
            setResend(false);
        } else {
            return (
                <span>
                    {"00"}:{seconds}
                </span>
            );
        }
    };

    useEffect(() => {
        setSendOtp({ ...sendOtp, "key": user?.phone, "type": "m" })
    }, [user])

    const resendOtp = () => {
        if (user?.phone !== undefined) {
            const result = verifyMobile(sendOtp);
            result.then((res: TOtp) => { navigate(res.link) }).catch((e) => {
                if (e.response?.status === 401) {
                    requestLogin(location.pathname);
                }
            })
        }
    }

    return (
        <div className="grid grid-flow-col grid-cols-6 place-content-center sm:place-content-start min-h-screen bg-neutral-50">
            <div className="grid gap-4 col-start-3 col-span-2 lg:col-start-2 lg:col-span-4 sm:col-start-1 sm:col-span-6 sm:rounded-none rounded-lg  border sm:border-white border-black bg-neutral-50 p-2 ">
                <div className="flex gap-2 px-2 py-4">
                    <button className="flex text-neutral-900 text-lg font-semibold items-center" onClick={() => { history.back() }}><BiArrowBack /></button>
                    <span className="text-neutral-900 font-semibold">Verify your mobile number</span>
                </div>
                <div className="grid justify-center p-4">
                    <div className="grid gap-2">
                        <span className="flex justify-center text-neutral-900 font-semibold">We have sent an OTP to</span>
                        <span className="flex justify-center text-neutral-900 font-bold text-xl">+91{user?.phone}</span>
                        <div className="text-neutral-400">Not yours? <Link to={''} className="text-brand-500 font-semibold">Change Mobile Number</Link></div>
                    </div>
                </div>
                <div className="grid gap-4 justify-center p-6">
                    <div className="flex text-neutral-900">Enter OTP</div>
                    <div className="flex justify-center gap-4">
                        {code?.map((data, index) => {
                            return (
                                <input
                                    type="text"
                                    className="flex justify-center border border-black rounded-md p-2 w-10"
                                    name="otp"
                                    onChange={(e) => handleChange(e.target, index)}
                                    maxLength={1}
                                    key={index}
                                    // style={
                                    //     data
                                    //         ? { borderBottom: "3px solid #7dbf2a" }
                                    //         : { borderBottom: "3px solid grey" }
                                    // }
                                    value={data}
                                    onFocus={(e) => e.target.select}
                                    autoFocus={index === 0} // add this line

                                />
                            );
                        })}
                    </div>
                    <div className="text-sm text-error-500">{message}</div>
                </div>
                <div className="flex h-32 sm:h-64"></div>
                <div className="flex gap-2 justify-between p-2">
                    {
                        resend == true ?
                            <div className="flex justify-center text-brand-400 w-full bg-neutral-50 border rounded-sm border-brand-500 p-2">
                                <Countdown date={Date.now() + 30000} renderer={renderer} />
                            </div>
                            :
                            <button onClick={() => { setResend(true); resendOtp() }} className="flex justify-center text-brand-400 w-full bg-neutral-50 border rounded-sm border-brand-500 p-2">
                                Resend
                            </button>
                    }

                    <button className="text-neutral-50 bg-brand-500 w-full rounded-md p-2" onClick={() => { handleProceed() }}>Proceed</button>
                </div>

            </div>
        </div>
    )
}

export default Verification;
