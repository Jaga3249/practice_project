"use client";
import { RiArrowRightSFill } from "@remixicon/react";
import { RiArrowDownSFill } from "@remixicon/react";
import { useState } from "react";
interface dataType {
  question: string;
  answer: string;
}
interface faqItemProps {
  faq: dataType;
  index: number;
  key: number;
}

const FaqItem: React.FC<faqItemProps> = ({ faq, index, key }) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div>
      <div className="flex flex-col gap-1 cursor-pointer bg-blue-600 py-3 rounded-md">
        <div className="flex items-center">
          {show ? (
            <RiArrowDownSFill
              onClick={() => setShow(!show)}
              size={35}
              className="text-white"
            />
          ) : (
            <RiArrowRightSFill
              onClick={() => setShow(!show)}
              size={35}
              className="text-white"
            />
          )}
          <h1 onClick={() => setShow(!show)} className="text-white text-lg">
            {faq.question}
          </h1>
        </div>
        {show && <span className="pl-8 text-gray-200">{faq.answer}</span>}
      </div>
    </div>
  );
};
export default FaqItem;
