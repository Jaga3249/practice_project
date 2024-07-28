import img1 from "@/public/image1.jpg";
import img2 from "@/public/image2.jpg";
import img3 from "@/public/image3.jpg";
import Image from "next/image";

const ImageCarousel = () => {
  return (
    <div className="h-[100vh] w-full border-2 border-red-500 flex overflow-hidden">
      <div className="flex-shrink-0 w-full relative border-2 border-green-500">
        <Image
          src={img1}
          layout="fill"
          objectFit="cover"
          alt="Image 1"
          className="border-2 border-red-500"
        />
      </div>
      <div className="flex-shrink-0 w-full relative">
        <Image
          src={img2}
          layout="fill"
          objectFit="cover"
          alt="Image 2"
          className="border-2 border-red-500"
        />
      </div>
      <div className="flex-shrink-0 w-full relative">
        <Image
          src={img3}
          layout="fill"
          objectFit="cover"
          alt="Image 3"
          className="border-2 border-red-500"
        />
      </div>
    </div>
  );
};

export default ImageCarousel;
