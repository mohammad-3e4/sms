import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClasses,
  AssignSubject,
  removeAssignSubject,
  clearMessages,
  clearError,
} from "../../redux/classesSlice";

import Spinner from "../../BaseFiles/Spinner";
import { getStaff } from "../../redux/staffSlice";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
function AssignTeacherModel({ selectedTeacher, onClose }) {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const { loading, error, message, classes } = useSelector(
    (state) => state.classes
  );
  const { staff } = useSelector((state) => state.staff);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClasses());
    dispatch(getStaff());
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
    if (message) {
      setSelectedClass(
        classes.find((item) => item.class_name === selectedClass.class_name)
      );
      setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
    }
  }, [dispatch, error, message]);

  const handleClassClick = (classData) => {
    setSelectedClass(classData);
  };

  const handleRemoveClick = async (subject) => {
    try {
    } catch (error) {
      console.error("Error removing className:", error);
    }
  };
  const handleSubjectClass = async (subject) => {
    dispatch(
      AssignSubject({
        teacher_id: selectedTeacher.staff_id,
        class_name: selectedClass.class_name,
        subject: subject,
      })
    );

  };
  const handleRemoveSubjectClass = async (subject) => {
    dispatch(
      removeAssignSubject({
        class_name: selectedClass.class_name,
        subject: subject,
      })
    );

  };

  return (
    <>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden fixed bg-gray-500 bg-opacity-50  z-50  flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-3/4 max-w-full max-h-full ">
          <div className="relative bg-white rounded shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 tracking-widest font-sans dark:text-white">
                <h2> Assigned Classes to {selectedTeacher.staff_name} </h2>
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {error && <ErrorAlert error={error} />}
            {message && <SuccessAlert message={message} />}

            <div className="p-4 md:p-5 space-y-4 flex justify-between">
              <div className="w-1/4 pr-4 mb-4 lg:mb-0 text-center lg:text-center">
                <ul className="text-sm font-medium text-white bg-[#233459] border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {classes?.map((classData) => (
                    <li
                      key={classData.class_name}
                      className={`block w-full tracking-widest font-sans px-4 py-2 border-b border-gray-200 cursor-pointer ${
                        selectedClass === classData.class_name &&
                        selectedSection === classData.section
                          ? "bg-[#eab308] text-white focus:bg-gray-100 focus:text-blue-700"
                          : "hover:bg-[#3469a1] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                      }`}
                      aria-current={
                        selectedClass === classData.class_name
                          ? "true"
                          : undefined
                      }
                      onClick={() => {
                        handleClassClick(classData);
                      }}
                    >
                      {" "}
                      {selectedClass === classData.class_name && (
                        <span aria-hidden="true">&rarr; </span>
                      )}
                      Class {classData.class_name} {classData.section}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-3/4" style={{ margin: "0px" }}>
                {selectedTeacher && (
                  <table className="w-full text-center border">
                    <thead>
                      <tr className="border bg-[#eab308] text-white">
                        <th className="w-1/3 px-4 py-2 border-r-2 border-gray-500 tracking-widest font-sans  text-center">
                          Unassigned
                        </th>
                        <th className="w-1/3 px-4 py-2 border-gray-500  border-r-2 tracking-widest font-sans text-center">
                          Assigned
                        </th>
                        <th className="w-1/3 px-4 py-2  tracking-widest font-sans  text-center">
                          Assigned to
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <Spinner />
                      ) : (
                        <>
                          {selectedClass &&
                            Object.keys(selectedClass)
                              .filter(
                                (key) =>
                                  ![
                                    "class_id",
                                    "class_name",
                                    "class_value",
                                  ].includes(key)
                              )
                              .map((subject) => (
                                <tr
                                  key={subject}
                                  className="subject-info border-b p-2"
                                >
                                  <td>
                                    {selectedClass[subject] === "yes" && (
                                      <div
                                        className="flex justify-between py-2 px-4 items-center capitalize tracking-widest font-sans cursor-pointer border-r-2 border-gray-500"
                                        onClick={() =>
                                          handleSubjectClass(subject)
                                        }
                                      >
                                        <FaArrowRight
                                          className="h-4 w-4 mr-2 text-green-500"
                                          aria-hidden="true"
                                        />
                                        {subject}
                                      </div>
                                    )}
                                  </td>
                                  <td>
                                    {selectedClass[subject] !== "yes" &&
                                      selectedClass[subject] !== "no" && (
                                        <div
                                          className="flex justify-between capitalize tracking-widest font-sans  py-2 px-4 items-center cursor-pointer border-l-2 border-r-2 border-gray-500"
                                          onClick={() =>
                                            handleRemoveSubjectClass(subject)
                                          }
                                        >
                                          <FaArrowLeft
                                            className="h-4 w-4 mr-2 text-red-500"
                                            aria-hidden="true"
                                          />
                                          {subject}
                                        </div>
                                      )}
                                  </td>
                                  <td>
                                    <span>
                                      {staff
                                        ?.filter(
                                          (item) => item.role === "teacher"
                                        )
                                        .find(
                                          (teacher) =>
                                            teacher.staff_id ==
                                            selectedClass[subject]
                                        )?.staff_name || "None"}
                                    </span>
                                  </td>
                                </tr>
                              ))}{" "}
                        </>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignTeacherModel;
