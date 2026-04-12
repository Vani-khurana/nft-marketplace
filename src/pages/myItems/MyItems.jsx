import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { Bids } from '../../components';
import { MOCK_ITEMS } from '../../data/mockData';

const MyItems = () => {
  const currentUser = localStorage.getItem("currentUser");

  const myItems = useMemo(() => {
    if (!currentUser) return [];
    return MOCK_ITEMS.filter((item) => item.creator && item.creator.name === currentUser);
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ minHeight: '60vh' }}>
      <Bids title={`${currentUser}'s Items`} items={myItems} />
    </div>
  );
};

export default MyItems;
