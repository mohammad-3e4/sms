import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu ,sidebarClasses} from 'react-pro-sidebar';
import { FiMenu} from 'react-icons/fi';
import { MdOutlineDashboard } from "react-icons/md";
import { PiStudentBold,PiExam  } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { LiaSchoolSolid } from "react-icons/lia";
import { BiLibrary } from "react-icons/bi";


const SidebarMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth <= 768);
      setCollapsed(screenWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar-wrapper ${collapsed && !isMobile ? 'collapsed' : ''}`}>
    <Sidebar collapsed={collapsed && !isMobile} rootStyles={{
    [`.${sidebarClasses.container}`]: {
      backgroundColor: 'red',
    },
  }}>
      <div className="sidebar-header">
        <div className={`company-name ${!isMobile && collapsed ? 'hidden' : ''}`}>
          GNK Khalsa
        </div>
        <div className="toggle-btn p-2" onClick={handleToggleCollapse}>
          <FiMenu />
        </div>
      </div>
        {(!isMobile || (isMobile && !collapsed)) && (
          <Menu className='bg-indigo-900 w-auto text-gray-100' iconShape="square">
            <SubMenu label="Dashboard" icon={ <MdOutlineDashboard />}>
              <MenuItem >Admin</MenuItem>
              <MenuItem>Student</MenuItem>
              <MenuItem>Parent</MenuItem>
            </SubMenu>
            <hr/>
            <SubMenu label="Student" icon={<PiStudentBold /> }>
              <MenuItem>All Student</MenuItem>
              <MenuItem>Student Detail</MenuItem>
              <MenuItem>Admission Form</MenuItem>
              <MenuItem>Student Promotion</MenuItem>
            </SubMenu>
            <hr/>
            <SubMenu label="Teacher" icon={<GiTeacher />}>
              <MenuItem>All Teacher</MenuItem>
              <MenuItem>Teacher Detail</MenuItem>
              <MenuItem>Assign Teacher</MenuItem>
              <MenuItem>Add Teacher</MenuItem>
            </SubMenu>
            <hr/>
            <SubMenu label="Classes" icon={<LiaSchoolSolid />}>
              <MenuItem>Class Detail</MenuItem>
              <MenuItem>Create Class</MenuItem>
            </SubMenu>
            <hr/>
            <SubMenu label="Library" icon={<BiLibrary />}>
              <MenuItem>All Books</MenuItem>
              <MenuItem>Issue Book</MenuItem>
              <MenuItem>Issued Book Detail</MenuItem>
              <MenuItem>Add New Book</MenuItem>
            </SubMenu>
            <hr/>
            <SubMenu label="Result" icon={<PiExam />}>
              <MenuItem>Marks Detail</MenuItem>
              <MenuItem>Generate Report Card</MenuItem>
            </SubMenu>
            <hr/>
             <SubMenu label="Dashboard" icon={ <MdOutlineDashboard />}>
              <MenuItem >Admin</MenuItem>
              <MenuItem>Student</MenuItem>
              <MenuItem>Parent</MenuItem>
            </SubMenu>
            <hr/>
            <SubMenu label="Student" icon={<PiStudentBold /> }>
              <MenuItem>All Student</MenuItem>
              <MenuItem>Student Detail</MenuItem>
              <MenuItem>Admission Form</MenuItem>
              <MenuItem>Student Promotion</MenuItem>
            </SubMenu>
            <hr/>
            <SubMenu label="Teacher" icon={<GiTeacher />}>
              <MenuItem>All Teacher</MenuItem>
              <MenuItem>Teacher Detail</MenuItem>
              <MenuItem>Assign Teacher</MenuItem>
              <MenuItem>Add Teacher</MenuItem>
            </SubMenu>
            <hr/>
            <SubMenu label="Classes" icon={<LiaSchoolSolid />}>
              <MenuItem>Class Detail</MenuItem>
              <MenuItem>Create Class</MenuItem>
            </SubMenu>
            <hr/>
            <SubMenu label="Library" icon={<BiLibrary />}>
              <MenuItem>All Books</MenuItem>
              <MenuItem>Issue Book</MenuItem>
              <MenuItem>Issued Book Detail</MenuItem>
              <MenuItem>Add New Book</MenuItem>
            </SubMenu>
            <hr/>
            <SubMenu label="Result" icon={<PiExam />}>
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
