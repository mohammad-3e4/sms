import React from "react";
import Loader from "../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark, FaEye } from "react-icons/fa6";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { addStudentValues } from "../InitialValues";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Select from "../../BaseFiles/Select";
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

const AllStaff = () => {
  const currentUrl = window.location.href;
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editableStudent, setEditableStudent] = useState(null);
  const { loading, error, message, students } = useSelector(
    (state) => state.student
  );
  const [allStudents, setAllStudents] = useState([]);
  const { selectedClass } = useSelector((state) => state.classes);

  const dispatch = useDispatch();
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    setAllStudents(students);
    dispatch(getStudents(selectedClass));
    if (error) {
      const errorInterval = setInterval(() => {
        dispatch(clearErrors());
      }, 3000);
      return () => clearInterval(errorInterval);
    }
    if (message) {
      setEditMode(false);
      setEditableStudent(null);
      const messageInterval = setInterval(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearInterval(messageInterval);
    }
  }, [dispatch, error, message, selectedClass]);

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

  const handleEdit = (student) => {
    setEditableStudent(student);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditableStudent(null);
  };

  const formik = useFormik({
    initialValues: addStudentValues,
    onSubmit: (values) => {
      const filteredData = Object.fromEntries(
        Object.entries(values).filter(
          ([key, value]) => value !== "" && value !== null
        )
      );

      dispatch(
        updateStudent({
          studentId: editableStudent.student_id,
          updatedData: filteredData,
        })
      );
    },
  });
  const handleSearch = (e) => {
    setAllStudents(
      students.filter((student) =>
        student.student_name.includes(e.target.value)
      )
    );
    setSearchQuery(e.target.value);
  };

  return (
    <section className="py-1  w-full m-auto">
      <div className="flex flex-wrap justify-between shadow bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl capitalize font-semibold font-sans px-4 tracking-wider w-1/3">
          {`${currentUrl.split("/")[3]}  ${currentUrl.split("/")[4]}`}
        </h6>

        <div className="w-2/3 flex gap-2 justify-end px-4 items-center">
          <Select subject={false} search={true} />

          <div className="w-full px-2">
            <div className="relative w-full">
              <input
                id="search"
                name="search"
                placeholder="search..."
                value={searchQuery}
                onInput={(e) => handleSearch(e)}
                type="text"
                className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 border-red-500`}
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 cursor-pointer">
                <FaSearch
                  className="h-4 w-4 text-gray-600"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>

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
                    key={index}
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
                    key={student.email}
                  >
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {student.student_id}
                    </th>
                    <td className="px-2 py-2 w-10">
                      <img
                        src={
                          student.gender === "Male"
                            ? "/default_male.png"
                            : "/default_female.png"
                        }
                      />
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editableStudent &&
                      editableStudent.student_id === student.student_id ? (
                        <input
                          id="student_name"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={student.student_name}
                        />
                      ) : (
                        <Link to={`/student/details/${student.student_id}`}>
                          {student.student_name}
                        </Link>
                      )}
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editableStudent &&
                      editableStudent.student_id === student.student_id ? (
                        <input
                          id="gender"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={student.gender}
                        />
                      ) : (
                        student.gender
                      )}
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editableStudent &&
                      editableStudent.student_id === student.student_id ? (
                        <input
                          id="father_name"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={student.father_name}
                        />
                      ) : (
                        student.father_name
                      )}
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editableStudent &&
                      editableStudent.student_id === student.student_id ? (
                        <input
                          id="class_name"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={student.class_name}
                        />
                      ) : (
                        student.class_name
                      )}
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editableStudent &&
                      editableStudent.student_id === student.student_id ? (
                        <input
                          id="section"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={student.section}
                        />
                      ) : (
                        student.section
                      )}
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editableStudent &&
                      editableStudent.student_id === student.student_id ? (
                        <input
                          id="address"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={student.address.substring(0, 10)}
                        />
                      ) : (
                        student.address.substring(0, 10)
                      )}
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editableStudent &&
                      editableStudent.student_id === student.student_id ? (
                        <input
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          id="date_of_birth"
                          onChange={formik.handleChange}
                          defaultValue={new Date(
                            student.date_of_birth
                          ).toLocaleDateString("en-US")}
                        />
                      ) : (
                        <>
                          {" "}
                          {new Date(student.date_of_birth).toLocaleDateString(
                            "en-US"
                          )}
                        </>
                      )}
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editableStudent &&
                      editableStudent.student_id === student.student_id ? (
                        <input
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          id="phone"
                          onChange={formik.handleChange}
                          defaultValue={student.phone}
                        />
                      ) : (
                        student.phone
                      )}
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editableStudent &&
                      editableStudent.student_id === student.student_id ? (
                        <input
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="email"
                          id="email"
                          defaultValue={student.email}
                          onChange={formik.handleChange}
                        />
                      ) : (
                        student.email
                      )}
                    </td>

                    <td className="px-2 py-4 flex gap-3 items-center ">
                      {editMode &&
                      editableStudent &&
                      editableStudent.student_id === student.student_id ? (
                        <FaXmark
                          className="h-4 w-4 text-red-700 cursor-pointer"
                          onClick={handleCancelEdit}
                          title="cancel"
                        />
                      ) : (
                        <Link to={`/student/details/${student.student_id}`}>
                          <FaEye
                            className="h-4 w-4 cursor-pointer"
                            title="Details"
                          />
                        </Link>
                      )}
                      {editMode &&
                      editableStudent &&
                      editableStudent.student_id === student.student_id ? (
                        <FaCheck
                          className="h-4 w-4 text-green-700 cursor-pointer"
                          onClick={formik.handleSubmit}
                          title="Submit Changes"
                        />
                      ) : (
                        <BsPencilSquare
                          className="h-4 w-4 text-green-700 cursor-pointer"
                          onClick={() => handleEdit(student)}
                          title="Edit"
                        />
                      )}
                      <FaRegTrashAlt
                        className="h-4 w-4 text-red-700 cursor-pointer"
                        onClick={() =>
                          dispatch(deleteStudent(student.student_id))
                        }
                        title="Delete"
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

export default AllStaff;
