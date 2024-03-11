import * as Yup from "yup";
export const addStudentValidation = Yup.object().shape({
    admission_no: Yup.string().required("Admission number is required"),
    student_name: Yup.string().required("Student name is required"),
    class_name: Yup.string().required("Class is required"),
    section: Yup.string().required("Section is required"),
    roll_no: Yup.string().required("Roll number is required"),
    father_name: Yup.string().required("Father's name is required"),
    mother_name: Yup.string().required("Mother's name is required"),
    date_of_birth: Yup.date().required("Date of birth is required"),
    address: Yup.string().required("Address is required"),
    alternative_phone_no: Yup.string().required(
      "Alternative phone number is required"
    ),
    father_occupation: Yup.string().required("Father's occupation is required"),
    mother_occupation: Yup.string().required("Mother's occupation is required"),
    religion: Yup.string().required("Religion is required"),
    reserve_category: Yup.string().required("Category is required"),
    quota: Yup.string(),
    date_of_admission: Yup.date().required("Date of admission is required"),
    height: Yup.number(),
    weight: Yup.number(),
    blood_group: Yup.string(),
    gender: Yup.string().required("Gender is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
    phone: Yup.string().required("Phone number is required"),
    ews: Yup.string(),
    bpl: Yup.string()
  });
export const addStaffValidation = Yup.object().shape({
    staff_name: Yup.string().required("Student name is required"),
    role: Yup.string().required("Role is required"),
    address: Yup.string().required("Address is required"),
    gender: Yup.string().required("Gender is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
    phone: Yup.string().required("Phone number is required"),
    religion: Yup.string().required("religion is required"),
    qualification: Yup.string().required("qualification is required"),
    experience: Yup.string().required("experience is required"),
    designation: Yup.string().required("designation is required"),
  });