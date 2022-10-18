import React, { useEffect, useState } from 'react';

const Users = () => {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [users])
  return (
    <div>
      <h2 className='text-2xl text-center text-red-400 font-bold'>Total Users: {users.length} </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>

            {
              users.map(user => <tr>

                <td>{user.name} </td>
                <td> {user.email}</td>
                <td>{user.role}</td>
              </tr>
              )
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;