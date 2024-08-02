"use client";
import { data } from "@/data";
import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
interface imageDataType {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

const Page = () => {
  const [images, setImages] = useState<imageDataType[]>([]);
  const [pages, setPages] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(false);
  const loaderRef = useRef(null);
  const fetchimages = async (index: number) => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_page=${index}&_limit=9`
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      console.log("Api error", error);
    }
  };
  const fetchFirstPage = async () => {
    const data = await fetchimages(1);
    setImages(data);
  };

  const getData = useCallback(async () => {
    setLoading(true);
    const data = await fetchimages(pages);
    setImages((prev) => [...prev, ...data]);
    setLoading(false);
    setPages((prev) => prev + 1);
  }, [pages]);

  useEffect(() => {
    console.log("intersection useeffcet call", Date.now());
    const observerOptions = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.1, // trigger when 10% of the target is visible
    };
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      console.log(target.isIntersecting);
      if (target.isIntersecting) {
        console.log("IntersectionObserver triggered");
        //call api for next page
        // console.log("api call");
        getData();
      }
    }, observerOptions);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [getData]);

  useEffect(() => {
    console.log("normal useeffect call");
    fetchFirstPage();
  }, []);
  console.log(pages);

  return (
    <div className=" h-auto flex flex-col items-center justify-center">
      <h1 className="font-serif text-3xl font-semibold pt-4">
        Infinite ScrollBar
      </h1>
      <div
        className={`grid grid-cols-3  h-full ${
          images.length === 0 && "invisible"
        }`}
      >
        {images &&
          images.map((item, i) => (
            <Image
              src={item.thumbnailUrl}
              key={i}
              height={150}
              width={150}
              alt={item.title}
            />
          ))}
      </div>

      <div ref={loaderRef} className="">
        {loading ? (
          <h1 className="text-2xl text-red-600 font-bold">Loading...</h1>
        ) : (
          "dggd"
        )}
      </div>
    </div>
  );
};
export default Page;
