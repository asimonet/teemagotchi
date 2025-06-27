'use client';

import React, { useState, useEffect } from 'react';
import { DonutChart } from './DonutChart';

/**
 * Configuration mapping API English labels to French labels and Tailwind color classes
 */
const METRIC_CONFIG: Record<string, { label: string; color: string }> = {
  joy:      { label: 'Joie',      color: 'stroke-accent-20' },
  neutral:  { label: 'Neutre',    color: 'stroke-brand'     },
  sadness:  { label: 'Tristesse', color: 'stroke-pink-20'   },
  anger:    { label: 'Colère',    color: 'stroke-accent-50' },
  surprise: { label: 'Surprise',  color: 'stroke-green-30'  },
  fear:     { label: 'Peur',      color: 'stroke-brand-20'  },
  disgust:  { label: 'Dégoût',    color: 'stroke-pink-40'   },
};

type RawMetric = { label: string; score: number };
type Metric    = { label: string; value: number; color: string };

// Initialize metrics with zero values to ensure four donuts always render
const initialMetrics: Metric[] = Object.values(METRIC_CONFIG).map(cfg => ({
  label: cfg.label,
  color: cfg.color,
  value: 0,
}));

export const Barometer: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>(initialMetrics);

  const fetchMetrics = async () => {
    console.log('[Barometer] fetchMetrics start');
    try {
      const res = await fetch('/api/emotion');
      console.log('[Barometer] status', res.status);
      if (res.status === 204) return;
      if (!res.ok) {
        console.error('[Barometer] bad status', res.status);
        return;
      }

      // Expecting a nested array of RawMetric: RawMetric[][]
      const data = (await res.json()) as RawMetric[][];
      console.log('[Barometer] parsed data', data);

      const raw = Array.isArray(data) && Array.isArray(data[0]) ? data[0] : [];

      // Map and convert scores to percentages (0–100) without rounding to zero
      const updated: Metric[] = raw
        .map(({ label, score }) => {
          const key = label.toLowerCase();
          const cfg = METRIC_CONFIG[key];

          if (!cfg) {
            console.log("Unknown label " + key);
            return null;
          }
          
          return {
            label: cfg.label,
            color: cfg.color,
            value: score * 100,
          };
        })
        .filter((m): m is Metric => m !== null);

      console.log('[Barometer] updated metrics', updated);
      setMetrics(updated);
    } catch (err) {
      console.error('[Barometer] fetch error', err);
    }
  };

  useEffect(() => {
    console.log('[Barometer] mounted');
    fetchMetrics();
    const id = setInterval(fetchMetrics, 10000);
    return () => clearInterval(id);
  }, []);

  // Show top 4 by value
  const top4 = [...metrics]
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);

  return (
    <div className="flex justify-between space-x-3 px-4 overflow-auto">
      {top4.map(m => (
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
