/**
 * ====================== popup error ==============================
 * ============ to show an error with msg ==============
 */
import { IoCloseCircleSharp } from "react-icons/io5";

export default function PopupError({ closePopupError, msg }) {
    return (
      // wrapper
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-p-color p-10 text-white text-center font-semibold rounded text-sm">
        {/* message */}
        <p>{msg} </p>
        {/* close icon */}
        <IoCloseCircleSharp
          size={35}
          className="absolute top-0 right-0 cursor-pointer hover:bg-red-500 transition-all duration-300 ease-in-out  rounded"
                    onClick={closePopupError}
        />
      </div>
    );
  }