import React from 'react';
import './Posts.css';

const Posts = () => {
  const sellItems = [
    {
      itemName: 'Study Table',
      price: '1500',
      description: 'Wooden study table in great condition',
      image: null,
    },
    {
      itemName: 'Laptop',
      price: '28000',
      description: 'Dell i5 11th Gen, used for 1 year',
      image: null,
    }
  ];

  const roomPosts = [
    {
      location: 'Hostel Block A, XYZ University',
      rent: '5000',
      image: null,
    },
   
  ];

  return (
    <div className="posts-wrapper">
      <h2>Marketplace & Room Sharing</h2>

      <div className="posts-grid">
        {sellItems.map((item, index) => (
          <div key={index} className="post-card">
            <h3>{item.itemName}</h3>
            <p><strong>₹{item.price}</strong></p>
            <p>{item.description}</p>
            {item.image && (
              <img
                src={typeof item.image === 'string' ? item.image : URL.createObjectURL(item.image)}
                alt="Item"
              />
            )}
          </div>
        ))}

        {roomPosts.map((room, index) => (
          <div key={`room-${index}`} className="post-card">
            <h3>Room for Sharing</h3>
            <p><strong>Location:</strong> {room.location}</p>
            <p><strong>Rent:</strong> ₹{room.rent}</p>
            {room.image && (
              <img
                src={typeof room.image === 'string' ? room.image : URL.createObjectURL(room.image)}
                alt="Room"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
