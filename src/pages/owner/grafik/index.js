// Import library yang dibutuhkan
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Import library grafik (dynamic import untuk menghindari SSR)
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Grafik() {
    // Efek samping untuk menginisialisasi grafik saat komponen dimuat
    useEffect(() => {
        // Data dan opsi grafik
        const chartData = {
            series: [{ name: 'Sales', data: [30, 40, 35, 50, 49, 60, 70, 91, 125] }],
            options: {
                chart: {
                    type: 'area',
                    height: 350,
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                },
            },
        };

        // Membuat grafik
        const chartElement = document.getElementById('grafik');
        if (chartElement && typeof ApexCharts !== 'undefined') {
            const chart = new ApexCharts(chartElement, chartData.options);
            chart.render();
        }
    }, []);

    return (
        <>
            <Head>
                {/* Link script dan stylesheet grafik */}
                <script src="https://cdn.jsdelivr.net/npm/apexcharts@3.27.0/dist/apexcharts.min.js"></script>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/apexcharts@3.27.0/dist/apexcharts.min.css" />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css" rel="stylesheet" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"></script>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/apexcharts@3.27.0/dist/apexcharts.min.css" />
                <script src="https://cdn.jsdelivr.net/npm/apexcharts@3.27.0/dist/apexcharts.min.js"></script>
            </Head>
            {/* Komponen yang menampilkan grafik */}
            <div id="grafik">
                <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={350} />
            </div>
        </>
    );
}
