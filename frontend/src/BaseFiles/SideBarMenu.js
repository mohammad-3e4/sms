import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FiMenu } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { PiStudentBold, PiExam } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { LiaSchoolSolid } from "react-icons/lia";
import { BiLibrary } from "react-icons/bi";
import { Link } from "react-router-dom";

const SidebarMenu = ({ toggleSidebar }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [companyNameVisible, setCompanyNameVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
    setCompanyNameVisible(!collapsed);
    toggleSidebar();
  };

  useEffect(() => {}, []);

  return (
    <div
      className={`sidebar-wrapper ${
        collapsed && isMobile ? "collapsed" : ""
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
            className="bg-[#233459] text-gray-100"
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
              <MenuItem>Admin</MenuItem>
              <MenuItem>Student</MenuItem>
              <MenuItem>Parent</MenuItem>
            </SubMenu>
            <hr />
            <SubMenu
              label="Student"
              icon={<PiStudentBold className="text-yellow-600" />}
            >
              <Link to={`/all/students`}>
                <MenuItem>Students</MenuItem>
              </Link>

              <Link to="/student/create">
                <MenuItem>Admission Student</MenuItem>
              </Link>
              <MenuItem>Student Promotion</MenuItem>
            </SubMenu>
            <hr />
            <SubMenu
              label="Teacher"
              icon={<GiTeacher className="text-yellow-600" />}
            >
              <Link to={`/all/staff`}>
                <MenuItem>Staff</MenuItem>
              </Link>
              <Link to={`/teacher/assign`}>
                <MenuItem>Assign Teacher</MenuItem>
              </Link>
              <Link to={`/staff/create`}>
                <MenuItem>Add Teacher</MenuItem>
              </Link>
            </SubMenu>
            <hr />
      
            <SubMenu
              label="Classes"
              icon={<LiaSchoolSolid className="text-yellow-600" />}
            >
              <Link to="/class/edit"><MenuItem>Edit Class</MenuItem></Link>
              <Link to="/class/create"><MenuItem>Create Class</MenuItem></Link>
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
          </Menu>
        )}
      </Sidebar>
    </div>
  );
};

export default SidebarMenu;
