import { NavLink } from "react-router-dom";

function EmployeeSidebar() {
  return (
    <div className="flex flex-col h-full bg-gray-100  w-30">
      
      <NavLink
        to="/employee/travel/details"
        className={({ isActive }) =>
          isActive ? "text-blue-700" : "text-blue-300"
        }
      >
        Travel Details
      </NavLink>
      <NavLink
        to="/employee/game/details"
        className={({ isActive }) =>
          isActive ? "text-blue-700" : "text-blue-300"
        }
      >
        Games
      </NavLink>

       <NavLink
        to="/employee/job/listing"
        className={({ isActive }) =>
          isActive ? "text-blue-700" : "text-blue-300"
        }
      >
        Jobs Listing
      </NavLink>
       <NavLink
        to="/employee/job/referrals"
        className={({ isActive }) =>
          isActive ? "text-blue-700" : "text-blue-300"
        }
      >
        Jobs Referrals
      </NavLink>
       <NavLink
        to="/employee/job/shares"
        className={({ isActive }) =>
          isActive ? "text-blue-700" : "text-blue-300"
        }
      >
        Jobs Shares
      </NavLink>
    </div>
  );
}
export default EmployeeSidebar;
