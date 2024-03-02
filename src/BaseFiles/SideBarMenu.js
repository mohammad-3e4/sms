import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FiMenu, FiPackage } from 'react-icons/fi';

const SidebarMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [companyNameVisible, setCompanyNameVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
    setCompanyNameVisible(!collapsed); 
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setCollapsed(true); 
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`sidebar-wrapper ${collapsed && isMobile ? 'collapsed' : ''} bg-gray-100`}>
      <Sidebar collapsed={collapsed}>
        <div className="sidebar-header">
          {!isMobile && (
            <div className="toggle-btn p-2" onClick={handleToggleCollapse}>
              <FiMenu />
            </div>
          )}
          {isMobile && (
            <div className="toggle-btn-mobile p-2" onClick={handleToggleCollapse}>
              <FiMenu />
            </div>
          )}
          {(!isMobile || (isMobile && !collapsed)) && (
            <div className={`company-name ${companyNameVisible ? 'hidden' : ''} py-2`}>
              GNK Khalsa
            </div>
          )}
        </div>
        {(!isMobile || (isMobile && !collapsed)) && (
          <Menu className='bg-gray-400 w-auto' iconShape="square">
            <SubMenu label="Dashboard" icon={<FiPackage />}>
              <MenuItem>Admin</MenuItem>
              <MenuItem>Student</MenuItem>
              <MenuItem>Parent</MenuItem>
            </SubMenu>
            <SubMenu label="Student" icon={<FiPackage />}>
              <MenuItem>All Student</MenuItem>
              <MenuItem>Student Detail</MenuItem>
              <MenuItem>Admission Form</MenuItem>
              <MenuItem>Student Promotion</MenuItem>
            </SubMenu>
            <SubMenu label="Teacher" icon={<FiPackage />}>
              <MenuItem>All Teacher</MenuItem>
              <MenuItem>Teacher Detail</MenuItem>
              <MenuItem>Assign Teacher</MenuItem>
              <MenuItem>Add Teacher</MenuItem>
            </SubMenu>
            <SubMenu label="Classes" icon={<FiPackage />}>
              <MenuItem>Class Detail</MenuItem>
              <MenuItem>Create Class</MenuItem>
            </SubMenu>
            <SubMenu label="Library" icon={<FiPackage />}>
              <MenuItem>All Books</MenuItem>
              <MenuItem>Issue Book</MenuItem>
              <MenuItem>Issued Book Detail</MenuItem>
              <MenuItem>Add New Book</MenuItem>
            </SubMenu>
            <SubMenu label="Result" icon={<FiPackage />}>
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
