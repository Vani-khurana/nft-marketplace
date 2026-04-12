import React from 'react'
import './bids.css'
import { AiFillHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Bids = ({title, items = []}) => {
  return (
    <div className='bids section__padding'>
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>{title}</h1>
        </div>
        <div className="bids-container-card">
          {items.map((item) => (
            <div className="card-column" key={item.id}>
              <div className="bids-card">
                <div className="bids-card-top">
                  <img src={item.image} alt={item.title} />
                  <Link to={`/item/${item.id}`}>
                    <p className="bids-title">{item.title}</p>
                  </Link>
                </div>
                <div className="bids-card-bottom">
                  <p>{item.price} <span>ETH</span></p>
                  <p> <AiFillHeart /> {item.likes}</p>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="bids-title">No items found.</p>}
        </div>
      </div>
    </div>
  )
}

export default Bids
