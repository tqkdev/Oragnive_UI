/* eslint-disable react/prop-types */
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie({ basicPie }) {
    return (
        <PieChart
            series={[
                {
                    data: basicPie,
                },
            ]}
            width={400}
            height={200}
            title="Phân bổ các loại sản phẩm"
        />
    );
}
