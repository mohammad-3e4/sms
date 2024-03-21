import React from "react";
import Loader from "../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark, FaEye } from "react-icons/fa6";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { addStaffValues } from "../InitialValues";
import { Link } from "react-router-dom";
import {
  clearErrors,
  clearMessage,
  deleteStaff,
  getStaff,
  updateStaff,
} from "../../redux/staffSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegTrashAlt, FaCheck } from "react-icons/fa";

const AllStaff = () => {
  const currentUrl = window.location.href;
  const [editMode, setEditMode] = useState(false);
  const [editableMember, setEditableMember] = useState(null);
  const { loading, error, message, staff } = useSelector(
    (state) => state.staff
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    dispatch(getStaff());
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
    "ID",
    "Photo",
    "Name",
    "Gender",
    "Designation",
    "Role",
    "Joined Date",
    "Address",
    "Mobile",
    "E-mail",
    "Experience",
  ];

  const handleEdit = (member) => {
    setEditableMember(member);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditableMember(null);
  };

  const formik = useFormik({
    initialValues: addStaffValues,
    onSubmit: (values) => {
      const filteredData = Object.fromEntries(
        Object.entries(values).filter(
          ([key, value]) => value !== "" && value !== null
        )
      );
      dispatch(
        updateStaff({
          staffId: editableMember.staff_id,
          updatedData: filteredData,
        })
      );
      setEditMode(false)
      setEditableMember(null)
    },
  });

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
              {staff?.filter((staf) => staf.staff_id !== user.staff_id)
                .length == 0 ? (
                <div className="text-center py-5">No data found</div>
              ) : (
                staff
                  ?.filter((staf) => staf.staff_id !== user.staff_id)
                  .map((member) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={member.email}
                    >
                      <th
                        scope="row"
                        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {member.staff_id}
                      </th>
                      <td className="px-2 py-2 w-10">
                        <img
                          src={
                            member.gender === "Male"
                              ? "/default_male.png"
                              : "/default_female.png"
                          }
                        />
                      </td>
                      <td className="px-2 py-2">
                        {editMode &&
                        editableMember &&
                        editableMember.staff_id === member.staff_id ? (
                          <input
                            id="staff_name"
                            className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                            type="text"
                            onChange={formik.handleChange}
                            defaultValue={member.staff_name}
                          />
                        ) : (
                          <Link to={`/staff/details/${member.staff_id}`}>
                            {member.staff_name}
                          </Link>
                        )}
                      </td>
                      <td className="px-2 py-2">
                        {editMode &&
                        editableMember &&
                        editableMember.staff_id === member.staff_id ? (
                          <input
                            id="gender"
                            className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                            type="text"
                            onChange={formik.handleChange}
                            defaultValue={member.gender}
                          />
                        ) : (
                          member.gender
                        )}
                      </td>
                      <td className="px-2 py-2">
                        {editMode &&
                        editableMember &&
                        editableMember.staff_id === member.staff_id ? (
                          <input
                            id="designation"
                            className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                            type="text"
                            onChange={formik.handleChange}
                            defaultValue={member.designation}
                          />
                        ) : (
                          member.designation
                        )}
                      </td>
                      <td className="px-2 py-2">
                        {editMode &&
                        editableMember &&
                        editableMember.staff_id === member.staff_id ? (
                          <input
                            id="role"
                            className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                            type="text"
                            onChange={formik.handleChange}
                            defaultValue={member.role}
                          />
                        ) : (
                          member.role
                        )}
                      </td>
                      <td className="px-2 py-2">
                        {editMode &&
                        editableMember &&
                        editableMember.staff_id === member.staff_id ? (
                          <input
                            id="joining_date"
                            className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                            type="text"
                            onChange={formik.handleChange}
                            defaultValue={new Date(
                              member.joining_date
                            ).toLocaleDateString()}
                          />
                        ) : (
                          <>
                            {new Date(member.joining_date).toLocaleDateString()}
                          </>
                        )}
                      </td>
                      <td className="px-2 py-2">
                        {editMode &&
                        editableMember &&
                        editableMember.staff_id === member.staff_id ? (
                          <input
                            id="address"
                            className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                            type="text"
                            onChange={formik.handleChange}
                            defaultValue={member.address.substring(0, 10)}
                          />
                        ) : (
                          member.address.substring(0, 10)
                        )}
                      </td>
                      <td className="px-2 py-2">
                        {editMode &&
                        editableMember &&
                        editableMember.staff_id === member.staff_id ? (
                          <input
                            className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                            type="text"
                            id="phone"
                            onChange={formik.handleChange}
                            defaultValue={member.phone}
                          />
                        ) : (
                          member.phone
                        )}
                      </td>
                      <td className="px-2 py-2">
                        {editMode &&
                        editableMember &&
                        editableMember.staff_id === member.staff_id ? (
                          <input
                            className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                            type="email"
                            id="email"
                            defaultValue={member.email}
                            onChange={formik.handleChange}
                          />
                        ) : (
                          member.email
                        )}
                      </td>
                      <td className="px-2 py-2">
                        {editMode &&
                        editableMember &&
                        editableMember.staff_id === member.staff_id ? (
                          <input
                            className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                            type="text"
                            id="experience"
                            defaultValue={member.experience}
                            onChange={formik.handleChange}
                          />
                        ) : (
                          member.experience
                        )}
                      </td>
                      <td className="px-2 py-4 flex gap-3 items-center ">
                        {editMode &&
                        editableMember &&
                        editableMember.staff_id === member.staff_id ? (
                          <FaXmark
                            className="h-4 w-4 text-red-700 cursor-pointer"
                            onClick={handleCancelEdit}
                            title="cancel"
                          />
                        ) : (
                          <Link to={`/staff/details/${member.staff_id}`}>
                            <FaEye
                              className="h-4 w-4 cursor-pointer"
                              title="details"
                            />
                          </Link>
                        )}
                        {editMode &&
                        editableMember &&
                        editableMember.staff_id === member.staff_id ? (
                          <FaCheck
                            className="h-4 w-4 text-green-700 cursor-pointer"
                            onClick={formik.handleSubmit}
                            title="Submit Changes"
                          />
                        ) : (
                          <BsPencilSquare
                            className="h-4 w-4 text-green-700 cursor-pointer"
                            onClick={() => handleEdit(member)}
                            title="Edit"
                          />
                        )}
                        <FaRegTrashAlt
                          className="h-4 w-4 text-red-700 cursor-pointer"
                          onClick={() => dispatch(deleteStaff(member.staff_id))}
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
