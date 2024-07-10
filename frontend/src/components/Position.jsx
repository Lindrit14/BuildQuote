// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
const Position = ({ item, index, handleItemChange, handleRemoveItem }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedItem = { ...item, [name]: parseFloat(value) || value };

    if (name === 'quantity' || name === 'unitPrice') {
      updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
    }

    handleItemChange(index, updatedItem);
  };

  return (
    <div className="flex flex-col gap-4  mb-2 p-6">
      <div className='flex justify-between'><span>{item.position}</span>
      <input
        type="number"
        name="quantity"
        value={item.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        className="input input-bordered w-1/12"
      />
      <input
        type="text"
        name="unit"
        value={item.unit}
        onChange={handleChange}
        placeholder="Unit"
        className="input input-bordered w-1/12"
      />
        <textarea
              name="description" 
              placeholder="Description"
              value={item.description}
              onChange={handleChange}
              className="input input-bordered w-1/2"
            ></textarea>


      
      <input
        type="number"
        name="unitPrice"
        value={item.unitPrice}
        onChange={handleChange}
        placeholder="Unit Price"
        className="input input-bordered w-1/12"
      />
      <span className="w-1/12">€{item.total.toFixed(2)}</span></div>
      
      <button onClick={() => handleRemoveItem(index)} className="btn btn-danger ">Remove</button>
      <div className="divider divider-neutral"></div>
    </div>
  );
};

export default Position;
