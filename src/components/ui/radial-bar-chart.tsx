import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { ApexOptions } from 'apexcharts'; // Import ApexOptions type

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const RadialBarChart = ({
  parkingSize,
  currentSize
} : {
  parkingSize : number,
  currentSize : number
}) => {
  const [parkingSizeStatus, setParkingSizeStatus] = useState<number>(0);
  const [animatedStatus, setAnimatedStatus] = useState<number>(0);  

  useEffect(()=>{
    const status = (currentSize * 100) / parkingSize;
    setParkingSizeStatus(isNaN(status) ? 0 : Math.round(status))
  },[currentSize,parkingSize]);

  useEffect(() => {
    let startValue = 0;
    const duration = 1000; // Duration of the animation in ms
    const increment = parkingSizeStatus / (duration / 10); // Increment per frame (assume 10ms per frame)
    const interval = setInterval(() => {
      startValue += increment;
      if (startValue >= parkingSizeStatus) {
        setAnimatedStatus(parkingSizeStatus);
        clearInterval(interval);
      } else {
        setAnimatedStatus(Math.round(startValue));
      }
    }, 10);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [parkingSizeStatus]);

  // Define options with the correct type ApexOptions
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
        height: 260,
        type: 'radialBar', // Explicitly typed as 'radialBar'
    },
    colors: ['#2034e6'],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: '70%',
          background: '#131e37',
        },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15,
          },
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: '#fff',
            fontSize: '13px',
          },
          value: {
            color: '#fff',
            fontSize: '30px',
            show: true,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        gradientToColors: ['#87D4F9'],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: ['Parking Size'],
  });

  return (
    <div id="chart">
      {/* Pass options and series to ApexCharts */}
      <ApexCharts options={options} series={[animatedStatus]} type="radialBar" height={260} />
    </div>
  );
};

export default RadialBarChart;
