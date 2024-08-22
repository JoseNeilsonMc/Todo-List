import React from 'react';

const Search = ({ search, setSearch }) => {
  return (
    <div className="border-b border-gray-500 mb-5 pb-5">
      <h2 className="font-bold mb-4">Pesquisar:</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Digite para Pesquisar..."
        className="border p-2 rounded w-full"
      />
    </div>
  );
};

export default Search;
