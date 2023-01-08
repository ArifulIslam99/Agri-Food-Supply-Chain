import React, { useState } from 'react';
import FoodChain from "../../Ethereum/foodchain";
import web3 from '../../Ethereum/web3';

const Contracts = () => {
    fetchData();

    const [allRequest, setAllRequest] = useState([]);
    async function fetchData() {
        const newRequest = await FoodChain.methods.getDeployedRequest().call();
        setAllRequest(newRequest);
    }

    console.log(allRequest)
    return (
        <div>
            {allRequest.map(value =>
                <ul class="list-disc list-inside text-error font-semibold">
                    <li className='m-4'> {value} </li>
                </ul>
            )}
        </div>
    );
};

export default Contracts;