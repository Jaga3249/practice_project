import { data } from "@/data";
import FaqItem from "./FaqItem";

const Faq = () => {
  return (
    <div className="flex  flex-col justify-center items-center h-[100%] ">
      <h1 className="text-2xl font-bold mb-2 text-blue-500">
        Frequently Asked Question
      </h1>
      <div className=" w-[40%] flex flex-col gap-3 py-2 px-2">
        {data.map((faq, i) => (
          <FaqItem faq={faq} index={i} key={i} />
        ))}
      </div>
    </div>
  );
};
export default Faq;
