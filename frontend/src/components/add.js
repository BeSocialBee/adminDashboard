import React, { useState } from 'react';
import "./add.css";
const AddCard = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    collection: '',
    value: '',
    number: '',
  });

  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/add', {
        method: 'POST',
        body: new URLSearchParams(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setFormData({
        name: '',
        collection: '',
        value: '',
        number: '',
      });
      // Log the success message from the server
      const result = await response.json();
      setMessage(result.message);
      
      // Redirect to the card operations page after successful addition
    } catch (error) {
      console.error('Add error:', error);
    }
  };

  return (
    <div>
      <h1>Add Card</h1>
      <form className='form' onSubmit={handleSubmit}>

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="collection">Collection:</label>
        <input
          type="text"
          id="collection"
          name="collection"
          value={formData.collection}
          onChange={handleChange}
          required
        />

        <label htmlFor="value">Value:</label>
        <input
          type="number"
          id="value"
          name="value"
          value={formData.value}
          onChange={handleChange}
          required
        />

        <label htmlFor="number">Number:</label>
        <input
          type="number"
          id="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Card</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCard;