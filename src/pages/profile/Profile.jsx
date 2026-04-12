import React, { useMemo } from 'react';
import './profile.css';
import profile_banner from '../../assets/profile_banner.png';
import profile_pic from '../../assets/profile.jpg';
import Bids from '../../components/bids/Bids';
import { useParams } from 'react-router-dom';
import { MOCK_ITEMS, CREATORS } from '../../data/mockData';

const Profile = () => {
  const { id } = useParams();
  
  const creator = useMemo(() => {
    return CREATORS.find(c => c.name.toLowerCase() === (id || '').toLowerCase());
  }, [id]);

  const creatorItems = useMemo(() => {
    return MOCK_ITEMS.filter(item => item.creator && item.creator.name.toLowerCase() === (id || '').toLowerCase());
  }, [id]);

  const displayPic = creator ? creator.image : profile_pic;
  const displayName = creator ? creator.name : (id || 'Unknown Creator');

  return (
    <div className='profile section__padding'>
      <div className="profile-top">
        <div className="profile-banner">
          <img src={profile_banner} alt="banner" />
        </div>
        <div className="profile-pic">
            <img src={displayPic} alt="profile" style={{ objectFit: 'cover' }} />
            <h3>{displayName}</h3>
        </div>
      </div>
      <div className="profile-bottom">
        <div className="profile-bottom-input">
          <input type="text" placeholder='Search Item here' />
          <select>
            <option>Recently Listed</option>
            <option>Popular</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
        </div>
        <Bids title={`${displayName}'s Items`} items={creatorItems} />
      </div>
    </div>
  );
};

export default Profile;
