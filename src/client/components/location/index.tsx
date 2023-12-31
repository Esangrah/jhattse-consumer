import React, { useState } from "react";
import { Select } from "antd";
import { getLocation } from "@core/geolocation";
import { MdMyLocation, MdOutlineClose } from "react-icons/md";
import { getAutoSuggest } from "@api/autosuggest";
import { TData } from "@components/types";

interface Props {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Location: React.FC<Props> = ({ showModal, setShowModal }) => {
    const [searchResult, setSearchResult] = useState<TData[]>([]);
    const [userLocation, setUserLocation] = useState("");
    const [locationCoords, setLocationCoords] = useState({});

    const handleChange = (value: string) => {
        setUserLocation(value);
    };

    const handleUseLocation = async () => {
        await getLocation().then((userLocation) => {
            let distance = {
                latitude: userLocation?.latitude,
                longitude: userLocation?.longitude,
            };
            setLocationCoords(distance);
        });
    };

    const handleSearch = (value: string) => {
        let q = value;
        let intent = "citystate";
        getAutoSuggest(q, intent).then((result) => {
            setSearchResult(result);
        });
    };
    const addLocation = () => {
        if (userLocation !== "") {
            localStorage.setItem("location", userLocation);
            setShowModal(false);
        }
    };

    return (
        <div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                    >
                        <div
                            className="w-4/5 relative my-6 mx-auto md:max-w-1/2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-neutral-50 outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-base font-semibold text-neutral-700">
                                        Please Enter Your Location
                                    </h3>
                                    <span
                                        className="cursor-pointer"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <MdOutlineClose />
                                    </span>
                                </div>

                                {/*body*/}
                                <div className="relative px-6 p-2 flex-auto">
                                    <Select
                                        showSearch
                                        onSearch={handleSearch}
                                        style={{ width: "100%" }}
                                        placeholder="Enter Your City"
                                        onChange={handleChange}
                                        options={searchResult.map((item) => ({
                                            value: JSON.stringify({
                                                Location: item,
                                                Coords: locationCoords,
                                            }),
                                            label: `${item.name}`,
                                        }))}
                                    />
                                </div>

                                {/*footer*/}
                                <div className="flex items-center justify-end gap-2 p-2 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="flex flex-row gap-2 items-center bg-neutral-50 text-neutral-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150 border border-neutral-300 lt-sm:text-xs lt-sm:px-2 lt-sm:gap-1"
                                        type="button"
                                        onClick={handleUseLocation}
                                    >
                                        <MdMyLocation /> Detect my location
                                    </button>
                                    <button
                                        className="bg-neutral-900 text-neutral-50 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border border-neutral-300 lt-sm:text-xs lt-sm:px-2"
                                        type="button"
                                        onClick={() => addLocation()}
                                    >
                                        Add Location
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-neutral-900"></div>
                </>
            ) : null}
        </div>
    );
};

export default Location;
