import React from 'react';
import {Bids, Header, } from '../../components'
import { MOCK_ITEMS } from '../../data/mockData';

const Home = () => {
  return <div>
   <Header />
   <Bids title="Hot Bids" items={MOCK_ITEMS} />
  </div>;
};

export default Home;
