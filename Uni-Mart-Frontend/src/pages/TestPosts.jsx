import React from 'react';
import Posts from './Posts';

const TestPosts = () => {
  const hardcodedSellItems = [
    {
      itemName: 'Study Table',
      price: '1500',
      description: 'Wooden study table in great condition',
      image: null, // You can later set a local image file here
    },
    {
      itemName: 'Laptop',
      price: '28000',
      description: 'Dell i5 11th Gen, used for 1 year',
      image: null,
    }
  ];

  const hardcodedRoomPosts = [
    {
      location: 'Hostel Block A, XYZ University',
      rent: '5000',
      image: null,
    },
    {
      location: 'Flat near City Center',
      rent: '7000',
      image: null,
    }
  ];

  return (
    <Posts sellItems={hardcodedSellItems} roomPosts={hardcodedRoomPosts} />
  );
};

export default TestPosts;
