import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
// import AdminHeader from '../../components/adminComponents/adminheader';
// import AdminSidebar from '../../components/adminComponents/adminsidebar';
import AdminHeader from '../../components/adminComponents/adminheader';
import AdminSidebar from '../../components/adminComponents/adminsidebar';
// import DashboardContent from '../../components/adminComponents/admindashboard';
const AdminDashboard = () => {
  const { logout } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
   
      <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
        <AdminHeader />
        
        <div className="flex flex-1 relative">
          <AdminSidebar />
          
          {/* Main Content area with padding to prevent overlap with mobile sidebar button */}
          <div className="flex-1 pb-16 md:pb-0">
            {/* <DashboardContent /> */}
          </div>
        </div>
      </div>
   
  );
};

export default AdminDashboard;