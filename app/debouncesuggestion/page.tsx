"use client";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

const Page = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestionLists, setSuggestionList] = useState<string[]>([]);

  //   function
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\d+/g, "");
    setInputValue(val);
  };

  const fetchData = async (url: string) => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        setSuggestionList(res?.data);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(suggestionLists);

  useEffect(() => {
    const url = `https://api.frontendeval.com/fake/food/${inputValue}`;
    if (inputValue.length > 0) {
      const debounceTimer = setTimeout(() => {
        fetchData(url);
      }, 1000);
      return () => clearTimeout(debounceTimer);
    }
  }, [inputValue]);
  return (
    <div className="h-screen flex flex-col gap-3 items-center py-10 ">
      <h1 className="font-serif text-3xl font-semibold ">
        Debounce Suggestion
      </h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
        value={inputValue}
        onChange={handleChange}
      />
      {loading ? (
        <span className="loading loading-bars loading-md"></span>
      ) : (
        suggestionLists.length > 0 && (
          <div className="border-[1px] border-gray-400 w-[23%] h-[40%] rounded-md cursor-pointer overflow-auto">
            {suggestionLists.map((item, i) => (
              <p
                key={i}
                className="py-2 px-3 hover:bg-gray-500 text-white mx-2"
              >
                {item}
              </p>
            ))}
          </div>
        )
      )}
    </div>
  );
};
export default Page;
