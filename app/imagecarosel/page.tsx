"use client";
import img1 from "@/public/image1.jpg";
import img2 from "@/public/image2.jpg";
import img3 from "@/public/image3.jpg";
import Image from "next/image";
import {
  RiArrowRightCircleFill,
  RiArrowLeftCircleFill,
} from "@remixicon/react";
import { useEffect, useState } from "react";

const images = [img1, img2, img3];

const Page = () => {
  const [step, setStep] = useState<number>(0);

  const handleIncrease = () => {
    setStep((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDecrease = () => {
    setStep((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(handleIncrease, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="h-screen overflow-hidden  relative">
        <div
          className="flex h-full  transition-transform duration-1000 ease-in-out "
          style={{ transform: `translateX(-${step * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className="relative h-full w-full shrink-0">
              <Image
                fill
                src={src}
                alt={`image ${index + 1}`}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-between absolute top-1/2 px-2 cursor-pointer">
        <RiArrowLeftCircleFill
          size={40}
          className="text-blue-200"
          onClick={handleDecrease}
        />
        <RiArrowRightCircleFill
          size={40}
          className="text-blue-200"
          onClick={handleIncrease}
        />
      </div>
    </>
  );
};

export default Page;
