import React from 'react';

const Filter = ({ filter, setFilter, setSort }) => {
  return (
    <div className="border-b border-gray-500 mb-5 pb-5">
      <h2 className="font-bold mb-4">Filtro:</h2>
      <div className="flex justify-between gap-12">
        <div className="flex-1">
          <p className="mb-2">Status:</p>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="All">Todas</option>
            <option value="Completed">Completas</option>
            <option value="Incomplete">Incompletas</option>
          </select>
        </div>
        <div className="flex-1">
          <p className="mb-2">Order alfabética:</p>
          <div className="flex gap-2">
            <button
              onClick={() => setSort("Asc")}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Asc
            </button>
            <button
              onClick={() => setSort("Desc")}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Desc
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
