import React, { useState, useEffect } from 'react';
import {Bids, Header, } from '../../components'
import { MOCK_ITEMS } from '../../data/mockData';
import { getNFTs, bulkInsertMocks } from '../../firebase';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let nfts = await getNFTs();
        
        // If the database is entirely empty, seed it with MOCK_ITEMS for the first time
        if (nfts.length === 0) {
          await bulkInsertMocks(MOCK_ITEMS);
          nfts = await getNFTs();
        }
        
        setItems(nfts);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return <div>
   <Header />
   {loading ? (
     <div style={{ textAlign: 'center', padding: '50px', color: 'white' }}>Loading NFTs from Database...</div>
   ) : (
     <Bids title="Hot Bids" items={items} />
   )}
  </div>;
};

export default Home;
