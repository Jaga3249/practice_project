"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [freq, setFreq] = useState<Map<string, number>>(new Map());
  const [YAxis, setYAxis] = useState<number[]>([]);
  const [XAxis, setXAxis] = useState<string[]>([]);
  const url =
    "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new";

  const fetchData = async () => {
    const { data } = await axios.get(url);
    const final_data = data.split("\n").filter(Boolean);
    const map = new Map<string, number>();

    final_data.forEach((item: string) => {
      if (map.has(item)) {
        map.set(item, (map.get(item) as number) + 1);
      } else {
        map.set(item, 1);
      }
    });

    setFreq(map);
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (freq.size > 0) {
      const Yarr = Array.from(freq.values());
      const Xarr = Array.from(freq.keys()).sort(
        (a, b) => parseInt(a) - parseInt(b)
      );

      const val = Math.max(...Yarr);
      const max_val = Math.ceil(val / 10) * 10;
      const YArr = [];
      for (let i = max_val / 10; i >= 0; i--) {
        YArr.push(i * 10);
      }
      setYAxis(YArr);
      setXAxis(Xarr);
    }
  }, [freq]);

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-12">
      <h1 className="font-bold text-white text-4xl">Bar Chart</h1>
      <div className="border-l-[2px] border-b-[2px] h-[40%] w-[50%] relative flex">
        {/* y-axis */}
        <div
          className={`flex flex-col justify-between  absolute -left-7 font-semibold  h-[100%] `}
        >
          {YAxis?.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
        {/* X-axis */}
        {XAxis &&
          XAxis.map((item: string, i) => (
            <div className="flex-1 relative flex-col flex items-center" key={i}>
              <div
                className={`bg-purple-600  w-8 absolute bottom-0 transition-height`}
                style={{ height: `${(freq.get(item)! / YAxis[0]) * 100}%` }}
              >
                <span className="absolute -top-6">{freq.get(item)}</span>
              </div>
              <span className="flex-1 absolute -bottom-7 ">{item}</span>
            </div>
          ))}
      </div>
      <button className="btn btn-secondary" onClick={fetchData}>
        Refresh
      </button>
    </div>
  );
};

export default Page;
