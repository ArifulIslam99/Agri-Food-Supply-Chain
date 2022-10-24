import React from 'react';

const InfoCard = ({img, cardTitle, bgClass, cardText}) => {
    return (
        <div className={`card lg:card-side object-contain md:object-scale-down p-6 m-2 shadow-xl ${bgClass}`}>
        <figure><img src={img} alt="Album"/></figure>
        <div className="card-body">
          <h2 className="card-title">{cardTitle}</h2>
          <p> {cardText} </p>
        </div>
      </div>
    );
};

export default InfoCard;