import React from "react";
export default function ProfileCard({ student }) {
  return (
    <>
      <div className="h-auto text-sm tracking-wide ">
        <div className="flex">
          <div className="w-1/4 ">
            <img className="w-28" src="/default_male.png" />
          </div>
          <div className="flex w-3/4  justify-between mx-5 ">
            <div className="w-1/2 ml-12 font-sans">
              <ul className="">
                <li className="p-1 ">
                  <span className=" bg-gray-500 rounded-full text-white px-4">
                    Name
                  </span>
                </li>
                <li className="p-1">
                  <span className=" bg-gray-500 rounded-full text-white px-4">
                    Gender
                  </span>
                </li>
                <li className="p-1">
                  <span className=" bg-gray-500 rounded-full text-white px-4">
                    Father Name
                  </span>
                </li>
                <li className="p-1">
                  {" "}
                  <span className=" bg-gray-500 rounded-full text-white px-4">
                    Mother Name
                  </span>
                </li>
                <li className="p-1">
                  {" "}
                  <span className=" bg-gray-500 rounded-full text-white px-4">
                    Date of Birth
                  </span>
                </li>
              </ul>
            </div>
            <div className="w-1/2 capitalize font-sans font-semibold text-gray-700">
              <ul>
                <li className="p-1">{student?.student_name}</li>
                <li className="p-1">{student?.gender}</li>
                <li className="p-1">{student?.father_name}</li>
                <li className="p-1">{student?.mother_name}</li>
                <li className="p-1">
                  {new Date(student?.date_of_birth).toLocaleDateString()}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-10" />
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="flex w-1/3 justify-between mx-5 my-2 text-xs border-r-4 ">
            <ul className="font-semibold">
              <li className="p-1">Email : </li>
              <li className="p-1">Admission Date : </li>
              <li className="p-1">class : </li>
              <li className="p-1">Address : </li>
              <li className="p-1">Phone : </li>
              <li className="p-1">Religion : </li>
            </ul>
            <ul className="text-end px-3">
              <li className="p-1">{student?.email}</li>
              <li className="p-1">
                {new Date(student?.date_of_admission).toLocaleDateString()}
              </li>
              <li className="p-1">{student?.class_name}</li>
              <li className="p-1">{student?.address}</li>
              <li className="p-1">{student?.phone}</li>
              <li className="p-1">{student?.religion}</li>
            </ul>
          </div>
          <div className="flex w-1/3 justify-between capitalize mx-5 my-2 text-xs border-r-4">
            <ul className="font-semibold">
              <li className="p-1">Admission No : </li>
              <li className="p-1">Roll No : </li>
              <li className="p-1">Category : </li>
              <li className="p-1">Alternate phone : </li>
              <li className="p-1">Father Occupation : </li>
              <li className="p-1">Mother Occupation : </li>
            </ul>
            <ul className="text-end px-3">
              <li className="p-1">{student?.admission_no}</li>
              <li className="p-1">{student?.roll_no}</li>
              <li className="p-1">{student?.reserve_category}</li>
              <li className="p-1">{student?.alternative_phone_no}</li>
              <li className="p-1">{student?.father_occupation}</li>
              <li className="p-1">{student?.mother_occupation}</li>
            </ul>
          </div>
          <div className="flex w-1/3 justify-between capitalize mx-5 my-2 text-xs ">
            <ul className="font-semibold">
              <li className="p-1">Quota : </li>
              <li className="p-1">height : </li>
              <li className="p-1">weight : </li>
              <li className="p-1">blood group : </li>
            </ul>
            <ul className="text-end">
              <li className="p-1">{student?.admission_no}</li>
              <li className="p-1">{student?.roll_no}</li>
              <li className="p-1">{student?.religion}</li>
              <li className="p-1">{student?.blood_group}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
