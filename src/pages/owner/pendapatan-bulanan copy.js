// pages/index.js
// import Chart from '../components/Chart';
// import Chart from './chart';
import { useEffect, useState } from 'react';
import ChartComponent from './chart';
import { db } from "../../../public/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import OwnerAside from './ownerAside';

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "model_transaksi"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}


const Home = () => {
    function groupDataByDay(data) {
        const daysData = {
            Senin: 0,
            Selasa: 0,
            Rabu: 0,
            Kamis: 0,
            Jumat: 0,
            Sabtu: 0,
            Minggu: 0,
            MaxData: 0,
        };

        data.forEach(item => {
            const dayName = convertTimestampToDay(item.date_selesai);
            daysData[dayName] += 1;

            if (daysData[dayName] > daysData.MaxData) {
                daysData.MaxData = daysData[dayName];
            }
        });





        return daysData;
    }

    // Fungsi untuk mengonversi timestamp menjadi nama hari
    function convertTimestampToDay(jsonTimestamp) {
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        // const timestamp = new Timestamp(jsonTimestamp.seconds, jsonTimestamp.nanoseconds)
        const fireBaseTime = new Date(
            jsonTimestamp.seconds * 1000 + jsonTimestamp.nanoseconds / 1000000,
        );
        const date = fireBaseTime;
        const dayIndex = date.getDay();

        return days[dayIndex];
    }
    const initDayData = {
        Senin: 0,
        Selasa: 0,
        Rabu: 0,
        Kamis: 0,
        Jumat: 0,
        Sabtu: 0,
        Minggu: 0
    };

    const [produkData, setProdukData] = useState(initDayData);
    useEffect(() => {
        async function fetchData() {


            const data = await fetchDataFromFirestore();
            const result = groupDataByDay(data);
            setProdukData(result);

        }
        fetchData();
    }, []);

    console.log("ini data transaksi", produkData)

    const chartData = {
        dataset1: [produkData.Senin, produkData.Selasa, produkData.Rabu, produkData.Kamis, produkData.Jumat, produkData.Sabtu, produkData.Minggu],
        dataset2: [produkData.MaxData - produkData.Senin, produkData.MaxData - produkData.Selasa, produkData.MaxData, produkData.MaxData, produkData.MaxData, produkData.MaxData, produkData.MaxData - produkData.Minggu],
    };

    const [harianAktive, setHarianActive] = useState(true);
    const [bulananActive, setBulananActive] = useState(false);
    const [tahunanActive, setTahunanActive] = useState(false);
    const [totalActive, setTotalActive] = useState(false);
    const [adminActive, setAdminActive] = useState(false);

    const handleButtonClick = (buttonType) => {
        if (buttonType === "harian") {
            setHarianActive(true);
            setBulananActive(false);
            setTahunanActive(false);
            setTotalActive(false);
            setAdminActive(false);
        } else if (buttonType === "bulanan") {
            setHarianActive(false);
            setBulananActive(true);
            setTahunanActive(false);
            setTotalActive(false);
            setAdminActive(false);
        } else if (buttonType === "tahunan") {
            setHarianActive(false);
            setBulananActive(false);
            setTahunanActive(true);
            setTotalActive(false);
            setAdminActive(false);
        } else if (buttonType === "total") {
            setHarianActive(false);
            setBulananActive(false);
            setTahunanActive(false);
            setTotalActive(true);
            setAdminActive(false);
        } else if (buttonType === "admin") {
            setHarianActive(false);
            setBulananActive(false);
            setTahunanActive(false);
            setTotalActive(false);
            setAdminActive(true);
        }
    };
    return (
        <div className="owner d-flex">
            <OwnerAside harianAktive={harianAktive} bulananActive={bulananActive} tahunanActive={tahunanActive} totalActive={totalActive} adminActive={adminActive} handleButtonClick={handleButtonClick} />
            <article className="d-flex" style={{ display: 'flex', height: '100vh', padding: '20px' }}>
                <section className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                    <div className='chart'>
                        <h1>Pendapatan Harian</h1>
                        <ChartComponent data={chartData} />
                    </div>
                </section>
            </article>
        </div >
    );
};

export default Home;
