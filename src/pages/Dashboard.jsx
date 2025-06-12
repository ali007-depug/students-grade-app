// hooks
import { useEffect, useState } from "react";
// components
import SidePanel from "../components/SidePanel";
import DashboardData from "../components/DashboardData";
import NewStdFrom from "../components/ِNewStdForm";
import ConfirmPopup from "../components/ConfirmPopup";
import PendingUsers from "../components/PendingUsers";
import Toast from "../components/Toast";
// react icons
import { RxAvatar } from "react-icons/rx";
import { FiFile } from "react-icons/fi";
// firebase
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, signOut } from "firebase/auth";
// react router
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { BiLogOut } from "react-icons/bi";

export default function Dashboard() {
  const [showSidePanel, setShowSidePanel] = useState(false); // for side panel component
  const [students, setStudents] = useState([]); // store the data from fire store
  const [showNewStdForm, setShowNewStdForm] = useState(false); // show Form to add new student
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // show confirm popup
  const [pendingUsers, setPenidngUsers] = useState([]); // peding users
  const [showPendindUsersUI, setShowPendingUsersUI] = useState(false); // pending users UI
  const [showToast, setShowToast] = useState(false); // show toaste 
  const [toastMsg,setToastMsg] = useState("")
  const [selectedId, setSelectedId] = useState(null); // store the selected id when user want remove any studtent
  const [editedSelectedId, setEditedSelectedId] = useState(null); // store the selected id when user want to edit any studtent

  const [student, setStudent] = useState([]); // to store student info to show it in the form when user try to edit it
  const [allUsers,setAllUsers] = useState([])

  const [currentUser, setCurrentUser] = useState(""); // to show the user name in the dashboard
  const navigate = useNavigate();

  // if students change then fetch thier data to update the UI
  useEffect(() => {
    fetchStudents();
    fetchUsers();
    // if pending users change then reflect in the UI
    getPendingUsers();
  }, []);


  // ============================= Functions ========================================
  // function to fetch data from firebase & to update the UI
  const fetchStudents = useCallback( async () => {
    try {
      // students collection
      const stdsCollection = collection(db, "grades");
      const querySnapshot = await getDocs(stdsCollection);
      // map through stdData
      const stdData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // updata state
      setStudents(stdData);
    } catch (error) {
      console.log("the error is :" + " " + error);
    }
  },[]);

  // function to fetch users and show it in dashboard
  const fetchUsers = useCallback( async () => {

    const auth = getAuth();
    const currentUser = auth.currentUser;
    // get current user and relfect his name in UI
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      const docSanp = await getDoc(docRef);
      if (docSanp.exists()) {
        const userData = docSanp.data();
        setCurrentUser(userData.name);
      } else {
        console.log("no teacher");
      }
    }

    try{
    // get all users and reflect them in accounts popup
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);
    const usersInfo = querySnapshot.docs.map(doc=>({
      id:doc.id,
      ...doc.data()
    }))
    setAllUsers(usersInfo);
    }catch(error){
      console.log(`all users error is : ${error}`)
    }


  },[]);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // side panel arrow
  function handleSidePanelArrow() {
    setShowSidePanel(!showSidePanel);
  }
  // add new student to firestore
  const addNewStudent = () => {
    // show the form
    setShowNewStdForm(true);
    setStudent(null);
    setEditedSelectedId(null);
  };
  // close newStdForm component
  const closeNewStdForm = () => {
    setShowNewStdForm(false);
    setStudent(null);
    setEditedSelectedId(null);
  };

  const handelDelete = (id) => {
    setShowConfirmPopup(true);
    setSelectedId(id);
  };
  // remove student from firestore & UI
  const handelRemove = async (id) => {
    try {
      console.log("removing");
      await deleteDoc(doc(db, "grades", id)); // filters the data

      setStudents((prev) => prev.filter((student) => student.id !== id));
      setShowConfirmPopup(false);
    } catch (error) {
      console.log(`the Error while deleting is : ${error}`);
    } finally {
      setShowToast(true);
      setToastMsg("تم الحذف بنجاح")
      setTimeout(() => {
        setShowToast(false);
        setToastMsg("")
      }, 1500);
    }
  };
  // Edit students data
  const handelEdit = async (id) => {
    const foundStudent = students.find((std) => std.id == id);
    if (foundStudent) {
      setEditedSelectedId(id);
      setShowNewStdForm(true);
      setStudent(foundStudent);
    }
  };

  // get all users
  // const 
  // get pending users
  const getPendingUsers = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, "pending-users"));
      const pUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPenidngUsers(pUsers);
      console.log(`the pending users are ${pendingUsers}`)
    } catch (error) {
      console.log(`pending users error : ${error}`);
    }
  },[]);
  // show pending users & cotrol them
  const handelPendingUsers = () => {
    // show users UI
    setShowPendingUsersUI(!showPendindUsersUI);
  };

  // when user click on ✅
  const handelApproveUser = useCallback( async (user) => {
    try{
      await setDoc(doc(db,"users",user.id),{
        name:user.name,
        email:user.email,
        approveAt: new Date()
      });
      // remove from pending users
      await deleteDoc(doc(db,"pending-users",user.id))

      // update Pending users
      setPenidngUsers((prev)=> prev.filter((u)=> u.id !== user.id))
      setShowToast(true)
      setToastMsg("تم القبول بنجاح")
      setTimeout(()=>{
        setShowToast(false);
        setToastMsg("")
      },1500)

    } catch(error){
      console.log(`approve pending error is : ${error}`)
    }
  },[]);
  // when user click on ✖️
  const handelRejectUser = useCallback(async(id)=>{
    try{

      await deleteDoc(doc(db, "pending-users", id));
      
      setShowToast(true)
      setToastMsg("تم الرفض بنجاح")
      setTimeout(()=>{
        setShowToast(false);
        setToastMsg("")
      },1500)
      setPenidngUsers((prev)=> prev.filter((u)=> u.id !== id))
    }catch(error){
      console.log(`reject user Error is : ${error}`)
    }
  },[])

  const handleCloseConfirmPopup = () => {
    setShowConfirmPopup(false);
  };

  return (
    <div className="overflow-hidden bg-bg-color h-[100dvh]">
      <p className="sr-only">Dashboard</p>
      {/* header */}
      <header className="flex justify-between items-center mb-5 px-dyp bg-gray-500">

        {/* user Info */}
        <div className="flex flex-col items-center">
          <RxAvatar size={40} color="beige" className="hidden md:block" />
          <p className="text-white font-bold self-center flex-wrap">{currentUser}</p>
        </div>
        {/* ====== END user Info ======= */}

        {/* Dashboard name */}
        <h1 className="text-2xl lg:text-4xl max-sm:basis-[160px] text-white font-bold py-5">لوحة التحكم</h1>
        {/* ====== END Dashboard name  =======*/}

        {/* log out button */}
        <button
          className="flex items-center gap-2 bg-white text-gray-800 hover:text-white hover:bg-p-color transition-all duration-300 ease-out px-2 py-1 md:px-3 md:py-2 rounded cursor-pointer font-bold"
          onClick={handleLogout}
        >
         <BiLogOut size={30}/> <span className="hidden md:block">تسجيل خروج</span>
        </button>
        {/* ===== END log out button ===== */}
      </header>
      {/* ===== End header ===== */}
      {/* Content */}
      <main className="px-dyp py-10" role="main">
        <p className="flex gap-3 items-center text-xl md:text-2xl lg:text-4xl mb-5 font-extrabold justify-center px-3 py-2 text-white">
          <FiFile size={40} color="white"></FiFile> بيانات الطلاب
        </p>

        {/* Dashboard Data */}
        <DashboardData
          students={students}
          handelDelete={handelDelete}
          handelEdit={handelEdit}
        />
        {/* ========= End dashobard data ========== */}

        {/* Form to add or edit student */}
        {showNewStdForm && (
          <NewStdFrom
            oldStudent={student}
            closeNewStdForm={closeNewStdForm}
            editedId={editedSelectedId}
            fetchStudents={fetchStudents}
          />
        )}
        {/* ========= End Form to add or edit student ===========*/}

        {/* Confirm popup */}
        {showConfirmPopup && (
          <ConfirmPopup
            removeStd={() => handelRemove(selectedId)}
            closeConfirm={handleCloseConfirmPopup}
          />
        )}
        {/* ====== End confirm popup ======= */}

        {/* ====== Toast componet ====== */}
        {showToast && (
          <div className="fixed bottom-[100px] left-[50px] w-[200px]">
            <Toast msg={toastMsg} />
          </div>
        )}
        {/* ======== End Toast component ======== */}

        {/* ========== side panel component ======== */}
        {!showNewStdForm && (
          <SidePanel
            handleSidePanelArrow={handleSidePanelArrow}
            showSidePanel={showSidePanel}
            showAllStudentsData={fetchStudents}
            addNewStudent={addNewStudent}
            showPendingUsers={handelPendingUsers}
          />
        )}
        {/* ========= side panel component  ============ */}

        {/* ============= pending user UI ============== */}
        {showPendindUsersUI && (
          <>
          <PendingUsers
            pendingUsers={pendingUsers}
            allUsers={allUsers}
            handelApproveUser={handelApproveUser}
            handelRejectUser = {handelRejectUser}
            closePendingUsers={handelPendingUsers}
            />
            </>
        )}
        {/* ============= End pending user UI ============== */}
      </main>
      {/* ===== End content  ===== */}
    </div>
  );
}
