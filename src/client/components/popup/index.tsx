import React from 'react'

interface Props {
  showModal: boolean,
  setShowModal: Function,
  message?: string,
  ActionFun: Function,
  btnName?: string,
  closeBtnName?: string,
}

const PopupComponent: React.FC<Props> = ({ showModal, setShowModal, message, ActionFun, btnName, closeBtnName }) => {

  return (
    <div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none p-4 focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div 
            className="relative mx-auto max-w-2/3"
              onClick={e => e.stopPropagation()}
            >
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-neutral-50 outline-none focus:outline-none">
                {/*body*/}
                <div className="relative px-6 py-6 flex-auto">
                  <p className="text-neutral-700 sm:text-base text-lg leading-relaxed">
                    {message}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center gap-2 p-2 border-t border-solid border-neutral-300 rounded-b">
                  <button
                    className="flex-1 uppercase rounded text-sm p-2 border-2 border-brand-500 text-brand-500 font-bold"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    {closeBtnName ? closeBtnName : "Close"}
                  </button>
                  <button
                    className="flex-1 uppercase text-sm p-2 border-2 border-brand-500 text-neutral-700 bg-brand-500 rounded font-bold "
                    type="button"
                    onClick={() => { ActionFun() }}
                  >
                    {btnName ? btnName : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-neutral-900"></div>
        </>
      ) : null}
    </div>
  )
}

export default PopupComponent;