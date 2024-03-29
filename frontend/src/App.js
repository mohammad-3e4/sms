import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./BaseFiles/Layout";
import AdminDashboard from "./DashBoard/AdminDashboard/AdminDashboard";
import NotFound from "../src/pages/NotFound";
import AdminLogin from "../src/pages/AdminLogin";
import ForgotPassword from "../src/pages/ForgotPassword";
import ResetPassword from "../src/pages/ResetPassword";
import AddStudent from "../src/Component/student/AddStudent";
import AddStaff from "./Component/staff/AddStaff";
import AllStudents from "./Component/student/AllStudents";
import AllStaff from "./Component/staff/AllStaff";
import Details from "./Component/student/Details";
import PrivateRoute from "./BaseFiles/PrivateRoutes";

import TeacherDetails from "./Component/staff/Details";
import AssignTeacher from "./Component/staff/AssignTeacher";
import CreateClass from "./Component/Classes/CreateClass";
import EditClass from "./Component/Classes/EditClass";
import Attendance from "./Component/student/Attendance";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route
            path="/admin/dashboard"
            element={
              <Layout>
                <AdminDashboard />
              </Layout>
            }
          />

          <Route
            path="/student/create"
            element={
              <Layout>
                <AddStudent />
              </Layout>
            }
          />
          <Route
            path="/staff/create"
            element={
              <Layout>
                <AddStaff />
              </Layout>
            }
          />
          <Route
            path="/all/students"
            element={
              <Layout>
                <AllStudents />
              </Layout>
            }
          />
          <Route
            path="/all/staff"
            element={
              <Layout>
                <AllStaff />
              </Layout>
            }
          />
          <Route
            path="/student/details/:id"
            element={
              <Layout>
                <Details />
              </Layout>
            }
          />
          <Route
            path="/staff/details/:id"
            element={
              <Layout>
                <TeacherDetails />
              </Layout>
            }
          />
          <Route
            path="/teacher/assign"
            element={
              <Layout>
                <AssignTeacher />
              </Layout>
            }
          />
          <Route
            path="/class/create"
            element={
              <Layout>
                <CreateClass />
              </Layout>
            }
          />
          <Route
            path="/class/edit"
            element={
              <Layout>
                <EditClass />
              </Layout>
            }
          />
          <Route
            path="/students/attendance"
            element={
              <Layout>
                <Attendance />
              </Layout>
            }
          />
        </Route>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
