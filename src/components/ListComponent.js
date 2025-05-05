// src/components/ListComponent.js
import React from 'react';

const ListComponent = ({ items, renderItem }) => {
  if (!items || items.length === 0) {
    return <p className="text-muted text-center">No items to display.</p>;
  }

  return (
    <ul className="list-group">
      {items.map((item, index) => (
        <li key={index} className="list-group-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

export default ListComponent;
