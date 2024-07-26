"use client";
import { useState } from "react";
import { RiChatDeleteFill } from "@remixicon/react";

const Modal = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [acceptMsg, setAcceptMsg] = useState<boolean>(false);
  return (
    <div>
      {!isShow && !acceptMsg ? (
        <button
          className="bg-purple-700 px-5 py-3 text-white"
          onClick={() => setIsShow(true)}
        >
          Show Offer
        </button>
      ) : (
        acceptMsg && <p>Offer Accepted</p>
      )}
      {/* modal content */}
      {isShow && (
        <div
          className={`relative border-[1px] border-gray-500  h-[40vh]   flex justify-between items-center flex-col py-4 px-3 rounded-md ${
            !isShow ? " transition-transform duration-1000 ease-in-out" : ""
          } `}
        >
          <div>
            <RiChatDeleteFill
              className="cursor-pointer absolute right-2 top-1 mb-2"
              size={32}
              onClick={() => setIsShow(false)}
            />
            <p className="my-6">
              click the below the button to accept our offer
            </p>
          </div>
          <button
            className="bg-purple-700 px-3 py-2 text-white mt-auto"
            onClick={() => {
              setIsShow(false);
              setAcceptMsg(true);
            }}
          >
            Accept Offer
          </button>
        </div>
      )}
    </div>
  );
};
export default Modal;
