import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
      {user ? (
        <div className="font-bold text-lg">Bem-vindo, {user.email}</div>
      ) : (
        <div className="font-bold text-lg">Bem-vindo, visitante</div>
      )}
      {user && (
        <button
          onClick={onLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
