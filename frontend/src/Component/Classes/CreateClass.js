import React from "react";
import Loader from "../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark } from "react-icons/fa6";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import { AiFillDelete } from "react-icons/ai";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaPlus } from "react-icons/fa";
import {
  clearError as customClearError,
  clearMessages as customClearMessages,
  getSubjects,
  deleteSubjects,
  addSubjects,
} from "../../redux/subjectSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  createClass,
  clearError as clearErrorClass,
  clearMessages as clearMessagesClass,
} from "../../redux/classesSlice";

const CreateClass = () => {
  const dispatch = useDispatch();
  const { error, message, loading, err, subjects } = useSelector(
    (state) => state.subjects
  );
  const {
    error: classError,
    message: classMessage,
    loading: classLoading,
  } = useSelector((state) => state.classes);
  const [newSubject, setNewSubject] = useState("");
  const [newVocationalSubject, setNewVocationalSubject] = useState("");

  useEffect(() => {
    dispatch(getSubjects());
    if (error || err || classError) {
      const errorInterval = setInterval(() => {
        dispatch(customClearError());
        dispatch(clearErrorClass());
        setNewSubject(null);
        setNewVocationalSubject(null);
      }, 3000);
      return () => clearInterval(errorInterval);
    }
    if (message || classMessage) {
      const messageInterval = setInterval(() => {
        dispatch(customClearMessages());
        dispatch(clearMessagesClass());
        setNewSubject(null);
        setNewVocationalSubject(null);
      }, 3000);
      return () => clearInterval(messageInterval);
    }
  }, [dispatch, error, message, err, customClearError, customClearMessages]);

  const initialValues = {
    class_name: "",
    class_section: "",
    ...subjects?.reduce((acc, subject) => {
      acc[subject] = false;
      return acc;
    }, {}),
  };

  const validationSchema = Yup.object().shape({
    class_name: Yup.string().required("Class Name is required"),
    class_section: Yup.string()
      .required("Section is required")
      .min(1, "Section is required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      subjects.forEach((subject) => {
        values[subject] = values[subject] ? "yes" : "no";
      });
      dispatch(createClass(values));
    },
  });

  const AddVocationalsubjectSubmit = async () => {
    try {
      if (!subjects.includes(newVocationalSubject)) {
        dispatch(addSubjects({ newVocationalSubject, action: "voc" }));
      }
    } catch (error) {
      console.error("Error submitting new subject:", error);
    }
  };

  const AddsubjectSubmit = async () => {
    try {
      if (!subjects.includes(newSubject)) {
        dispatch(addSubjects({ newSubject, action: "nonvoc" }));
      }
    } catch (error) {
      console.error("Error submitting new subject:", error);
    }
  };

  const handleDelSubjectSubmit = async () => {
    try {
      const allKeys = Object.keys(formik.values);
      const delSubjects = allKeys.slice(2);
      dispatch(deleteSubjects(delSubjects));
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };
  return (
    <section className="py-1  w-full m-auto">
      <div className="flex flex-wrap justify-between bg-white py-1 mb-1">
        <h6 className="text-gray-700 text-xl font-semibold font-sans px-4 tracking-wider w-1/2">
          Create Class Form
        </h6>
        <div className="w-1/2 flex gap-5 justify-end px-4 items-center">
          <FaAngleDown
            className="text-yellow-700 cursor-pointer"
            // onClick={checkAlert}
          />
          <FaArrowsRotate
            className={`text-green-700 cursor-pointer rotate-180 transition-transform duration-1000"`}
            // onClick={handleRefresh}
          />
          <FaXmark className="text-red-700 cursor-pointer" />
        </div>
      </div>
      {message && <SuccessAlert message={message} />}
      {classMessage && <SuccessAlert message={classMessage} />}
      {error && <ErrorAlert error={error} />}
      {classError && <ErrorAlert error={classError} />}
      {err && <ErrorAlert error={err} />}
      <div
        className={`flex bg-white justify-center ${
          loading ? "h-[560px] items-center" : "h-full"
        }`}
      >
        {loading || classLoading ? (
          <Loader />
        ) : (
          <div className="w-full  px-4 mx-auto mt-10 bg-white">
            <div className="flex-auto px-4 py-1 pt-0">
              <form className="py-1">
                <h6 className="text-gray-600   text-sm px-2 mt-3 mb-6 font-bold uppercase">
                  Class Information
                  <div className="h-1 bg-gray-700 w-16 my-3"></div>
                </h6>
                <div className="flex flex-wrap mb-5">
                  <div className="w-1/2 px-2">
                    <div className=" w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="class_name"
                      >
                        Class
                      </label>
                      <select
                        id="class_name"
                        type="text"
                        value={formik.values.class_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.class_name && formik.errors.class_name
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <option value="">Choose a Class</option>
                        <option value="prenursery_15">Pre Nursery</option>
                        <option value="nursery_14">Nursery</option>
                        <option value="kg_13">KG</option>
                        <option value="first_1">1</option>
                        <option value="second_2">2</option>
                        <option value="third_3">3</option>
                        <option value="fourth_4">4</option>
                        <option value="fifth_5">5</option>
                        <option value="sixth_6">6</option>
                        <option value="seventh_7">7</option>
                        <option value="eighth_8">8</option>
                        <option value="ninth_9">9</option>
                        <option value="ten_10">10</option>
                        <option value="eleven_11">11</option>
                        <option value="twelth_12">12</option>
                      </select>
                    </div>
                    {formik.touched.class_name && formik.errors.class_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.class_name}
                      </p>
                    )}
                  </div>

                  <div className="w-1/2 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="class_section"
                      >
                        section
                      </label>
                      <select
                        id="class_section"
                        type="text"
                        value={formik.values.class_section}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.class_section &&
                          formik.errors.class_section
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <option value="">Choose a section</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                      </select>
                    </div>
                    {formik.touched.class_section &&
                      formik.errors.class_section && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.class_section}
                        </p>
                      )}
                  </div>

                  <button
                    onClick={handleDelSubjectSubmit}
                    className="relative inline-flex items-center justify-start  overflow-hidden  uppercase text-xs px-4 py-1 rounded transition-all bg-red-500 font-semibold group"
                  >
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                      <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                      Delete Subject
                    </span>
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300 py-1" />
                <div className="flex justify-between">
                  <div className="w-1/2 ">
                    <div className="flex justify-between">
                      <div>
                        <h6 className="text-gray-600   text-sm px-2 mt-3 mb-6 font-bold uppercase">
                          Select Subject
                          <div className="h-1 bg-gray-700 w-16 my-3"></div>
                        </h6>
                      </div>
                      <div>
                        <input
                          type="text"
                          id="new_subject"
                          value={newSubject}
                          onChange={(e) => setNewSubject(e.target.value)}
                          className="border-0  py-1 mt-3 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 "
                        />
                      </div>
                      <div className="py-4 pr-12">
                        <FaPlus onClick={AddsubjectSubmit} />
                      </div>
                    </div>
                    <div className="flex flex-wrap border-r-2  border-gray-900 pt-5">
                      {subjects
                        ?.filter(
                          (subject) =>
                            !subject.toLowerCase().startsWith("vocational")
                        )
                        .map((subject) => (
                          <div key={subject} className="w-full lg:w-3/12 px-4">
                            <div className=" w-full mb-3 flex justify-between items-center">
                              <label
                                className="uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor={subject}
                              >
                                {subject}
                              </label>
                              <input
                                type="checkbox"
                                id={subject}
                                checked={formik.values[subject]}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    subject,
                                    e.target.checked
                                  )
                                }
                                onBlur={formik.handleBlur}
                                className={`shadow-md rounded-lg  ${
                                  formik.touched[subject] &&
                                  formik.errors[subject]
                                    ? "border-red-500"
                                    : ""
                                }`}
                              />
                            </div>
                            {formik.touched[subject] &&
                              formik.errors[subject] && (
                                <p className="text-red-500 text-xs mt-1">
                                  {formik.errors[subject]}
                                </p>
                              )}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="w-1/2 ">
                    <div className="flex justify-between">
                      <div>
                        <h6 className="text-gray-600   text-sm px-2 mt-3 mb-6 font-bold uppercase">
                          Select Vocational Subject
                          <div className="h-1 bg-gray-700 w-16 my-3"></div>
                        </h6>
                      </div>
                      <div>
                        <input
                          type="text"
                          id="new_vocational_subject"
                          value={newVocationalSubject}
                          onChange={(e) =>
                            setNewVocationalSubject(e.target.value)
                          }
                          className="border-0  py-1 mt-3 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 "
                        />
                      </div>
                      <div className="py-4 pr-12">
                        <FaPlus onClick={AddVocationalsubjectSubmit} />
                      </div>
                    </div>
                    <div className="flex flex-wrap border-r-2  border-gray-900 pt-5">
                      {subjects
                        ?.filter((subject) =>
                          subject.toLowerCase().startsWith("vocational")
                        )
                        .map((subject) => (
                          <div key={subject} className="w-full lg:w-6/12 px-4">
                            <div className=" w-full mb-3 flex justify-between items-center">
                              <label
                                className="uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor={subject}
                              >
                                {subject}
                              </label>
                              <input
                                type="checkbox"
                                id={subject}
                                checked={formik.values[subject]}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    subject,
                                    e.target.checked
                                  )
                                }
                                onBlur={formik.handleBlur}
                                className={`shadow-md rounded-lg  ${
                                  formik.touched[subject] &&
                                  formik.errors[subject]
                                    ? "border-red-500"
                                    : ""
                                }`}
                              />
                            </div>
                            {formik.touched[subject] &&
                              formik.errors[subject] && (
                                <p className="text-red-500 text-xs mt-1">
                                  {formik.errors[subject]}
                                </p>
                              )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300 py-1" />
                <div className="mx-3 flex justify-start gap-5">
                  <button
                    type="button"
                    onClick={formik.handleSubmit}
                    className="relative inline-flex items-center justify-start  overflow-hidden  uppercase text-xs px-4 py-1 rounded transition-all bg-amber-500 font-semibold group"
                  >
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-amber-500 rounded group-hover:-mr-4 group-hover:-mt-4">
                      <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-amber-500 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                      Submit
                    </span>
                  </button>

                  <button
                    onClick={formik.resetForm}
                    className="relative inline-flex items-center justify-start  overflow-hidden  uppercase text-xs px-4 py-1 rounded transition-all bg-blue-500 font-semibold group"
                  >
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-blue-500 rounded group-hover:-mr-4 group-hover:-mt-4">
                      <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-blue-500 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                      Reset form
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CreateClass;
