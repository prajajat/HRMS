import { NavLink } from "react-router-dom";

function HRSidebar(){
    return (<>HRSidebar
            <NavLink to="/hr/travel/details" className={({ isActive}) => isActive ? "text-blue-700" : "text-blue-300"}>deatils</NavLink>
            <NavLink to="/hr/travel/expense" className={({ isActive }) =>isActive ? "text-blue-700" : "text-blue-300"} >expense</NavLink>
            <NavLink to="/hr/travel/document" className={({ isActive }) =>isActive ? "text-blue-700" : "text-blue-300"}>document</NavLink>
             </>);
}
export default HRSidebar;