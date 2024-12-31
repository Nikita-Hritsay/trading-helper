import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

function ChartRenderer() {
  

  const ctx = document.getElementById('myChart');
  new Chart(candlestick, {
    type: 'bar',
    data: {
      
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  return (
      <div className="App">
        <div>
          <canvas id="myChart"></canvas>
        </div>
      </div>
    );
  }
  
  export default ChartRenderer;