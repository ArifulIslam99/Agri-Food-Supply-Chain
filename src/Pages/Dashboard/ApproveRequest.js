import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import useProduct from '../../hooks/useProduct';


const ApproveRequest = () => {

  const {products} = useProduct();

  const approveRequest = (id) => {
    fetch(`http://localhost:5000/product/${id}`, {
      method: 'PUT'
    }).then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success("Product Approved By Inspector.")
        }
      })
  }
  return (
    <div>
      <ToastContainer></ToastContainer>
      <div className="overflow-x-auto">
        <table className="table w-full">

          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Seller Email Address</th>
              <th>Approve Status</th>
              <th></th>

            </tr>
          </thead>
          <tbody>

            {
              products.map(product => <tr>

                <td><img className='w-24' src={`data:image/png;base64,${product.img}`} /></td>
                <td>{product.name} </td>
                <td> {product.price} Taka/{product.unit}</td>
                <td>{product.seller}</td>
                <td>{product.status}</td>
                <td>{
                  product.status!=="approved" &&
                  <button onClick={() => approveRequest(product._id)} className="btn btn-outline btn-info">Approve</button>
                  }</td>
              </tr>
              )
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRequest;