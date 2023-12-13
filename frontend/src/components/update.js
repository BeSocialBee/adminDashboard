import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateCard = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    collection: '',
    value: 0,
    number: 0,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch existing card data and update the form
    const fetchCardData = async () => {
      try {
        const response = await fetch(`/get/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        const cardData = responseData.card[0];

        // Check if cardData is not empty before accessing properties
        setFormData({
          name: cardData.name || '',  // Ensure it's not undefined
          collection: cardData.collection || '',
          value: cardData.value || 0,
          number: cardData.number || 0,
        });
      } catch (error) {
        console.error('Fetch error:', error);
        setMessage('Error fetching card data');
      }
    };

    fetchCardData();
  }, [id]);

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
      const response = await fetch(`/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: formData.name,
            collection: formData.collection,
            value: formData.value,
            number: formData.number,
          }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setMessage('Card updated successfully');
    } catch (error) {
      console.error('Update error:', error);
      setMessage('Error updating card');
    }
  };


  return (
    <div>
      <h1>Update Card</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="collection">Collection</label>
        <br />
        <input
          type="text"
          name="collection"
          value={formData.collection}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="value">Value</label>
        <br />
        <input
          type="number"
          name="value"
          value={formData.value}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="number">Number</label>
        <br />
        <input
          type="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateCard;