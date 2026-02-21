import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
 

const NotificationLayout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-row h-screen">
        
        <main className="w-full flex flex-col justify-items-center aline-item-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default NotificationLayout;
