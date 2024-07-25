"use client";
import { useEffect, useState } from "react";

const EmiCalculator = () => {
  const [principalAmount, setPrincipalAmount] = useState<string>("");
  const [intrestRate, setIntrestRate] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [amount, setAmount] = useState<number>();
  //   const[emi,setEmi]=useState<number>()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const { value } = e.target;

    let validValue = value.replace(/\D/g, "");

    if (type === "principalAmount") {
      setPrincipalAmount(validValue);
    } else if (type === "intrestRate") {
      setIntrestRate(validValue);
    } else {
      if (validValue.length > 4) {
        return;
      }
      setYear(validValue);
    }
    // console.log(val);
  };
  //   P(r(1+r)^n/((1+r)^n)-1))
  const calculateEmi = () => {
    let r = parseInt(intrestRate);
    if (principalAmount && intrestRate && year) {
      r = r / 12 / 100;
      let month = parseInt(year) * 12;
      let calculate = Math.pow(1 + r, month);
      let amount = Math.round(
        parseInt(principalAmount) * ((r * calculate) / (calculate - 1))
      );
      setAmount(amount);
    }
  };
  //   console.log(amount);
  useEffect(() => {
    calculateEmi();
  }, [principalAmount, intrestRate, year]);
  return (
    <div className=" w-[35%] flex flex-col  p-3 shadow-lg border-[1px] border-gray-500 rounded-md">
      <p className="text-center text-2xl font-semibold my-2 text-blue-600">
        Mortgage calculator
      </p>
      <label className="text-lg font-semibold text-blue-600">
        Princple Amount
      </label>
      <input
        type="text"
        className="border-[1px] border-blue-500 p-2 outline-none rounded-md"
        placeholder="Princple amount"
        value={principalAmount}
        onChange={(e) => handleChange(e, "principalAmount")}
      />
      <label className="text-lg font-semibold text-blue-600">
        Intrest Rate
      </label>
      <input
        type="text"
        className="border-[1px] border-blue-600 p-2 outline-none rounded-md"
        placeholder="Intrest rate"
        value={intrestRate}
        onChange={(e) => handleChange(e, "intrestRate")}
      />
      <label className="text-lg font-semibold text-blue-600">Year</label>
      <input
        type="text"
        className="border-[1px] border-blue-500 p-2 outline-none rounded-md"
        placeholder="no of year"
        value={year}
        onChange={(e) => handleChange(e, "year")}
      />
      {amount && (
        <div className="flex justify-center items-center  my-3 text-blue-600 font-semibold text-xl">
          Your Monthy Emi is {amount}
        </div>
      )}

      {/* <button className="bg-blue-600 mt-2 py-3 px-20 text-white cursor-pointer mx-auto">
        Calculate
      </button> */}
    </div>
  );
};
export default EmiCalculator;
