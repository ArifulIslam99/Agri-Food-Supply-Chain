import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import ReturnUser from './ReturnUser';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { person } = ReturnUser();
    const { handleSubmit } = useForm();
    const showEdit = () => {
        const element = document.getElementById('ab');
        element.style.visibility = "visible";
    }
    const navigate = useNavigate()
    const ChanleRole = () => {
        var e = document.getElementById("ddlViewBy");
        var value = e.options[e.selectedIndex].value;
        fetch(`http://localhost:5000/user/role/${person.email}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ role: value})
        })
            .then(res => res.json())
            .then(data => {
                toast.success("Update Done")
                setTimeout(function(){
                    window.location.reload(false);
                  }, 3000); 
               

            })

    }

    return (
        <div className='columns-2'>
            <div className="avatar ">
                <div className="w-64  rounded-xl">
                    <img src="https://placeimg.com/192/192/people" />
                </div>
            </div>

            <div>
                {person && <div>

                    <p className='text-4xl text-orange-500 font-bold'>Name: {person.name} </p>
                    <p className='text-2xl font-bold'>Email: {person.email} </p>
                    <p className='text-2xl font-bold'>Role: {person.role} </p>

                    <button onClick={() => showEdit()} class="btn btn-outline my-2">Edit Role</button>


                    <div id="ab" className="form-control invisible">
                        <div className="input-group">
                            <select id="ddlViewBy" className="select select-bordered">
                                <option disabled selected>Pick Role</option>
                                <option value="importer">Importer</option>
                                <option value="producer">Producer</option>
                                <option value="logistic">Logistic</option>
                            </select>
                            <button onClick={() => ChanleRole()} className="btn">Update</button>
                            <ToastContainer />
                        </div>
                    </div>

                </div>}
            </div>
        </div>
    );
};

export default Profile; 