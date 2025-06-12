import React, { useEffect, useState } from "react";
// react icon
import { IoCloseCircleSharp } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { CgClose } from "react-icons/cg";

const PendingUsers = React.memo(function PendingUsers({
  allUsers,
  pendingUsers,
  handelApproveUser,
  handelRejectUser,
  closePendingUsers,
}) {
  console.log("pending users rendering");
  console.log(allUsers);
  return (
    <div className="absolute rounded  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-n2-color text-white font-semibold w-90 min-h-40 flex justify-center shadow-md shadow-black">
      {/* close icon */}
      <IoCloseCircleSharp
        size={50}
        color="black"lassName="mt-5"
        className="absolute top-0 right-0 cursor-pointer hover:bg-red-500 transition-all duration-300 ease-in-out p-2 rounded"
        onClick={closePendingUsers}
      />
      {/* users + pending users Wrapper */}
      <div className="flex flex-col w-full">
        {/* all users */}
        <div className="flex flex-col py-2 items-center w-full bg-n-color">
          <p className="mx-auto w-fit font-bold bg-p-color p-2 rounded">
            الأدمن
          </p>
          {allUsers.length > 0 ? (
            allUsers.map((user, index) => (
              <div key={index} className="flex items-center w-fit h-fit">
                <p className="font-semibold text-lg text-bg-color">
                  {++index}- {user?.name}
                </p>
              </div>
            ))
          ) : (
            <p className=" relative top-10 mx-auto">لا يوجد حسابات </p>
          )}
        </div>

        {/* pending users */}
        <div className="flex flex-col py-2 itmes-center bg-s-color">
          <p className="mx-auto w-fit font-bold bg-p-color p-2 rounded">
            حسابات تنتظر التأكيد
          </p>

          {pendingUsers.length > 0 ? (
            pendingUsers.map((user, index) => (
              <div
                key={index}
                className="flex gap-2 mt-10 items-center w-fit h-fit"
              >
                <p className="font-semibold text-lg text-p-color">{user?.name}</p>
                <p>
                  <MdDone
                    size={35}
                    color="green"
                    className="p-2 bg-white rounded hover:bg-green-200 cursor-pointer"
                    onClick={() => handelApproveUser(user)}
                  />
                </p>
                <p>
                  <CgClose
                    size={35}
                    color="red"
                    className="p-2 bg-white rounded hover:bg-red-200 cursor-pointer"
                    onClick={() => handelRejectUser(user.id)}
                  />
                </p>
              </div>
            ))
          ) : (
            <p className=" relative top-5 mb-10 mx-auto">
              لا يوجد حسابات تنتظر التأكيد
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export default PendingUsers;
