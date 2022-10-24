import { async } from '@firebase/util';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ReturnUser from './ReturnUser';

const CreateLogistic = () => {
    const [brandImage, setbrandImage] = useState(null)
    const [CompanyName, setCompanyName] = useState("")
    const [basePrice, setbasePrice] = useState("")
    const [fairPerKg, setfairPerKg] = useState("")
    const [fairPerKilo, setfairPerKilo] = useState("")

    const { person } = ReturnUser();

    const handleSubmit =  e => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("image", brandImage);
        formData.append("name", CompanyName);
        formData.append("fair_kg", fairPerKg);
        formData.append("basePrice", basePrice);
        formData.append("fair_kilo", fairPerKilo);
        formData.append("email", person.email)
        
        if (!brandImage) {
            toast.error("Image Not Found")
        }
        else{
            fetch("http://localhost:5000/distributors", {
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
                            <span className="label-text">Brand image</span>
                        </label>
                        <input type="file"
                            accept='image/*'
                            className="input w-full max-w-xs"
                            onChange={e => setbrandImage(e.target.files[0])}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Company Name</span>
                        </label>
                        <input type="text"
                            placeholder="Enter Company name"
                            onChange={e => setCompanyName(e.target.value)}
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Base Fair</span>
                        </label>
                        <input type="number"
                            placeholder="Minimum for any distance"
                            onChange={e => setbasePrice(e.target.value)}
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Fair Km</span>
                        </label>
                        <input type="number"
                            placeholder="Fair per Kilometre"
                            onChange={e => setfairPerKg(e.target.value)}
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Fair Weight</span>
                        </label>
                        <input type="text"
                            placeholder="Fair Per Kilogram"
                            onChange={e => setfairPerKilo(e.target.value)}
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    <input className="my-5 btn w-full max-w-xs" value="Upload" type="submit" />

                </div>


            </form>
        </div>
    );
};

export default CreateLogistic;