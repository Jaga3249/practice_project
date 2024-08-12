"use client";
import { useState, useEffect, DragEvent } from "react";
interface matrixType {
  position: number[];
  isColor: boolean;
}
const Page = () => {
  const [twoDMatrix, setTwoDMatrix] = useState<matrixType[]>([]);
  const [Start, setStart] = useState<number[]>([]);
  const [end, setEnd] = useState<number[]>([]);

  const prepareTwoDMatrix = () => {
    const matrix = [];
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        let obj = {
          position: [i, j],
          isColor: false,
        };
        matrix.push(obj);
      }
    }
    setTwoDMatrix(matrix);
  };
  const handleDrag = (e: DragEvent<HTMLDivElement>, position: number[]) => {
    setStart(position);
    prepareTwoDMatrix();
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>, position: number[]) => {
    setEnd(position);
  };
  const fillColor = (Start: number[], end: number[]) => {
    const [startRow, startCol] = Start;
    const [endRow, endCol] = end;
    let selectedGrid = [];
    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        selectedGrid.push([i, j].join(""));
      }
    }
    let copyMatrix = [...twoDMatrix];
    copyMatrix = copyMatrix.map((item) => {
      const { position } = item;
      const stringPos = position.join("");
      if (selectedGrid.includes(stringPos)) {
        item.isColor = true;
      }
      return item;
    });
    setTwoDMatrix(copyMatrix);
  };
  useEffect(() => {
    if (Start.length > 1 && end.length > 1) {
      fillColor(Start, end);
    }
  }, [Start, end]);

  useEffect(() => {
    prepareTwoDMatrix();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="grid grid-cols-10 ">
        {twoDMatrix &&
          twoDMatrix.map((item, i) => (
            <div
              key={i}
              className={`border-2 border-gray-500 px-5 py-3 ${
                item.isColor && "bg-gray-700"
              }`}
              draggable
              onDrag={(e) => handleDrag(e, item.position)}
              onDragOver={(e) => handleDragOver(e, item.position)}
            >
              {item.position}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
