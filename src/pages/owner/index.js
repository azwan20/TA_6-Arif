// pages/index.js
// import Chart from '../components/Chart';
// import Chart from './chart';
import ChartComponent from './chart';

const Home = () => {
    const chartData = {
        dataset1: [10, 20, 30],
        dataset2: [15, 25, 35],
    };

    return (
        <div>
            <h1>Next.js Chart Example</h1>
            <ChartComponent data={chartData} />
        </div>
    );
};

export default Home;
