import React from "react";
import Loader from "../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark } from "react-icons/fa6";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import { useState } from "react";
import { useFormik } from "formik";
import { addStudentValues } from "../InitialValues";
import { addStudentValidation } from "../validation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { addStudent } from "../../actions/student";
const AllStudents = () => {
  const currentUrl = window.location.href;
  const [rotate, setRotate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const handleRefresh = () => {
    setRotate(true);
    setLoading(true);
    setTimeout(() => {
      setRotate(false);
      setLoading(false);
    }, 1000);
  };

  const checkAlert = () => {
    setError("Internal server error");
    setTimeout(() => {
      setError(null);
    }, 2000);
  };
  const formik = useFormik({
    initialValues: addStudentValues,
    validationSchema: addStudentValidation,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const res = await addStudent(values);
      } catch (error) {}
    },
  });

  return (
    <section className="py-1  w-full m-auto">
      <div className="flex flex-wrap justify-between shadow bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl capitalize font-semibold font-sans px-4 tracking-wider w-1/2">
          {`${currentUrl.split("/")[3]}  ${currentUrl.split("/")[4]}`}
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
          <div className="relative overflow-x-auto shadow w-full  px-4 mx-auto mt-10 bg-white">
            <table className="w-full flex-auto py-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-2 text-xs">
                    Roll No.
                  </th>
                  <th scope="col" className="py-3 px-2 text-xs">
                    <div className="flex items-center">photo</div>
                  </th>
                  <th scope="col" className="py-3 px-2 text-xs">
                    <div className="flex items-center">Name</div>
                  </th>
                  <th scope="col" className="py-3 px-2 text-xs">
                    <div className="flex items-center">Gender</div>
                  </th>
                  <th scope="col" className="py-3 px-2 text-xs">
                    parents name
                  </th>
                  <th scope="col" className="py-3 px-2 text-xs">
                    <div className="flex items-center">Class</div>
                  </th>
                  <th scope="col" className="py-3 px-2 text-xs">
                    <div className="flex items-center">section</div>
                  </th>
                  <th scope="col" className="py-3 px-2 text-xs">
                    <div className="flex items-center">Address</div>
                  </th>
                  <th scope="col" className="py-3 px-2 text-xs">
                    Date of birth
                  </th>
                  <th scope="col" className="py-3 px-2 text-xs">
                    <div className="flex items-center">Mobile</div>
                  </th>
                  <th scope="col" className="py-3 px-2 text-xs">
                    <div className="flex items-center">E-mail</div>
                  </th>
                  <th scope="col" className="py-3 px-2 text-xs">
                    <div className="flex items-center">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    A890
                  </th>
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllStudents;
