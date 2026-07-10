// components/Charts/MonitoringChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const MonitoringChart = ({ data, label, color, unit, hours }) => {
  const chartData = {
    labels: hours,
    datasets: [
      {
        label: label,
        data: data,
        borderColor: color,
        backgroundColor: color + '20',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        titleColor: '#3A3A3A',
        bodyColor: '#5E7B5B',
        borderColor: 'rgba(140,163,134,0.2)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            return context.parsed.y + ' ' + unit;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 9
          },
          color: '#9CA3AF',
          maxTicksLimit: 8
        }
      },
      y: {
        grid: {
          color: 'rgba(0,0,0,0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 9
          },
          color: '#9CA3AF'
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};