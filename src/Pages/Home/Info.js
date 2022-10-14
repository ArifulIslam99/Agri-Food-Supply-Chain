import React from 'react';
import InfoCard from './InfoCard';
import clock from "../../images/icons/alarm.png"
import delivery from "../../images/icons/delivery.png"
import map from "../../images/icons/map.png"

const Info = () => {
    return (
        <div className='grid pb-6 grid-cols-1 lg:grid-cols-3 gap-6 text-white'>
            <InfoCard cardText="We are ensuring the delivery 100% in real time procedings" bgClass="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" cardTitle="Real Time Service" img={clock}></InfoCard>
            <InfoCard cardText="Our Logistics are reliable and always active on service" bgClass="	bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 " cardTitle="Available Trasport" img={delivery}></InfoCard>
            <InfoCard cardText="Our Service is always close to your door wherever you are" bgClass="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" cardTitle="Anywhere in the Country" img={map}></InfoCard>
        </div>
    );
};

export default Info;