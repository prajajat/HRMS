import { NavLink } from "react-router-dom";

function ManagerSidebar() {
  return (
    <div className="flex flex-col h-full max-h-screen bg-blue-300  w-45  fixed top-15 left-0 ">
      <NavLink
        to="/manager/tarvel-document-detail"
        className={({ isActive }) =>
          isActive ? "text-indigo-700 m-3" : "text-blue-500 m-3"
        }
      >
        Team's documents
      </NavLink>
      <NavLink
        to="/manager/team-member"
        className={({ isActive }) =>
          isActive ? "text-indigo-700 m-3" : "text-blue-500 m-3"
        }
      >
        Team Members
      </NavLink>
    </div>
  );
}
export default ManagerSidebar;
