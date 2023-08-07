import React from "react";
import { navigate } from 'vite-plugin-ssr/client/router';
import { TScreenInfo } from "#components/types";

interface Props extends TScreenInfo {
  actionText: string;
  message: string;
  next?: string;
}

export const Screen: React.FC<Props> = ({ actionText, message, next }: Props) => {
  ;
  return (
    <div className="bg-neutral-50 p-4 flex flex-col justify-center grow h-full items-center">
      <div className="text-center">{message}</div>
      <div className="bg-neutral-50 mt-4 text-center">
        <button onClick={() => { if (next !== undefined) navigate(next); }} className="block w-full inline-flex justify-center rounded-md border border-transparent bg-teal-500 py-1 px-4 text-base font-medium text-neutral-50 shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-teal-500 focus:ring-2 focus:bg-teal-500 focus:ring-offset-2">{actionText}</button>
      </div>
    </div>
  );
};
