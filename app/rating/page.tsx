"use client";
import { RiStarFill } from "@remixicon/react";
import { useState } from "react";

const Rating = () => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  return (
    <div className="flex justify-center flex-col items-center h-[100vh] gap-4 cursor-pointer">
      <h1 className="text-3xl font-semibold ">Star Ratings</h1>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((num, i) => (
          <RiStarFill
            key={i}
            size={25}
            onClick={() => setRating(num)}
            onMouseOver={() => setHover(num)}
            onMouseLeave={() => setHover(rating)}
            className={`${num <= hover ? "text-yellow-600" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};
export default Rating;
