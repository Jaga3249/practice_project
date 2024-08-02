"use client";
import { useEffect, useState } from "react";

const Page = () => {
  const [principalAmount, setPrincipalAmount] = useState<string>("");
  const [intrestRate, setIntrestRate] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [amount, setAmount] = useState<number>();

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

  useEffect(() => {
    calculateEmi();
  }, [principalAmount, intrestRate, year]);
  return (
    <div className=" h-screen flex justify-center items-center ">
      <div className=" w-[35%] flex flex-col  p-3 shadow-lg border-[1px] border-gray-500 rounded-md">
        <p className="text-center text-3xl font-semibold font-serif my-2 ">
          Mortgage calculator
        </p>
        <label className="text-lg font-semibold font-sans mb-1 ">
          Princple Amount
        </label>
        <input
          type="text"
          placeholder="Princple amount"
          className="input input-bordered  w-full "
          value={principalAmount}
          onChange={(e) => handleChange(e, "principalAmount")}
        />
        <label className="text-lg font-semibold font-sans mb-1">
          Intrest Rate
        </label>
        <input
          type="text"
          className="input input-bordered  w-full "
          placeholder="Intrest rate"
          value={intrestRate}
          onChange={(e) => handleChange(e, "intrestRate")}
        />
        <label className="text-lg font-semibold font-sans mb-1">Year</label>
        <input
          type="text"
          className="input input-bordered  w-full "
          placeholder="No of year"
          value={year}
          onChange={(e) => handleChange(e, "year")}
        />
        {amount && (
          <div className="flex justify-center items-center  my-3  font-semibold text-xl">
            Your Monthy Emi is {amount}
          </div>
        )}
      </div>
    </div>
  );
};
export default Page;
