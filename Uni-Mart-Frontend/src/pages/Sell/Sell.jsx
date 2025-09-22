import React, { useState } from "react";
import "./Sell.css";   // Import the external CSS file

export default function Sell() {
  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    description: "",
    category: "books", // Default category
    photo: null,
  });
  const [isPosting, setIsPosting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      photo: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setIsPosting(true);

    const token = localStorage.getItem("authToken");
    if (!token) {
      setStatusMessage("Please log in to post an item.");
      setIsPosting(false);
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append("item_name", formData.itemName);
    dataToSend.append("price", formData.price);
    dataToSend.append("description", formData.description);
    dataToSend.append("item_category", formData.category);
    if (formData.photo) {
      dataToSend.append("image", formData.photo);
    }

    try {
      const response = await fetch("http://localhost:8000/api/selling_posts/", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: dataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setStatusMessage(`Failed to post item: ${JSON.stringify(errorData)}`);
      } else {
        setStatusMessage("Item Posted Successfully!");
        setFormData({
          itemName: "",
          price: "",
          description: "",
          category: "books",
          photo: null,
        });

        const fileInput = document.querySelector(
          'input[type="file"][name="photo"]'
        );
        if (fileInput) fileInput.value = "";
      }
    } catch (error) {
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="sell-page-container">
      <div className="sell-card">
        <h2>Sell an Item</h2>
        <form className="sell-form" onSubmit={handleSubmit}>
          <label htmlFor="itemName">
            Item Name:
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="category">Item Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select item type
            </option>
            <option value="books">Books/Study material</option>
            <option value="electronics">Electronics</option>
            <option value="home_appliance">Home Appliance</option>
            <option value="vehicle">Vehicle</option>
          </select>
          <label htmlFor="price">
            Price:
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="description">
            Description:
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="photoUpload">
            Upload Item Photo:
            <input
              type="file"
              id="photoUpload"
              name="photo"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </label>
          <button type="submit" disabled={isPosting}>
            {isPosting ? "Posting..." : "Post Item"}
          </button>
          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </form>
      </div>
    </div>
  );
}
