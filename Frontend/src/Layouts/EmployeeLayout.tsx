import { Outlet } from "react-router-dom";
import EmployeeSidebar from "./EmployeeSidebar";
import Header from "../Components/Header";

const EmployeeLayout = () => {
  return (
    <div className="flex flex-col">
         <Header />
        <div className="flex flex-row">
        <EmployeeSidebar />
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
