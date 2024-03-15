import React from "react";
import Loader from "../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark } from "react-icons/fa6";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../student/ProfileCard";
import {
  clearErrors,
  clearMessage,
  getStudentById,
} from "../../redux/studentSlice";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rotate, setRotate] = useState(false);
  const { loading, error, message, student } = useSelector(
    (state) => state.student
  );

  console.log(id);
  const handleRefresh = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };
  useEffect(() => {
    dispatch(getStudentById(id));
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

  return (
    <section className="py-1  w-full m-auto">
      <div className="flex flex-wrap justify-between bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl font-semibold font-sans px-4 tracking-wider w-1/2">
          About {student?.student_name}
        </h6>
        <div className="w-1/2 flex gap-5 justify-end px-4 items-center">
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
          <div className="w-full  px-4 mt-4 py-4 bg-white">
            <ProfileCard student={student} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Details;
