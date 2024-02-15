import { useEffect, useState } from 'react';
import { db } from "../../../public/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import OwnerAside from './ownerAside';
import ChartComponentTahunan from './chartTahunan';

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "model_transaksi"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

const Home = () => {
    function groupDataByYear(data) {
        const yearsData = {
            2024: { total: 0, count: 0 },
            2025: { total: 0, count: 0 },
            2026: { total: 0, count: 0 },
            2027: { total: 0, count: 0 },
            2028: { total: 0, count: 0 },
            2029: { total: 0, count: 0 },
            2030: { total: 0, count: 0 },
            2031: { total: 0, count: 0 },
            2032: { total: 0, count: 0 },
            2033: { total: 0, count: 0 },
            2034: { total: 0, count: 0 },
            MaxData: 0,
        };

        data.forEach(item => {
            const year = convertTimestampToYear(item.date_selesai);
            const hargaTotal = item.harga_total || 0;

            if (!yearsData[year]) {
                // Jika objek tahun belum dibuat, buat objek baru dengan properti total dan count
                yearsData[year] = { total: 0, count: 0 };
            }

            yearsData[year].total += hargaTotal;
            yearsData[year].count += 1;

            if (yearsData[year].total > yearsData.MaxData) {
                yearsData.MaxData = yearsData[year].total;
            }
        });

        return yearsData;
    }

    function convertTimestampToYear(jsonTimestamp) {
        const fireBaseTime = new Date(
            jsonTimestamp.seconds * 1000 + jsonTimestamp.nanoseconds / 1000000,
        );
        return fireBaseTime.getFullYear().toString();
    }
    const initYearData = {
        2024: { total: 0, count: 0 },
        2025: { total: 0, count: 0 },
        2026: { total: 0, count: 0 },
        2027: { total: 0, count: 0 },
        2028: { total: 0, count: 0 },
        2029: { total: 0, count: 0 },
        2030: { total: 0, count: 0 },
        2031: { total: 0, count: 0 },
        2032: { total: 0, count: 0 },
        2033: { total: 0, count: 0 },
        2034: { total: 0, count: 0 },
    };

    const [produkData, setProdukData] = useState(initYearData);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFirestore();
            const result = groupDataByYear(data);
            setProdukData(result);
        }
        fetchData();
    }, []);
    console.log("ini data transaksi", produkData)

    const chartData = {
        dataset1: [
            produkData[2024].total,
            produkData[2025].total,
            produkData[2026].total,
            produkData[2027].total,
            produkData[2028].total,
            produkData[2029].total,
            produkData[2030].total,
            produkData[2031].total,
            produkData[2032].total,
            produkData[2033].total,
            produkData[2034].total,
        ],
        dataset2: [
            produkData.MaxData - produkData[2024].total,
            produkData.MaxData - produkData[2025].total,
            produkData.MaxData - produkData[2026].total,
            produkData.MaxData - produkData[2027].total,
            produkData.MaxData - produkData[2028].total,
            produkData.MaxData - produkData[2029].total,
            produkData.MaxData - produkData[2030].total,
            produkData.MaxData - produkData[2031].total,
            produkData.MaxData - produkData[2032].total,
            produkData.MaxData - produkData[2033].total,
            produkData.MaxData - produkData[2034].total,
        ],
    };

    const [harianAktive, setHarianActive] = useState(false);
    const [bulananActive, setBulananActive] = useState(false);
    const [tahunanActive, setTahunanActive] = useState(true);
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
                        <h1>Pendapatan Tahunan</h1>
                        <ChartComponentTahunan data={chartData} />
                    </div>
                </section>
            </article>
        </div >
    );
};

export default Home;
