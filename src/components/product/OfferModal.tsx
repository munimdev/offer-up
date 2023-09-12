// @ts-nocheck
import React, { useState } from 'react';
import Link from "next/link";
const OfferModal = ({ onClose, onSubmit }) => {
  const [price, setPrice] = useState('');

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && price.trim() !== '') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    onSubmit(price);
    setPrice('');
    onClose();
  };
  const disabledButtonStyle = price.trim() === '' ? { backgroundColor: 'lightgray', color: 'white', cursor: 'not-allowed' } : {};


  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="bg-white p-12 rounded-lg shadow-lg">
        {/* Increased padding, rounded corners, and larger font */}
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Make an Offer
        </h2>
        <input
          type="number"
          placeholder="Enter price"
          value={price}
          min={0}
          onChange={handlePriceChange}
          onKeyDown={handleKeyDown}
          className="border border-gray-300 rounded-lg p-6 w-full mb-4"
          /* Increased padding and rounded corners */
        />
        <div className="flex justify-center">
          {/* Centered the buttons */}
          <button
            style={disabledButtonStyle} // Apply inline styles for the disabled button
            className="px-12 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark mr-2"
            onClick={handleSubmit}
            disabled={price.trim() === ''}
          >
            Send
          </button>
          <button
            className="px-12 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

  );
};

export default OfferModal;
