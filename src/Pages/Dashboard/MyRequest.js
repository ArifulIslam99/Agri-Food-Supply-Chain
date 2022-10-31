import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import useProduct from '../../hooks/useProduct';
import ReturnUser from './ReturnUser';
import Request from "../../Ethereum/request";
import web3 from '../../Ethereum/web3';

const MyRequest = () => {
  const { products } = useProduct();
  const { person } = ReturnUser();
  const [loading, setLoading] = useState(false);

  const finalizeReqest = async (id, contactAdrees) => {
    const accounts = await web3.eth.getAccounts();
    const request = Request(contactAdrees);


    try {
      setLoading(true)
      await request.methods.approveRetailerRequest(0, 0, 0)
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

      fetch(`http://localhost:5000/product/sold/${id}`, {
        method: 'PUT'
      }).then(res => res.json())
        .then(data => {
          if (data.modifiedCount > 0) {
            toast.success("Product sold");
          }
        })
    }
  }

  let myProduct = [];
  if (myProduct.length !== null) {
    if (person) {
      for (const product of products) {
        if (product.seller === person.email) {
          myProduct.push(product)
        }
      }
    }
  }
  return (
    <div>
      {
        (loading) && <button className="btn loading btn-success m-5">Transaction loading</button>
      }
      <ToastContainer></ToastContainer>
      <div className="overflow-x-auto">
        <table className="table w-full">

          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Approve Status</th>
              <th>Available Retailer</th>
              <th>Available Logistic</th>
              <th></th>

            </tr>
          </thead>
          <tbody>

            {
              myProduct.map(product => <tr>

                <td><img className='w-24' src={`data:image/png;base64,${product.img}`} /></td>
                <td>{product.name} </td>
                <td>{product.status}</td>
                <td>{product?.retailerAdress?.slice(0, 10)}...</td>
                <td> {product?.logisticAdress?.slice(0, 10)}...</td>
                <td><button onClick={() => finalizeReqest(product._id, product.contractAddress)} className='btn btn-outline btn-sm btn-success'>Confirm </button></td>

              </tr>
              )
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRequest;