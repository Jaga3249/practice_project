import React, {
  ChangeEvent,
  FC,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import { RiImageLine } from "@remixicon/react";
import toast from "react-hot-toast";

interface ModalPropsType {
  isOpen: boolean;
  closeModal: () => void;
  setEmployeeList: (list: AddEmployType[]) => void;
  employeeList: AddEmployType[];
}
interface AddEmployType {
  imageUrl?: string;
  name: string;
  email: string;
  mobileNumber: string;
  address: string;
  dob: string;
  id: number;
}

const Modal: FC<ModalPropsType> = ({
  isOpen,
  closeModal,
  employeeList,
  setEmployeeList,
}) => {
  const initialState: AddEmployType = {
    imageUrl: "",
    name: "",
    email: "",
    mobileNumber: "",
    address: "",
    dob: "",
    id: Date.now(),
  };
  const [addEmployee, setAddEmployee] = useState<AddEmployType>(initialState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const copylist = [...employeeList];
    const isExist = copylist.some(
      (employee) => employee.email === addEmployee.email
    );
    if (isExist) {
      toast.error("An employee with this email address already exists.");
      return;
    } else {
      copylist.push(addEmployee);
      setEmployeeList(copylist);
      closeModal();
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddEmployee((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {isOpen && (
        <dialog id="my_modal_3" className="modal" open>
          <div className="modal-box">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <form
              method="dialog"
              className="flex flex-col gap-3"
              onSubmit={handleSubmit}
            >
              {/* if there is a button in form, it will close the modal */}
              <h1 className="text-center font-serif font-semibold text-xl">
                Add a new Employee
              </h1>

              <input
                type="text"
                placeholder="Image Url(optional)"
                className="input input-bordered w-full "
                name="imageUrl"
                value={addEmployee.imageUrl}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full "
                name="name"
                value={addEmployee.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full "
                name="email"
                value={addEmployee.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Mobile No"
                className="input input-bordered w-full "
                name="mobileNumber"
                value={addEmployee.mobileNumber}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Address"
                className="input input-bordered w-full "
                name="address"
                value={addEmployee.address}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                placeholder="Dob"
                className="input input-bordered w-full "
                name="dob"
                value={addEmployee.dob}
                onChange={handleChange}
                required
              />
              <button className="btn btn-neutral mt-2" type="submit">
                Submit
              </button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Modal;
