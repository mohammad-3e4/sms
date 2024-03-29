import React from "react";
import Loader from "../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark } from "react-icons/fa6";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  clearErrors,
  clearMessage,
  getStaffById,
} from "../../redux/staffSlice";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rotate, setRotate] = useState(false);
  const { loading, error, message, member } = useSelector(
    (state) => state.staff
  );

  const handleRefresh = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };
  useEffect(() => {
    dispatch(getStaffById(id));
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
          About {member?.staff_name}
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
          <FaXmark className="text-red-700 cursor-pointer" onClick={()=>navigate('/all/staff')} />
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
            <div className="h-auto text-sm tracking-wide ">
              <div className="flex">
                <div className="w-1/4 ">
                  <img className="max-w-full" src="/teacherimg.webp" />
                </div>
                <div className="flex w-3/4  justify-between mx-5 ">
                  <div className="w-1/2 ml-12 font-sans">
                    <ul className="capitalize tracking-widest">
                      <li className="p-1 ">
                        <span className=" bg-gray-500 rounded-full text-white px-4">
                          Name
                        </span>
                      </li>
                      <li className="p-1">
                        <span className=" bg-gray-500 rounded-full text-white px-4">
                          Gender
                        </span>
                      </li>
                      <li className="p-1">
                        <span className=" bg-gray-500 rounded-full text-white px-4">
                          Role
                        </span>
                      </li>
                      <li className="p-1">
                        {" "}
                        <span className=" bg-gray-500 rounded-full text-white px-4">
                        qualification
                        </span>
                      </li>
                      <li className="p-1">
                        {" "}
                        <span className=" bg-gray-500 rounded-full text-white px-4">
                          Joining Date
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-1/2 capitalize font-sans font-semibold text-gray-700">
                    <ul>
                      <li className="p-1">{member?.staff_name}</li>
                      <li className="p-1">{member?.gender}</li>
                      <li className="p-1">{member?.role}</li>
                      <li className="p-1">{member?.qualification}</li>
                      <li className="p-1">
                        {new Date(member?.joining_date).toLocaleDateString()}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr className="my-10" />
              <div className="flex flex-wrap md:flex-nowrap">
                <div className="flex w-1/2 justify-between mx-5 my-2 text-xs border-r-4 ">
                  <ul className="font-semibold">
                    <li className="p-1">Email : </li>
                    <li className="p-1">Experience: </li>
                    <li className="p-1">class : </li>
                    <li className="p-1">Subject : </li>
                    <li className="p-1">Address : </li>
             
                  </ul>
                  <ul className="text-end px-3">
                    <li className="p-1">{member?.email}</li>
                    <li className="p-1">
                      {member?.experience}
                    </li>
                    <li className="p-1">{5}</li>
                    <li className="p-1">{'Hindi, English'}</li>
                    <li className="p-1">{member?.address}</li>
                  
                  </ul>
                </div>
                <div className="flex w-1/2 justify-between capitalize mx-5 my-2 text-xs border-r-4">
                  <ul className="font-semibold">
                    <li className="p-1">Phone: </li>
                    <li className="p-1">Religion : </li>
                    <li className="p-1">Account No.: </li>
                    <li className="p-1">IFSC Code : </li>
                
                  </ul>
                  <ul className="text-end px-3">
                  <li className="p-1">{member?.phone}</li>
                    <li className="p-1">{member?.religion}</li>
                    <li className="p-1">{member?.bank_account_number}</li>
                    <li className="p-1">{member?.ifsc_code}</li>
               
                  </ul>
                </div>
              
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Details;
