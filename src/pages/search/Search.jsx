import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bids } from '../../components';
import { MOCK_ITEMS } from '../../data/mockData';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const filteredItems = useMemo(() => {
    return MOCK_ITEMS.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div style={{ minHeight: '60vh' }}>
      <Bids title={`Search Results for "${query}"`} items={filteredItems} />
    </div>
  );
};

export default Search;
