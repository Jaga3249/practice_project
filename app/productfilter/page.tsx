"use client";
import { filterData } from "@/data";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

const Page = () => {
  const [activeFilter, setActiveFilter] = useState<string[]>([]);
  const [productDetail, setProductDetail] = useState(filterData);
  const filterType = ["Bags", "Watches", "Sports", "Sunglasses"];
  const handleFilter = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLButtonElement;
    const category = target.id;
    if (activeFilter.includes(category)) {
      const filter = activeFilter.filter((item) => item != category);
      setActiveFilter(filter);
    } else {
      setActiveFilter([...activeFilter, category]);
    }
  };

  console.log("productDetail", productDetail);
  console.log("filterItem", activeFilter);
  return (
    <div className="h-screen flex flex-col items-center gap-4  py-10">
      <h1 className="font-serif font-semibold text-3xl ">Product Filter</h1>
      <div className="flex gap-2" onClick={handleFilter}>
        {filterType.map((item, i) => (
          <button
            className={`btn btn-neutral btn-md ${
              activeFilter.includes(item) ? "btn-info" : ""
            }`}
            key={i}
            id={item}
          >
            {item}
          </button>
        ))}
      </div>

      {/* product cards */}
      <div className="grid grid-cols-3 gap-4 cursor-pointer">
        {filterData
          .filter((item) => {
            if (activeFilter.length) {
              return activeFilter.includes(item.category);
            } else {
              return item;
            }
          })
          ?.map((item, index) => (
            <div
              className="card bg-neutral text-neutral-content w-64"
              key={index}
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title">{item.name}</h2>
                <p>{item.category}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Page;
