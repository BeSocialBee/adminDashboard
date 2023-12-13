import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './cardOperation.css';

const CardOperation = () => {
  const [cards, setCards] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch('/get');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Data from /get endpoint:', data);

      if (data.hasOwnProperty('cards')) {
        setCards(data.cards);
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/search_results/${searchName}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data.cards);
      setIsSearchClicked(true);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {

        const response = await fetch(`/delete/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Update the cards state after successful deletion
        setCards(cards.filter((card) => card.id !== id));

        // Log the success message from the server
        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error('Delete error:', error);
    }
};

  return (
    <div className="container">
      <h1>Card Operations</h1>

      {/* Search Form */}
      <div className="search-form">
        <form onSubmit={handleSearch}>
            <label htmlFor="searchName">Search:</label>
            <input
            type="text"
            id="searchName"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
      </div>
      {/* Search Results or All Cards */}
      <div className="table-container">
        <h2>{isSearchClicked ? 'Cards' : 'Cards'}:</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Collection</th>
              <th>Value</th>
              <th>Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isSearchClicked ? (
              searchResults.length > 0 ? (
                searchResults.map((card) => (
                  <tr key={card.id}>
                    <td>{card.name}</td>
                    <td>{card.collection}</td>
                    <td>{card.value}</td>
                    <td>{card.number}</td>
                    <td>
                      <Link to={`/update/${card.id}`}>
                            <button>Update</button>
                        </Link>
                        <button onClick={() => handleDelete(card.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No search results available.</td>
                </tr>
              )
            ) : (
              cards.map((card) => (
                <tr key={card.id}>
                  <td>{card.name}</td>
                  <td>{card.collection}</td>
                  <td>{card.value}</td>
                  <td>{card.number}</td>
                  <td>
                    <Link to={`/update/${card.id}`}>
                        <button>Update</button>
                    </Link>
                    <button onClick={() => handleDelete(card.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className='add-card'>
        <Link to="/add">
          <button className="button">Add Card</button>
        </Link>
      </div>
    </div>
  );
};

export default CardOperation;