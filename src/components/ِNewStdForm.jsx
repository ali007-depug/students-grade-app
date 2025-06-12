// hooks
import { useReducer, useState } from "react";
// components
import Input from "./Input";
import Toast from "./Toast";
// react icons
import { IoCloseCircleSharp } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
// firebase
import { addDoc, doc, updateDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

// reducer function
const reducerFunc = (state, action) => {
  switch (action.type) {
    case "stdName": {
      return { ...state, stdName: action.newValue };
    }
    case "std_id": {
      return { ...state, std_id: action.newValue };
    }
    case "stdGrade": {
      return { ...state, stdGrade: action.newValue };
    }
    case "stdCourse": {
      return { ...state, stdCourse: action.newValue };
    }
    case "reset": {
      return { stdName: "", std_id: "", stdGrade: "", stdCourse: "" };
    }
  }
};
// ====== End reducer function =====
export default function NewStdFrom({
  closeNewStdForm,
  fetchStudents,
  oldStudent,
  editedId,
}) {
  // init student [the old student use to pre fill the form fields in Editing mode]
  const student = oldStudent || {
    stdName: "",
    std_id: "",
    stdGrade: "",
    // note : don't forget to add (stdCourse:"") if you will use it
  };
  // the form state
  const [formData, dispatch] = useReducer(reducerFunc, student);
  //   state to validate the form & show error msg
  const [error, setError] = useState({
    validateName: null,
    validateId: null,
    validateGrade: null,
    validateCourse: null,
  });
  // state for toast to show that it's done succefully
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  // =============================== functions =================================
  const handelStdName = (newValue) => {
    dispatch({ type: "stdName", newValue: newValue });
  };
  const handelStdId = (newValue) => {
    dispatch({ type: "std_id", newValue: newValue });
  };
  const handelStdGrade = (newValue) => {
    dispatch({ type: "stdGrade", newValue: newValue });
  };
  /* ======================== student course Input Function ======================= */

  // const handelStdCourse = (newValue) => {
  //   dispatch({ type: "stdCourse", newValue: newValue });
  // };
  /* ======================== student course Input Function ======================= */

  //   add new std to firesotre
  const handelAddNewStd = async (e) => {
    e.preventDefault();

    // validtae the form fields
    // const isValidName = /^[\p{Arabic}\s\p{N}]+$/.test(formData.stdName);
    const isValidId = /^\d+$/.test(formData.std_id);
    const isValidCourse = /^[A-Za-z\s]*\d*$/.test(formData.stdCourse);
    const isValidGrade = /^(?:\d{1,3}|[A-F][+-]?)$/.test(formData.stdGrade);

    setError({
      //   validateName: isValidName,
      validateId: isValidId,
      validateCourse: isValidCourse,
      validateGrade: isValidGrade,
    });

    // if the all field is valid then add this data to firesotre
    if (isValidId && isValidGrade) {
      // update exist data
      if (editedId) {
        setLoading(true);
        try {
          await updateDoc(doc(db, "grades", editedId), {
            stdName: formData.stdName,
            std_id: formData.std_id,
            // stdCourse: formData.stdCourse,
            stdGrade: formData.stdGrade,
          });
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 1000);
        }
      }
      // add new student
      else {
        try {
          setLoading(true);
          
          await addDoc(collection(db, "grades"), {
            stdName: formData.stdName,
            std_id: formData.std_id,
            // stdCourse: formData.stdCourse,
            stdGrade: formData.stdGrade,
          });
        } catch (error) {
          console.log(`the error is ${error}`);
        } finally {
          setLoading(false);
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 1000);
        }

        dispatch({ type: "reset" });
      }

      if (typeof fetchStudents == "function") {
        fetchStudents();
      }
    }
  };
  // =============================== End functions ===================================
  return (
    // form
    <form
      onSubmit={handelAddNewStd}
      className="fixed w-[min(80%,550px)] [direction:rtl] flex flex-col gap-3 px-5 py-15 bg-n2-color border-2 border-white rounded top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      {/* close icon */}
      <IoCloseCircleSharp
        size={50}
        color="white"
        className="absolute top-0 right-0 cursor-pointer hover:bg-red-500 transition-all duration-300 ease-in-out p-2 rounded"
        onClick={closeNewStdForm}
      />
      {/* end close icon */}
      {/* student name input */}
      <Input
        type={"text"}
        label={"اسم الطالب"}
        value={formData.stdName}
        onChange={handelStdName}
        customStyle={"text-center"}
      />
      {/* End student name */}
      {/* student id */}
      <Input
        type={"text"}
        label={"رقم التسجيل"}
        value={formData.std_id}
        onChange={handelStdId}
        customStyle={"text-center"}
      />
      {/* End student id */}
      {/* student grade */}
      <Input
        type={"text"}
        label={"درجة الطالب"}
        value={formData.stdGrade}
        onChange={handelStdGrade}
        customStyle={"text-center ![direction:ltr]"}
      />
      {/* End student Grade */}
      {/* ======================== student course Input ======================= */}
      {/* <Input
        type={"text"}
        label={"مقرر الطالب"}
        value={formData.stdCourse}
        onChange={handelStdCourse}
        customStyle={"text-center"}
      /> */}
      {/* ========================== end student course Input ======================= */}
      {/* Add and Edit button */}
      <button
        type="submit"
        disabled={loading}
        className={`flex justify-center items-center font-bold  px-3 py-2 w-full rounded bg-green-400  cursor-pointer hover:bg-green-600 hover:text-white transition duration-300 ease-in-out ${
          loading && "opacity-50"
        }`}
      >
        {editedId ? (
          <>
            <BiEdit size={25} />
            تعديل{" "}
          </>
        ) : (
          <>
            <BiPlus size={25} />
            إضافة
          </>
        )}
      </button>
      {/* toast componet */}
      {showToast && <Toast msg={" تم الإضافة بنجاح"} />}
    </form>
    // end form
  );
}
