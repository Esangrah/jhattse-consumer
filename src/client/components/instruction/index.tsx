import React from 'react'

export const InstructionForm = () => {
    return (
        <div className="p-2">
            <textarea className="w-full border-2 p-2" maxLength={50} rows={2} placeholder="Write your instructions here"></textarea>
            <div className="flex justify-end">
                <button className="py-0.5 px-1 bg-sky-400 rounded-md text-neutral-50 ">Submit</button>
            </div>
        </div>
    )
}
