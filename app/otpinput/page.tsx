"use client";
import {
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

const Page = () => {
  const inputData = ["", "", "", ""];
  const inputref: RefObject<HTMLInputElement>[] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [input, setInput] = useState<string[]>(inputData);
  const [missedInput, setMissedInput] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    const numberVal = val.replace(/\D/g, "").slice(val.length - 1);
    if (numberVal) {
      if (index < input.length - 1) {
        inputref[index + 1].current?.focus();
      }
      const copyInput = [...input];
      copyInput[index] = numberVal;
      setInput(copyInput);
    }
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.keyCode === 8) {
      const copyInput = [...input];
      copyInput[index] = "";
      setInput(copyInput);
      if (index > 0) {
        inputref[index - 1].current?.focus();
      }
    }
  };

  const handlepaste = (e: ClipboardEvent<HTMLInputElement>) => {
    let clipboardData = e.clipboardData.getData("Text");
    let numberPasteVal = clipboardData.replace(/\D/g, "");
    if (numberPasteVal.length === input.length) {
      const numVal = numberPasteVal.split("");
      setInput(numVal);
      inputref[input.length - 1].current?.focus();
    }
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.includes("")) {
      let copyInput = [...input];
      const missedInput = copyInput.filter((item) => item === "");
      setMissedInput(missedInput);
    } else {
      alert("otp send sucessfully");
      setInput(inputData);
    }
  };
  useEffect(() => {
    inputref[0].current?.focus();
  }, []);
  // console.log(input);
  return (
    <form
      className=" h-screen flex flex-col items-center justify-center gap-4"
      onSubmit={handleSubmit}
    >
      <h1 className="font-serif text-4xl">Two-factor code input </h1>
      <div className="flex gap-2 items-center">
        {input.map((item, i) => (
          <input
            key={i}
            type="text"
            ref={inputref[i]}
            // placeholder="Type here"
            className={`input input-bordered max-w-xs w-14 h-14 text-center ${
              missedInput.includes(item) ? "border-[1px] border-red-400" : ""
            }`}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlepaste}
            value={input[i]}
          />
        ))}
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};
export default Page;
