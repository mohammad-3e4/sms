import React, { useEffect, useState } from "react";
import {
  FaAngleDown,
  FaArrowsRotate,
  FaXmark,
  FaArrowRightLong,
  FaCheck,
} from "react-icons/fa6";
import Loader from "../../BaseFiles/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  setAbsent,
  setPresent,
  getEntries,
  getStaff,
  clearMessage
} from "../../redux/staffSlice";
import { getAllDatesOfMonth } from "../../actions";

const StaffAttendance = () => {
  const [rotate, setRotate] = useState(false);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const dispatch = useDispatch();
  const { loading, error, message, staff, absents } = useSelector(
    (state) => state.staff
  );
  const { user } = useSelector((state) => state.user);
  const currentUrl = window.location.href;

  useEffect(() => {
    dispatch(getStaff());
    dispatch(getEntries());
    if (message) {
      dispatch(clearMessage());
    }
  }, [dispatch, message]);

  const { dates, monthName } = getAllDatesOfMonth(selectedMonth, 2024);

  const handleAttendance = async (staff_id, day) => {
    dispatch(setAbsent({ staffId: staff_id, day: day }));
  };
  const handlePresent = async (staff_id, day) => {

    dispatch(setPresent({ staffId: staff_id, day: day }));
  };

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <section className="py-1 w-full m-auto">
      <div className="flex flex-wrap justify-between shadow bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl capitalize font-semibold font-sans px-4 tracking-wider w-1/3">
          {`${currentUrl.split("/")[3]}  ${currentUrl.split("/")[4]}`}
        </h6>
        <div className="w-2/3 flex gap-2 justify-end px-4 items-center">
          <div className=" text-xs w-1/2 font-sans tracking-wider">
            Month{" "}
            <select
              className={`border-0 px-2 w-1/2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none ease-linear transition-all duration-150`}
              value={selectedMonth}
              onChange={handleChange}
            >
              {[...Array(12).keys()].map((index) => (
                <option key={index} value={index}>
                  {new Date(0, index).toLocaleString("default", {
                    month: "short",
                  })}
                </option>
              ))}
            </select>
            - Year: {new Date().getFullYear()}
          </div>

          <FaAngleDown className="text-yellow-700 cursor-pointer" />
          <FaArrowsRotate
            className={`text-green-700 cursor-pointer ${
              rotate
                ? "rotate-180 transition-transform duration-1000"
                : "transition-transform"
            }`}
          />
          <FaXmark className="text-red-700 cursor-pointer" />
        </div>
      </div>

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
            <table className="max-w-full flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative overflow-x-auto shadow bg-white">
              <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <td scope="col" className="py-1 text-xs">
                    <div className="flex items-center"></div>
                  </td>

                  <td
                    scope="col"
                    className="py-1 text-xs flex items-center justify-between"
                  >
                    <div>Day</div> <FaArrowRightLong />
                  </td>
                  {dates.map((date, index) => (
                    <td key={index} scope="col" className="text-xs p-1  ">
                      <div className="flex items-center">
                        {new Date(date).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td scope="col" className="p-1 text-xs">
                    <div className="flex items-center">Name</div>
                  </td>
                  <td
                    scope="col"
                    className="text-xs py-1 flex items-center gap-2 justify-between"
                  >
                    <div>Date </div>
                    <FaArrowRightLong />
                  </td>

                  {dates.map((date, index) => (
                    <td
                      key={index}
                      scope="col"
                      className="text-xs border-b-2 p-1"
                    >
                      <div className="flex items-center">
                        {new Date(date).getDate()}
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {absents?.length === 0 && staff?.length === 0 ? (
                  <tr>
                    <td className="text-center py-5" colSpan={dates.length + 2}>
                      No data found
                    </td>
                  </tr>
                ) : (
                  staff?.map((staf) => (
                    <tr
                      key={staf.email}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="p-1 whitespace-nowrap capitalize dark:text-white">
                        {staf.staff_name}
                      </td>
                      <td className="p-1 whitespace-nowrap capitalize dark:text-white">
                        {staf.staff_id}
                      </td>
                      {dates.map((day, index) => {
                        const isAttended = absents?.some(
                          (record) =>
                            record.staff_id === staf.staff_id &&
                            record.absent_date === day.toString()
                        );
                      
                        return (
                          <td
                            key={index}
                            className="p-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {isAttended ? (
                              <FaXmark
                                className="text-red-700 cursor-pointer"
                                onClick={() =>
                                  handlePresent(staf.staff_id, day.toString())
                                }
                              />
                            ) : (
                              <FaCheck
                                className="text-green-700 cursor-pointer"
                                onClick={() =>
                                  handleAttendance(staf.staff_id, day.toString())
                                }
                              />
                            )}
                          </td>
                        );
                      })}
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

export default StaffAttendance;
