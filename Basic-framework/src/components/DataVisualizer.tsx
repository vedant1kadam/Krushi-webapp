
import { useEffect, useState } from 'react';

// Generate random sensor-like data string
const generateRandomData = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 40; i++) {
    if (i > 0 && i % 5 === 0) result += ' ';
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const generateDataArray = (length: number = 5) => {
  return Array.from({ length }, () => generateRandomData());
};

interface DataVisualizerProps {
  lines?: number;
  refreshRate?: number;
  dataPrefix?: string;
}

const DataVisualizer = ({ 
  lines = 5, 
  refreshRate = 2000,
  dataPrefix = 'SOIL:'
}: DataVisualizerProps) => {
  const [data, setData] = useState(generateDataArray(lines));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateDataArray(lines));
    }, refreshRate);
    
    return () => clearInterval(interval);
  }, [lines, refreshRate]);
  
  return (
    <div className="font-mono text-xs sm:text-sm overflow-hidden bg-black/5 p-3 rounded-lg">
      {data.map((line, index) => (
        <div key={index} className="mb-1 data-text animate-pulse">
          <span className="text-soilsmart-green-dark font-semibold mr-2">{dataPrefix}{index + 1}</span>
          {line}
        </div>
      ))}
    </div>
  );
};

export default DataVisualizer;
