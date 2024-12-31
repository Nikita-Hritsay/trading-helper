// src/App.js
import React, { useEffect, useState } from 'react';
import { getItems, getCryptocurrency, createItem } from './components/api/DataReciever';

const App = () => {
  const [items, setItems] = useState([]);
  const [crypto, setCrypto] = useState(null);

  useEffect(() => {
    // Fetch items when the component mounts
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const fetchCrypto = async () => {
    try {
      const data = await getCryptocurrency("BTC", 'example-query');
      setCrypto(data);
    } catch (error) {
      console.error('Error fetching cryptocurrency:', error);
    }
  };

  const addItem = async () => {
    try {
      const newItem = { name: 'New Item', value: 42 }; // Example data
      const createdItem = await createItem(newItem);
      setItems((prev) => [...prev, createdItem]);
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div>
      <h1>API Example</h1>
      <button onClick={fetchCrypto}>Fetch Cryptocurrency</button>
      <button onClick={addItem}>Add Item</button>

      <h2>Items:</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>

      {crypto && (
        <div>
          <h2>Cryptocurrency:</h2>
          <pre>{JSON.stringify(crypto, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
