"use client";
import { RiEdit2Fill } from "@remixicon/react";
import { RiDeleteBin2Line } from "@remixicon/react";
import { ChangeEvent, useState } from "react";
// interface
interface TaskType {
  title: string;
  status: "Todo" | "Doing" | "Done";
  id: number;
}
const Page = () => {
  const [val, setValue] = useState<string>("");
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [dragTask, setDragTask] = useState<TaskType | null>(null);
  const [updatedTask, setUpdatedTask] = useState<TaskType | null>(null);
  //crud function
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val.length > 0) {
      let final_val = val[0].toUpperCase() + val.slice(1).toLowerCase();
      setValue(final_val);
    } else {
      setValue(val);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      //if user is comming update
      if (updatedTask) {
        const obj = {
          id: updatedTask.id,
          title: val,
          status: updatedTask.status,
        };
        let copyList = [...taskList];
        copyList = copyList.filter((item) => item.id != updatedTask.id);
        setTaskList([...copyList, obj]);
        setValue("");
        setUpdatedTask(null);
      }
      //if user is comming first time
      else {
        const obj: TaskType = {
          title: val,
          status: "Todo",
          id: Date.now(),
        };
        let copyList = [...taskList];
        const isExist = copyList.some((item) => item.title === obj.title);
        if (isExist) {
          setValue("");
          return;
        } else {
          setTaskList([...copyList, obj]);
          setValue("");
        }
      }
    }
  };
  const handleDelete = (id: number) => {
    // console.log(typeof id);
    let copyListTask = [...taskList];
    copyListTask = copyListTask.filter((item) => item.id != id);
    setTaskList(copyListTask);
  };
  const handleEdit = (item: TaskType) => {
    setUpdatedTask(item);
    setValue(item.title);
  };

  //dragdrop function
  const handleDrag = (e: React.DragEvent<HTMLDivElement>, task: TaskType) => {
    setDragTask(task);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    // console.log(e);
    const status = e.currentTarget.getAttribute("data-status");
    if (status === "Todo") {
      handleDragDrop(status);
    } else if (status === "Doing") {
      handleDragDrop(status);
    } else if (status === "Done") {
      handleDragDrop(status);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDragDrop = (status: any) => {
    const copyTaskList = [...taskList];
    copyTaskList.map((item) => {
      if (item.id === dragTask?.id) {
        item.status = status;
      }
      return item;
    });
    setTaskList(copyTaskList);
    setDragTask(null);
  };

  return (
    <div className="w-screen h-screen flex  flex-col  items-center gap-6 py-10">
      <h1 className="text-4xl font-semibold font-serif">Task Manager</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
        value={val}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <div className="flex  w-1/2 gap-2 cursor-pointer">
        <div
          className="flex-1 flex flex-col  "
          data-status={"Todo"}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <button className="btn btn-accent w-full">Todo</button>
          {taskList.length > 0 &&
            taskList.map(
              (item, i) =>
                item.status === "Todo" && (
                  <div
                    className="flex justify-between items-center my-2 bg-gray-700 p-2 rounded-md  "
                    draggable
                    key={i}
                    onDrag={(e) => handleDrag(e, item)}
                  >
                    <span>{item.title}</span>
                    <div className="flex gap-4">
                      <RiEdit2Fill size={25} onClick={() => handleEdit(item)} />
                      <RiDeleteBin2Line
                        className="hover:text-red-500"
                        size={25}
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  </div>
                )
            )}
        </div>
        <div
          className="flex-1"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          data-status={"Doing"}
        >
          <button className="btn btn-secondary w-full">Doing</button>
          {taskList.length > 0 &&
            taskList.map(
              (item, i) =>
                item.status === "Doing" && (
                  <div
                    className="flex justify-between items-center my-2  bg-gray-700 p-2 rounded-md"
                    key={i}
                    draggable
                    onDrag={(e) => handleDrag(e, item)}
                  >
                    <span>{item.title}</span>
                    <div className="flex gap-4">
                      <RiEdit2Fill size={25} />
                      <RiDeleteBin2Line
                        className="hover:text-red-500"
                        size={25}
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  </div>
                )
            )}
        </div>
        <div
          className="flex-1"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          data-status={"Done"}
        >
          <button className="btn btn-primary w-full">Done</button>
          {taskList.length > 0 &&
            taskList.map(
              (item, i) =>
                item.status === "Done" && (
                  <div
                    className="flex justify-between items-center my-2 bg-gray-700 p-2 rounded-md "
                    key={i}
                    draggable
                    onDrag={(e) => handleDrag(e, item)}
                  >
                    <span>{item.title}</span>
                    <div className="flex gap-4">
                      <RiEdit2Fill size={25} />
                      <RiDeleteBin2Line
                        className="hover:text-red-500"
                        size={25}
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
};
export default Page;
