import StudentRow from "./StudentRow";

export default function DashboardData({
  students = [],
  handelDelete,
  handelEdit,
}) {

  return (
    <div className="relative w-[100%] sm:w-[90%] lg:w-3/4 bg-bg2-color rounded overflow-scroll scroll-smooth h-[100dvh]">
      {/* table header */}
      <div className="grid grid-cols-[30px_70px_1fr_70px_70px_70px_1fr] sm:grid-cols-[repeat(2,110px)_3fr_1fr_1fr_1fr_1fr] gap-1 sm text-center items-center pr-5 font-bold py-2 [&_div]:p-2 [&_div]:text-center bg-n-color text-gray-950 sticky top-0 overflow-hidden z-10">
        <div>No</div>
        <div>Student Id</div>
        <div>Student Name</div>
        <div>Old Test Grade</div>
        <div>Final Grade</div>
        <div>Final Exam Degree</div>
        <div>Actions</div>
      </div>

      {students.map((student, index) => (
        <StudentRow
          key={student.id}
          student={student}
          index={index}
          handelDelete={handelDelete}
          handelEdit={handelEdit}
        />
      ))}
    </div>
  );
}
