import React, { useEffect, useState } from 'react';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [products])
    return (
        <div>
            <h1 className='text-4xl text-center mb-5 font-bold text-orange-700'>Available Products</h1>
            <div className='columns-3 my-4 '>
            {
                products.map(pr => <div >
                    <div className=" card w-96 bg-base-100 shadow-xl">
                        <figure> 
                        <img src={`data:image/png;base64,${pr.img}`}/>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {pr.name.toUpperCase()}
                                <div className="badge badge-secondary">NEW</div>
                            </h2>
                            <p>Price: {pr.price} / {pr.unit}</p>
                            <p>Seller: {pr.seller}</p>
                            <div className="card-actions justify-end">
                                <div className="badge badge-outline"> {pr.status} </div>
                                <div className="badge badge-outline">Products</div>
                            </div>
                        </div>
                    </div>
                </div>)
            }
            </div>

      
        </div>
    );
};

export default AllProducts;