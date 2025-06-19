/**
 * ====================== Dashboard Data ========================
 * ========= show the data in the UI ===================
 * 
 * Note : if will use users then set grid-cols-6 not 5
 */
import { BiEdit } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";

export default function DashboardData({ students =[],handelDelete,handelEdit }) {
  return (
    // data wrapper
    <div className=" relative w-[100%] sm:w-[90%] lg:w-3/4 bg-bg2-color rounded overflow-scroll scroll-smooth h-[100dvh]">
      {/* main content */}
      <div className="grid grid-cols-[30px_70px_1fr_70px_70px] sm:grid-cols-[repeat(2,110px)_3fr_1fr_1fr] gap-1 sm:gap-4 text-center items-center pr-5 font-bold py-2 [&_div]:p-2 bg-n3-color sticky top-0 ">
        <div>No</div>
        <div>Student Id</div>
        <div>Student Name</div>
        {/* <div>Course</div>  */}
        <div>Grade</div>
      </div>

      {students.map((student, index) => (
        <div
          key={student.id}
          className=" grid grid-cols-[30px_70px_1fr_70px_70px] sm:grid-cols-[repeat(2,100px)_3fr_1fr_1fr] gap-1 sm:gap-4 text-center py-2 pr-5 border-b items-center  overflow-scroll max-sm:text-sm"
        >
          <div>{++index}</div>
          <div>{student.std_id}</div>
          <div>{student.stdName}</div>
          {/* <div>{student.stdCourse}</div> */}
          <div>{student.stdGrade}</div>
          <div className="flex ">
            {/* delete */}
          <div className="cursor-pointer hover:bg-red-200 w-fit p-3 rounded transition-all duration-300 ease-out" onClick={()=>handelDelete(student.id)}><TbTrash size={20} color="red"/></div>
          {/* Edit */}
          <div className="cursor-pointer hover:bg-blue-200 w-fit p-3 rounded transition-all duration-300 ease-out" onClick={()=>handelEdit(student.id)}><BiEdit size={20} color="blue"/></div>
          </div>
        </div>
      ))}
    </div>
  );
}
