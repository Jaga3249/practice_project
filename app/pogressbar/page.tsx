"use client";
import { useEffect, useState } from "react";
import PogressBar from "../components/PogressBar";

const Page = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let time;
    time = setInterval(() => {
      //   console.log("setinterval call");
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 1);
      }
    }, 30);
    return () => {
      clearInterval(time);
    };
  }, [progress]);

  return (
    <div className="h-screen flex flex-col items-center gap-4 py-10 ">
      <h1 className="font-serif font-semibold text-3xl">Progress Bar</h1>
      <PogressBar pogress={progress} color="blue" />
      <PogressBar pogress={progress} color="green" />
      <PogressBar pogress={progress} color="yellow" />
    </div>
  );
};

export default Page;
