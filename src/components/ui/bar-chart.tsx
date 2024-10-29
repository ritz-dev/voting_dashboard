import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface SalesChartProps {
  dataArray: {
    year: number;
    total: number;
  }[];
}

const BarChart: React.FC<SalesChartProps> = ({ dataArray }) => {
  const [chartOptions, setChartOptions] = useState<ApexOptions | null>(null);

  useEffect(() => {
    // Log dataArray for debugging
    console.log("Received dataArray:", dataArray);

    // Default values in case dataArray is empty or invalid
    const defaultData = Array.from({ length: 8 }, (_, i) => ({
      year: new Date().getFullYear() - 7 + i,
      total: 0,
    }));

    // Extract years and totals from validDataArray
    const years = defaultData.map(item => item.year);
    const totals = defaultData.map(item => {
      const matchingItem = dataArray?.find(elem => elem.year === item.year);
      return matchingItem ? matchingItem.total : item.total;
    });

    // Define chart options
    const options: ApexOptions = {
      series: [
        {
          name: 'Sales',
          data: totals,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: 'end',
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: years.map(String), // Convert years to strings
      },
    };

    setChartOptions(options);
  }, [dataArray]);

  if (!chartOptions) {
    return <div>Loading chart...</div>; // Fallback loader
  }

  return (
    <div id="chart">
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarChart;
