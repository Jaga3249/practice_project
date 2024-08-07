"use client";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
interface InputField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  isError: boolean;
  errorMsg: string;
}
interface DefaultValues {
  firstName: InputField;
  lastName: InputField;
  email: InputField;
  password: InputField;
  confirmPassword: InputField;
}
const Page = () => {
  const defaultVal: DefaultValues = {
    firstName: {
      id: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "First Name",
      value: "",
      isError: false,
      errorMsg: "First Name can't be empty",
    },
    lastName: {
      id: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Last Name",
      value: "",
      isError: false,
      errorMsg: "Last Name can't be empty",
    },
    email: {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Email",
      value: "",
      isError: false,
      errorMsg: "Email can't be empty",
    },
    password: {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
      value: "",
      isError: false,
      errorMsg: "Password can't be empty",
    },
    confirmPassword: {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password",
      value: "",
      isError: false,
      errorMsg: "Confirm Password can't be empty",
    },
  };
  const [formData, setFormData] = useState<DefaultValues>(defaultVal);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const copyFormData = { ...formData };
    copyFormData[id as keyof DefaultValues].value = value;
    setFormData(copyFormData);
    isValidForm();
  };
  const isValidForm = () => {
    const copyFormData = { ...formData };
    Object.keys(copyFormData).forEach((key) => {
      const obj = copyFormData[key as keyof DefaultValues];
      obj.isError = !obj.value ? true : false;
      checkPasswordMatch();
    });
    setFormData(copyFormData);
  };

  const checkPasswordMatch = () => {
    const copyFormData = { ...formData };
    const password = copyFormData.password.value;
    const confirmPassword = copyFormData.confirmPassword.value;
    if (password != confirmPassword) {
      copyFormData.confirmPassword.isError = false;
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isValidForm();
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        className="w-1/3 py-3 px-2 flex flex-col  ga-2  border-[1px] border-gray-500 rounded-md"
        onSubmit={handleSubmit}
      >
        {Object.keys(formData).map((key, i) => {
          const { id, label, type, placeholder, value, isError, errorMsg } =
            formData[key as keyof DefaultValues];
          return (
            <div key={i}>
              <label className="font-serif text-lg">{label}</label>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                className={`input  w-full  ${
                  isError ? "input-error" : "input-bordered"
                }`}
                value={value}
                onChange={handleChange}
              />
              {isError && (
                <span className="text-base text-red-500 font-mono mt-1">
                  {errorMsg}
                </span>
              )}
              {key === "confirmPassword" && !isPasswordMatch && (
                <span className="text-base text-red-500 font-mono">
                  {`password doesn't match`}
                </span>
              )}
            </div>
          );
        })}
        <button className="btn btn-primary mt-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Page;
