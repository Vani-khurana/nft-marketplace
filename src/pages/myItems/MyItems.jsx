import React, { useState, useEffect, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { Bids } from '../../components';
import { getNFTs } from '../../firebase';

const MyItems = () => {
  const currentUser = localStorage.getItem("currentUser");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    const fetchItems = async () => {
      try {
        const nfts = await getNFTs();
        setItems(nfts);
      } catch (error) {
        console.error("Error fetching my items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [currentUser]);

  const myItems = useMemo(() => {
    if (!currentUser) return [];
    return items.filter((item) => item.creator && item.creator.name === currentUser);
  }, [currentUser, items]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ minHeight: '60vh' }}>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px', color: 'white' }}>Loading items from database...</div>
      ) : (
        <Bids title={`${currentUser}'s Items`} items={myItems} />
      )}
    </div>
  );
};

export default MyItems;
