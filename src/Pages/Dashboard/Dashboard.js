import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center pt-4">
            <Outlet></Outlet>
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            
            <li><Link to="/dashboard">User Profile</Link></li>
            <li><Link to="/dashboard/createrequest">Create Request</Link></li>
            <li><Link to="/dashboard/approverequest">Approve Request</Link></li>
            <li><Link to="/dashboard/createlogistic">Create Logistic</Link></li>
            <li><Link to="/dashboard/createproduct">Create Product</Link></li>
            <li><Link to="/dashboard/users">All Users</Link></li>
            <li><Link to="/dashboard/requestproduct">Request Product</Link></li>
          </ul>
        
        </div>
      </div>
    );
};

export default Dashboard;