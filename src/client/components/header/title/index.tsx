import React from "react";


interface Props {
    title?: string,
    customStyle?: string,
}

export const Title: React.FC<Props> = ({ title, customStyle }) => {
    return (
        <div className="w-full"><h1 className={customStyle ? customStyle : "text-lg text-neutral-50 bg-neutral-800 font-semibold p-2 select-none"}>{title}</h1></div>
    );
};
