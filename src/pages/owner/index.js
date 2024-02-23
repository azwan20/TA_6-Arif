// pages/index.js
// import Chart from '../components/Chart';
// import Chart from './chart';
import React, { useEffect, useState } from 'react';
import ChartComponent from './chart';
import { db } from "../../../public/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import OwnerAside from './ownerAside';
import { useRouter } from 'next/router';
import { useUser } from '../../../public/user';
import { query, where } from "firebase/firestore";
import { startOfWeek, endOfWeek, addDays } from 'date-fns';

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "model_transaksi"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

async function fetchData_ModelUser() {
    const querySnapshot = await getDocs(collection(db, "model_user"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

function convertTimestampToDay(jsonTimestamp) {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const fireBaseTime = new Date(
        jsonTimestamp.seconds * 1000 + jsonTimestamp.nanoseconds / 1000000,
    );
    const date = fireBaseTime;
    const dayIndex = date.getDay();

    return days[dayIndex];
}

const Home = () => {
    const router = useRouter();
    const { email, uid, role } = useUser();
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        if (uid) {
            if (role === 'admin') {
                router.push('/cashier');
            } else if (role === 'user') {
                router.push('/costumer');
            }
        } else {
            router.push('/');
        }
    }, [uid]);

    useEffect(() => {
        if (email) {
            async function fetchData() {
                const data = await fetchData_ModelUser();
                const isEmailExist = data.find(user => user.email === email);
                if (isEmailExist) {
                    setProfile(isEmailExist.img_profil);
                    const targetUsername = "@" + isEmailExist.username;
                    setUsername(targetUsername);
                }
            }
            fetchData();
        }
    }, [email]);

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
        const fetchDataForSelectedWeek = async () => {
            try {
                // Convert selected date to UTC format
                const selectedDateUTC = new Date(selectedDate).toISOString();

                // Find the start and end of the week in UTC format
                const startOfWeekUTC = startOfWeek(new Date(selectedDateUTC), { weekStartsOn: 1 }); // Assuming Monday is the start of the week
                const endOfWeekUTC = endOfWeek(new Date(selectedDateUTC), { weekStartsOn: 1 });

                // Fetch data for the entire week
                const querySnapshot = await getDocs(
                    query(
                        collection(db, "model_transaksi"),
                        where("date_selesai", ">=", startOfWeekUTC),
                        where("date_selesai", "<=", endOfWeekUTC)
                    )
                );

                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });

                console.log("Fetched Data for Selected Week:", data);

                if (data.length === 0) {
                    console.log("No data available for the selected week.");
                }

                // Update the chartData state based on the fetched data
                const updatedChartData = groupDataByDay(data);
                setProdukData(updatedChartData);
            } catch (error) {
                console.error("Error fetching data for selected week: ", error);
            }
        };

        fetchDataForSelectedWeek();
    }, [selectedDate]);

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

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    return (
        <div className="owner d-flex">
            <OwnerAside
                harianAktive={harianAktive}
                bulananActive={bulananActive}
                tahunanActive={tahunanActive}
                totalActive={totalActive}
                adminActive={adminActive}
                handleButtonClick={handleButtonClick}
                username={username}
                profile={profile}
            />
            <article className="d-flex" style={{ display: 'flex', height: '100vh', padding: '20px' }}>
                <section className="d-flex justify-content-center align-items-center" style={{ height: '100%', flexDirection: 'column' }}>
                    <div className='tanggalHarian'>
                        <input type="date" onChange={handleDateChange} />
                    </div>
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