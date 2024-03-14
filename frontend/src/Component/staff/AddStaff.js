import React from "react";
import Loader from "../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark } from "react-icons/fa6";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { addStaffValues } from "../InitialValues";
import { addStaffValidation } from "../validation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addStaff, clearErrors, clearMessage} from "../../redux/staffSlice";
const AddStaff = () => {
  const dispatch = useDispatch();
  const [rotate, setRotate] = useState(false);
  const {loading, error, message} = useSelector((state)=>state.staff)
  
  const [showPass, setShowPass] = useState(false);
  const handleRefresh = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };


  const formik = useFormik({
    initialValues: addStaffValues,
    validationSchema: addStaffValidation,
    onSubmit: async (values) => {
      console.log(values);
      dispatch(addStaff(values));
    },
  });
  useEffect(()=>{
    if(error){
      setTimeout(() => {
        dispatch(clearErrors());
      }, 3000);
    }
    if(message){
      formik.resetForm()
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }

  },[error, message, loading, formik])
  return (
    <section className="py-1  w-full m-auto">
      <div className="flex flex-wrap justify-between bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl font-semibold font-sans px-4 tracking-wider w-1/2">
          Add Staff Member
        </h6>
        <div className="w-1/2 flex gap-5 justify-end px-4 items-center">
          <FaAngleDown
            className="text-yellow-700 cursor-pointer"

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
          <div className="w-full  px-4 mx-auto mt-10 bg-white">
            <div className="flex-auto px-4 py-10 pt-0">
              <form className="py-3" onSubmit={formik.handleSubmit}>
                <h6 className="text-gray-600   text-sm px-2 mt-3 mb-6 font-bold uppercase">
                  Personal Information
                  <div className="h-1 bg-gray-700 w-16 my-3"></div>
                </h6>
                <div className="flex flex-wrap mb-5">
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="staff_name"
                      >
                        full Name
                      </label>
                      <input
                        id="staff_name"
                        type="text"
                        value={formik.values.staff_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.student_name &&
                          formik.errors.student_name
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.student_name &&
                      formik.errors.student_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.student_name}
                        </p>
                      )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="phone"
                      >
                        phone
                      </label>
                      <input
                        id="phone"
                        type="text"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.phone && formik.errors.phone
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        E-email
                      </label>
                      <input
                        id="email"
                        type="text"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.email && formik.errors.email
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="password"
                      >
                        password
                      </label>
                      <div className=" relative">
                        <input
                          id="password"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type={showPass ? "text" : "password"}
                          autoComplete="current-password"
                          required
                          className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                            formik.touched.password && formik.errors.password
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        <span
                          onClick={() => setShowPass(!showPass)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 cursor-pointer"
                        >
                          {!showPass ? (
                            <FaRegEye
                              className="h-4 w-4 text-gray-600"
                              aria-hidden="true"
                            />
                          ) : (
                            <FaRegEyeSlash
                              className="h-4 w-4 text-gray-600"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </div>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap mb-5">
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="gender"
                      >
                        gender
                      </label>
                      <select
                        id="gender"
                        type="text"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.roll_no && formik.errors.roll_no
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    {formik.touched.gender && formik.errors.gender && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.gender}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="religion"
                      >
                        religion
                      </label>
                      <select
                        id="religion"
                        type="text"
                        value={formik.values.religion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.religion && formik.errors.religion
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <option value="">Select Religion</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Buddhism">Buddhism</option>
                        <option value="Sikh">Sikh</option>
                        <option value="Christian">Christian</option>
                      </select>
                    </div>
                    {formik.touched.religion && formik.errors.religion && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.religion}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="address"
                      >
                        Adress
                      </label>
                      <input
                        id="address"
                        type="text"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.address && formik.errors.address
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.address && formik.errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.address}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-3"
                        htmlFor="avatar"
                      >
                        photo
                      </label>

                      <input
                        id="avatar"
                        name="avatar"
                        type="file"
                        hidden
                        accept="image/png, image/jpeg"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "avatar",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                      <label
                        htmlFor="avatar"
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                      >
                        {formik.values.avatar
                          ? formik.values.avatar.name.slice(0, 23)
                          : "Choose an image"}
                      </label>
                    </div>
                  </div>
                </div>

                <h6 className="text-gray-600   text-sm px-2 mt-3 mb-6 font-bold uppercase">
                  Others Information
                  <div className="h-1 bg-gray-700 w-16 my-3"></div>
                </h6>
                <div className="flex flex-wrap mb-5">
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="role"
                      >
                        Role
                      </label>
                      <select
                        id="role"
                        type="text"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.role && formik.errors.role
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="teacher">Teacher</option>
                        <option value="accountant">Accountant</option>
                        <option value="librarian">Librarian</option>
                        <option value="pion">Pion</option>
                        <option value="driver">Driver</option>
                      </select>
                    </div>
                    {formik.touched.role && formik.errors.role && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.role}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="designation"
                      >
                        desgination
                      </label>
                      <select
                        id="designation"
                        type="text"
                        value={formik.values.designation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.designation &&
                          formik.errors.designation
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <option value="">Choose one</option>
                        <option value="PRT">PRT</option>
                        <option value="TGT">TGT</option>
                      </select>
                    </div>
                    {formik.touched.designation &&
                      formik.errors.designation && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.designation}
                        </p>
                      )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="qualification"
                      >
                        Highest qualification
                      </label>
                      <input
                        id="qualification"
                        type="text"
                        value={formik.values.qualification}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.qualification &&
                          formik.errors.qualification
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.qualification &&
                      formik.errors.qualification && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.qualification}
                        </p>
                      )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="experience"
                      >
                        experience
                      </label>
                      <input
                        id="experience"
                        type="text"
                        value={formik.values.experience}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.experience && formik.errors.experience
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.experience && formik.errors.experience && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.experience}
                      </p>
                    )}
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300 py-3" />

                <div className="mx-3 flex justify-start">
                  <button
                    className="bg-amber-500 text-white active:bg-yellow-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-blue-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    onClick={formik.resetForm}
                  >
                    Reset Form
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

export default AddStaff;
