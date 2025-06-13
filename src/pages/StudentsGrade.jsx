// hooks
import { useCallback, useState } from "react";
// components
import SearchForm from "../components/SearchForm";
import ResultCard from "../components/ResultCard";

// firebase
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function StudentsGrade() {
  const [result, setResult] = useState(null); // student grades
  const [loading, setloading] = useState(false); // loading
  const [errorMSg, setErrorMsg] = useState(""); // error state
  const [showResult, setShowResult] = useState(false); // student result

  //   func for searcing in Fire Store Database
  const searchInFireStore = useCallback( async (stdId) => {
    // init state
    setloading(true);
    setErrorMsg("");
    setResult(null);
    setShowResult(true);

    // try catch block
    try {
      // search in the firestore (grades) if it's exist get the stdGrade value
      const searchQuery = query(
        collection(db, "grades"),
        where("std_id", "==", stdId.trim())
      );
      // store the result of search
      const querySnapshot = await getDocs(searchQuery);

      // if there is no match
      if (querySnapshot.empty) {
        setErrorMsg("لم يتم العثور على الطالب");
      } else {
        // return the first match
        setResult(querySnapshot.docs[0].data());
      }
    } catch {
      setErrorMsg("حدث خطأ أثناء البحث");
    } finally {
      setloading(false);
    }
    // ==== End try catch block ===
  },[])

  return (
    <div className="bg-bg2-color shadow-2xl p-5 rounded w-[min(95%,550px)]">
      {/* title */}
      <h1 className="text-center font-extrabold text-3xl mt-3 mb-10 text-title-color">
        نتائج الطلاب
      </h1>

      <SearchForm onSearch={searchInFireStore} />
      {/* if it's not loading ====> show the result ---- if it's loading show (Loading...) */}
      {showResult && (
        <ResultCard result={result} error={errorMSg} loading={loading} />
      )}
    </div>
  );
}
