import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <Link to="/dashboard" className="font-bold">Task Manager</Link>
      </div>
      <div>
        {user ? (
          <button onClick={logout} className="bg-red-500 px-2 py-1 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="px-2">Login</Link>
            <Link to="/register" className="px-2">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
