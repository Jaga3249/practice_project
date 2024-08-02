"use client";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { RiCloseLine } from "@remixicon/react";

interface BucketType {
  id: number;
  data: string;
  isDone: boolean;
}

const initialBucket: BucketType = {
  id: Date.now(),
  data: "",
  isDone: false,
};

const Page = () => {
  const [foodName, setFoodName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [foodLists, setFoodLists] = useState<string[]>([]);
  const [bucketLists, setBucketLists] = useState<BucketType[]>([initialBucket]);

  const getFoodItem = useCallback(async (foodName: string) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.frontendeval.com/fake/food/${foodName}`
      );
      if (res.status === 200) {
        setFoodLists(res.data);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddFood = useCallback((item: string) => {
    const newItem: BucketType = {
      id: Date.now(),
      data: item,
      isDone: false,
    };
    setBucketLists((prev) => {
      const itemExists = prev.some((bucketItem) => bucketItem.data === item);
      if (!itemExists) {
        return [...prev, newItem];
      }
      return prev;
    });
  }, []);

  const handleRemove = useCallback((id: number) => {
    setBucketLists((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleCheck = useCallback((id: number) => {
    setBucketLists((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  }, []);

  useEffect(() => {
    if (foodName.length >= 2) {
      getFoodItem(foodName);
    }
  }, [foodName, getFoodItem]);

  return (
    <div className=" h-screen flex flex-col  items-center justify-start gap-4 py-10">
      <h1 className=" text-3xl font-serif font-bold">My shopping List</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
      />
      {loading ? (
        <span className="loading loading-bars loading-md"></span>
      ) : foodLists.length > 1 ? (
        <div className=" w-[24%] flex flex-col gap-1 justify-start  items-start cursor-pointer border-[1px] border-gray-500 rounded-md">
          {foodLists.map((item, i) => (
            <span
              className="py-2 px-3 cursor-pointer hover:bg-gray-600 hover:text-white w-[100%] "
              key={i}
              onClick={() => handleAddFood(item)}
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        "Food is Not Available"
      )}
      <div>
        {bucketLists.map((item, i) => (
          <div
            className={`flex gap-2 ${!item.data && "hidden"} w-[23%]`}
            key={item.id}
          >
            {/* <input
              type="checkbox"
              checked={item.isDone}
              onChange={() => handleCheck(item.id)}
            /> */}
            <input
              type="checkbox"
              defaultChecked
              className="checkbox"
              checked={item.isDone}
              onChange={() => handleCheck(item.id)}
            />
            <span className={`${item.isDone ? "line-through" : ""}`}>
              {item.data}
            </span>
            <RiCloseLine
              onClick={() => handleRemove(item.id)}
              className="text-3xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
