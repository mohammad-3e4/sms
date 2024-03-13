import React from "react";
import Loader from "../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark, FaEye } from "react-icons/fa6";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import { useEffect, useState } from "react";

import {
  clearErrors,
  clearMessage,
  deleteStudent,
  getStudents,
  updateStudent,
} from "../../redux/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegTrashAlt, FaCheck } from "react-icons/fa";

const AllStudents = () => {
  const currentUrl = window.location.href;
  const [editMode, setEditMode] = useState(false);
  const { loading, error, message, students } = useSelector(
    (state) => state.student
  );
  const dispatch = useDispatch();
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    dispatch(getStudents());
    if (error) {
      const errorInterval = setInterval(() => {
        dispatch(clearErrors());
      }, 3000);
      return () => clearInterval(errorInterval);
    }
    if (message) {
      const messageInterval = setInterval(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearInterval(messageInterval);
    }
  }, [dispatch, error, message]);

  const thds = [
    "Roll No",
    "Photo",
    "Name",
    "Gender",
    "Parents Name",
    "Class",
    "Section",
    "Address",
    "Date of Birth",
    "Mobile",
    "E-mail",
  ];
  return (
    <section className="py-1  w-full m-auto">
      <div className="flex flex-wrap justify-between shadow bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl capitalize font-semibold font-sans px-4 tracking-wider w-1/2">
          {`${currentUrl.split("/")[3]}  ${currentUrl.split("/")[4]}`}
        </h6>
        <div className="w-1/2 flex gap-5 justify-end px-4 items-center">
          <FaAngleDown className="text-yellow-700 cursor-pointer" />
          <FaArrowsRotate
            className={`text-green-700 cursor-pointer ${
              rotate
                ? "rotate-180 transition-transform duration-1000"
                : "transition-transform"
            }`}
            // onClick={handleRefresh}
          />
          <FaXmark className="text-red-700 cursor-pointer" />
        </div>
      </div>
      {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}
      <div
        className={`flex bg-white justify-center ${
          loading ? "h-[560px] items-center" : "h-full"
        }`}
      >
        {loading ? (
          <Loader />
        ) : (
          <table className="flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative overflow-x-auto shadow w-full  px-4 mx-auto  bg-white">
            <thead className="text-xs  text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {thds.map((heading, index) => (
                  <th
                    scope="col"
                    className={`py-4  text-xs border-b-2 ${
                      index === 0 ? "px-4" : "px-2"
                    }`}
                  >
                    {heading}
                  </th>
                ))}

                <th scope="col" className="py-2 px-2 text-xs border-b-2">
                  <div className="flex items-center">Actions</div>
                </th>
              </tr>
            </thead>

            <tbody>
              {students?.length == 0 ? (
                <div className="text-center py-5">No data found</div>
              ) : (
                students?.map((student) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={student.admission_no}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {student.roll_no}
                    </th>
                    <td className="px-2 py-4"> {student.roll_no}</td>
                    <td className="px-2 py-4">{student.student_name}</td>
                    <td className="px-2 py-4">{student.gender}</td>
                    <td className="px-2 py-4">{student.father_name}</td>
                    <td className="px-2 py-4">{student.class_name}</td>
                    <td className="px-2 py-4">{student.section}</td>
                    <td className="px-2 py-4">
                      {student.address.substring(0, 10)}
                    </td>
                    <td className="px-2 py-4">
                      {new Date(student.date_of_birth).toLocaleDateString(
                        "en-US"
                      )}
                    </td>
                    <td className="px-2 py-4">{student.phone}</td>
                    <td className="px-2 py-4">{student.email}</td>
                    <td className="px-2 py-4 flex justify-between items-center">
                      <FaEye className="h-4 w-4 cursor-pointer" />
                      {editMode ? (
                        <FaCheck
                          className="h-4 w-4 text-green-700 cursor-pointer"
                          onClick={() => setEditMode(!editMode)}
                        />
                      ) : (
                        <BsPencilSquare
                          className="h-4 w-4 text-green-700 cursor-pointer"
                          onClick={() => setEditMode(!editMode)}
                        />
                      )}

                      <FaRegTrashAlt
                        className="h-4 w-4 text-red-700 cursor-pointer"
                        onClick={() => dispatch(deleteStudent(student.student_id))}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default AllStudents;
