import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1>Collectify</h1>
      <Link to="/">Home</Link>
      <Link to="/CollectionOperation">Collection Operations</Link>
      <Link to="/CardOperation">Card Operations</Link>
      {/* Add more links for other pages */}
    </div>
  );
};

export default Sidebar;