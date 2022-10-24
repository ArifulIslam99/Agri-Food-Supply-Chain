import React from 'react';
import { ToastContainer } from 'react-toastify';
import useProduct from '../../hooks/useProduct';
import ReturnUser from './ReturnUser';

const MyRequest = () => {
    const { products } = useProduct();
    const { person } = ReturnUser();
    let myProduct = [];
    if(myProduct.length!==null)
    {
       if(person){
        for(const product of products){
            if(product.seller===person.email){
                myProduct.push(product)
            }
        }
       }
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
                <th>Approve Status</th>
                <th>Select Retailer</th>
                <th>Select Logistic</th>
                <th></th>
  
              </tr>
            </thead>
            <tbody>
  
              {
                myProduct.map(product => <tr>
  
                  <td><img className='w-24' src={`data:image/png;base64,${product.img}`} /></td>
                  <td>{product.name} </td>
                  <td>{product.status}</td>
                  <td></td>
                  <td></td>
                  <td><button className='btn btn-outline btn-sm btn-success'>Confirm </button></td>

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