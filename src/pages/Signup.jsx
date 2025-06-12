// hooks
import { useState } from "react";
// components
import Input from "../components/Input";
import PopupError from "../components/PoupError";
// react router
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// react icons
import { FaEye, FaEyeSlash } from "react-icons/fa";

// firebase
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../firebase";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false); 

  const [adminInfo, setAdminInfo] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const [validateForm, setValidateForm] = useState({
    emailValid: null,
    passwordValid: null,
  });

  const [loading, setLoading] = useState(false);

  const [showPopupError, setShowPopupError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fullName = adminInfo.fName + " " + adminInfo.lName;

  const navigate = useNavigate();
  const auth = getAuth(app);
  const db = getFirestore(app);

  //   func to toggel showing password
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const closePopupError = () => {
    setShowPopupError(false);
  };

  const handelFName = (fName) => {
    setAdminInfo({ ...adminInfo, fName: fName });
  };

  const handelLName = (lName) => {
    setAdminInfo({ ...adminInfo, lName: lName });
  };

  const handelEmailChange = (email) => {
    setAdminInfo({ ...adminInfo, email: email });
  };
  const handelPasswordChange = (passowrd) => {
    setAdminInfo({ ...adminInfo, password: passowrd });
  };


  // func for handle singup
  const handelSignup = async (e) => {
    e.preventDefault();
    // check if email + password are valid
    const isEmailVailditon = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminInfo.email);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(adminInfo.password);
    // update validation state to show the error msg
    setValidateForm({
      emailValid: isEmailVailditon,
      passwordValid: hasSpecialChar,
    });
    
    // if there is internet
    if (navigator.onLine) {
      // & if they both valid
      if (isEmailVailditon && hasSpecialChar) {
        setLoading(true);
        try {
          // 1 Create user in Firebase Auth
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            adminInfo.email,
            adminInfo.password
          );
          const user = userCredential.user;
          // Store extra data in Firestore
          await setDoc(doc(db, "pending-users", user.uid), {
            name: fullName,
            email: adminInfo.email,
            createdAt: new Date(),
          }); 
          // //  Redirect to dashboard
          await auth.signOut();
          console.log("why the popup not working")
          setShowPopupError(true);
          setErrorMsg("تم استلام البيانات، سيتم تنشيط الحساب لاحقاً");

          setTimeout(()=>{
            navigate("/login");
          },3000)

        } catch (error) {
          console.log(`signup error : ${error.message}`);
          if (error.code === "auth/email-already-in-use") {
            setShowPopupError(true);
            setErrorMsg("هذا البريد تم التسجيل به من قبل");
          } else if (error.code === "auth/invalid-email") {
            setShowPopupError(true);
            setErrorMsg("هذا البريد غير صالح");
          } else if (error.code === "auth/network-request-failed") {
            setShowPopupError(true);
            setErrorMsg("فشل الإتصال بالشبكة");
          }
        } finally {
          setLoading(false);
        }
      }
    } 
    // if there is no internet
    else {
      setShowPopupError(true);
      setErrorMsg("عذراً لا يوجد اتصال بالانترنت");
    }
  };
  return (
    <div className="signup px-5 pt-10 pb-5 rounded flex flex-col gap-5 items-center bg-bg2-color w-[min(98%,550px)]">
      <h1 className="text-center font-extrabold text-3xl mb-5 text-title-color">
         أدمن جديد
      </h1>
      <form onSubmit={handelSignup} className="flex flex-col gap-5">
        {/* wrppaer for full name */}
        <div className="flex gap-5">
          {/* input for first name */}
          <Input
            type={"text"}
            value={adminInfo.fName}
            onChange={handelFName}
            label={"الاسم الأول"}
          ></Input>
          {/* input for last name */}
          <Input
            type={"text"}
            value={adminInfo.lName}
            onChange={handelLName}
            label={"الاسم الثاني"}
          ></Input>
        </div>
        {/* ===== End wrapper for full name */}
        {/* Eamil */}
        <Input
          id={"email"}
          label={"البريد الإكتروني"}
          type={"email"}
          value={adminInfo.email}
          onChange={handelEmailChange}
          error={validateForm.emailValid}
          errorMsg={"الرجاء كتابة بريد الكتروني صالح"}
        />
        {/* ===== End Email ==== */}
        {/* input for passworkd */}
        <Input
          id={"passowrd"}
          type={showPassword ? "text" : "password"}
          value={adminInfo.password}
          label={"كلمة المرور"}
          onChange={handelPasswordChange}
          error={validateForm.passwordValid}
          errorMsg={" كلمة المرور التي أدخلتها غير صالحة"}
        >
          <div
            className="absolute left-2 top-3 cursor-pointer"
            onClick={toggleShowPassword}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </div>

          <div className="text-sm text-gray-900 self-start">
            <p>*يجب أن تكون  كلمة السر أكثر من 12 حرف</p>
            <p>*يجب أن تحتوي كلمة السر على :</p>
            <ul>
              <li>رموز خاصة مثل @-#-!-?</li>
            </ul>
          </div>
        </Input>
        {/* ===== End for password input */}

        {/* signup button */}
        <button
          type="submit"
          disabled={loading}
          className={`bg-bg-color text-white hover:text-bg2-color hover:bg-p-color/80 transition-all duration-300 ease-out px-5 py-2 rounded cursor-pointer font-semibold ${
            loading && "opacity-50"
          }`}
        >
          تسجيل
        </button>
      </form>
      {/* if the admin have already account */}
      <div className="flex flex-col gap-3 items-center">
        <p>هل لديك حساب مسبقاً ؟</p>
        <Link to="/login">
          <button className="bg-gray-400 text-black hover:text-white hover:bg-gray-950 transition-all duration-300 ease-out px-5 py-2 rounded cursor-pointer">
            تسجيل دخول
          </button>
        </Link>
      </div>
      {showPopupError && (
        <PopupError closePopupError={closePopupError} msg={errorMsg} />
      )}
    </div>
  );
}
