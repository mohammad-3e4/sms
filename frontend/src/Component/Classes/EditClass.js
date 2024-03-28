import { useSelector, useDispatch } from "react-redux";
import {
  getClasses,
  updateClasses,
  clearError,
  clearMessages,
} from "../../redux/classesSlice";
import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Loader from "../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark } from "react-icons/fa6";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../BaseFiles/SuccessAlert";

export default function EditClass() {
  const [rotate, setRotate] = useState(false);

  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const dispatch = useDispatch();
  const { error, message, loading, classes } = useSelector(
    (state) => state.classes
  );
  const handleRefresh = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };

  const checkAlert = () => {
    setTimeout(() => {}, 2000);
  };
  useEffect(() => {
    dispatch(getClasses());
    if (error) {
      const errorInterval = setInterval(() => {
        dispatch(clearError());
      }, 1000);
      return () => clearInterval(errorInterval);
    }
    if (message) {
      const messageInterval = setInterval(() => {
        dispatch(clearMessages());
      }, 1000);
      return () => clearInterval(messageInterval);
    }
  }, [dispatch, error, message]);

  const handleSubjectClass = async (className, subject, action) => {
    dispatch(updateClasses({ className, subject, action }));
  };

  return (
    <>
      <section className="py-1  w-full m-auto">
        <div className="flex flex-wrap justify-between bg-white py-1 mb-1">
          <h6 className="text-gray-700 text-xl font-semibold font-sans px-4 tracking-wider w-1/2">
            Edit Class Subjects
          </h6>
          <div className="w-1/2 flex gap-5 justify-end px-4 items-center">
            <FaAngleDown
              className="text-yellow-700 cursor-pointer"
              onClick={checkAlert}
            />
            <FaArrowsRotate
              className={`text-green-700 cursor-pointer ${
                rotate
                  ? "rotate-180 transition-transform duration-1000"
                  : "transition-transform"
              }`}
              onClick={handleRefresh}
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
            <div className="p-3 bg-white w-full ">
              <div className="modal-body flex flex-col lg:flex-row">
                <div className="w-1/4 pr-4 mb-4 lg:mb-0 text-center lg:text-center">
                  <ul className="text-sm font-medium text-white bg-[#233459] border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {classes?.map((classData) => (
                      <li
                        key={classData.class_name}
                        className={`block w-full px-4 py-2 border-b border-gray-200 cursor-pointer ${
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
                          setSelectedClass(classData.class_name);
                          setSelectedSection(classData.section);
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
                <div className="w-3/4 text-gray-600 ">
                  {selectedClass && (
                    <table className="w-full text-center">
                      <thead>
                        <tr className="border bg-[#eab308] text-white">
                          <th className="w-1/2 px-4 py-2 border-r-2 border-gray-500  text-center">
                            Assigned
                          </th>
                          <th className="w-1/2 px-4 py-2 text-center">
                            Unassigned
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {classes
                          ?.filter(
                            (classData) =>
                              classData.class_name === selectedClass &&
                              classData.section === selectedSection
                          )
                          .map((classData) =>
                            Object.keys(classData)
                              .filter(
                                (key) =>
                                  key !== "class_name" &&
                                  key !== "classvalue" &&
                                  key !== "class_id" &&
                                  key !== "no" &&
                                  key !== "yes"
                              )
                              ?.map((subject) => (
                                <tr
                                  key={subject}
                                  className="border border-gray-200 py-12"
                                >
                                  <td className="px-32  border-r-2 border-gray-800">
                                    {classData[subject] === "yes" && (
                                      <div
                                        className="flex justify-between py-2 items-center cursor-pointer"
                                        onClick={() =>
                                          handleSubjectClass(
                                            classData.class_name,
                                            subject,
                                            "remove"
                                          )
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
                                  <td className="px-32">
                                    {classData[subject] === "no" && (
                                      <div
                                        className="flex justify-between py-2 items-center cursor-pointer"
                                        onClick={() =>
                                          handleSubjectClass(
                                            classData.class_name,
                                            subject,
                                            "add"
                                          )
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
                                </tr>
                              ))
                          )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
