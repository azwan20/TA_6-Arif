// Chart.js
import { Bar } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart, BarElement, Title, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Legend);

const ChartComponent = ({ data }) => {
    const chartData = {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
            {
                label: 'Data Set 1',
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                data: data.dataset1,
            },
            {
                label: 'Data Set 2',
                backgroundColor: 'rgba(255,99,132,0.4)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                data: data.dataset2,
            },
        ],
    };

    const options = {
        scales: {
            x: { stacked: true },
            y: { stacked: true },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default ChartComponent;
