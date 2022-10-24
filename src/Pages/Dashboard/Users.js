import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Users = () => {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [users])

  const makeAdmin = email => {
    const admin = { email: email }
    axios.put('http://localhost:5000/users/admin', admin)
      .then(res => {
        console.log(res)
        if (res.data.modifiedCount) {
          toast.success("Admin made successfull!")

        }
        else {
          toast.error("Action Unsuccessfull")
        }


      })

  }

  const removeUser = email => {
    const procced = window.confirm("Are You Sure to Delete User?")


    if (procced) {
        fetch(`http://localhost:5000/users/${email}`, {
          method: "DELETE"
        })
        .then(res =>  res.json())
        .then(data =>{
          if(data.deletedCount > 0) 
               {
                  toast.info("User Removed!")
                  
               } 
        })
    }
  }
  return (
    <div>
      <ToastContainer></ToastContainer>
      <h2 className='text-4xl mb-5 text-center text-red-400 font-bold'>Total Users: {users.length} </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            {
              users.map(user => <tr>

                <td>{user.name} </td>
                <td> {user.email}</td>
                <td>{user.role}</td>
                <td> {user.role !== "admin" && <button onClick={() => makeAdmin(user.email)} className='btn btn-outline btn-accent'>Make admin</button>} </td>
                <td> {user.role !== "admin" && <button onClick={() => removeUser(user.email)} className='btn btn-outline btn-error'>Remove User</button>} </td>
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