import { NavLink } from "react-router-dom";

function EmployeeSidebar(){
    return (<>EmployeeSidebar
             <NavLink to="/employee/travel/details" className={({ isActive}) => isActive ? "text-blue-700" : "text-blue-300"}> travel deatils</NavLink>
 
             </>);
}
export default EmployeeSidebar;