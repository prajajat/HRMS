import { Outlet } from 'react-router-dom';
import EmployeeSidebar from './EmployeeSidebar';
import Header from '../Components/Header';

const EmployeeLayout = () => {
  return (
    <div className="employee-layout">
      <Header />
      <div className="layout-container">
        <EmployeeSidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;