import { Outlet } from "react-router-dom";
 
import HRSidebar from "./HRSidebar";
import Header from "../../../shared/components/Header";
 

const HRLayout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-row h-screen">
        <HRSidebar />
        <main className="w-full  ml-50 mt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default HRLayout;
