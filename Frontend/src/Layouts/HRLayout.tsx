import { Outlet } from 'react-router-dom';
import HRSidebar from './HRSidebar';
import Header from '../Components/Header';

const HRLayout = () => {
  return (
    <div className="hr-layout">
      <Header />
      <div className="layout-container">
        <HRSidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default HRLayout;