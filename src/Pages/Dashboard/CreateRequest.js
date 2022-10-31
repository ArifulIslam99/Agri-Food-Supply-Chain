import { async } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ReturnUser from './ReturnUser';
import Request from "../../Ethereum/request";
import FoodChain from "../../Ethereum/foodchain";
import web3 from '../../Ethereum/web3';

const CreateRequest = () => {
    fetchData();
    const [productImage, setProductImage] = useState(null)
    const [productName, setProductName] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productUnit, setProductUnit] = useState("")
    const [loading, setLoading] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const { person } = ReturnUser();
    var addressIndex;
    var allRequest;

    async function fetchData() {
        allRequest = await FoodChain.methods.getDeployedRequest().call();
        const allRequestLength = allRequest.length;
        addressIndex = allRequestLength - 1;
    }

    async function createContract() {
        setLoading(true);
        const accounts = await web3.eth.getAccounts();

        try {
            await FoodChain.methods.createRequest()
                .send({
                    from: accounts[0]
                })
            toast.success("Contract Creation Successfull")
            window.location.reload();
        }
        catch (err) {
            toast.error(err.message);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }

    }

    const handleSubmit = async e => {
        e.preventDefault()
        setisLoading(true);
        const address = await allRequest[addressIndex];
        const accounts = await web3.eth.getAccounts();
        
        const formData = new FormData();
        formData.append("image", productImage);
        formData.append("name", productName);
        formData.append("price", productPrice);
        formData.append("description", productDescription);
        formData.append("unit", productUnit);
        formData.append("status", "pending");
        formData.append("contractAddress", address);
        formData.append("email", person.email);

        const request = Request(address);

        try {
            await request.methods.createInspectionRequest(
                productName,
                productDescription,
                productPrice,
                productUnit
            ).
                send({

                    from: accounts[0]
                });

        } catch (err) {
            setisLoading(false)
            toast.error(err.message)
        }
        finally {
            setisLoading(false)
        }


        if (!productImage) {
            toast.error("Image Not Found")
        }
        else {
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

        <button className="btn btn-square loading"></button>

    }
    return (
        <div>
            <ToastContainer />
            {
                (!loading) ? <button id="requestForm" onClick={() => createContract()} className='btn  btn-info'>Create a New Contract</button> : <button className="btn loading btn-success">Transaction loading</button>
            }
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control w-full max-w-xs">
                        <div className=''>
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
                        <div className='mb-2'>
                            <label className="label">
                                <span className="label-text">Unit</span>
                            </label>
                            <input type="text"
                                placeholder="Ex: kg/ltr"
                                onChange={e => setProductUnit(e.target.value)}
                                className="input input-bordered w-full max-w-xs" />
                        </div>
                        {
                            (!isLoading) ? <input className="my-5 btn w-full max-w-xs" value="Upload" type="submit" /> : <button className="btn loading btn-success">Transaction loading</button>
                        }

                    </div>


                </form>
            </div>
        </div>
    );
};

export default CreateRequest;