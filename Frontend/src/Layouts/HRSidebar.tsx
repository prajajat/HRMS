import { NavLink } from "react-router-dom";

function HRSidebar() {
  return (
    <div className="flex flex-col h-full  bg-gray-100  w-30">
    
      <NavLink
        to="/hr/travel/details"
        className={({ isActive }) =>
          isActive ? "text-blue-700" : "text-blue-300"
        }
      >
       Travel Deatils
      </NavLink>
      <NavLink
        to="/hr/travel/expense"
        className={({ isActive }) =>
          isActive ? "text-blue-700" : "text-blue-300"
        }
      >
       Travel Expense
      </NavLink>
      <NavLink
        to="/hr/travel/document"
        className={({ isActive }) =>
          isActive ? "text-blue-700" : "text-blue-300"
        }
      >
        Travel Document
      </NavLink>

      <NavLink
        to="/hr/game/details"
        
        className={({ isActive }) =>
          isActive ? "text-blue-700" : "text-blue-300"
        }
      >
        Game Config
      </NavLink>

       <NavLink
        to="/hr/job/dashboard"
        
        className={({ isActive }) =>
          isActive ? "text-blue-700" : "text-blue-300"
        }
      >
        Jobs
      </NavLink>
    </div>
  );
}
export default HRSidebar;
