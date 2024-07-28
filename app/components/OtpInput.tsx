"use client";
import { useEffect, useRef, useState } from "react";

const OtpInput = () => {
  const emptyArr = ["", "", "", ""];
  const refs: React.RefObject<HTMLInputElement>[] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [input, setInput] = useState(emptyArr);
  const [missed, setMissed] = useState<number[]>([]);

  useEffect(() => {
    refs[0].current?.focus();
  }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;
    const checkNum = /^\d$/.test(val);
    if (!checkNum) {
      return;
    }
    if (index < input.length - 1) {
      refs[index + 1].current?.focus();
    }
    const copyInput = [...input];
    copyInput[index] = val;
    setInput(copyInput);
  };
  const handleClear = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: any
  ) => {
    if (e.keyCode === 8) {
      const copyInput = [...input];
      copyInput[index] = "";
      setInput(copyInput);
      if (index > 0) {
        refs[index - 1].current?.focus();
      }
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const data = e.clipboardData.getData("text");
    if (!Number(data || data.length != input.length)) {
      return;
    }
    const copydata = data.split("");
    setInput(copydata);
    refs[input.length - 1].current?.focus();
  };

  const handleSunmit = () => {
    let missedItem = input.map((item, i) => {
      if (item === "") {
        return i;
      }
    });
    const final_data = missedItem.filter((item) => item != undefined);
    setMissed(final_data);
  };
  return (
    <div className="mt-10 ">
      <h1 className="text-2xl font-bold mb-3">Two-factor code input</h1>
      <div className="flex justify-center gap-2 ">
        {emptyArr.map((item, i) => (
          <input
            ref={refs[i]}
            key={i}
            value={input[i]}
            type="text"
            maxLength={1}
            className={`border-[1px] border-black w-12 h-12 rounded-md font-bold text-center text-xl  ${
              missed.includes(i) ? "border-[1px] border-red-500" : ""
            }`}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleClear(e, i)}
            onPaste={handlePaste}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-purple-900 px-4 py-2 text-white rounded-md "
          onClick={handleSunmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default OtpInput;
