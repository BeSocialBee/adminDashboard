import React, { useState } from 'react';

const Delete = () => {
  const [formData, setFormData] = useState({
    id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with the form data, e.g., send it to the server
    console.log('Delete form submitted:', formData);
  };

  return (
    <div>
      <h1>Delete a Card</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Id</label>
        <br />
        <input
          type="number"
          name="id"
          placeholder="Enter id"
          value={formData.id}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Delete;