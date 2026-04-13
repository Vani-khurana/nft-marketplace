import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bids } from '../../components';
import { getNFTs } from '../../firebase';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const nfts = await getNFTs();
        setItems(nfts);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, items]);

  return (
    <div style={{ minHeight: '60vh' }}>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px', color: 'white' }}>Searching database...</div>
      ) : (
        <Bids title={`Search Results for "${query}"`} items={filteredItems} />
      )}
    </div>
  );
};

export default Search;
