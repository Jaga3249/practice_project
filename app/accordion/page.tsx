import { data } from "@/data";
import Accordion from "../components/Accordion";

const Page = () => {
  return (
    <div className="h-screen">
      <div className="flex  flex-col justify-center items-center h-[100%] ">
        <h1 className="text-3xl font-bold font-serif  mb-2 ">
          Frequently Asked Question
        </h1>
        <div className=" w-[40%] flex flex-col gap-3 py-2 px-2">
          {data.map((faq, i) => (
            <Accordion faq={faq} index={i} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Page;
