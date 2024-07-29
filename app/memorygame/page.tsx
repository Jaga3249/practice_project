"use client";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const getNum = () => {
  const list = [];
  for (let i = 1; i <= 8; i++) {
    list.push(i);
    list.push(i);
  }
  return list;
};
const Page = () => {
  const { width, height } = useWindowSize();
  const [stage, setStage] = useState<string>("init");
  const [nums, setNums] = useState(getNum());
  const [open, setOpen] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);

  const changenumsOrder = () => {
    const copynums = [...nums];
    copynums.sort(() => Math.random() - 0.5);
    setNums(copynums);
  };

  const handleStart = () => {
    setStage("start");
    changenumsOrder();
    setSolved([]);
  };
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (open.length === 2) {
      return;
    }
    setOpen((prev) => [...prev, index]);
  };
  //   console.log(open);
  useEffect(() => {
    console.log("call 1");
    setTimeout(() => {
      if (open.length === 2) {
        let id1 = open[0];
        let id2 = open[1];
        if (nums[id1] === nums[id2]) {
          setSolved((prev) => [...prev, nums[id1]]);
        }
        setOpen([]);
      }
    }, 1000);
  }, [open]);
  useEffect(() => {
    console.log("call 2");
    if (solved.length === 8) {
      setStage("win");
    }
  }, [solved]);

  console.log("open", open);

  return (
    <div
      className={`flex justify-center  flex-col items-center gap-10 py-8  h-[100vh] ${
        stage === "win" ? "h-[100vh]" : ""
      } `}
    >
      {stage === "win" ? (
        ""
      ) : (
        <h1 className="font-serif font-semibold  text-4xl ">Memory Game</h1>
      )}
      {stage === "init" && (
        <button className="btn btn-active btn-neutral" onClick={handleStart}>
          Play Game
        </button>
      )}
      {/* show the game board */}
      {stage === "start" && (
        <div className="grid grid-cols-4 gap-4">
          {nums.map((item, i) => (
            <button
              className={`btn px-6 py-2 rounded-md btn-neutral font-bold  text-opacity-0 ${
                solved.includes(item) ? "invisible" : ""
              } ${open.includes(i) ? "text-opacity-100" : ""}  `}
              key={i}
              onClick={(e) => handleClick(e, i)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      {/* game finish */}
      {stage === "win" && (
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-bold text-white  text-4xl font-serif px-4 py-2">
            Congratulation you win
          </h1>
          <button
            className="btn btn-active btn-info font-serif text-base-300 font-semibold"
            onClick={handleStart}
          >
            Play Again
          </button>
          <Confetti width={width} height={height} />
        </div>
      )}
    </div>
  );
};
export default Page;
