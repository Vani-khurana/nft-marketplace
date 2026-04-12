import React from 'react';
import './item.css';

import { useParams, Link } from 'react-router-dom';
import { MOCK_ITEMS } from '../../data/mockData';

const Item = () => {
  const { id } = useParams();
  const nft = MOCK_ITEMS.find((item) => item.id === id);

  if (!nft) {
    return <div className='item section__padding'><h1>Item not found</h1></div>;
  }

  return( 
      <div className='item section__padding'>
        <div className="item-image">
          <img src={nft.image} alt="item" />
        </div>
          <div className="item-content">
            <div className="item-content-title">
              <h1>{nft.title}</h1>
              <p>From <span>{nft.price} ETH</span> ‧ 20 of 25 available</p>
            </div>
            <div className="item-content-creator">
              <div><p>Creater</p></div>
              <Link to={`/profile/${nft.creator.name}`}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={nft.creator.image} alt="creator" />
                  <p>{nft.creator.name} </p>
                </div>
              </Link>
            </div>
            <div className="item-content-detail">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
            </div>
            <div className="item-content-buy">
              <button className="primary-btn">Buy For {nft.price} ETH</button>
              <button className="secondary-btn">Make Offer</button>
            </div>
          </div>
      </div>
  )
};

export default Item;
