import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import { Chart } from 'react-chartjs-2';
import { getCryptocurrency } from './components/api/DataReciever';

ChartJS.register(CategoryScale, LinearScale, TimeScale, Tooltip, Legend, CandlestickController, CandlestickElement);

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);

  const fetchCrypto = async () => {
    try {
      const response = await getCryptocurrency("BTC");

      const rawData = Object.values(response.data)[1];
  
      const chartData = Object.entries(rawData).map(([date, values]) => ({
        x: new Date(date).valueOf(), // Date for the x-axis
        o: parseFloat(values["1. open"]),  // Open price
        h: parseFloat(values["2. high"]),  // High price
        l: parseFloat(values["3. low"]),   // Low price
        c: parseFloat(values["4. close"]), // Close price
      }));

      setCryptoData(chartData);
    } catch (error) {
      console.error("Error fetching cryptocurrency data:", error);
    }
  };

  const data = {
    datasets: [
      {
        label: 'BTC/USD',
        data: cryptoData,
        type: 'candlestick',
        borderColor: 'rgba(0, 0, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const { o, h, l, c } = cryptoData[tooltipItem.dataIndex];
            return `Open: ${o}, High: ${h}, Low: ${l}, Close: ${c}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
      y: {
        beginAtZero: false,
      },
    },
    elements: {
      bar: {
        barThickness: 15, // Fixed thickness of candlesticks
        categoryPercentage: 0.9, // Adjust spacing between candlesticks
        barPercentage: 0.8, // Adjust candle width relative to its category
      },
    },
  };

  return (
    <div>
      <h1>Cryptocurrency Chart</h1>
      <button onClick={fetchCrypto}>Fetch Cryptocurrency</button>

      {cryptoData.length > 0 ? (
        <Chart type="candlestick" data={data} options={options} />
      ) : (
        <p>No data available. Click the button to fetch data.</p>
      )}
    </div>
  );
};

export default App;
