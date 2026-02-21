import { NavLink } from "react-router-dom";

function HRSidebar() {
  return (
    <div className="flex flex-col h-full  bg-gray-100  w-30">
      HRSidebar
      <NavLink
        to="/hr/travel/details"
        className={({ isActive }) =>
          isActive ? "text-blue-700" : "text-blue-300"
        }
      >
        deatils
      </NavLink>
      <NavLink
        to="/hr/travel/expense"
        className={({ isActive }) =>
          isActive ? "text-blue-700" : "text-blue-300"
        }
      >
        expense
      </NavLink>
      <NavLink
        to="/hr/travel/document"
        className={({ isActive }) =>
          isActive ? "text-blue-700" : "text-blue-300"
        }
      >
        document
      </NavLink>

      <NavLink
        to="/hr/game/details"
        
        className={({ isActive }) =>
          isActive ? "text-blue-700" : "text-blue-300"
        }
      >
        Game Config
      </NavLink>
    </div>
  );
}
export default HRSidebar;
