// import React, { useEffect } from 'react';
// import Head from 'next/head';
// import dynamic from 'next/dynamic';

// // const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });



// export default function Total() {
//     React.useEffect(() => {
//         window.addEventListener("load", function () {
//             const getChartOptions = () => {
//                 return {
//                     series: [35.1, 23.5, 2.4, 5.4],
//                     colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
//                     chart: {
//                         height: 320,
//                         width: "100%",
//                         type: "donut",
//                     },
//                     stroke: {
//                         colors: ["transparent"],
//                         lineCap: "",
//                     },
//                     plotOptions: {
//                         pie: {
//                             donut: {
//                                 labels: {
//                                     show: true,
//                                     name: {
//                                         show: true,
//                                         fontFamily: "Inter, sans-serif",
//                                         offsetY: 20,
//                                     },
//                                     total: {
//                                         showAlways: true,
//                                         show: true,
//                                         label: "Unique visitors",
//                                         fontFamily: "Inter, sans-serif",
//                                         formatter: function (w) {
//                                             const sum = w.globals.seriesTotals.reduce((a, b) => {
//                                                 return a + b
//                                             }, 0)
//                                             return `${sum}k`
//                                         },
//                                     },
//                                     value: {
//                                         show: true,
//                                         fontFamily: "Inter, sans-serif",
//                                         offsetY: -20,
//                                         formatter: function (value) {
//                                             return value + "k"
//                                         },
//                                     },
//                                 },
//                                 size: "80%",
//                             },
//                         },
//                     },
//                     grid: {
//                         padding: {
//                             top: -2,
//                         },
//                     },
//                     labels: ["Direct", "Sponsor", "Affiliate", "Email marketing"],
//                     dataLabels: {
//                         enabled: false,
//                     },
//                     legend: {
//                         position: "bottom",
//                         fontFamily: "Inter, sans-serif",
//                     },
//                     yaxis: {
//                         labels: {
//                             formatter: function (value) {
//                                 return value + "k"
//                             },
//                         },
//                     },
//                     xaxis: {
//                         labels: {
//                             formatter: function (value) {
//                                 return value + "k"
//                             },
//                         },
//                         axisTicks: {
//                             show: false,
//                         },
//                         axisBorder: {
//                             show: false,
//                         },
//                     },
//                 }
//             }

//             if (document.getElementById("donut-chart") && typeof ApexCharts !== 'undefined') {
//                 const chart = new ApexCharts(document.getElementById("donut-chart"), getChartOptions());
//                 chart.render();

//                 // Get all the checkboxes by their class name
//                 const checkboxes = document.querySelectorAll('#devices input[type="checkbox"]');

//                 // Function to handle the checkbox change event
//                 function handleCheckboxChange(event, chart) {
//                     const checkbox = event.target;
//                     if (checkbox.checked) {
//                         switch (checkbox.value) {
//                             case 'desktop':
//                                 chart.updateSeries([15.1, 22.5, 4.4, 8.4]);
//                                 break;
//                             case 'tablet':
//                                 chart.updateSeries([25.1, 26.5, 1.4, 3.4]);
//                                 break;
//                             case 'mobile':
//                                 chart.updateSeries([45.1, 27.5, 8.4, 2.4]);
//                                 break;
//                             default:
//                                 chart.updateSeries([55.1, 28.5, 1.4, 5.4]);
//                         }

//                     } else {
//                         chart.updateSeries([35.1, 23.5, 2.4, 5.4]);
//                     }
//                 }

//                 // Attach the event listener to each checkbox
//                 checkboxes.forEach((checkbox) => {
//                     checkbox.addEventListener('change', (event) => handleCheckboxChange(event, chart));
//                 });
//             }
//         });

