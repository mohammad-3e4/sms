import { getClasses } from "../redux/classesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
const Select = () => {
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.classes);
  const { user } = useSelector((state) => state.user);
  const [seletedClass, setSelectedClass] = useState([]);
  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  const classesWithId = classes?.filter((classObj) => {
    for (const key in classObj) {
      if (classObj.hasOwnProperty(key) && classObj[key] == user.staff_id) {
        return true;
      }
    }
    return false;
  });

  const currentClass = classes?.find((classObj) => {
    for (const key in classObj) {
      if (
        classObj.hasOwnProperty(key) &&
        classObj.class_name === seletedClass
      ) {
        return classObj;
      }
    }
    return false;
  });

  let subjects = [];

  for (const key in currentClass) {
    if (
      currentClass.hasOwnProperty(key) &&
      currentClass[key] == user.staff_id
    ) {
      subjects.push(key);
    }
  }
  console.log(subjects);
  return (
    <div className="flex w-full">
      <div className="w-full px-2">
        <div className="relative w-full mb-3">
          <label
            className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
            htmlFor="class_name"
          >
            Class
          </label>
          <select
            id="class_name"
            type="text"
            onChange={(e) => setSelectedClass(e.target.value)}
            className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 border-red-500`}
          >
            <option value="">Choose a class</option>
            {classesWithId?.map((clas, index) => (
              <option value={clas.class_name} key={index}>
                {clas.class_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full px-2">
        <div className="relative w-full mb-3">
          <label
            className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
            htmlFor="subject"
          >
            Subject
          </label>
          <select
            id="subject"
            type="text"
            className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 border-red-500`}
          >
            <option value="">Choose a subject</option>
            {subjects?.map((sub, index) => (
              <option value="A" key={index}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
export default Select;
