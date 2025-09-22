import React, { useState } from 'react';
import './Roommates.css';

const Roommates = () => {
  const [location, setLocation] = useState('');
  const [rent, setRent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ location, rent, image });
    alert('Room listing posted successfully!');
    setLocation('');
    setRent('');
    setImage(null);
  };

  return (
    <div className="roommates-page-container">
      <div className="roommates-card">
        <h2>Post a Room for Sharing</h2>
        <form className="roommates-form" onSubmit={handleSubmit}>
          <label>
            Room Location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Hostel Block A, XYZ University"
              required
            />
          </label>

          <label>
            Monthly Rent (₹):
            <input
              type="number"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              placeholder="e.g., 5000"
              required
            />
          </label>

          <label>
            Upload Room Photo:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </label>

          <button type="submit">Post Room</button>
        </form>
      </div>
    </div>
  );
};

export default Roommates;
