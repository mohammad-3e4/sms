import React, { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../redux/classesSlice";
import { getSubjects } from "../../redux/subjectSlice";
function AssignTeacherModel({
  selectedTeacher,
  data,
  setJsonData,
  onClose,
  teacherData,
}) {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [currentClass, setCurrentClass] = useState(null);
  const { loading, error, message, classes } = useSelector(
    (state) => state.classes
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClasses());
    dispatch(getSubjects());
  }, [dispatch]);

  // useEffect(() => {
  //   setJsonData(Allclasses);
  // }, [Allclasses, setJsonData]);

  const handleClassClick = (classData) => {
    setSelectedClass(classData);
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubjects((prevSubjects) =>
      prevSubjects.includes(subject)
        ? prevSubjects.filter((prevSubject) => prevSubject !== subject)
        : [...prevSubjects, subject]
    );
  };

  // const sendDataToBackend = async () => {
  //   try {
  //     await dispatch(
  //       updateClasses(
  //         selectedTeacher,
  //         selectedClass,
  //         selectedSubjects,
  //         selectedSection
  //       )
  //     );
  //     dispatch(fetchClasses());
  //   } catch (error) {
  //     console.error("Error sending data to backend:", error);
  //   }
  // };

  const handleRemoveClick = async (subject) => {
    try {
      // await dispatch(removeClass(selectedTeacher, selectedClass, subject));
      // dispatch(fetchClasses());
    } catch (error) {
      console.error("Error removing className:", error);
    }
  };
  console.log(selectedTeacher);
  const filteredKeys = Object.keys(selectedClass).filter(
    (key) => !["class_id", "class_name", "class_value"].includes(key)
  );
  const unassigned = filteredKeys.filter((key) => selectedClass[key] === "yes");
  const assigned = filteredKeys.filter(
    (key) => selectedClass[key] !== "no" && selectedClass[key] !== "yes"
  );

  return (
    <>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden fixed bg-gray-200 bg-opacity-50  z-50  flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-3/4 max-w-full max-h-full ">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                <h2>{selectedTeacher.staff_name} Assigned Classes</h2>
              </h3>
              <button
                type="button"
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

            <div className="p-4 md:p-5 space-y-4 flex justify-between">
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
              <div className="w-3/4">
              {selectedTeacher && (
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
                  {/* <tbody>
                        {classes
                          ?.filter(
                            (classData) =>
                              classData.class_name === selectedTeacher &&
                              classData.section === selectedTeacher
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
                                          handleAssignClass(
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
                                          handleAssignClass(
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
                      </tbody> */}
                </table>
              )}
              </div>
            </div>

            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                data-modal-hide="default-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignTeacherModel;
