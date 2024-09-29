/* eslint-disable react/prop-types */
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

function valueFormatter(value) {
    return `${value} vnd`;
}

const chartSetting = {
    yAxis: [
        {
            // label: 'Số tiền (vnd)',
        },
    ],
    series: [{ dataKey: 'totalprice', label: 'Thống kê tiền qua các tháng', valueFormatter }],
    height: 300,
    sx: {
        [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: 'translateX(-10px)',
        },
    },
};

export default function TickPlacementBars({ tickPlacementBars }) {
    return (
        <div style={{ width: '100%' }}>
            <BarChart
                dataset={tickPlacementBars}
                xAxis={[{ scaleType: 'band', dataKey: 'day', tickPlacement: 'middle', tickLabelPlacement: 'middle' }]}
                {...chartSetting}
            />
        </div>
    );
}
