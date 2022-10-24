import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../firebase.init';
import useProduct from '../../hooks/useProduct';
import ReturnUser from '../Dashboard/ReturnUser';
const NewCollection = () => {

    const [user, loading, error] = useAuthState(auth);
    const [person, setPerson] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/user/${user.email}`)
            .then(res => res.json())
            .then(data => setPerson(data))
    }, [user])

    const { products } = useProduct();
    let approvedProduct = [];

    const logisticRequest = id => {
        fetch(`http://localhost:5000/product/addlogistic/${id}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({email: user.email})
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Request Send.")
                }
            })
    }
    const retailRequest = id => {
       
    }

    if (products.length !== null) {
        for (const product of products) {
            if (product.status === "approved") {
                approvedProduct.push(product)
            }
        }
    }

    if (!person) {
        <button type="button" class="bg-indigo-500 ..." disabled>
            <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
            </svg>
            Processing...
        </button>
    }
    return (
        <div className='mt-12'>
            <h1 className='text-4xl text-center mb-5 font-bold text-orange-700'>Available Products</h1>
            <div className='grid lg:grid-cols-3 sm:grid-cols-1  gap-4 my-4 '>
                {
                    approvedProduct.map(pr => <div>
                        <div className=" card w-96 bg-base-100 shadow-xl">
                            <figure>
                                <img className='object-cover h-72' src={`data:image/png;base64,${pr.img}`} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {pr.name.toUpperCase()}
                                    <div className="badge badge-secondary">NEW</div>
                                </h2>
                                <p>Price: {pr.price}Tk/ {pr.unit}</p>
                                <p>Seller: {pr.seller}</p>
                                <div className="card-actions justify-end">
                                    {(person.role === "logistic") ? <button onClick={() => logisticRequest(pr._id)} className="btn btn-warning btn-sm">Logistic Request</button> :
                                        <button onClick={() => retailRequest(pr._id)} className="btn btn-warning btn-sm">Retail Request</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>

         <ToastContainer/>
        </div>
    );
};

export default NewCollection;