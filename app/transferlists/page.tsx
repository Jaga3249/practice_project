"use client";
import { useState } from "react";
interface dataTYpe {
  title: string;
  id: number;
  checked: boolean;
}
const Page = () => {
  const data: dataTYpe[] = [
    { title: "First", id: 0, checked: false },
    { title: "Second", id: 1, checked: false },
    { title: "Third", id: 2, checked: false },
    { title: "Fourth", id: 3, checked: false },
  ];

  const [leftItems, setLeftItems] = useState<dataTYpe[]>(data);
  const [rightItems, setRightItems] = useState<dataTYpe[]>([]);

  const handleClick = (checked: boolean, id: number, direction: string) => {
    if (direction === "left") {
      let copyleftItems: dataTYpe[] = [...leftItems];
      copyleftItems = checkedList(copyleftItems, id, checked);
      setLeftItems(copyleftItems);
    } else {
      let copyRightItems = [...rightItems];
      copyRightItems = checkedList(copyRightItems, id, checked);
      setRightItems(copyRightItems);
    }
  };
  const checkedList = (list: dataTYpe[], id: number, checked: boolean) => {
    return list.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !checked };
      }
      return item;
    });
  };
  const handleTransfer = (direction: String) => {
    if (direction === "left") {
      if (leftItems.length > 0 && rightItems.length === 0) {
        let copyleftItems = [...leftItems];
        const checklist = copyleftItems.filter((item) => item.checked);
        const UnCheckedList = copyleftItems.filter((item) => !item.checked);
        setLeftItems(UnCheckedList);
        setRightItems(resetItems([...rightItems, ...checklist]));
      }
      if (leftItems.length > 0 && rightItems.length > 0) {
        let copyleftItems = [...leftItems];
        const checklist = copyleftItems.filter((item) => item.checked);
        const UnCheckedList = copyleftItems.filter((item) => !item.checked);
        setLeftItems(UnCheckedList);
        const updateCheckListItem = resetItems([...checklist]);
        setRightItems([...rightItems, ...updateCheckListItem]);
      }
    } else {
      if (rightItems.length > 0 && leftItems.length === 0) {
        let copyRightItems = [...rightItems];
        const checklist = copyRightItems.filter((item) => item.checked);
        const unCheckedList = copyRightItems.filter((item) => !item.checked);
        setRightItems(unCheckedList);
        setLeftItems(resetItems([...leftItems, ...checklist]));
      } else if (rightItems.length > 0 && leftItems.length > 0) {
        let copyRightItems = [...rightItems];
        const checklist = copyRightItems.filter((item) => item.checked);
        const unCheckedList = copyRightItems.filter((item) => !item.checked);
        setRightItems(unCheckedList);
        const updatedRightItem = resetItems(checklist);
        setLeftItems([...leftItems, ...updatedRightItem]);
      }
    }
  };

  const resetItems = (list: dataTYpe[]) => {
    return list.map((item) => {
      return { ...item, checked: false };
    });
  };
  //   console.log("rightItems", rightItems);
  return (
    <div className="h-screen flex flex-col gap-10 justify-center items-center">
      <h1 className="font-serif font-semibold text-3xl">Transfer Lists</h1>
      <div className="w-1/2  flex p-2 rounded-md">
        {/* left container */}
        <div className="flex flex-col flex-1 gap-2 border-[1px] border-gray-400 p-2 rounded-md">
          {leftItems.map((item, i) => (
            <button
              className={` btn-neutral  btn  ${item.checked ? "btn-info" : ""}`}
              key={i}
              id={item.id.toString()}
              onClick={() => handleClick(item.checked, item.id, "left")}
            >
              {item.title}
            </button>
          ))}
        </div>
        {/* button section */}
        <div className="flex flex-col flex-1 items-center justify-center gap-2 px-2">
          <button
            className="btn btn-active btn-ghost w-full "
            onClick={() => handleTransfer("left")}
          >
            Left
          </button>
          <button
            className="btn btn-active btn-ghost w-full "
            onClick={() => handleTransfer("right")}
          >
            Right
          </button>
        </div>
        {/* right container */}
        <div className="flex flex-col flex-1 gap-2 border-[1px] border-gray-400 p-2 rounded-md">
          {rightItems.length > 0 &&
            rightItems.map((item, i) => (
              <button
                className={` btn-neutral  btn w-full  ${
                  item.checked ? "btn-info" : ""
                }`}
                key={i}
                id={item.id.toString()}
                onClick={() => handleClick(item.checked, item.id, "right")}
              >
                {item.title}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Page;
