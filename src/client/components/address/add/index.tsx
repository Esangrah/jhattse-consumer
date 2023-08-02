import { addAddress, getAllStates, getCitiesOfState } from '@api/address';
import { TAddress, TCities, TData, TGeoLocation, TOption, TStates } from '@components/types';
import { getFilteredResults, requestLogin } from '@core/utils';
import React, { useEffect, useState } from 'react'
import { MdMyLocation, MdOutlineClose } from 'react-icons/md';
import { getLocation } from "@core/geolocation";
import { usePageContext } from "@renderer/usePageContext";
import { Select } from "antd";


type Props = {
    addressCallback: Function;
    close: Function;
    initialAddress?: TAddress;
    isEdit: Boolean;
}

const Addaddress = ({ addressCallback, close, initialAddress, isEdit }: Props) => {
    const [address, setAddress] = useState < TAddress > ();
    const [states, setStates] = useState < TStates[] > ([]);
    const [cities, setCities] = useState < TCities[] > ([]);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState < string > ("");
    const [citySuggestions, setCitySuggestions] = useState < TOption[] > ([]);
    const [stateSuggestions, setStateSuggestions] = useState < TOption[] > ([]);
    const pageContext = usePageContext();

    const handleStateChange = (name: string, data: TData[], callback: Function) => {
        const handler = (value: string) => {
            let state = data.filter((state) => state.id === parseInt(value));
            if (state.length > 0) {
                callback({ ...address, [name]: state[0].id });
            }
        };
        return handler;
    };

    const handleCityChange = (name: string, data: TData[], callback: Function) => {
        const handler = (value: string) => {
            let city = data.filter((city) => city.id === parseInt(value));
            if (city.length > 0) {
                callback({ ...address, [name]: city[0].id });
            }
        };
        return handler;
    };



    const checkStale = (location: TGeoLocation) => {
        return (Date.now() - location.last_updated > 60000)
    }

    const location = () => {
        if (!navigator.geolocation) {
            setStatus(`<span class="text-error-500 font-sm">Geolocation isn't supported by your browser</span>`)
        }
        else {
            setStatus(`<span class="text-blue-500 font-sm">Loading...</span>`)
            getLocation().then((userLocation) => {
                if (checkStale(userLocation)) {
                    setStatus(`<span class="text-error-500 text-sm ">Please provide location access</span>`)
                } else {
                    setStatus(`<span class="text-green-500 font-sm">Location saved</span>`)
                    setAddress({ ...address, "longitude": userLocation.longitude, "latitude": userLocation.latitude });
                }

            });
        }
    };

    const handleClick = () => {
        close();
    };

    useEffect(() => {
        setAddress(initialAddress);
    }, [initialAddress])

    useEffect(() => {
        const res: Promise<TStates[]> = getAllStates();
        res.then((states) => setStates(states))
        console.log("state", states)
    }, [])

    useEffect(() => {
        if (address?.state_id != undefined) {
            const res: Promise<TCities[]> = getCitiesOfState('', address?.state_id);
            res.then((cities) => setCities(cities))
            console.log("city", cities)
        }
    }, [address?.state_id])

    const handleSelect = async (evt: React.ChangeEvent<HTMLSelectElement>) => {
        setAddress({ ...address, [evt.target.name]: evt.target.value });
    }

    const handleInput = async (evt: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({ ...address, [evt.target.name]: evt.target.value });
    }

    const handleAddAddress = async () => {
        if (address?.house_number === undefined || address?.house_number.length == 0) {
            setMessage("Please write house no.");
            return;
        } else {
            setMessage("")
        }
        if (address?.street_name === undefined || address?.street_name.length == 0) {
            setMessage("Please provide street name");
            return;
        }
        if (address !== undefined) {
            console.log(address)
            const result = addAddress(address);
            result.then((res) => { setMessage("Address submitted"); addressCallback(res); }).catch((e) => {
                if (e.response?.status === 401) {
                    requestLogin(pageContext.urlOriginal);
                }
            })
        }
    }


    const handleStateSearch = (value: string) => {
        setStateSuggestions(getFilteredResults(value, states));
    };
    const handleCitySearch = (value: string) => {
        getCitiesOfState(value, address?.state_id || 0).then((result) => {
            setCitySuggestions(getFilteredResults(value, result));
        })
    };
    useEffect(() => {
        setStateSuggestions(getFilteredResults('', states));
        setCitySuggestions(getFilteredResults('', cities));
    }, [states, cities])


    return (
        <div className="leading-loose">
            <div className="relative max-w-xl p-6 bg-neutral-50 rounded shadow-xl z-50">
                <button onClick={handleClick} className="absolute top-5 right-5"><MdOutlineClose /></button>
                <p className="text-neutral-800 font-medium text-lg">{isEdit ? "Edit Address" : "Add Address"}</p>
                <div className="inline-block w-1/2 pr-1">
                    <label className=" block text-sm text-neutral-600 ">Select type</label>
                    <select id="type" name="type" value={address?.type} onChange={(evt) => handleSelect(evt)} className="w-18 bg-neutral-300 text-base text-neutral-800 p-1 outline-none rounded border-md border-neutral-300 px-1 ">
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="inline-block w-1/2 pr-1">
                    <div className="grid grid-flow-row">
                        <button className="flex items-center bg-neutral-600 px-2 py-1 gap-1 border-md rounded-full text-neutral-50" onClick={location}><span className="items-center text-green-500"><MdMyLocation /></span><p className="items-center whitespace-nowrap p-1 lt-sm:text-sm">Use my location </p></button>
                        <p dangerouslySetInnerHTML={{ __html: status }} />
                    </div>
                </div>
                <div className="inline-block w-1/2 pr-1">
                    <label className=" block text-sm text-neutral-600">House no.</label>
                    <input className="w-full p-1 text-neutral-700 bg-neutral-200 rounded" autoComplete="address-line1" value={address?.house_number} onChange={(evt) => handleInput(evt)} id="house_number" name="house_number" type="text" required placeholder="House no." aria-label="Email" />
                </div>
                <div className="inline-block w-1/2">
                    <label className=" block text-sm text-neutral-600">Street name</label>
                    <input className="w-full p-1 text-neutral-700 bg-neutral-200 rounded" autoComplete="address-line2" value={address?.street_name} onChange={(evt) => handleInput(evt)} id="street_name" name="street_name" type="text" required placeholder="Street name" aria-label="Email" />
                </div>
                <div className="">
                    <label className=" block text-sm text-neutral-600">Locality</label>
                    <input className="w-full p-1 text-neutral-700 bg-neutral-200 rounded" autoComplete="address-line3" value={address?.locality} onChange={(evt) => handleInput(evt)} id="locality" name="locality" type="text" required placeholder="Locality" aria-label="Email" />
                </div>
                <div className="">
                    <label className=" block text-sm text-neutral-600">State</label>
                    <Select
                        showSearch
                        value={(address?.state_id || "").toString()}
                        style={{ width: 300 }}
                        onChange={handleStateChange("state_id", states, setAddress)}
                        onSearch={handleStateSearch}
                        filterOption={false}
                        options={stateSuggestions}
                        showArrow={false}
                    />
                </div>
                <div className="">
                    <label className=" block text-sm text-neutral-600">City</label>
                    <Select
                        showSearch
                        value={(address?.city_id || "").toString()}
                        style={{ width: 300 }}
                        onChange={handleCityChange("city_id", cities, setAddress)}
                        onSearch={handleCitySearch}
                        filterOption={false}
                        options={citySuggestions}
                        showArrow={false}
                    />
                </div>
                <div className="inline-block w-1/2">
                    <label className=" block text-sm text-neutral-600">Pincode</label>
                    <input className="w-full p-1 text-neutral-700 bg-neutral-200 rounded" autoComplete="postal-code" value={address?.pincode} onChange={(evt) => handleInput(evt)} id="pincode" name="pincode" type="number" required placeholder="Pincode" aria-label="Pincode" />
                </div>
                <div className="mt-2">
                    <button onClick={() => { handleAddAddress(); setTimeout(handleClick, 2000) }} className="px-4 py-1 text-neutral-50 font-light tracking-wider bg-neutral-900 rounded" type="submit">Save</button>
                </div>
                <p className="text-error-900">{message}</p>
            </div>
        </div>
    )
}

export default Addaddress