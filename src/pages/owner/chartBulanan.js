// Chart.js
import { Bar } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart, BarElement, Title, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Legend);

const ChartComponentBulanan = ({ data = {} }) => {
    const chartData = {
        labels: ['Januri', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'December'],
        datasets: [
            {
                label: 'Jumlah Transaksi',
                backgroundColor: '#3598D7',
                borderColor: '#C0C0C0',
                borderWidth: 1,
                data: data.dataset1 || [],
            },
            {
                label: 'Max Transaksi',
                backgroundColor: '#C0C0C0',
                borderColor: '#C0C0C0',
                borderWidth: 1,
                data: data.dataset2 || [],
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


export default ChartComponentBulanan;
