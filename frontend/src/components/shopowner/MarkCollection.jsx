import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const MarkCollection = () => {
  const [cardId, setCardId] = useState('');
  const [items, setItems] = useState([
    { name: 'rice', label: 'Rice (kg)', quantity: '' },
    { name: 'wheat', label: 'Wheat (kg)', quantity: '' },
    { name: 'sugar', label: 'Sugar (kg)', quantity: '' },
    { name: 'oil', label: 'Oil (L)', quantity: '' }
  ]);

  const handleQuantityChange = (index, value) => {
    const newItems = [...items];
    newItems[index].quantity = value;
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Collection marked successfully!');
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Mark Collection</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <Input
            label="Card ID"
            value={cardId}
            onChange={(e) => setCardId(e.target.value)}
            placeholder="Enter card ID"
            required
          />

          <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: '1.5rem 0 1rem' }}>Items Distributed</h3>

          <div className="grid grid-cols-2">
            {items.map((item, index) => (
              <Input
                key={item.name}
                label={item.label}
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                placeholder="0"
              />
            ))}
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <Button type="submit">Mark Collection</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { MarkCollection };

