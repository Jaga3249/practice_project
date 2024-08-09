"use client";
import { useEffect, useRef, useState } from "react";

interface checkOutStepType {
  name: string;
  Component: () => JSX.Element;
}
const CHECKOUT_STEPS: checkOutStepType[] = [
  {
    name: "Customer Info",
    Component: () => <div>Provide your contact details.</div>,
  },
  {
    name: "Shipping Info",
    Component: () => <div>Enter your shipping address.</div>,
  },
  {
    name: "Payment",
    Component: () => <div>Complete payment for your order.</div>,
  },
  {
    name: "Delivered",
    Component: () => <div> Your order has been delivered.</div>,
  },
];

const Page = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [margin, setMargin] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef<HTMLDivElement[]>([]);
  const handleStepIncrease = () => {
    setCurrentStep((prev) => {
      if (prev < CHECKOUT_STEPS.length) {
        return prev + 1;
      } else {
        setIsCompleted(true);
        return prev;
      }
    });
  };
  const calculatePogressBar = () => {
    return ((currentStep - 1) / (CHECKOUT_STEPS.length - 1)) * 100;
  };

  useEffect(() => {
    setMargin({
      marginLeft: stepRef.current[0].offsetWidth + 32,
      marginRight: stepRef.current[CHECKOUT_STEPS.length - 1].offsetWidth + 34,
    });
  }, [stepRef]);
  //   console.log(stepRef);
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-1/2  flex flex-col gap-4 ">
        <div className="  flex relative  ">
          <div
            className={`absolute h-2 top-4  overflow-hidden  z-0 bg-gray-400`}
            style={{
              width: `calc(100% - ${margin.marginLeft + margin.marginRight}px)`,
              marginLeft: margin.marginLeft,
              marginRight: margin.marginRight,
            }}
          >
            <span
              style={{ width: `${calculatePogressBar()}%` }}
              className="bg-green-500 h-full block"
            ></span>
          </div>
          {CHECKOUT_STEPS.map((item, index) => (
            <div
              className="flex  flex-1 flex-col items-center  z-50 "
              key={index}
            >
              <div
                className={`rounded-full ${
                  currentStep === index + 1 ? "bg-blue-500" : "bg-gray-600"
                } ${
                  currentStep > index + 1 || isCompleted ? "bg-green-500" : ""
                }  w-9 h-9 flex items-center justify-center font-semibold text-xl`}
                ref={(el) => {
                  if (el) {
                    stepRef.current[index] = el;
                  }
                }}
              >
                {currentStep > index + 1 || isCompleted ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="text-lg font-mono">{item.name}</div>
            </div>
          ))}
        </div>

        <span>{CHECKOUT_STEPS[currentStep - 1].Component()}</span>
        <button
          className={`btn btn-secondary max-w-20 ${
            isCompleted ? "hidden" : ""
          }`}
          onClick={handleStepIncrease}
        >
          {currentStep === CHECKOUT_STEPS.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};
export default Page;
