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
  }, [pages, loading]);
  useEffect(() => {
    console.log("normal useeffect call");
    fetchFirstPage();
  }, []);
  useEffect(() => {
    console.log("render intersection", Date.now());
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        //call api for next page
        getData();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [getData]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-serif text-3xl font-semibold pt-4">
        Infinite ScrollBar
      </h1>
      <div className="grid grid-cols-3">
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
      <div ref={loaderRef}>{loading && <h1>Loading...</h1>}</div>
    </div>
  );
};
export default Page;
