"use client";
import { FormEvent, useState } from "react";

interface FormData {
  id: string;
  label: string;
  inputType: string;
  buttonName: string;
  placeHolder: string;
}

interface InitialStateType {
  name: string;
  email: string;
  dob: string;
  password: string;
}

const MultiFormPage = () => {
  const data: FormData[] = [
    {
      id: "name",
      label: "Name",
      inputType: "text",
      buttonName: "Next",
      placeHolder: "Your name",
    },
    {
      id: "email",
      label: "Email",
      inputType: "email",
      buttonName: "Next",
      placeHolder: "Your email",
    },
    {
      id: "dob",
      label: "Date",
      inputType: "date",
      buttonName: "Next",
      placeHolder: "",
    },
    {
      id: "password",
      label: "Password",
      inputType: "password",
      buttonName: "Submit",
      placeHolder: "Your password",
    },
  ];

  const initialState: InitialStateType = {
    name: "",
    email: "",
    dob: "",
    password: "",
  };

  const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (index === data.length - 1) {
      console.log("Form submitted", formData);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const handleBack = (e: FormEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const currentField = data[index];
  return (
    <form
      className="border-[1px] border-gray-400 w-[30%] flex flex-col gap-2 justify-start items-start p-2"
      onSubmit={handleSubmit}
    >
      {index > 0 && (
        <a href="/" onClick={handleBack}>
          Back
        </a>
      )}
      <label className="font-semibold">{currentField.label}</label>
      <input
        type={currentField.inputType}
        placeholder={currentField.placeHolder}
        id={currentField.id}
        className="py-2 px-4 border-[1px] border-gray-400 outline-none w-[100%]"
        value={formData[currentField.id as keyof InitialStateType]}
        onChange={handleChange}
        required
      />
      <button className="bg-purple-600 px-6 py-2 text-white rounded-md">
        {currentField.buttonName}
      </button>
    </form>
  );
};

export default MultiFormPage;
