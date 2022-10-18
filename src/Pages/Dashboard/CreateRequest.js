import { async } from '@firebase/util';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ReturnUser from './ReturnUser';

const CreateRequest = () => {
    const [productImage, setProductImage] = useState(null)
    const [productName, setProductName] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productUnit, setProductUnit] = useState("")

    const { person } = ReturnUser();

    const handleSubmit =  e => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("image", productImage);
        formData.append("name", productName);
        formData.append("price", productPrice);
        formData.append("description", productDescription);
        formData.append("unit", productUnit);
        formData.append("status", "pending")
        formData.append("email", person.email)
        
        if (!productImage) {
            toast.error("Image Not Found")
        }
        else{
            fetch("http://localhost:5000/products", {
                method: "POST",

                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    toast.success("Uploaded")
                })
            
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
        <div>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div className="form-control w-full max-w-xs">
                    <div>
                        <label className="label">
                            <span className="label-text">Product image</span>
                        </label>
                        <input type="file"
                            accept='image/*'
                            className="input w-full max-w-xs"
                            onChange={e => setProductImage(e.target.files[0])}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input type="text"
                            placeholder="Enter product name"
                            onChange={e => setProductName(e.target.value)}
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input type="text"
                            placeholder="write product description"
                            onChange={e => setProductDescription(e.target.value)}
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number"
                            placeholder="Enter product price"
                            onChange={e => setProductPrice(e.target.value)}
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Unit</span>
                        </label>
                        <input type="text"
                            placeholder="Ex: kg/ltr"
                            onChange={e => setProductUnit(e.target.value)}
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    <input className="my-5 btn w-full max-w-xs" value="Upload" type="submit" />

                </div>


            </form>
        </div>
    );
};

export default CreateRequest;