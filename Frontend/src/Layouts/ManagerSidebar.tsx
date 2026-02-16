import { NavLink } from "react-router-dom";

function ManagerSidebar() {
  return (
 
      <div className="flex flex-col h-full max-h-screen bg-gray-100  w-30">
        ManagerSidebar

        <NavLink
          to="/manager/tarvel-document-detail"
          className={({ isActive }) =>
            isActive ? "text-blue-700" : "text-blue-300"
          }
        >
    
          team member's travel documents 
        </NavLink>
      </div>
 
  );
}
export default ManagerSidebar;