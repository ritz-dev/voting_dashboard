import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { ApexOptions } from 'apexcharts';
import { ChevronLeft } from '../icons/chevron-left';
import { ChevronRight } from '../icons/chevron-right';

// Dynamically import ReactApexChart only on the client
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

dayjs.extend(quarterOfYear);

interface SalesChartProps {
  currentDate: number;
  handleCurrent: (year: number) => void;
  dataArray: {
    x: number,
    y: number
  } [];
}

const SalesChart: React.FC<SalesChartProps> = ({ currentDate, handleCurrent,dataArray }) => {
  const [isNextYearDisabled, setIsNextYearDisabled] = useState(false);
  const [isPrevYearDisabled, setIsPrevYearDisabled] = useState(false);
  const [chartOptions, setChartOptions] = useState<ApexOptions | null>(null);

  

  useEffect(() => {
    // Create an array with all 12 months (1 to 12)
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    // Ensure all 12 months are present in the seriesData
    const seriesData = months.map(month => {
      const dataItem = dataArray.find(item => item.x === month);
      return {
        x: dayjs(`${currentDate}/${month.toString().padStart(2, '0')}/01`).format('YYYY/MM/DD'),
        y: dataItem ? dataItem.y : 0, // If no data for the month, set y to 0
      };
    });

    // Define chart options
    const options: ApexOptions = {
      series: [
        {
          name: 'Vehicles',
          data: seriesData,
        },
      ],
      chart: {
        type: 'bar',
        height: 380,
      },
      xaxis: {
        type: 'category',
        labels: {
          formatter: (val: string | number) => dayjs(val).format('MMMM'),
        },
        group: {
          style: {
            fontSize: '10px',
            fontWeight: 700,
          },
          groups: [{ title: ' ', cols: 12 }],
        },
      },
      title: {
        text: 'Monthly Income',
      },
      tooltip: {
        x: {
          formatter: (val: string | number) => dayjs(val).format('MMMM'),
        },
      },
    };

    setChartOptions(options);
  }, [dataArray,currentDate]);

  useEffect(() => {
    setIsNextYearDisabled(new Date().getFullYear() <= currentDate);
    setIsPrevYearDisabled(2020 >= currentDate);
  }, [currentDate]);

  const handleYearChange = (direction: 'plus' | 'minus') => {
    handleCurrent(currentDate + (direction === 'plus' ? 1 : -1));
  };

  if (!chartOptions) {
    return null; // Fallback loader while chart options are being set
  }

  return (
    <div id="chart">
      <ReactApexChart options={chartOptions} series={chartOptions.series} type="bar" height={380} />
      <div className="flex justify-center items-center mt-4">
        <button
          disabled={isPrevYearDisabled}
          onClick={() => handleYearChange('minus')}
          className={`px-2 py-1 text-white rounded-md ${isPrevYearDisabled ? 'bg-sky-300' : 'bg-sky-500' }`}
          aria-label="Previous Year"
        >
          <ChevronLeft className='h-5 w-5'/>
        </button>
        <span className="mx-5">{currentDate}</span>
        <button
          disabled={isNextYearDisabled}
          onClick={() => handleYearChange('plus')}
          className={`px-2 py-1 rounded-md text-white ${isNextYearDisabled ? 'bg-sky-300' : 'bg-sky-500'}`}
          aria-label="Next Year"
        >
          <ChevronRight className='h-5 w-5'/>
        </button>
      </div>
    </div>
  );
};

export default SalesChart;
