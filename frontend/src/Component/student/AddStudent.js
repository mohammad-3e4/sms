import React from "react";
import Loader from "../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark } from "react-icons/fa6";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import { useState , useEffect} from "react";
import { useFormik } from "formik";
import { addStudentValues } from "../InitialValues";
import { addStudentValidation } from "../validation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { addStudent,clearErrors, clearMessage } from "../../redux/studentSlice";
import { useDispatch, useSelector } from "react-redux";
const AddStudent = () => {
  const {loading, error, message} = useSelector((state)=>state.student) 
  const [rotate, setRotate] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const dispacth = useDispatch();
  const handleRefresh = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };



  const formik = useFormik({
    initialValues: addStudentValues,
    validationSchema: addStudentValidation,
    onSubmit: async (values) => {
      console.log(values);
      dispacth(addStudent(values));
    },
  });
  useEffect(()=>{
    if(error){
      setTimeout(() => {
        dispacth(clearErrors());
      }, 3000);
    }
    if(message){
      formik.resetForm()
      setTimeout(() => {
        dispacth(clearMessage());
      }, 3000);
    }

  },[error, message, loading, formik])

  return (
    <section className="py-1  w-full m-auto">
      <div className="flex flex-wrap justify-between bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl font-semibold font-sans px-4 tracking-wider w-1/2">
          Add Student Form
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
                  Student Information
                  <div className="h-1 bg-gray-700 w-16 my-3"></div>
                </h6>
                <div className="flex flex-wrap mb-5">
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="student_name"
                      >
                        Student Name
                      </label>
                      <input
                        id="student_name"
                        type="text"
                        value={formik.values.student_name}
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
                        htmlFor="admission_no"
                      >
                        Admission No
                      </label>
                      <input
                        id="admission_no"
                        type="text"
                        value={formik.values.admission_no}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.admission_no &&
                          formik.errors.admission_no
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.admission_no &&
                      formik.errors.admission_no && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.admission_no}
                        </p>
                      )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="class_name"
                      >
                        Class Name
                      </label>
                      <input
                        id="class_name"
                        type="text"
                        value={formik.values.class_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.class_name && formik.errors.class_name
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.class_name && formik.errors.class_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.class_name}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="section"
                      >
                        section
                      </label>
                      <select
                        id="section"
                        type="text"
                        value={formik.values.section}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.section && formik.errors.section
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
                    {formik.touched.section && formik.errors.section && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.section}
                      </p>
                    )}
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300 py-3" />
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
                        htmlFor="date_of_birth"
                      >
                        Date of birth
                      </label>
                      <input
                        id="date_of_birth"
                        type="date"
                        value={formik.values.date_of_birth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.date_of_birth &&
                          formik.errors.date_of_birth
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.date_of_birth &&
                      formik.errors.date_of_birth && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.date_of_birth}
                        </p>
                      )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="roll_no"
                      >
                        Roll No
                      </label>
                      <input
                        id="roll_no"
                        type="text"
                        value={formik.values.roll_no}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.roll_no && formik.errors.roll_no
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.roll_no && formik.errors.roll_no && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.roll_no}
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
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300 py-3" />
                <div className="flex flex-wrap mb-16">
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
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-3"
                        htmlFor="student_image"
                      >
                        photo
                      </label>

                      <input
                        id="student_image"
                        name="student_image"
                        type="file"
                        hidden
                        accept="image/png, image/jpeg"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "student_image",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                      <label
                        htmlFor="student_image"
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                      >
                        {formik.values.student_image
                          ? formik.values.student_image.name.slice(0, 23)
                          : "Choose an image"}
                      </label>
                    </div>
                  </div>
                </div>

                <h6 className="text-gray-600   text-sm px-2 mt-3 mb-6 font-bold uppercase">
                  parents Information
                  <div className="h-1 bg-gray-700 w-16 my-3"></div>
                </h6>
                <div className="flex flex-wrap mb-5">
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="father_name"
                      >
                        father Name
                      </label>
                      <input
                        id="father_name"
                        type="text"
                        value={formik.values.father_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.father_name &&
                          formik.errors.father_name
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.father_name &&
                      formik.errors.father_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.father_name}
                        </p>
                      )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="mother_name"
                      >
                        Mother Name
                      </label>
                      <input
                        id="mother_name"
                        type="text"
                        value={formik.values.mother_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.mother_name &&
                          formik.errors.mother_name
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.mother_name &&
                      formik.errors.mother_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.mother_name}
                        </p>
                      )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="father_occupation"
                      >
                        father occupation
                      </label>
                      <input
                        id="father_occupation"
                        type="text"
                        value={formik.values.father_occupation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.father_occupation &&
                          formik.errors.father_occupation
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.father_occupation &&
                      formik.errors.father_occupation && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.father_occupation}
                        </p>
                      )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="mother_occupation"
                      >
                        mother occupation
                      </label>
                      <input
                        id="mother_occupation"
                        type="text"
                        value={formik.values.mother_occupation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.mother_occupation &&
                          formik.errors.mother_occupation
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.mother_occupation &&
                      formik.errors.mother_occupation && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.mother_occupation}
                        </p>
                      )}
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300 py-3" />
                <div className="flex flex-wrap mb-5">
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="alternative_phone_no"
                      >
                        Phone
                      </label>
                      <input
                        id="alternative_phone_no"
                        type="tel"
                        value={formik.values.alternative_phone_no}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.alternative_phone_no &&
                          formik.errors.alternative_phone_no
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.alternative_phone_no &&
                      formik.errors.alternative_phone_no && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.alternative_phone_no}
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
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="date_of_admission"
                      >
                        Date of Addmission
                      </label>
                      <input
                        id="date_of_admission"
                        type="date"
                        value={formik.values.date_of_admission}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.date_of_admission &&
                          formik.errors.date_of_admission
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.date_of_admission &&
                      formik.errors.date_of_admission && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.date_of_admission}
                        </p>
                      )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="reserve_category"
                      >
                        reserve category
                      </label>
                      <select
                        id="reserve_category"
                        type="text"
                        value={formik.values.reserve_category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.reserve_category &&
                          formik.errors.reserve_category
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <option value="">Select category</option>
                        <option value="gen">GEN</option>
                        <option value="obc">OBC</option>
                        <option value="sc">SC</option>
                        <option value="st">ST</option>
                      </select>
                    </div>
                    {formik.touched.reserve_category &&
                      formik.errors.reserve_category && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.reserve_category}
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

export default AddStudent;
