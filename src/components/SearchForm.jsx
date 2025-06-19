// hooks
import { useState } from "react";
// const Input = () => import("./Input");
import Input from "./Input"
export default function SearchForm({ onSearch }) {
  const [stdIdVal, setStdIdVal] = useState(""); // store Students input
  const [validateInput,setValidateInput] = useState(null)
  



  // func for handel input
  const handelStdInputVal = (inputVal) => {
    setStdIdVal(inputVal);
  };

  //  form submission function
  const handelFromSubmission = (e) => {
    e.preventDefault();
    // check the input if it's valid or not
    // const isInputValid = /^\d+$/.test(stdIdVal);
    // setValidateInput(isInputValid);
    setValidateInput(true);
      // this comes from it's parent 
      onSearch(stdIdVal.trim());
  };

  return (
    <>
    <form
      className="flex gap-1 flex-col"
      onSubmit={(e) => handelFromSubmission(e)}
    >
      {/* input for search */}
      <input type="text" value={stdIdVal} onChange={(e)=>handelStdInputVal(e.target.value)} placeholder="EX: 018/M/40XX" required className="h-10 bg-white text-title-color font-bold w-full rounded px-2  placeholder-semibold outline-2 outline-gray-600 user-invalid:outline-red-600 user-valid:outline-green-400 text-center [direction:ltr]"/>

      {/* <Input type={"text"} value={stdIdVal} label={"رقم التسجيل - student ID"} onChange={handelStdInputVal} error={validateInput} errorMsg={"الرجاء كتابة رقم تسجيل صالح"} customStyle={"![direction:ltr] text-center self-center"}/> */}
      {/* get result button */}
      <button
        type="submit"
        className="cursor-pointer rounded bg-p-color font-bold text-white w-fit self-center px-5 py-3 my-4 hover:text-bg2-color-color hover:bg-s-color transition-all duration-300 ease-linear"
      >
        إستعلام
      </button>
    </form>
    </>
  );
}
