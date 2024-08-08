"use client";
import { useState } from "react";
import Modal from "../components/Modal";
import { RiCloseFill } from "@remixicon/react";
import Image from "next/image";

interface AddEmployType {
  imageUrl?: string;
  name: string;
  email: string;
  mobileNumber: string;
  address: string;
  dob: string;
  id: number;
}

const Page = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [employeeList, setEmployeeList] = useState<AddEmployType[]>([]);
  const [employInfo, setEmployInfo] = useState<AddEmployType | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleShowEmployInfo = (employee: AddEmployType) => {
    setEmployInfo(employee);
  };

  const deleteEmployeeInfo = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    let copyList = [...employeeList];
    copyList = copyList.filter((employee) => employee.id !== id);
    setEmployeeList(copyList);
    if (employInfo && employInfo.id === id) {
      setEmployInfo(null);
    }
  };
  console.log(employInfo);
  return (
    <>
      <div className="h-screen flex justify-center py-10 cursor-pointer">
        <div className="w-2/3  p-2 flex flex-col gap-3">
          {/* top section */}
          <div className="flex justify-between items-center">
            <h1 className="font-serif text-2xl font-semibold">
              Employee Database Management
            </h1>
            <button className="btn btn-primary" onClick={openModal}>
              Add Employee
            </button>
          </div>
          {/* bottom section */}
          <div className="flex h-[90%] overflow-hidden">
            {/* left side */}
            <div className="w-[80%] border-[1px] border-gray-500">
              <h1 className="text-center py-2 font-serif font-semibold text-xl border-b-[1px] border-gray-500">
                Employee Lists
              </h1>
              {employeeList.length > 0 &&
                employeeList.map((employee, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center my-1 p-2 hover:bg-gray-600"
                    onClick={() => handleShowEmployInfo(employee)}
                  >
                    <span>{employee.name}</span>
                    <RiCloseFill
                      className="text-red-600 font-bold"
                      size={32}
                      onClick={(e) => deleteEmployeeInfo(employee.id, e)}
                    />
                  </div>
                ))}
            </div>
            {/* right side */}
            <div className="w-full border-[1px] border-gray-500">
              <h1 className="text-center py-2 font-serif font-semibold text-xl border-b-[1px] border-gray-500">
                Employee Info
              </h1>
              <div className="flex justify-center my-4">
                {employInfo && (
                  <div className="relative h-36 w-36 rounded-full mt-6 ">
                    <Image
                      src={
                        employInfo.imageUrl
                          ? employInfo.imageUrl
                          : "https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small/man-avatar-icon-free-vector.jpg"
                      }
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                      alt="employee image"
                    />
                  </div>
                )}
              </div>
              {employInfo != null && (
                <div className="flex flex-col gap-2 justify-center items-center ">
                  <p className="text-lg font-semibold font-serif">
                    {employInfo?.name}
                  </p>
                  <p className="text-lg  font-mono ">{employInfo?.address}</p>
                  <p className="text-lg  font-mono ">
                    {employInfo?.mobileNumber}
                  </p>
                  <p className="text-lg  font-mono ">{employInfo?.email}</p>
                  <p className="text-lg  font-mono ">Dob:{employInfo?.dob}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          employeeList={employeeList}
          setEmployeeList={setEmployeeList}
        />
      )}
    </>
  );
};

export default Page;
