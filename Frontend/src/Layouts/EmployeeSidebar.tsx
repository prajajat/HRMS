import { NavLink } from "react-router-dom";

function EmployeeSidebar() {
  return (
 
      <div className="flex flex-col h-full max-h-screen bg-gray-100  w-30">
        EmployeeSidebar
        <NavLink
          to="/employee/travel/details"
          className={({ isActive }) =>
            isActive ? "text-blue-700" : "text-blue-300"
          }
        >
    
          travel deatils
        </NavLink>
      </div>
 
  );
}
export default EmployeeSidebar;
