import React from "react";
import Loader from "../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark, FaEye } from "react-icons/fa6";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import { useEffect, useState } from "react";
 import TeacherClassesModal from "../../Component/staff/AssignTeacherModel";
import { Link } from "react-router-dom";
import {
  clearErrors,
  clearMessage,
  getStaff,
} from "../../redux/staffSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoSettingsOutline } from "react-icons/io5";
import { RiArrowUpDownLine } from "react-icons/ri";


const AssignTeacher = () => {
  const currentUrl = window.location.href;
  const [selectedTeacher, setSelectedTeacher] = useState(null)
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
    "Email",
    "Experience",
    "Join Date",
  ];


  const handleRefresh = () => {
    setRotate(!rotate);
  };

  const handleFilterByDate = () =>{

  }

  console.log(selectedTeacher);

  return (
    <section className="py-1  w-full m-auto">
      <div className="flex flex-wrap justify-between shadow bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl capitalize font-semibold font-sans px-4 tracking-wider w-1/2">
          {`${currentUrl.split("/")[3]}  ${currentUrl.split("/")[4]}`}
        </h6>
        <div className="w-1/2 flex gap-5 justify-end px-4 items-center">
        <RiArrowUpDownLine className="w-4 h-4 cursor-pointer text-gray-700 hover:text-gray-500" onClick={handleFilterByDate}/>
          <FaAngleDown className="text-yellow-700 cursor-pointer" />
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
                  <div className="flex items-center">Actions  </div>
                
                </th>
              </tr>
            </thead>
            <tbody>
              {staff?.filter((staf) => staf.staff_id !== user.staff_id)
                .length == 0 ? (
                <div className="text-center py-5">No data found</div>
              ) : (
                staff
                  ?.filter(
                    (staf) =>
                      staf.staff_id !== user.staff_id && staf.role === "teacher"
                  )
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
                        <Link to={`/staff/details/${member.staff_id}`}>
                          {member.staff_name}
                        </Link>
                      </td>
                      <td className="px-2 py-2">{member.gender}</td>
                      <td className="px-2 py-2">{member.designation}</td>
                
                
                      <td className="px-2 py-2">{member.email}</td>
                      <td className="px-2 py-2">{member.experience}</td>
                      <td className="px-2 py-2">{new Date(member.joining_date).toLocaleDateString()}</td>
                      <td className="px-2 py-4 flex gap-3 items-center ">
                        <IoSettingsOutline className="text-green-700 w-5 h-5 cursor-pointer hover:text-green-400" onClick={()=>setSelectedTeacher(member)} />
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        )}
        
 
      </div>
      {selectedTeacher && 
      (
        <TeacherClassesModal
          // Allclasses={Allclasses}
          selectedTeacher={selectedTeacher}
          // data={jsonData}
          // setJsonData={setJsonData}
          // onClose={closeClassModal}
          // teacherData={teacherData}
          // selectedTeacherName={selectedTeacherName}
        />
      )
    //  <h1>Hii</h1>
      }
    </section>
  );
};

export default AssignTeacher;
