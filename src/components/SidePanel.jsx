import { MdAccountBox } from "react-icons/md";
import { PiPlus } from "react-icons/pi";
import { PiStudentThin } from "react-icons/pi";
// react router
import {useNavigate } from "react-router-dom";

export default function SidePanel({
  handleSidePanelArrow,
  showSidePanel,
  addNewStudent,
  showPendingUsers
}){

  const navigate = useNavigate()

  // open student UI
  const openStudentUI = ()=>{
    navigate("/")
  }

  return (
    <>
      {/* fixed side panel */}
      <div
        className={` [direction:rtl] flex flex-col items-center fixed lg:right-0 top-30 rounded px-10 py-5 bg-n-color sm:w-[40%] md:w-[32%] lg:w-[25%] transition-all duration-500 ease-in-out ${
          showSidePanel ? "right-0 sm:right-0" : "right-[-238px]"
        }`}
      >
        <div className="flex flex-col gap-3 text-white font-bold">
          {/* student UI  */}
          <button className="flex gap-3 cursor-pointer px-3 py-2 bg-bg-color hover:text-bg-color hover:bg-white rounded transition-all duration-300 ease-out" onClick={openStudentUI}>
            <PiStudentThin size={20} color="black" style={{"background":"white" , "borderRadius":"100%"}} ></PiStudentThin>نافذة النتيجة
          </button>
          {/* add new student  */}
          <button className="flex gap-3 cursor-pointer px-3 py-2 bg-bg-color hover:text-bg-color hover:bg-white rounded transition-all duration-300 ease-out" onClick={addNewStudent}>
            <PiPlus size={20} color="black" style={{"background":"white" , "borderRadius":"100%"}}></PiPlus>إضافة طالب جديد
          </button>
          {/* show pending users */}
          <button className="flex gap-3 cursor-pointer px-3 py-2 bg-bg-color hover:text-bg-color hover:bg-white rounded transition-all duration-300 ease-out" onClick={showPendingUsers}>
            <MdAccountBox size={20} color="black" style={{"background":"white" , "borderRadius":"100%"}}></MdAccountBox>عرض الحسابات
          </button>
        </div>
        {/*===== arrow wapper ==== */}
        <div
          className={`bg-white shadow-md rounded-full md: absolute left-[-42px] top-[40px] w-[29px] h-[30px] p-5 cursor-pointer lg:hidden`}
          onClick={handleSidePanelArrow}
        >
          {/* arrow it self */}
          <div
            className={`size-5 relative top-[-10px]
        border-[3px] border-t-0 border-r-0 border-l-p-color border-b-p-color 
        rounded-tr-none transition-all duration-300 ease-in-out ${
          !showSidePanel
            ? "rotate-[40deg] left-[15px]"
            : "rotate-[220deg] left-[7px]"
        }`}
          ></div>
        </div>
      </div>
      {/* ===== END fixed side panel */}
    </>
  );
}
