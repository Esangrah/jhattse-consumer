import Head from 'react-helmet';
import { Image } from "@renderer/image";
import { Link} from "react-router-dom"
import React, { useState } from "react";
import { Container } from "@components";
import { FeatureCard } from "@components/cards";
import { sanityIoImageLoader } from "@core/utils";

type Response = {
    message: string;
    success: boolean,
    data: any;
};


const Home: React.FC = () => {
    const blankResponse: Response = { "message": "", "success": false, "data": null };
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState<Response>(blankResponse);

    const handleSubmit = async (event: React.FormEvent) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
        if ((email === undefined || email === "") && (phone === undefined || phone === "")) {
            setMessage({ "message": "Fill atleast one email or phone", "success": false, "data": null });
            return;
        }
        // Get data from the form.
        const data = {
            email: email === "" ? undefined : email,
            phone: phone === "" ? undefined : phone
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/api/v1/waitlist'

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result: Response = await response.json()
        setMessage(result);
        setEmail("");
        setPhone("");

    }

    return (
        <Container>
            <Head>
                <title>Jhattse by Esangrah</title>
                <meta name="description" content="Jhattse is next-gen billing and customer engagement platform for businesses. Jhattse provide its users product discovery and offers" />
                <meta name="og:title" content="Jhattse by Esangrah" />
                <meta name="og:description" content="Jhattse is next-gen billing and customer engagement platform for businesses. Jhattse provide its users product discovery and offers" />
                <meta name="og:image" content="https://jhattse.com/consumer/square-logo-4x.png" />
                <link rel="canonical" href="https://jhattse.com/feature" />
                <link rel="shortcut icon" href="https://jhattse.com/consumer/circular-logo.png" />
            </Head>

            <div className="nav w-full bg-black flex items-center justify-between sticky top-0 z-40 h-14 px-2">
                <div className="flex flex-row items-center">
                    <Link to="/" >
                        <Image
                            loader={sanityIoImageLoader}
                            src="/business/circular-logo.png"
                            width="50"
                            height="50"
                            alt="logo"
                            loading="eager"
                        />
                    </Link>
                    <Link to="/" >
                        <span className="mx-2 font-super font-mono text-3xl grow select-none">Jhattse</span>
                    </Link>
                </div>
                <div>
                    <span className="nav-bottons">
                        <Link to="#launch-window"><button className="nav-button whitespace-nowrap text-lg font-semibold sm:text-sm py-1 px-2 mx-1" type="submit">
                            Contact Us
                        </button></Link>
                    </span>
                    <span className="nav-bottons">
                        <Link to="#launch-window">
                            <button className="nav-button whitespace-nowrap text-lg font-semibold sm:text-sm py-1 px-2 mx-1" type="submit">
                                Join Waitlist
                            </button>
                        </Link>
                    </span>
                </div>
            </div>
            <div className="main py-4">
                <div className="col-span-2 text-center">
                    <span className="relative inline-block align-middle h-20 w-20 sm:h-16 sm:w-16">
                        <Image
                            loader={sanityIoImageLoader}
                            className=""
                            src="/business/circular-logo-4x.png"
                            width="100"
                            height="100"
                            alt="logo"
                            loading="eager"
                        />
                    </span>
                    <div className="inline-block align-middle select-none">
                        <span className="px-2 font-super font-mono text-6xl sm:text-2xl">Jhattse</span><span className="text-neutral-800 text-3xl sm:text-xl animate-pulse">Launching Soon!</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-col h-100">
                    <div className="flex flex-col justify-between px-5 pt-2 gap-2">
                        <div>
                            <div className="sm:text-md space-x-2 align-middle">
                                <span className="font-super font-semibold text-4xl sm:text-2xl">Jhattse</span>
                                <span className="font-lightgray-100 text-2xl sm:text-xl">features for</span>
                                <span className="text-brand-500 font-semibold text-2xl sm:text-xl">Users</span>
                            </div>
                            <ul className="text-brand-500 text-lg sm:text-base pt-2 pb-4 list-disc list-inside select-none">
                                <li>Discover products in local stores and online together</li>
                                <li>Locate nearby store for essentials</li>
                                <li>Access discounts from local stores</li>
                                <li>Manage shopping lists and expenses</li>
                                <li>Subscribe products for repeated purchase</li>
                                <li>No QR scans and faster payments</li>
                                <li>Many more super features</li>
                            </ul>
                        </div>
                        <div>
                            <Link to="/signup?type=user">
                                <button className="btn-signup block w-2/3 mx-auto py-1 text-lg text-brand-500 rounded-full border-2 border-brand-400 hover:text-neutral-50 hover:bg-brand-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between px-5 pt-2 gap-2">
                        <div>
                            <div className="sm:text-md space-x-2 align-middle">
                                <span className="font-super font-semibold text-4xl sm:text-2xl">Jhattse</span>
                                <span className="font-lightgray-100 text-2xl sm:text-xl">features for</span>
                                <span className="text-teal-600 font-semibold text-2xl sm:text-xl">Business</span>
                            </div>
                            <ul className="text-teal-600 text-lg sm:text-base pt-2 pb-4 list-disc list-inside select-none">
                                <li>Free Registration and Demo</li>
                                <li>Lowest setup charges and yearly charges</li>
                                <li>Reach and retain customers with online listing</li>
                                <li>Integrated UPI and other online payment solution</li>
                                <li>Setup offers and discount</li>
                                <li>Business growth features</li>
                                <li>Many more super features</li>
                            </ul>
                        </div>
                        <div>
                            <Link to="/signup?type=business">
                                <button className="btn-signup block w-2/3 mx-auto py-1 text-lg text-teal-600 rounded-full border-2 border-teal-400 hover:text-neutral-50 hover:bg-teal-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid gap-1 py-12 sm:py-6 grid-flow-col sm:grid-flow-row justify-center">
                <div>
                    <img className="h-48 w-full object-cover md:h-full md:w-48" src="/assets/receipt_img.png" alt="receipt"
                    />
                </div>
                <div>
                    <img className="h-48 w-full object-cover md:h-full md:w-48" src="/assets/offer_img.png" alt="offer"
                    />
                </div>
                <div>
                    <img className="h-48 w-full object-cover md:h-full md:w-48" src="/assets/ui_img.png" alt="ui" />
                </div>
                <div>
                    <img className="h-48 w-full object-cover md:h-full md:w-48" src="/assets/upi_img.png" alt="upi" />
                </div>
            </div>
            <div className="infographic">
                <div className="text-4xl sm:text-2xl font-bold p-4 text-center">Perfect & Easy Store</div>
                <div className="grid grid-flow-row-dense grid-cols-3 sm:grid-cols-1 gap-6 gap-x-24 px-12 sm:px-6 pb-12">
                    <FeatureCard title="Integrated Payments" url="/icons/cashless-payment.png" paragraphs={["Customers can pay bills directly through their apps or cash.", "Bills shared directly with customers."]} />
                    <FeatureCard title="Fast & Free Setup" url="/icons/settings.png" paragraphs={["Fast and Free software setup for business.", "Lowest yearly cost in the entire market. Tonnes of features for free."]} />
                    <FeatureCard title="Get more Customers" url="/icons/rating.png" paragraphs={["List products across cities and geography to wide audience.", "Setup customized and targetted offers and discounts with Jhattse."]} />
                    <FeatureCard title="Advanced Billing" url="/icons/invoice.png" paragraphs={["Jhattse enables faster orders and billing.", "Automatic bills calculation shared with customers."]} />
                    <FeatureCard title="Faster checkouts" url="/icons/checklist.png" paragraphs={["Customers can share shopping list via app to business.", "Jhattse enables faster checkouts for customer orders."]} />
                    <FeatureCard title="Grow Business" url="/icons/financial-profit.png" paragraphs={["Setup automatic customer membership with Jhattse.", "Get free access of Loyal customers."]} />
                </div>
            </div>
            <div className="flex flex-row sm:flex-col gap-2 p-4 justify-center">
                <div className="flex flex-col justify-between p-8 gap-4 transition duration-100 ease-in-out bg-neutral-50 border border-gray-100 rounded-md shadow-lg hover:-translate-y-2">
                    <div className="flex-row justify-center">
                        <div>
                            <h3 className="text-3xl font-bold">₹199</h3>
                            <p className="font-medium text-neutral-600">Monthly Licensce</p>
                        </div>
                        <hr className="w-full mx-auto my-3 divider" />
                        <div>
                            <ul className="space-y-3 text-neutral-500">
                                <li>Inventory Setup</li>
                                <li>Online Payment Gateway</li>
                                <li>Offer and Pricing controls</li>
                                <li>Marketplace Listing on Jhattse</li>
                                <li>Customer Management Tools</li>
                                <li>24x7 Support</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex justify-center h-10">
                        <a href="#" className="flex-row text-center w-full px-5 py-2 font-medium text-neutral-50 rounded-md bg-yellow-600 hover:bg-yellow-700 whitespace-nowrap select-none">
                            Purchase Now
                        </a>
                    </div>
                </div>
                <div className="flex flex-col justify-between p-8 gap-4 transition duration-100 ease-in-out bg-neutral-50 border border-gray-100 rounded-md shadow-lg hover:-translate-y-2">
                    <div className="flex-row justify-center ">
                        <div className="absolute top-0 px-3 py-1 text-sm tracking-tighter text-yellow-500 uppercase -translate-y-1/2 rounded-full right-6 bg-primary-600">
                            Most popular
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold">₹499</h3>
                            <p className="font-medium text-neutral-600">Quaterly License</p>
                        </div>
                        <hr className="w-full mx-auto my-3 divider" />
                        <div><ul className="space-y-3 text-neutral-500">
                            <li>Inventory Setup</li>
                            <li>Online Payment Gateway</li>
                            <li>Offer and Pricing controls</li>
                            <li>Marketplace Listing on Jhattse</li>
                            <li>Customer Management Tools</li>
                            <li>24x7 Support</li>
                        </ul>
                        </div>
                    </div>
                    <div className="flex justify-center h-10">
                        <a href="#" className="flex-row text-center w-full px-5 py-2 font-medium text-neutral-50 rounded-md bg-yellow-600 hover:bg-yellow-700 whitespace-nowrap select-none">
                            Purchase Now
                        </a>
                    </div>
                </div>
                <div className="flex flex-col justify-between p-8 gap-4 transition duration-100 ease-in-out bg-neutral-50 border border-gray-100 rounded-md shadow-lg hover:-translate-y-2">
                    <div className="flex-row justify-center ">
                        <div>
                            <h3 className="text-3xl font-bold">₹1799</h3>
                            <p className="font-medium text-neutral-600">Yearly License</p>
                        </div>
                        <hr className="w-full mx-auto my-3 divider" />
                        <div>
                            <ul className="space-y-3 text-neutral-500">
                                <li>Inventory Setup</li>
                                <li>Online Payment Gateway</li>
                                <li>Offer and Pricing controls</li>
                                <li>Marketplace Listing on Jhattse</li>
                                <li>Customer Management Tools</li>
                                <li>24x7 Support</li>
                                <li>Offline Enabled</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex justify-center h-10">
                        <a href="#" className="flex-row text-center w-full px-5 py-2 font-medium text-neutral-50 rounded-md bg-yellow-600 hover:bg-yellow-700 whitespace-nowrap select-none">
                            Purchase Now
                        </a>
                    </div>
                </div>
            </div>
            <div className="launching-window text-center px-4" id="launch-window">
                <div className="h-1/4 flex flex-col justify-end font-mono font-semibold select-none animate-pulse duration-1000"><span className="text-4xl font-super">Jhattse </span><span className="text-3xl text-teal-800">Launching Soon!</span></div>
                <div className="w-1/2 md:w-full p-4 pb-0 mx-auto text-neutral-500 font-semibold text-2xl sm:text-xl select-none">Join our Waitlist and be <span className="font-super">Jhattse</span> early adoptors of next gen billing and customer engagement.</div>
                <div className="w-1/2 md:w-full px-4 pb-0 mx-auto text-neutral-500 font-semibold text-2xl sm:text-xl select-none">Get exciting offers too.</div>
                <form onSubmit={handleSubmit}>
                    <div className="overflow-hidden sm:rounded-md w-1/3 md:w-1/2 sm:w-full mx-auto">
                        <div className="py-5 sm:p-5">
                            <div className="grid grid-cols-1 gap-3 sm:gap-1 text-left">
                                {message.message != "" ?
                                    <div className="col-span-11">
                                        <div className={`col-span-11 text-center font-semibold text-lg ${message.success ? "text-green-600" : "text-error-900"}`}>{message.message}</div>
                                        <div className="col-span-11 text-right flex flex-col justify-end sm:mt-4">
                                            <button type="button" onClick={() => { setMessage(blankResponse) }} className="inline-flex block-sm justify-center rounded-md border border-transparent bg-teal-600 py-1 px-4 text-base font-medium text-neutral-50 shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">Okay</button>
                                        </div>
                                    </div>
                                    :
                                    <div className="col-span-11">
                                        <div className="col-span-5 sm:col-span-11">
                                            <label htmlFor="email" className="block text-base font-medium text-teal-800">Email</label>
                                            <input type="email" name="email" id="email" autoComplete="email" placeholder="Enter email" className="p-1 px-2 mt-1 block w-full rounded-md focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ring-1 ring-gray-100 sm:text-base"
                                                onChange={(e) => { setEmail(e.target.value); }} />
                                        </div>
                                        <div className="col-span-1 sm:col-span-11 text-center flex flex-col justify-end sm:hidden"><span className="text-teal-600 font-semibold">or</span></div>
                                        <div className="col-span-5 sm:col-span-11">
                                            <label htmlFor="phone" className="block text-base font-medium text-teal-800">Phone</label>
                                            <input type="phone" name="phone" id="phone" autoComplete="htmlFor" placeholder="Enter phone" className="p-1 px-2 mt-1 block w-full rounded-md focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ring-1 ring-gray-100 sm:text-base"
                                                onChange={(e) => { setPhone(e.target.value); }} />
                                        </div>
                                        <div className="col-span-11 text-right flex flex-col justify-end mt-4">
                                            <button type="submit" className="inline-flex block-sm justify-center rounded-md border border-transparent bg-teal-600 py-1 px-4 text-base font-medium text-neutral-50 shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">Join Waitlist</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </form>
                <div className="text-center text-xs h-1/4 w-full flex flex-col justify-end p-2">@Copyright {new Date().getFullYear()} Esangrah Technologies Pvt Ltd</div>
            </div>
        </Container>
    );
};
export default Home;
