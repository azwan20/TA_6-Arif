import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });



export default function Home() {
    React.useEffect(() => {
        const options = {
            chart: {
                height: '100%',
                maxWidth: '100%',
                type: 'line',
                fontFamily: 'Inter, sans-serif',
                dropShadow: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            tooltip: {
                enabled: true,
                x: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 6,
            },
            grid: {
                show: true,
                strokeDashArray: 4,
                padding: {
                    left: 2,
                    right: 2,
                    top: -26,
                },
            },
            series: [
                {
                    name: 'Clicks',
                    data: [6500, 6418, 6456, 6526, 6356, 6456],
                    color: '#1A56DB',
                },
                {
                    name: 'CPC',
                    data: [6456, 6356, 6526, 6332, 6418, 6500],
                    color: '#7E3AF2',
                },
            ],
            legend: {
                show: false,
            },
            stroke: {
                curve: 'smooth',
            },
            xaxis: {
                categories: [
                    'Senin',
                    'Selasa',
                    'Rabu',
                    'Kamis',
                    'Jumat',
                    'Sabtu',
                    'Minggu',
                ],
                labels: {
                    show: true,
                    style: {
                        fontFamily: 'Inter, sans-serif',
                        cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
                    },
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                show: false,
            },
        };

        const chartElement = document.getElementById('line-chart');
        if (chartElement && typeof ApexCharts !== 'undefined') {
            const chart = new ApexCharts(chartElement, options);
            chart.render();
        }
    }, []);
    return (
        <>
            <Head>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css" rel="stylesheet" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
            </Head>
            <div className="owner d-flex">
                <aside>
                    <section style={{ height: '20%' }}>
                        <img src="" alt="Profile" />
                        <h5>Fulan al Fulana</h5>
                        <div />
                    </section>
                    <section style={{ height: '80%' }}>
                        <span>
                            <button>Pendapatan harian</button>
                            <button>Pendapatan bulanan</button>
                            <button>Pendapatan tahunan</button>
                            <button>Pendapatan Total</button>
                            <button>Data Admin</button>
                        </span>
                        <span style={{ width: '80%' }}>
                            <button className='logout'>Logout</button>
                        </span>
                    </section>
                </aside>
                <article className="d-flex" style={{ display: 'flex', height: '100vh', padding: '20px' }}>
                    <section className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                        <div className="d-flex justify-content-center align-items-center">
                            <div class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
                                <div class="flex justify-between mb-5">
                                    <div class="grid gap-4 grid-cols-2">
                                        <div>
                                            <h5 class="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">Clicks
                                                <svg data-popover-target="clicks-info" data-popover-placement="bottom" class="w-3 h-3 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                                </svg>
                                                <div data-popover id="clicks-info" role="tooltip" class="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                                    <div class="p-3 space-y-2">
                                                        <h3 class="font-semibold text-gray-900 dark:text-white">Clicks growth - Incremental</h3>
                                                        <p>Report helps navigate cumulative growth of community activities. Ideally, the chart should have a growing trend, as stagnating chart signifies a significant decrease of community activity.</p>
                                                        <h3 class="font-semibold text-gray-900 dark:text-white">Calculation</h3>
                                                        <p>For each date bucket, the all-time volume of activities is calculated. This means that activities in period n contain all activities up to period n, plus the activities generated by your community in period.</p>
                                                        <a href="#" class="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">Read more <svg class="w-2 h-2 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                                        </svg></a>
                                                    </div>
                                                    <div data-popper-arrow></div>
                                                </div>
                                            </h5>
                                            <p class="text-gray-900 dark:text-white text-2xl leading-none font-bold">42,3k</p>
                                        </div>
                                        <div>
                                            <h5 class="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">CPC
                                                <svg data-popover-target="cpc-info" data-popover-placement="bottom" class="w-3 h-3 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                                </svg>
                                                <div data-popover id="cpc-info" role="tooltip" class="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                                    <div class="p-3 space-y-2">
                                                        <h3 class="font-semibold text-gray-900 dark:text-white">CPC growth - Incremental</h3>
                                                        <p>Report helps navigate cumulative growth of community activities. Ideally, the chart should have a growing trend, as stagnating chart signifies a significant decrease of community activity.</p>
                                                        <h3 class="font-semibold text-gray-900 dark:text-white">Calculation</h3>
                                                        <p>For each date bucket, the all-time volume of activities is calculated. This means that activities in period n contain all activities up to period n, plus the activities generated by your community in period.</p>
                                                        <a href="#" class="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">Read more <svg class="w-2 h-2 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                                        </svg></a>
                                                    </div>
                                                    <div data-popper-arrow></div>
                                                </div>
                                            </h5>
                                            <p class="text-gray-900 dark:text-white text-2xl leading-none font-bold">$5.40</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button id="dropdownDefaultButton"
                                            data-dropdown-toggle="lastDaysdropdown"
                                            data-dropdown-placement="bottom" type="button" class="px-3 py-2 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Last week <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                            </svg></button>
                                        <div id="lastDaysdropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                <li>
                                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
                                                </li>
                                                <li>
                                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                                                </li>
                                                <li>
                                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
                                                </li>
                                                <li>
                                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
                                                </li>
                                                <li>
                                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div id="line-chart"></div>
                                {/* <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-2.5">
                                <div class="pt-5">
                                    <a href="#" class="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg class="w-3.5 h-3.5 text-white me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2Zm-3 15H4.828a1 1 0 0 1 0-2h6.238a1 1 0 0 1 0 2Zm0-4H4.828a1 1 0 0 1 0-2h6.238a1 1 0 1 1 0 2Z" />
                                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                        View full report
                                    </a>
                                </div>
                            </div> */}
                            </div>
                        </div>
                    </section>
                    <section className='details' style={{ height: '100%' }}>
                        <div>
                            <span>
                                <p>Total produk</p>
                                <input type='text' />
                            </span>
                            <span>
                                <p>Produk terjual</p>
                                <input type='text' />
                            </span>
                            <span>
                                <p>Produk tidak terjual</p>
                                <input type='text' />
                            </span>
                            <span>
                                <p>Produk rusak/kadaluarsa</p>
                                <input type='text' />
                            </span>
                        </div>
                    </section>
                </article>
            </div>
        </>
    );
}
