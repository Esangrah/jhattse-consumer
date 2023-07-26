import { TStoreTiming } from '@components/types';
import React, { useEffect, useRef, useState } from 'react';
import moment from "moment";

interface Props {
    storeTimings: TStoreTiming[];
}

let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thus", "Fri", "Sat"];
let currentDayIndex = new Date().getDay();

let momentTime = moment();

let currentTime = moment(momentTime).format("HH:mm:ss")



export const StoreTiming = ({ storeTimings }: Props) => {
    const [storeTimingShow, setStoreTimingShow] = useState(false);
    // Short storeTiming Array according to week days
    const filteredWeekTime: TStoreTiming[] = (storeTimings || [])?.filter((storeTiming) => storeTiming.day_of_week === currentDayIndex);
    const todayTiming: TStoreTiming = filteredWeekTime.length == 0 ? undefined : filteredWeekTime[0];

    const storeTimingRef = useRef(null);

    const handleClickOutside = (e: any) => {
        if (storeTimingRef.current && !storeTimingRef.current.contains(e.target)) {
            setStoreTimingShow(false);
        }
    }

    // Func to Convert 24 hours time format into 12 hours time format
    function tConvert(time: any) {
        let convertedTime = moment(time, "HH:mm:ss").format("hh:mm a");
        return convertedTime;
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [storeTimingRef])

    return (
        <div
            ref={storeTimingRef}
            className={`relative inline-block text-left ${storeTimings?.length > 0 ? "" : "hidden"}`}>
            <div>
                <button type="button" onClick={() => setStoreTimingShow(!storeTimingShow)} className="inline-flex w-full justify-left  border-none bg-transparent text-sm font-semibold text-custom_black focus:outline-none tracking-wide" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    {
                        todayTiming !== undefined && (currentTime >= todayTiming.open_time && currentTime < todayTiming.close_time) ?
                            <span className="text-success-400">Currently Open</span>
                            : <span className="text-error-400">Currently Close</span>
                    }
                    {todayTiming !== undefined &&
                        <>
                            <span className="mx-1">|</span>
                            <span className="text-neutral-900">{`${tConvert(todayTiming?.open_time)} to ${tConvert(todayTiming?.close_time)}`}</span>
                        </>
                    }
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            {
                storeTimingShow &&
                <div className="absolute left-14 z-10 w-56 p-2 origin-top-left rounded-md bg-neutral-50 shadow-lg ring-1 ring-neutral-900 ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                    {
                        weekDays?.map((storeTime: any, index) => {
                            let filteredWeekTime: TStoreTiming[] = storeTimings.filter((storeTiming) => storeTiming.day_of_week === index);
                            let weekStoreTime: TStoreTiming = filteredWeekTime.length == 0 ? undefined : filteredWeekTime[0];
                            return <div className={`grid grid-cols-4 gap-1 justify-start px-2 py-1 text-sm tracking-wide ${currentDayIndex === index ? "text-neutral-800 font-semibold" : "text-neutral-700"}`}>
                                <span>{storeTime} :</span>
                                <span className="col-span-3">{weekStoreTime !== undefined ? `${tConvert(weekStoreTime?.open_time)} to ${tConvert(weekStoreTime?.close_time)}` : "Closed"}</span>
                            </div>
                        })
                    }
                </div>
            }
        </div>
    )
}