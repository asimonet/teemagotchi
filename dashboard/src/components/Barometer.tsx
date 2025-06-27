import React from 'react';
import { DonutChart } from './DonutChart';

export const Barometer: React.FC = () => {
  const metrics = [
    { label: 'Joie',    value: 40, color: 'stroke-accent-20'   },
    { label: 'Neutre',    value: 40, color: 'stroke-brand'   },
    { label: 'Tristesse',  value: 75, color: 'stroke-pink-20' },
    { label: 'Colère',  value: 20, color: 'stroke-accent-50' },
    { label: 'Surprise', value: 85, color: 'stroke-green-30'  },
    { label: 'Peur',  value: 75, color: 'stroke-brand-20' },
    { label: 'Dégoût', value: 85, color: 'stroke-pink-40'  }
  ]

   const top4 = [...metrics]
    .sort((a, b) => b.value - a.value)
    .slice(0, 4)

  return (
      <div className="flex justify-between space-x-3 px-4 overflow-auto">
        {top4.map((m) => (
          <DonutChart
            key={m.label}
            label={m.label}
            value={m.value}
            size={80}
            strokeWidth={12}
            colorClass={m.color}
          />
        ))}
      </div>
  );
};
