import React,{useEffect} from "react";
import { FaAngleDown, FaArrowsRotate, FaXmark } from "react-icons/fa6";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import Loader from "../../BaseFiles/Loader";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../BaseFiles/Select";
import { getStudents } from "../../redux/studentSlice";
const Attendance = () => {
  const [rotate, setRotate] = React.useState(false);
  const dispatch = useDispatch();
  const { loading, error, message, students } = useSelector(
    (state) => state.student
  );
  const { selectedClass } = useSelector((state) => state.classes);
  const currentUrl = window.location.href;
  useEffect(()=>{
  dispatch(getStudents(selectedClass))
  },[dispatch, selectedClass])

  function getAllDatesOfMonth() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dates = [];
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(new Date(year, month, day));
    }
    return dates;
  }

  const allDatesOfMonth = getAllDatesOfMonth();

  return (
    <section className="py-1  w-full m-auto">
      <div className="flex flex-wrap justify-between shadow bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl capitalize font-semibold font-sans px-4 tracking-wider w-1/3">
          {`${currentUrl.split("/")[3]}  ${currentUrl.split("/")[4]}`}
        </h6>
        <div className="w-2/3 flex gap-2 justify-end px-4 items-center">
          <Select class={true} />
          <div className="w-full px-2">
            <div className="relative w-full">
              <input
                id="search"
                name="search"
                placeholder="search..."
                type="text"
                className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 border-red-500`}
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 cursor-pointer">
                {/* <FaSearch
                  className="h-4 w-4 text-gray-600"
                  aria-hidden="true"
                /> */}
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
      {/* {message && <SuccessAlert message={message} />}
{error && <ErrorAlert error={error} />} */}
      <div
        className={`flex bg-white justify-center ${
          loading ? "h-[560px] items-center" : "h-full"
        }`}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="">
            <div className="bg-white border-b-2 max-w-full"></div>
            <table className=" max-w-full flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative overflow-x-auto shadow bg-white">
              <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <td scope="col" className=" p-2 text-xs">
                    <div className="flex items-center">Name</div>
                  </td>
                
                  <td scope="col" className=" p-2 text-xs">
                    <div className="flex items-center">Day</div>
                  </td>
                  {allDatesOfMonth.map((date, index) => (
                    <td
                      key={index}
                      scope="col"
                      className="text-xs p-2 "
                    >
                      <div className="flex items-center">
                        {new Date(date).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                <td scope="col" className=" p-2 text-xs">
                    <div className="flex items-center">Name</div>
                  </td>
                  <td scope="col" className=" text-xs p-2 border-b-2">
                    <div className="flex items-center ">Date</div>
                  </td>
             
                  {allDatesOfMonth.map((date, index) => (
                    <td
                      key={index}
                      scope="col"
                      className=" text-xs border-b-2 p-2"
                    >
                      <div className="flex items-center">
                        {new Date(date).getDate()}
                      </div>
                    </td>
                  ))}
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
                    <td
                      scope="row"
                      className="p-2 font-medium text-gray-900 whitespace-nowrap capitalize dark:text-white"
                    >
                      {student.student_name} 
                    </td>
                    <td
                      scope="row"
                      className="p-2 font-medium text-gray-900 whitespace-nowrap capitalize dark:text-white"
                    >
                     {student.roll_no}
                    </td>
                    {allDatesOfMonth.map((item)=>(   <td
                      scope="row"
                      className="p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >-
                    </td>))}
                 

                 
                  </tr>
                ))
              )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Attendance;
