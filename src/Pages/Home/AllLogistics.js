import React, { useEffect, useState } from 'react';
import useLogistic from '../../hooks/useLogistic';
import ReturnUser from '../Dashboard/ReturnUser';

const AllLogistics = () => {
    // const [logistics, setlogistics] = useState([]);
    // useEffect(() => {
    //     fetch("http://localhost:5000/distributors")
    //         .then(res => res.json())
    //         .then(data => setlogistics(data))
    // }, [logistics])
    const {logistics} = useLogistic();
    return (
        <div className='mt-12'>
            <h1 className='text-4xl text-center mb-5 font-bold text-orange-700'>Available Logistics</h1>
            <div className='grid lg:grid-cols-3 sm:grid-cols-1  my-4 '>
            {
                logistics.map(pr => <div >
                    <div className=" card w-96 bg-base-100 shadow-xl">
                        <figure> 
                        <img className='object-cover h-72' src={`data:image/png;base64,${pr.img}`}/>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {pr.name.toUpperCase()}
                                <div className="badge badge-secondary">NEW</div>
                            </h2>
                            <p>Base Fair : {pr.basePrice} Taka</p>
                            <p>Per Kilometre: {pr.fair_kilo} Taka</p>
                            <p>Per Kilogram: {pr.fair_kg} Taka</p>
                            <p>Seller: {pr.seller}</p>
                            <div className="card-actions justify-end">
                                {/* <div className="badge badge-outline"> {pr.status} </div> */}
                                <div className="badge badge-outline">logistics</div>
                            </div>
                        </div>
                    </div>
                </div>).slice(0,6)
            }
            </div>

      
        </div>
    );
};

export default AllLogistics;