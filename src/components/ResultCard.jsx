export default function ResultCard({ result, error, loading }) {
  return (
    <div className="bg-bg-color text-white flex flex-col  justify-center shadow-md p-4 rounded">
      {/* when there is no match .. notfiy that there is no match */}
      {error ? (
        <p className="text-red-500 text-center text-xl">{error}</p>
      ) : loading ? ( // and if it's loading show loading... and when loading done get the data
        <div className="flex items-center gap-3 mx-auto">
        <span className="block size-5 border-2 border-bg2-color border-b-transparent rounded-full animate-spin  "></span>
        <p className=" text-green-600 font-bold text-xl">جاري البحث...</p>
        </div>
      ) : (
        //  students Info
        <div className="std__info flex flex-col gap-4 mx-auto w-fit">
          {/* name */}
          <div className="std__name flex font-bold">
            <p className="pl-1"> الاسم :</p>
            <p>{result?.stdName}</p>
          </div>
          {/* his grade */}
          <div className="std__grade flex font-bold">
            <p className="pl-1">الدرجة :</p>
            <p>{result?.stdGrade}</p>
          </div>
        </div>
      )}
    </div>
    
  );
}

// if(error) return the <p> with red text
// else if (loading) return (loading...) else return the data