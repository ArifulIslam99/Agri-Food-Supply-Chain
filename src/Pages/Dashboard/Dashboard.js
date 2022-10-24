import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [person, setPerson] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/user/${user.email}`)
      .then(res => res.json())
      .then(data => setPerson(data))
  }, [user])

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center m-16">
        <Outlet></Outlet>
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">

          {
            (person && person.role === "admin") &&

            <div>
              <li><Link to="/dashboard/users">All Users</Link></li>
              <li><Link to="/dashboard/approverequest">Approve Request</Link></li>
            </div>
          }
          {
            (person && person.role === "producer") &&

            <div>
              <li><Link to="/dashboard">User Profile</Link></li>
              <li><Link to="/dashboard/createrequest">Create Request</Link></li>
              <li><Link to="/dashboard/myrequests">My Requests</Link></li>
            </div>
          }
          {
            (person && person.role === "logistic") &&

            <div>
              <li><Link to="/dashboard">User Profile</Link></li>
              <li><Link to="/dashboard/createlogistic">Create Logistic</Link></li>
              <li><Link to="/dashboard/requestproduct">Request Product</Link></li>
            </div>
          }
          {
            (person && person.role === "importer") &&

            <div>
              <li><Link to="/dashboard">User Profile</Link></li>
              <li><Link to="/dashboard/requestproduct">Request Product</Link></li>
            </div>
          }



        </ul>

      </div>
    </div>
  );
};

export default Dashboard;