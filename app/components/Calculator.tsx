"use client";

import { useState } from "react";

const Calculator = () => {
  const calculator_item = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "+",
    "-",
    "*",
    "/",
    "=",
    "C",
  ];
  const [value, setValue] = useState<string>("");
  const [showInputVal, setShowInputVal] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const final_val = val
      .split("")
      .filter((item, i) => calculator_item.includes(item))
      .join("");
    setShowInputVal(final_val);
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLButtonElement;
    console.log(target);
    const clickedValue = target.id;
    if (clickedValue === "C") {
      setValue("");
    } else if (clickedValue === "=") {
      //calculate
      calculate();
    } else {
      setShowInputVal((prev) => prev + clickedValue);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculate();
  };
  const calculate = () => {
    const ans = eval(showInputVal);
    setValue(ans);
  };

  return (
    <div className=" h-full">
      <form
        className="flex justify-center items-center flex-col pt-5 "
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-3xl">Calculator</h1>
        <div className="relative">
          <input
            type="text"
            className=" border-[1px] border-slate-400 my-4 w-[350px] h-[80px] outline-none rounded-md px-4 font-bold text-3xl "
            onChange={handleChange}
            value={showInputVal}
          />
          <p className="absolute  right-0 bottom-3  pb-3 pr-2 w-full font-semibold text-2xl text-gray-500 text-end">
            {value}
          </p>
        </div>
        <div className="grid grid-cols-4  gap-2 " onClick={handleClick}>
          {calculator_item.map((item, i) => (
            <button
              key={i}
              id={item}
              className="px-8 py-2 bg-purple-500 rounded-md text-white font-bold text-xl text-center"
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};
export default Calculator;
