import React, { useEffect, useState } from "react";
import "./Posts.css";

const Posts = () => {
  const [sellItems, setSellItems] = useState([]);
  const [roomPosts, setRoomPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Fetch selling posts
        const sellRes = await fetch("http://127.0.0.1:8000/api/selling_posts/");
        const sellData = await sellRes.json();
        setSellItems(sellData);

        // Fetch room/normal posts
        const roomRes = await fetch("http://127.0.0.1:8000/api/posts/");
        const roomData = await roomRes.json();
        setRoomPosts(roomData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading posts...</p>;
  }

  return (
    <div className="posts-wrapper">
      <h2>Marketplace & Room Sharing</h2>

      <div className="posts-grid">
        {/* Selling Posts */}
        {sellItems.map((item, index) => (
          <div key={index} className="post-card">
            <span className="tag sell">For Sale</span>
            <h3>{item.item_name}</h3>
            <p><strong>₹{item.price}</strong></p>
            <p>{item.description}</p>
            {item.image && (
              <img
                src={item.image}   // image from S3 or local media
                alt={item.item_name}
              />
            )}
          </div>
        ))}

        {/* Room Posts */}
        {roomPosts.map((room, index) => (
          <div key={`room-${index}`} className="post-card">
            <span className="tag room">Room</span>
            <h3>{room.title}</h3>
            <p>{room.description}</p>
            <p><strong>Rent:</strong> ₹{room.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
