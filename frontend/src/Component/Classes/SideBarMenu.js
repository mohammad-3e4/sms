import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FiMenu } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { PiStudentBold, PiExam } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import {Link} from "react-router-dom"
import { LiaSchoolSolid } from "react-icons/lia";
import { BiLibrary } from "react-icons/bi";

const SidebarMenu = ({toggleSidebar}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [companyNameVisible, setCompanyNameVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
    setCompanyNameVisible(!collapsed);
    toggleSidebar();
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Assuming 768px is the breakpoint for mobile devices
    };

    checkIsMobile(); // Check initial width
    window.addEventListener("resize", checkIsMobile); // Listen to window resize for responsiveness
    return () => {
      window.removeEventListener("resize", checkIsMobile); // Clean up listener
    };
  }, []);

  return (
    <div
      className={`sidebar-wrapper ${
        collapsed && !isMobile ? "collapsed" : ""
      } fixed h-full overflow-y-auto z-10`}
    >
      <Sidebar
        collapsed={collapsed}
        width="20"
        className="tracking-widest font-sans text-xs text-gray-600 max-2xl:w-[250px]"
      >
        <div className="sidebar-header">
          {isMobile && (
            <div
              className="toggle-btn-mobile p-2"
              onClick={handleToggleCollapse}
            >
              <FiMenu />
            </div>
          )}
          {(!isMobile || (isMobile && !collapsed)) && (
            <div
              className={`company-name ${
                companyNameVisible ? "hidden" : ""
              } py-2`}
            >
              Skyway Technologies
            </div>
          )}
          {!isMobile && (
            <div className="toggle-btn p-2" onClick={handleToggleCollapse}>
              <FiMenu />
            </div>
          )}
        </div>
        {(!isMobile || (isMobile && !collapsed)) && (
          <Menu
            className={`text-gray-100 ${isMobile ? "hidden" : ""}`}
            iconShape="square"
            menuItemStyles={{
              button: {
                backgroundColor: "#233459",
                "&:hover": {
                  backgroundColor: "#3469a1",
                },
              },
            }}
          >
            <SubMenu
              label="Dashboard"
              icon={<MdOutlineDashboard className="text-yellow-600" />}
            >
              <Link to="/admin-dashboard"><MenuItem>Admin</MenuItem></Link>
              <Link to="/student-dashboard"><MenuItem>Student</MenuItem></Link>
              <Link to="/parent-dashboard"><MenuItem>Parent</MenuItem></Link>
            </SubMenu>
            <hr />
            <SubMenu
              label="Student"
              icon={<PiStudentBold className="text-yellow-600" />}
            >
               <Link to="/all/students"><MenuItem>All Student</MenuItem></Link>
               <Link to=""><MenuItem>Student Detail</MenuItem></Link>
               <Link to="/student/create"><MenuItem>Admission Form</MenuItem></Link>
               <Link to=""><MenuItem>Student Promotion</MenuItem></Link>
            </SubMenu>
            <hr />
            <SubMenu
              label="Teacher"
              icon={<GiTeacher className="text-yellow-600" />}
            >
              <Link to="/all/staff"></Link><MenuItem>All Teacher</MenuItem>
              <Link to="/"></Link><MenuItem>Teacher Detail</MenuItem>
              <Link to="/"></Link><MenuItem>Assign Teacher</MenuItem>
              <Link to="/staff/create"></Link><MenuItem>Add Teacher</MenuItem>
            </SubMenu>
            <hr />
            <SubMenu
              label="Classes"
              icon={<LiaSchoolSolid className="text-yellow-600" />}
            >
              <Link to="/editclasses"><MenuItem>Class Detail</MenuItem></Link>
              <Link to="/create-class"><MenuItem>Create Class</MenuItem></Link>
            </SubMenu>
            <hr />
            <SubMenu
              label="Library"
              icon={<BiLibrary className="text-yellow-600" />}
            >
              <MenuItem>All Books</MenuItem>
              <MenuItem>Issue Book</MenuItem>
              <MenuItem>Issued Book Detail</MenuItem>
              <MenuItem>Add New Book</MenuItem>
            </SubMenu>
            <hr />
            <SubMenu
              label="Result"
              icon={<PiExam className="text-yellow-600" />}
            >
              <MenuItem>Marks Detail</MenuItem>
              <MenuItem>Generate Report Card</MenuItem>
            </SubMenu>
            
            <hr />
            <SubMenu
              label="Dashboard"
              icon={<MdOutlineDashboard className="text-yellow-600" />}
            >
              <MenuItem>Admin</MenuItem>
              <MenuItem>Student</MenuItem>
              <MenuItem>Parent</MenuItem>
            </SubMenu>
            <hr />
            <SubMenu
              label="Student"
              icon={<PiStudentBold className="text-yellow-600" />}
            >
              <MenuItem>All Student</MenuItem>
              <MenuItem>Student Detail</MenuItem>
              <MenuItem>Admission Form</MenuItem>
              <MenuItem>Student Promotion</MenuItem>
            </SubMenu>
            <hr />
            <SubMenu
              label="Teacher"
              icon={<GiTeacher className="text-yellow-600" />}
            >
              <MenuItem>All Teacher</MenuItem>
              <MenuItem>Teacher Detail</MenuItem>
              <MenuItem>Assign Teacher</MenuItem>
              <MenuItem>Add Teacher</MenuItem>
            </SubMenu>
            <hr />
            <SubMenu
              label="Classes"
              icon={<LiaSchoolSolid className="text-yellow-600" />}
            >
              <MenuItem>Class Detail</MenuItem>
              <MenuItem>Create Class</MenuItem>
            </SubMenu>
            <hr />
            <SubMenu
              label="Library"
              icon={<BiLibrary className="text-yellow-600" />}
            >
              <MenuItem>All Books</MenuItem>
              <MenuItem>Issue Book</MenuItem>
              <MenuItem>Issued Book Detail</MenuItem>
              <MenuItem>Add New Book</MenuItem>
            </SubMenu>
            <hr />
            <SubMenu
              label="Result"
              icon={<PiExam className="text-yellow-600" />}
            >
              <MenuItem>Marks Detail</MenuItem>
              <MenuItem>Generate Report Card</MenuItem>
            </SubMenu>
          </Menu>
        )}
      </Sidebar>
    </div>
  );
};

export default SidebarMenu;
