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

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, TimeScale, Tooltip, Legend, CandlestickController, CandlestickElement);

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);

  const fetchCrypto = async () => {
    try {
      const response = await getCryptocurrency("BTC");

      // Assuming response.data matches the provided format
      const timeSeries = response.data;

      // Convert data into the format required by the candlestick chart
      const chartData = Object.entries(timeSeries).map(([date, values]) => ({
        x: new Date(date), // Date for the x-axis
        o: parseFloat(values.open),  // Open price
        h: parseFloat(values.high),  // High price
        l: parseFloat(values.low),   // Low price
        c: parseFloat(values.close), // Close price
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
