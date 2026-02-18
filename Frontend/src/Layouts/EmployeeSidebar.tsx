import { NavLink } from "react-router-dom";

function EmployeeSidebar() {
  return (
    <div className="flex flex-col h-full bg-gray-100  w-30">
      EmployeeSidebar
      <NavLink
        to="/employee/travel/details"
        className={({ isActive }) =>
          isActive ? "text-blue-700" : "text-blue-300"
        }
      >
        travel deatils
      </NavLink>
      <NavLink
        to="/employee/game/details"
        className={({ isActive }) =>
          isActive ? "text-blue-700" : "text-blue-300"
        }
      >
        Games
      </NavLink>
    </div>
  );
}
export default EmployeeSidebar;
