import React from 'react';

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
    <div className="flex flex-col justify-between mb-2">
        <div className='w-full flex justify-between mb-2 '>

        <input
        type="number"
        name="position"
        value={item.position}
        onChange={handleChange}
        placeholder="Position"
        className="input input-bordered w-1/12"
      />
            
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
      <input
        type="text"
        name="description"
        value={item.description}
        onChange={handleChange}
        placeholder="Description"
        className="input input-bordered w-1/2"
      />
      <input
        type="number"
        name="unitPrice"
        value={item.unitPrice}
        onChange={handleChange}
        placeholder="Unit Price"
        className="input input-bordered w-1/12"
      />
      <span className="w-1/12">€{item.total.toFixed(2)}</span></div>
      
      <button onClick={() => handleRemoveItem(index)} className="btn btn-danger">X</button>
      <hr className="border-t-2 border-grey-300 my-4" />

    </div>
  );
};

export default Position;
