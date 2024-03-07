import AdminDashboard from "../DashBoard/AdminDashboard/AdminDashboard";
import NavbarMenu from "./NavbarMenu";
import SidebarMenu from "./SideBarMenu";

export default function Layout( {children }) {
  return (
    <>
        <div className="flex flex-col md:flex-row">
        <div>
          <SidebarMenu />
        </div>
        <div className="w-full">
          <NavbarMenu />
          <div className="p-5 w-full flex justify-center sm:justify-end">
          {children}
          </div>
        </div>
      </div>
    </>
  );
}
