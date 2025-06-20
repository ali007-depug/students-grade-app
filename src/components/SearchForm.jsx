// hooks
import { useState } from "react";
export default function SearchForm({ onSearch }) {
  const [stdIdVal, setStdIdVal] = useState(""); // store Students input
  
  // func for handel input
  const handelStdInputVal = (inputVal) => {
    setStdIdVal(inputVal);
  };

  //  form submission function
  const handelFromSubmission = (e) => {
    e.preventDefault();
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
      <input type="text" value={stdIdVal} onChange={(e)=>handelStdInputVal(e.target.value)} placeholder="EX: 018/M/40XX" required className="h-10 bg-white text-title-color font-bold w-full rounded px-2  placeholder-semibold outline-2 outline-gray-600 user-invalid:outline-red-600 user-valid:outline-green-400 text-center [direction:ltr] focus:outline-bg-color focus:outline-3"/>

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
