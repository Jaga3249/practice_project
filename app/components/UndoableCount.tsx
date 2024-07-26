"use client";

import { useState } from "react";
interface History {
  key: number;
  prev: number;
  curr: number;
}

const UndoableCount = () => {
  const [value, setValue] = useState<number>(0);
  const [history, setHistory] = useState<History[]>([]);
  const [redoList, setRedoList] = useState<History[]>([]);
  const handleClick = (key: number) => {
    // console.log(typeof value);
    setValue((prev) => prev + key);
    maintainHistory(key, value, value + key);
  };
  const maintainHistory = (key: number, prev: number, curr: number) => {
    // console.log(key, prev, curr);
    const obj = {
      key,
      prev,
      curr,
    };
    let copyHistory = [...history];
    copyHistory.unshift(obj);
    setHistory(copyHistory);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      let copyHistory = [...history];
      let removeElement = copyHistory.shift();
      const copyRedoList = [...redoList];
      if (removeElement != undefined) {
        setHistory(copyHistory);
        setValue(removeElement?.prev);
        copyRedoList.push(removeElement);
        setRedoList(copyRedoList);
      }
    }
  };
  const handleRedo = () => {
    if (redoList.length > 0) {
      const copyRedo = [...redoList];
      let removedVal = copyRedo.pop();
      setRedoList(copyRedo);

      if (removedVal != undefined) {
        const { key, prev, curr } = removedVal;
        setValue(removedVal?.curr);
        maintainHistory(key, prev, curr);
      }
    }
  };
  return (
    <div className="flex   flex-col  gap-4 h-[100%]">
      <h1 className="text-center mt-4 font-semibold text-2xl">
        Undoable Count
      </h1>
      <div className="flex justify-center gap-4">
        <button
          className="bg-purple-800 px-4 py-2 text-white rounded-md"
          onClick={handleUndo}
        >
          Undo
        </button>
        <button
          className="bg-purple-800 px-4 py-2 text-white rounded-md"
          onClick={handleRedo}
        >
          Redo
        </button>
      </div>
      <div className="flex justify-center items-center gap-6 my-4">
        <div className="flex justify-center gap-4">
          {[-100, -10, -1].map((item, i) => (
            <button
              key={i}
              className="bg-purple-800 px-4 py-2 text-white rounded-md"
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="font-bold text-xl">{value}</div>
        <div className="flex justify-center gap-4">
          {[1, 10, 100].map((item, i) => (
            <button
              key={i}
              className="bg-purple-800 px-4 py-2 text-white rounded-md"
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex  flex-col  gap-2 text-center border-[1px] border-gray-500 rounded-md  mx-auto w-[30%] h-[50%] overflow-auto">
        <h1 className="font-semibold text-center text-2xl">History</h1>
        <div className="">
          {history.map((item, i) => (
            <p
              className="text-red-800"
              key={i}
            >{`${item.key} ${item.prev}=> ${item.curr}`}</p>
          ))}
        </div>
        {/* <div className=" flex justify-start flex-col items-center gap-2 border-[1px] border-gray-400 w-[50%] overflow-auto">
          {history.map((item, i) => (
            <p
              className="text-red-800"
              key={i}
            >{`${item.key} ${item.prev}=> ${item.curr}`}</p>
          ))}
        </div> */}
      </div>
    </div>
  );
};
export default UndoableCount;
