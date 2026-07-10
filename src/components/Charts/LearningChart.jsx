
// components/Charts/LearningChart.jsx
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

export const LearningChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.epoch),
    datasets: [
      {
        label: 'Accuratezza',
        data: data.map(d => d.accuracy * 100),
        borderColor: '#8CA386',
        backgroundColor: 'rgba(140, 163, 134, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        yAxisID: 'y',
      },
      {
        label: 'Loss',
        data: data.map(d => d.loss),
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        yAxisID: 'y1',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
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
            let label = context.dataset.label || '';
            let value = context.parsed.y;
            if (label === 'Accuratezza') {
              return label + ': ' + value.toFixed(1) + '%';
            }
            return label + ': ' + value.toFixed(3);
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
        type: 'linear',
        display: true,
        position: 'left',
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
            return value + '%';
          }
        },
        min: 0,
        max: 100
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          font: {
            size: 10
          },
          color: '#9CA3AF'
        },
        min: 0,
        max: 1.2
      }
    }
  };

  return <Line data={chartData} options={options} />;
};