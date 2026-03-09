import { NavLink } from "react-router-dom";

function HRSidebar() {
  return (
    <div className="flex flex-col h-full  bg-blue-300  w-45  fixed top-15 left-0  z-10">
      <NavLink
        to="/hr/travel/details"
        className={({ isActive }) =>
          isActive ? "text-indigo-700 m-3" : "text-blue-500 m-3"
        }
      >
        Travel Details
      </NavLink>
      <NavLink
        to="/hr/travel/expense"
        className={({ isActive }) =>
          isActive ? "text-indigo-700 m-3" : "text-blue-500 m-3"
        }
      >
        Travel Expense
      </NavLink>
      <NavLink
        to="/hr/travel/document"
        className={({ isActive }) =>
          isActive ? "text-indigo-700 m-3" : "text-blue-500 m-3"
        }
      >
        Travel Document
      </NavLink>

      <NavLink
        to="/hr/game/details"
        className={({ isActive }) =>
          isActive ? "text-indigo-700 m-3" : "text-blue-500 m-3"
        }
      >
        Game Config
      </NavLink>

      <NavLink
        to="/hr/achievement/posts"
        className={({ isActive }) =>
          isActive ? "text-indigo-700 m-3" : "text-blue-500 m-3"
        }
      >
        Achievements
      </NavLink>

      <NavLink
        to="/hr/job/dashboard"
        className={({ isActive }) =>
          isActive ? "text-indigo-700 m-3" : "text-blue-500 m-3"
        }
      >
        Jobs
      </NavLink>

      <NavLink
        to="/hr/system-config"
        className={({ isActive }) =>
          isActive ? "text-indigo-700 m-3" : "text-blue-500 m-3"
        }
      >
        System Configuration
      </NavLink>
    </div>
  );
}
export default HRSidebar;
