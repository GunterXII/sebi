// components/Charts/ConsumptionChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ConsumptionChart = ({ without, with: withData }) => {
  const labels = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom', 'Lun', 'Mar', 'Mer'];
  
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Senza Sistema',
        data: without,
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderColor: '#EF4444',
        borderWidth: 1,
        borderRadius: 4
      },
      {
        label: 'Con Sistema',
        data: withData,
        backgroundColor: 'rgba(140, 163, 134, 0.7)',
        borderColor: '#8CA386',
        borderWidth: 1,
        borderRadius: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 11,
            family: 'Inter, sans-serif'
          }
        }
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
            return context.dataset.label + ': ' + context.parsed.y + ' kWh';
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
            size: 10
          },
          color: '#9CA3AF'
        }
      },
      y: {
        grid: {
          color: 'rgba(0,0,0,0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 10
          },
          color: '#9CA3AF',
          callback: function(value) {
            return value + ' kWh';
          }
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};