// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

function Position({ item, index, handleChange, handleRemove }) {
    return (
        <div className="angebot-item">
            <input
                type="number"
                name={`items[${index}].position`}
                value={item.position}
                onChange={handleChange}
                placeholder="Position"
            />
            <input
                type="number"
                name={`items[${index}].quantity`}
                value={item.quantity}
                onChange={handleChange}
                placeholder="Quantity"
            />
            <input
                type="text"
                name={`items[${index}].unit`}
                value={item.unit}
                onChange={handleChange}
                placeholder="Unit"
            />
            <input
                type="text"
                name={`items[${index}].description`}
                value={item.description}
                onChange={handleChange}
                placeholder="Description"
            />
            <input
                type="number"
                name={`items[${index}].unitPrice`}
                value={item.unitPrice}
                onChange={handleChange}
                placeholder="Unit Price"
            />
            <input
                type="number"
                name={`items[${index}].total`}
                value={item.total}
                onChange={handleChange}
                placeholder="Total"
            />
            <button type="button" onClick={() => handleRemove(index)}>Remove</button>
        </div>
    );
}

Position.propTypes = {
    item: PropTypes.shape({
        position: PropTypes.number,
        quantity: PropTypes.number,
        unit: PropTypes.string,
        description: PropTypes.string,
        unitPrice: PropTypes.number,
        total: PropTypes.number
    }).isRequired,
    index: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired
};

export default Position;
