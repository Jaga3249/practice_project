"use client";

import { vscodeFolderStructure } from "@/data";
import { RiArrowRightSLine } from "@remixicon/react";
import { RiArrowDownSLine } from "@remixicon/react";
import { RiFolder2Line } from "@remixicon/react";
import { useState } from "react";
import Folder from "../components/Folder";

const Page = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const [selectedFolder, setSelectedFolder] = useState<{
    [key: string]: boolean;
  }>({});

  const handleOpen = (selectedItem: string) => {
    // setIsOpen(!isOpen);
    setSelectedFolder((prev) => ({
      ...prev,
      [selectedItem]: !prev[selectedItem],
    }));
  };

  console.log(selectedFolder);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 py-10">
      <h1 className="font-serif font-semibold text-3xl">
        Vscode Folder Structure
      </h1>
      <div className="text-xl font-serif font-semibold">
        <div
          className="flex items-center  cursor-pointer gap-0"
          onClick={() => setExpand(!expand)}
        >
          {vscodeFolderStructure.isFolder ? (
            <>
              {expand ? (
                <>
                  <RiArrowDownSLine size={25} />
                  <RiFolder2Line size={20} className="mr-2 ml-1" />
                </>
              ) : (
                <>
                  <RiArrowRightSLine size={25} />
                  <RiFolder2Line size={20} className="mr-2 -ml-1" />
                </>
              )}
            </>
          ) : null}
          {/* {vscodeFolderStructure.name} */}
          <span>{vscodeFolderStructure.name}</span>
        </div>
        {/* children div */}
        <div>
          {vscodeFolderStructure.isFolder &&
            expand &&
            vscodeFolderStructure.Children?.map((item, i) => (
              <div key={i}>
                {item.isFolder ? (
                  <div
                    className={`flex justify-start cursor-pointer ml-3  ${
                      selectedFolder[item.name]
                        ? "items-start "
                        : "items-center"
                    } `}
                    onClick={() => handleOpen(item.name)}
                  >
                    {selectedFolder[item.name] ? (
                      <>
                        <RiArrowDownSLine size={25} />
                        <RiFolder2Line size={20} className="mr-1" />
                      </>
                    ) : (
                      <>
                        <RiArrowRightSLine size={25} />
                        <RiFolder2Line size={20} className="mr-1" />
                      </>
                    )}
                    <div className="flex flex-col justify-start  cursor-pointer ">
                      <span
                        className={`font-thin  ${
                          selectedFolder[item.name] ? "-mt-1" : ""
                        }`}
                      >
                        {item.name}
                      </span>
                      {selectedFolder[item.name] && (
                        <Folder files={item.Children} />
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="font-thin text-lg ml-5">{item.name}</span>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Page;
