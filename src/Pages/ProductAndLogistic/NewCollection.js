import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../firebase.init';
import useProduct from '../../hooks/useProduct';
import ReturnUser from '../Dashboard/ReturnUser';
import Request from "../../Ethereum/request";
import web3 from '../../Ethereum/web3';


const NewCollection = () => {

    const [user, error] = useAuthState(auth);
    const [person, setPerson] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/user/${user.email}`)
            .then(res => res.json())
            .then(data => setPerson(data))
    }, [user])

    const { products } = useProduct();
    let approvedProduct = [];

    const logisticRequest = async (id, contactAdrees) => {
        const accounts = await web3.eth.getAccounts();
        const request = Request(contactAdrees);
        console.log(contactAdrees);

        try {
            setLoading(true)
            await request.methods.logisticReqest(0)
                .send({
                    from: accounts[0]
                });
            toast.success("Transaction Successful. Requeest Send");
        } catch (err) {
            setLoading(false)
            toast.error(err.message)
        }
        finally {
            setLoading(false)
            fetch(`http://localhost:5000/product/addlogistic/${id}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ logisticAdress: accounts[0]})
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                  
                }
            })
        }

        
    }
    const retailRequest = async (id, contactAdrees) => {
        const accounts = await web3.eth.getAccounts();
        const request = Request(contactAdrees);
        console.log(contactAdrees);

        try {
            setLoading(true)
            await request.methods.retailerRequest(0)
                .send({
                    from: accounts[0]
                });
            toast.success("Transaction Successful. Requeest Send");
        } catch (err) {
            setLoading(false)
            toast.error(err.message)
        }
        finally {
            setLoading(false)
            fetch(`http://localhost:5000/product/addRetailer/${id}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ retailerAdress: accounts[0]})
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    
                }
            })
        }

    }

    if (products.length !== null) {
        for (const product of products) {
            if (product.status === "approved") {
                approvedProduct.push(product)
            }
        }
    }

    if (!person) {
        <button className="btn loading btn-success"> loading</button>
    }
    return (

        <div className='mt-12'>
            <ToastContainer></ToastContainer>
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

                                    {(person.role === "logistic") && <button onClick={() => logisticRequest(pr._id, pr.contractAddress)} className="btn btn-warning btn-sm">Logistic Request</button>

                                    }
                                    {
                                        (person.role == "importer") &&
                                        <button onClick={() => retailRequest(pr._id, pr.contractAddress)} className="btn btn-warning btn-sm">Retail Request</button>
                                    }
                                </div>
                            </div>

                        </div>

                    </div>)
                }
            </div>

            {
                (loading) && <button className="btn loading btn-success m-5">Transaction loading</button>
            }
            <ToastContainer />
        </div>
    );
};

export default NewCollection;