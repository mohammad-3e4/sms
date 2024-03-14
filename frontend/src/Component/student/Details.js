import React from "react";
import Loader from "../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark } from "react-icons/fa6";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, clearMessage} from "../../redux/staffSlice";
const Details = () => {
  const dispatch = useDispatch();
  const [rotate, setRotate] = useState(false);
  const {loading, error, message} = useSelector((state)=>state.staff)
  
  
  const handleRefresh = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };



  useEffect(()=>{
    if(error){
      setTimeout(() => {
        dispatch(clearErrors());
      }, 3000);
    }
    if(message){
  
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }

  },[error, message, loading])
  return (
    <section className="py-1  w-full m-auto">
      <div className="flex flex-wrap justify-between bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl font-semibold font-sans px-4 tracking-wider w-1/2">
          Details
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
             
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Details;
