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

const AddFood = () => {
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
    <div className="flex flex-col gap-2">
      <h1>My shopping List</h1>
      <input
        type="text"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
        className="p-2 border-[1px] border-gray-300 mt-3"
      />
      {loading ? (
        "Loading..."
      ) : foodLists.length > 1 ? (
        <div className="flex flex-col gap-1 justify-start cursor-pointer">
          {foodLists.map((item, i) => (
            <span
              className="py-1 px-3 cursor-pointer hover:bg-gray-600 hover:text-white w-[100%]"
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
          <div className={`flex gap-2 ${!item.data && "hidden"}`} key={item.id}>
            <input
              type="checkbox"
              checked={item.isDone}
              onChange={() => handleCheck(item.id)}
            />
            <span className={`${item.isDone ? "line-through" : ""}`}>
              {item.data}
            </span>
            <RiCloseLine onClick={() => handleRemove(item.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddFood;
