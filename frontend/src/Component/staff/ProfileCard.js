import React from "react";
export default function ProfileCard({ user }) {
  const studentdata = {
    Name: "parth",
    Gender: "Male",
    Father_Name: "Sahib singh",
    Mother_Name: "Kaushlya devi",
    Date_Of_Birth: "15-Dec-1995",
    Email: "Parth@gmail.com",
    Admission_Date: "4-4-2011",
    class: "fifth",
    Address: "kkr",
    Phone: "+919729150403",
  };
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
                <li className="p-1">Name</li>
                <li className="p-1">Gender</li>
                <li className="p-1">Father Name</li>
                <li className="p-1">Mother Name</li>
                <li className="p-1">Date Of Birth</li>
              </ul>
            </div>
            <div className="w-1/2 capitalize font-sans font-semibold text-gray-700">
              <ul>
                {/* <li className="p-1">{user.Name}</li>
                <li className="p-1">{user.Gender}</li>
                <li className="p-1">{user.Father_Name}</li>
                <li className="p-1">{user.Mother_Name}</li>
                <li className="p-1">{user.Date_Of_Birth}</li> */}
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-3" />
        <div className="flex">
          <div className="flex w-1/2 justify-between mx-5 my-2 ">
            <ul className="font-semibold">
              <li className="p-1">Email : </li>
              <li className="p-1">Admission Date : </li>
              <li className="p-1">class : </li>
              <li className="p-1">Address : </li>
              <li className="p-1">Phone : </li>
            </ul>
            <ul>
              <li className="p-1">{studentdata.Email}</li>
              <li className="p-1">{studentdata.Admission_Date}</li>
              <li className="p-1">{studentdata.class}</li>
              <li className="p-1">{studentdata.Address}</li>
              <li className="p-1">{studentdata.Phone}</li>
            </ul>
          </div>
          <div className="flex w-1/2 justify-space-between mx-5 my-2 ">
            <ul className="font-semibold">
              <li className="p-1">Admission Date : </li>
              <li className="p-1">class : </li>
              <li className="p-1">Address : </li>
              <li className="p-1">Phone : </li>
            </ul>
            <ul>
              <li className="p-1">{studentdata.Admission_Date}</li>
              <li className="p-1">{studentdata.class}</li>
              <li className="p-1">{studentdata.Address}</li>
              <li className="p-1">{studentdata.Phone}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
