import { Outlet } from "react-router-dom";
import HRSidebar from "./HRSidebar";
import Header from "../Components/Header";

const HRLayout = () => {
  return (
    <div className="flex flex-col">
         <Header />
        <div className="flex flex-row">
       <HRSidebar />
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default HRLayout;
