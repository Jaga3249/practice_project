"use client";

import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { RiArrowUpFill } from "@remixicon/react";
import { RiArrowDownFill } from "@remixicon/react";

const Page = () => {
  const currencyData = ["usd", "eur", "gbp", "cny", "jpy"];
  const [currency, setCurrency] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("usd");
  const [convertedCurrency, setConvertedCurrency] = useState<string>("");
  const [isUp, setIsUp] = useState<boolean>(false);
  const [difference, setDifference] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setCurrency(val);
  };
  const handleCurrencyType = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };
  const fetchCurrencyInfo = async () => {
    try {
      const res = await axios.get(
        `https://api.frontendeval.com/fake/crypto/${selectedCurrency}`
      );
      if (res.status === 200) {
        const { data } = res;
        if (currency === "") {
          return;
        }
        const showVal = data.value * parseInt(currency);
        setConvertedCurrency(showVal.toFixed(2));
        const prevVal = localStorage.getItem("prevVal");
        if (prevVal === null) {
          setDifference(showVal.toFixed(2));
        }
        if (prevVal != null) {
          const diff = showVal - parseInt(prevVal);
          diff > 0 ? setIsUp(true) : setIsUp(false);
          setDifference(diff.toFixed(2));
        }
        localStorage.setItem("prevVal", showVal.toFixed(2).toString());
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    let time;
    time = setInterval(() => {
      fetchCurrencyInfo();
    }, 3000);

    return () => {
      clearInterval(time);
    };
  }, [currency, selectedCurrency]);
  return (
    <div className="h-screen flex flex-col  items-center gap-6 my-10">
      <h1 className="font-serif font-semibold text-2xl">
        Crypto Converter App
      </h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered  flex-1 "
          value={currency}
          onChange={handleChange}
        />
        <select
          className="select select-bordered  flex-1"
          onChange={handleCurrencyType}
        >
          {currencyData.map((curr, i) => (
            <option key={i} className="p-2">
              {curr.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      {currency != "" && convertedCurrency != "" && (
        <div className="flex justify-between w-[25%]">
          <span>{convertedCurrency}</span>
          <span>WUC</span>
          <span
            className={`flex ${
              isUp ? "text-green-600" : "text-red-700 font-semibold text-xl"
            } `}
          >
            {isUp ? (
              <RiArrowUpFill className="text-green-500" size={25} />
            ) : (
              <RiArrowDownFill />
            )}
            {difference}
          </span>
        </div>
      )}
    </div>
  );
};
export default Page;
