import { NavLink } from "react-router-dom";

function EmployeeSidebar() {
  return (
 
      <div className="flex flex-col h-full bg-blue-300  w-30">
     
    
      <NavLink
        to="/employee/travel/details"
        className={({ isActive }) =>
          isActive ? "text-indigo-800 m-1" : "text-blue-500 m-1"
        }
      >
        Travel Details
      </NavLink>
      <NavLink
        to="/employee/game/details"
        className={({ isActive }) =>
          isActive ? "text-indigo-700 m-1" : "text-blue-500 m-1"
        }
      >
        Games
      </NavLink>

      <NavLink
        to="/employee/achievement/posts"
        className={({ isActive }) =>
          isActive ? "text-indigo-700 m-1" : "text-blue-500 m-1"
        }
      >
        Achievements
      </NavLink>

       <NavLink
        to="/employee/job/listing"
        className={({ isActive }) =>
          isActive ? "text-indigo-700 m-1" : "text-blue-500 m-1"
        }
      >
        Jobs Listing
      </NavLink>
       <NavLink
        to="/employee/job/referrals"
        className={({ isActive }) =>
          isActive ? "text-indigo-700 m-1" : "text-blue-500 m-1"
        }
      >
        Jobs Referrals
      </NavLink>
       <NavLink
        to="/employee/job/shares"
        className={({ isActive }) =>
          isActive ? "text-indigo-700 m-1" : "text-blue-500 m-1"
        }
      >
        Jobs Shares
      </NavLink>
    </div>
 
    
  );
}
export default EmployeeSidebar;
