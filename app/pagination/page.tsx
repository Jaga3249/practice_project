"use client";
import axios from "axios";
import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import { RiArrowRightWideLine } from "@remixicon/react";
import { RiArrowLeftWideLine } from "@remixicon/react";

interface productType {
  id: number;
  title: string;
  imageUrl: string;
}

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<productType[]>([]);
  const [page, setPage] = useState<number>(1);

  const fetchData = async (url: string) => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      if (res.status === 200) {
        const { data } = res;
        return data.products;
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };
  const getProducts = async () => {
    const url = `https://dummyjson.com/products?limit=100`;
    let data = await fetchData(url);
    data = data.map((product: any) => {
      const obj = {
        id: product.id,
        title: product.title,
        imageUrl: product.thumbnail,
      };
      return obj;
    });
    setProducts(data);
  };

  const handleSelect = (id: number) => {
    if (id >= 1 && id <= products.length / 10) {
      setPage(id);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="h-screen flex flex-col gap-3">
      <div className="  flex flex-col items-center gap-3 ">
        <h1 className="font-serif font-semibold text-4xl mt-4">
          Pagination App
        </h1>
        <div className="  grid grid-cols-5 gap-4 cursor-pointer ">
          {products.slice(page * 10 - 10, page * 10).map((product, i) => (
            <div
              key={i}
              className="flex flex-col  border-[1px] border-gray-500 rounded-lg border-gray w-[200px] h-[200px]  "
            >
              <div className="h-[88%]">
                <img
                  src={product.imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-center ">{product.title}</span>
            </div>
          ))}
        </div>
      </div>
      {products.length > 0 && (
        <div className="flex items-center justify-center gap-2 cursor-pointer">
          <span
            className={`bg-gray-900 px-4 py-3 rounded-md ${
              page === 1 ? "hidden" : ""
            }`}
            onClick={() => handleSelect(page - 1)}
          >
            <RiArrowLeftWideLine size={25} />
          </span>
          {[...Array(products.length / 10)].map((_, i) => (
            <span
              key={i}
              className={` px-4 py-3 text-black rounded-md ${
                page === i + 1 ? "bg-gray-500" : "bg-gray-300"
              }`}
              onClick={() => handleSelect(i + 1)}
            >
              {i + 1}
            </span>
          ))}

          <span
            className={`bg-gray-900  px-4 py-3  rounded-md ${
              page === products.length / 10 ? "hidden" : ""
            }`}
            onClick={() => handleSelect(page + 1)}
          >
            <RiArrowRightWideLine size={25} />
          </span>
        </div>
      )}
    </div>
  );
};
export default Page;
