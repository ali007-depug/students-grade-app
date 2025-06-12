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
    <div className="w-[100%] sm:w-[90%] lg:w-3/4 bg-bg2-color rounded overflow-hidden">
      {/* main content */}
      <div className="grid grid-cols-5 gap-1 sm:gap-4 text-center font-bold py-2 [&_div]:p-2 bg-n3-color  ">
        <div className="bg--color">No</div>
        <div>Student Id</div>
        <div>Student Name</div>
        {/* <div>Course</div>  */}
        <div>Grade</div>
      </div>

      {students.map((student, index) => (
        <div
          key={student.id}
          className=" grid grid-cols-5 gap-1 sm:gap-4 text-center py-2 pr-5 border-b items-center"
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
