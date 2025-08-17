import { useState } from "react";
import { BiEdit, BiDownArrowAlt } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function StudentRow({
  student,
  index,
  handelDelete,
  handelEdit,
}) {
  const [expanded, setExpanded] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [saving, setSaving] = useState(false);

  const fields = ["sectionA", "sectionB", "spotter", "oral", "contAsset"];

  const mergedFields = {
    ...student.fields,
    ...editedData,
  };

  const liveTotal = Object.entries(mergedFields)
    .filter(([key]) => key !== "total")
    .reduce((acc, [_, val]) => acc + (Number(val) || 0), 0);

  const toggleExpand = () => setExpanded(!expanded);

  const handleChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: Number(value),
    }));
  };

  const handleSave = async () => {
    if (Object.keys(editedData).length === 0) return;
    try {
      setSaving(true);
      const studentRef = doc(db, "grades", student.id);
      await updateDoc(studentRef, {
        fields: {
          ...mergedFields,
          total: liveTotal,
        },
      });
      console.log("✅ Data updated for student:", student.id);
    } catch (error) {
      console.error("❌ Error updating student:", error);
    } finally {
      setSaving(false);
      setExpanded(false);
    }
  };

  return (
    <>
      {/* student row */}
      <div
        className={`grid grid-cols-[30px_70px_1fr_70px_70px_70px_70px] sm:grid-cols-[repeat(2,100px)_3fr_1fr_1fr_1fr_1fr] gap-1 sm:gap-4 text-center py-2 pr-5 border-b items-center max-sm:text-sm text-gray-950`}
      >
        <div>{index + 1}</div>
        <div>{student.std_id}</div>
        <div>{student.stdName}</div>
        <div>{student.stdGrade}</div>
        <StdGrade liveTotal={liveTotal} />

        {/* expand toggle */}
        <div className="flex justify-center">
          <button onClick={toggleExpand} className="flex">
            <BiDownArrowAlt
              className={`size-7 text-violet-500 bg-white rounded hover:bg-gray-200 transition duration-300 cursor-pointer  ${
                expanded && "rotate-[-180deg]"
              }`}
            />
          </button>
        </div>

        {/* actions */}
        <div className="flex justify-end">
          <div
            className="cursor-pointer hover:bg-red-200 w-fit p-3 rounded transition-all duration-300 ease-out"
            onClick={() => handelDelete(student.id)}
          >
            <TbTrash size={20} color="red" />
          </div>
          <div
            className="cursor-pointer hover:bg-blue-200 w-fit p-3 rounded transition-all duration-300 ease-out"
            onClick={() => handelEdit(student.id)}
          >
            <BiEdit size={20} color="blue" />
          </div>
        </div>
      </div>

      {/* expanded row */}
      {expanded && (
        <div className="col-span-7 bg-blue-200 p-3 flex flex-col items-center gap-2">
          {fields.map((field) => (
            <div key={field} className="flex items-center gap-4">
              <div className="w-28 font-medium">{field}</div>
              <input
                type="number"
                className="border rounded px-2 py-1 w-20 text-right"
                value={editedData[field] ?? student.fields?.[field] ?? ""}
                onChange={(e) => handleChange(field, e.target.value)}
                id={field}
                name={field}
              />
            </div>
          ))}

          {/* total & grade */}
          <div className="flex gap-2 flex-col">
            <p>
              Student Total Is :{" "}
              <span
                className={`${
                  liveTotal >= 80
                    ? "text-green-800"
                    : liveTotal >= 60
                    ? "text-yellow-800"
                    : "text-red-800"
                }`}
              >
                {liveTotal}
              </span>
            </p>
          </div>
              
              <StdGrade liveTotal={liveTotal} />
          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-3 bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 transition"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      )}
    </>
  );
}

function StdGrade({ liveTotal }) {
  return (
    <div className="[&_p]:text-lg [&_p]:font-bold [&_p]:text-center">
      {liveTotal >= 80 ? (
        <p className="text-green-800">ممتاز</p>
      ) : liveTotal >= 70 ? (
        <p className="text-orange-500">جيد جداً</p>
      ) : liveTotal >= 60 ? (
        <p className="text-yellow-800">جيد</p>
      ) : liveTotal >= 50 ? (
        <p className="text-red-500">مقبول</p>
      ) : (
        <p className="text-red-800">راسب</p>
      )}
    </div>
  );
}
