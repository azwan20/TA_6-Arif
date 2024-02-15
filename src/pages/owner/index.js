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
    function convertTimestampToDay(jsonTimestamp) {
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const fireBaseTime = new Date(
            jsonTimestamp.seconds * 1000 + jsonTimestamp.nanoseconds / 1000000,
        );
        const date = fireBaseTime;
        const dayIndex = date.getDay();

        return days[dayIndex];
    }
    function groupDataByDay(data) {
        const daysData = {
            Senin: { total: 0, count: 0 },
            Selasa: { total: 0, count: 0 },
            Rabu: { total: 0, count: 0 },
            Kamis: { total: 0, count: 0 },
            Jumat: { total: 0, count: 0 },
            Sabtu: { total: 0, count: 0 },
            Minggu: { total: 0, count: 0 },
            MaxData: 0,
        };

        data.forEach(item => {
            const dayName = convertTimestampToDay(item.date_selesai);
            const hargaTotal = item.harga_total || 0;
        
            if (!daysData[dayName]) {
                // Jika objek hari belum dibuat, buat objek baru dengan properti total dan count
                daysData[dayName] = { total: 0, count: 0 };
            }
        
            daysData[dayName].total += hargaTotal;
            daysData[dayName].count += 1;
        
            if (daysData[dayName].total > daysData.MaxData) {
                daysData.MaxData = daysData[dayName].total;
            }
        });


        return daysData;
    }

    const initDayData = {
        Senin: { total: 0, count: 0 },
        Selasa: { total: 0, count: 0 },
        Rabu: { total: 0, count: 0 },
        Kamis: { total: 0, count: 0 },
        Jumat: { total: 0, count: 0 },
        Sabtu: { total: 0, count: 0 },
        Minggu: { total: 0, count: 0 },
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

    const chartData = {
        dataset1: [
            produkData.Senin.total,
            produkData.Selasa.total,
            produkData.Rabu.total,
            produkData.Kamis.total,
            produkData.Jumat.total,
            produkData.Sabtu.total,
            produkData.Minggu.total,
        ],
        dataset2: [
            produkData.MaxData - produkData.Senin.total,
            produkData.MaxData - produkData.Selasa.total,
            produkData.MaxData - produkData.Rabu.total,
            produkData.MaxData - produkData.Kamis.total,
            produkData.MaxData - produkData.Jumat.total,
            produkData.MaxData - produkData.Sabtu.total,
            produkData.MaxData - produkData.Minggu.total,
        ],
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
