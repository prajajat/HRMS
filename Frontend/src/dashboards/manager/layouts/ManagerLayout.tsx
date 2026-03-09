import { Outlet } from "react-router-dom"; 
 
import ManagerSidebar from "./ManagerSidebar";
import Header from "../../../shared/components/Header";

const ManagerLayout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-row h-screen">
        <ManagerSidebar />
        <main className="w-full flex flex-col justify-items-center aline-item-center  ml-50 mt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ManagerLayout;
