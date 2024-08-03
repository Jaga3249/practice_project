"use client";
import { MouseEvent, useState } from "react";

const Page = () => {
  const tabs = ["Home", "About", "Contact"];
  const [selectedTabs, setSelectedTabs] = useState<string>("Home");
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLButtonElement;
    setSelectedTabs(target.id);
  };
  return (
    <div className="h-screen flex flex-col gap-4 items-center my-10 ">
      <h1 className="font-serif font-semibold text-3xl">Custom Tabs</h1>
      <div className="flex gap-2" onClick={handleClick}>
        {tabs.map((item, i) => (
          <button
            className={`btn  ${
              selectedTabs === item ? " btn-accent" : "btn-neutral"
            }`}
            key={i}
            id={item}
          >
            {item}
          </button>
        ))}
      </div>
      {selectedTabs === "Home" && <p>content for home</p>}
      {selectedTabs === "About" && <p>content for about</p>}
      {selectedTabs === "Contact" && <p>content for contact</p>}
    </div>
  );
};
export default Page;
