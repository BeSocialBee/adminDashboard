import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

import "./App.css";

import Home from './components/home.js';
import CardOperation from './components/cardOperation.js'
import Sidebar from './components/sidebar.js';
import AddCard from './components/add.js';
import UpdateCard from './components/update.js';
const App = () => {
  const [commonState, setCommonState] = useState('Initial State');

  return (
    <Router>
      <div>
        <Sidebar className='sidebar'>
            
        </Sidebar>

        <hr />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            {/*<Route path="/Collection Operation" element={<CollectionOperation />} />*/}
            <Route path="/CardOperation" element={<CardOperation />} />
            <Route path="/add" element={<AddCard />} />
            <Route path="/update/:id" element={<UpdateCard />} />
            /*<Route path="/User and Spin Operations" element={<cardOperation />} />*/
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;