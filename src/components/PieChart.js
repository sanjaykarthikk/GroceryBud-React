import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({ toBuy, purchased }) {
  const data = {
    labels: ['Unpurchased', 'Purchased'],
    datasets: [
      {
        label: 'Quantity',
        data: [toBuy, purchased],
        backgroundColor: [
          'rgba(255,193,193,0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie data={data} />
  );
}


