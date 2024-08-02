"use client";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const Page = () => {
  const { width, height } = useWindowSize();
  const [matrixs, setMatrixs] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState<boolean>(true);
  const [wonerItem, setWonerItem] = useState<number[]>([]);
  const [won, setWon] = useState<string | null>(null);

  const handleUserClick = (e: MouseEvent<HTMLDivElement>) => {
    if (won) {
      return;
    }

    const position = (e.target as HTMLDivElement).id;
    if (matrixs[parseInt(position)] != null) {
      return;
    }
    const copyMatrix = [...matrixs];
    copyMatrix[parseInt(position)] = isXTurn ? "X" : "O";
    setMatrixs(copyMatrix);
    setIsXTurn((prev) => !prev);
  };
  const decideWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        matrixs[a] &&
        matrixs[a] === matrixs[b] &&
        matrixs[a] === matrixs[c]
      ) {
        setWon(matrixs[a]);
        setWonerItem(lines[i]);
      }
    }
  };
  useEffect(() => {
    decideWinner();
  }, [matrixs]);
  return (
    <>
      <div className=" h-[100vh] flex  items-center justify-center flex-col  gap-4">
        <h1 className="text-4xl font-serif  font-semibold">Tic Tac Toe</h1>
        <div
          className="grid grid-cols-3 cursor-pointer "
          onClick={handleUserClick}
        >
          {matrixs.map((item, index) => (
            <div
              key={index}
              id={index.toString()}
              className={`w-20 h-20 border-[1px] border-gray-100  ${
                wonerItem.includes(index) ? "bg-green-600" : "bg-gray-500"
              } flex justify-center items-center  ${
                wonerItem.includes(index) ? "" : "hover:bg-slate-400"
              }  font-bold text-3xl text-white`}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          {/* <button
            className="btn btn-neutral uppercase font-sans"
            onClick={() => setMatrixs(Array(9).fill(null))}
          >
            Restart
          </button> */}
        </div>
      </div>
      {won && <Confetti width={width} height={height} />}
    </>
  );
};
export default Page;