//         const chartElement = document.getElementById('line-chart');
//         if (chartElement && typeof ApexCharts !== 'undefined') {
//             const chart = new ApexCharts(chartElement, options);
//             chart.render();
//         }
//     }, []);
//     return (
//         <>
//             <Head>
//                 <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css" rel="stylesheet" />
//                 <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"></script>
//                 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/apexcharts@3.27.0/dist/apexcharts.min.css" />
//                 <script src="https://cdn.jsdelivr.net/npm/apexcharts@3.27.0/dist/apexcharts.min.js"></script>
//                 <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
//             </Head>
//             <div className="owner d-flex">
//                 <aside>
//                     <section style={{ height: '20%' }}>
//                         <img src="" alt="Profile" />
//                         <h5>Fulan al Fulana</h5>
//                         <div />
//                     </section>
//                     <section style={{ height: '80%' }}>
//                         <span>
//                             <button>Pendapatan harian</button>
//                             <button>Pendapatan bulanan</button>
//                             <button>Pendapatan tahunan</button>
//                             <button>Pendapatan Total</button>
//                             <button>Data Admin</button>
//                         </span>
//                         <span style={{ width: '80%' }}>
//                             <button className='logout'>Logout</button>
//                         </span>
//                     </section>
//                 </aside>
//                 <article className="d-flex" style={{ display: 'flex', height: '100vh', padding: '20px' }}>
//                     <section className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
//                         <div class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
//                             <div class="flex justify-between mb-3">
//                                 <div class="flex justify-center items-center">
//                                     <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">Website traffic</h5>
//                                     <svg data-popover-target="chart-info" data-popover-placement="bottom" class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                                         <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
//                                     </svg>
//                                     <div data-popover id="chart-info" role="tooltip" class="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
//                                         <div class="p-3 space-y-2">
//                                             <h3 class="font-semibold text-gray-900 dark:text-white">Activity growth - Incremental</h3>
//                                             <p>Report helps navigate cumulative growth of community activities. Ideally, the chart should have a growing trend, as stagnating chart signifies a significant decrease of community activity.</p>
//                                             <h3 class="font-semibold text-gray-900 dark:text-white">Calculation</h3>
//                                             <p>For each date bucket, the all-time volume of activities is calculated. This means that activities in period n contain all activities up to period n, plus the activities generated by your community in period.</p>
//                                             <a href="#" class="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">Read more <svg class="w-2 h-2 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
//                                             </svg></a>
//                                         </div>
//                                         <div data-popper-arrow></div>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <button type="button" data-tooltip-target="data-tooltip" data-tooltip-placement="bottom" class="hidden sm:inline-flex items-center justify-center text-gray-500 w-8 h-8 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm"><svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
//                                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
//                                     </svg><span class="sr-only">Download data</span>
//                                     </button>
//                                     <div id="data-tooltip" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
//                                         Download CSV
//                                         <div class="tooltip-arrow" data-popper-arrow></div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div>
//                                 <div class="flex" id="devices">
//                                     <div class="flex items-center me-4">
//                                         <input id="desktop" type="checkbox" value="desktop" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//                                         <label for="desktop" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Desktop</label>
//                                     </div>
//                                     <div class="flex items-center me-4">
//                                         <input id="tablet" type="checkbox" value="tablet" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//                                         <label for="tablet" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tablet</label>
//                                     </div>
//                                     <div class="flex items-center me-4">
//                                         <input id="mobile" type="checkbox" value="mobile" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//                                         <label for="mobile" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mobile</label>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* <!-- Donut Chart --> */}
//                             <div class="py-6" id="donut-chart"></div>

//                             <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
//                                 <div class="flex justify-between items-center pt-5">
//                                     {/* <!-- Button --> */}
//                                     <button
//                                         id="dropdownDefaultButton"
//                                         data-dropdown-toggle="lastDaysdropdown"
//                                         data-dropdown-placement="bottom"
//                                         class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
//                                         type="button">
//                                         Last 7 days
//                                         <svg class="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//                                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
//                                         </svg>
//                                     </button>
//                                     <div id="lastDaysdropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
//                                         <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
//                                             <li>
//                                                 <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
//                                             </li>
//                                             <li>
//                                                 <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
//                                             </li>
//                                             <li>
//                                                 <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
//                                             </li>
//                                             <li>
//                                                 <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
//                                             </li>
//                                             <li>
//                                                 <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                     <a
//                                         href="#"
//                                         class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
//                                         Traffic analysis
//                                         <svg class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
//                                         </svg>
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                     <section className='details' style={{ height: '100%' }}>
//                         <div>
//                             <span>
//                                 <p>Total produk</p>
//                                 <input type='text' />
//                             </span>
//                             <span>
//                                 <p>Produk terjual</p>
//                                 <input type='text' />
//                             </span>
//                             <span>
//                                 <p>Produk tidak terjual</p>
//                                 <input type='text' />
//                             </span>
//                             <span>
//                                 <p>Produk rusak/kadaluarsa</p>
//                                 <input type='text' />
//                             </span>
//                         </div>
//                     </section>
//                 </article>
//             </div >
//         </>
//     );
// }
