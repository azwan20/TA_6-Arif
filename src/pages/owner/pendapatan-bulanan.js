import { useEffect, useState } from 'react';
import ChartComponentBulanan from './chartBulanan';
import { db } from "../../../public/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import OwnerAside from './ownerAside';
import { useRouter } from 'next/router';
import { useUser } from '../../../public/user';
import Navbar from './navbar';

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "model_transaksi"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

async function AddData_ModelUser(img_profil, email, username) {
    try {
        const docRef = await addDoc(collection(db, "model_user"), {
            img_profil: img_profil,
            email: email,
            username: username,
            role: "admin",
        });
    } catch (error) {
    }
}

async function fetchData_ModelUser() {
    const querySnapshot = await getDocs(collection(db, "model_user"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

const Home = () => {
    const { email, uid, role } = useUser();
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (uid) {
            // console.log("ini uid user: ", uid);
            // console.log("ini email user: ", email);
            // console.log("ini role user: ", role);
            if (role === 'admin') {
                router.push('/cashier');
            } else if (role === 'user') {
                router.push('/costumer');
            } else {
                // router.push('/owner');
            }
        } else {
            router.push('/');
        }

    }, [uid]);
    //fungsi baca data user
    useEffect(() => {
        if (email) {
            // alert(email)
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
    }, []);

    function groupDataByMonth(data) {
        const monthsData = {
            Januari: { total: 0, count: 0 },
            Februari: { total: 0, count: 0 },
            Maret: { total: 0, count: 0 },
            April: { total: 0, count: 0 },
            Mei: { total: 0, count: 0 },
            Juni: { total: 0, count: 0 },
            Juli: { total: 0, count: 0 },
            Agustus: { total: 0, count: 0 },
            September: { total: 0, count: 0 },
            Oktober: { total: 0, count: 0 },
            November: { total: 0, count: 0 },
            Desember: { total: 0, count: 0 },
            MaxData: 0,
        };

        data.forEach(item => {
            const monthName = convertTimestampToMonth(item.date_selesai);
            const hargaTotal = item.harga_total || 0;

            if (!monthsData[monthName]) {
                // Jika objek bulan belum dibuat, buat objek baru dengan properti total dan count
                monthsData[monthName] = { total: 0, count: 0 };
            }

            monthsData[monthName].total += hargaTotal;
            monthsData[monthName].count += 1;

            if (monthsData[monthName].total > monthsData.MaxData) {
                monthsData.MaxData = monthsData[monthName].total;
            }
        });

        return monthsData;
    }

    // Fungsi untuk mengonversi timestamp menjadi nama hari
    function convertTimestampToMonth(jsonTimestamp) {
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const fireBaseTime = new Date(
            jsonTimestamp.seconds * 1000 + jsonTimestamp.nanoseconds / 1000000,
        );
        const monthIndex = fireBaseTime.getMonth();

        return months[monthIndex];
    }

    const initMonthData = {
        Januari: { total: 0, count: 0 },
        Februari: { total: 0, count: 0 },
        Maret: { total: 0, count: 0 },
        April: { total: 0, count: 0 },
        Mei: { total: 0, count: 0 },
        Juni: { total: 0, count: 0 },
        Juli: { total: 0, count: 0 },
        Agustus: { total: 0, count: 0 },
        September: { total: 0, count: 0 },
        Oktober: { total: 0, count: 0 },
        November: { total: 0, count: 0 },
        Desember: { total: 0, count: 0 },
    };

    const [produkData, setProdukData] = useState(initMonthData);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFirestore();
            const result = groupDataByMonth(data);
            setProdukData(result);
        }
        fetchData();
    }, []);

    console.log("ini data transaksi", produkData)

    const chartData = {
        dataset1: [
            produkData.Januari.total,
            produkData.Februari.total,
            produkData.Maret.total,
            produkData.April.total,
            produkData.Mei.total,
            produkData.Juni.total,
            produkData.Juli.total,
            produkData.Agustus.total,
            produkData.September.total,
            produkData.Oktober.total,
            produkData.November.total,
            produkData.Desember.total,
        ],
        dataset2: [
            produkData.MaxData - produkData.Januari.total,
            produkData.MaxData - produkData.Februari.total,
            produkData.MaxData - produkData.Maret.total,
            produkData.MaxData - produkData.April.total,
            produkData.MaxData - produkData.Mei.total,
            produkData.MaxData - produkData.Juni.total,
            produkData.MaxData - produkData.Juli.total,
            produkData.MaxData - produkData.Agustus.total,
            produkData.MaxData - produkData.September.total,
            produkData.MaxData - produkData.Oktober.total,
            produkData.MaxData - produkData.November.total,
            produkData.MaxData - produkData.Desember.total,
        ],
    };

    const [harianAktive, setHarianActive] = useState(false);
    const [bulananActive, setBulananActive] = useState(true);
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

    const [isHarian, setIsHarian] = useState(false);
    const [isBulanan, setIsBulanan] = useState(true);
    const [isTahunan, setIsTahunan] = useState(false);
    const [isTotal, setIsTotal] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleButtonClickMobile = (buttonType) => {
        if (buttonType === "harian") {
            setIsHarian(true);
            setIsBulanan(false);
            setIsTahunan(false);
            setIsTotal(false);
            setIsAdmin(false);
        } else if (buttonType === "bulanan") {
            setHarianActive(false);
            setIsBulanan(true);
            setIsTahunan(false);
            setIsTotal(false);
            setIsAdmin(false);
        } else if (buttonType === "tahunan") {
            setHarianActive(false);
            setIsBulanan(false);
            setIsTahunan(true);
            setIsTotal(false);
            setIsAdmin(false);
        } else if (buttonType === "total") {
            setHarianActive(false);
            setIsBulanan(false);
            setIsTahunan(false);
            setIsTotal(true);
            setIsAdmin(false);
        } else if (buttonType === "admin") {
            setHarianActive(false);
            setIsBulanan(false);
            setIsTahunan(false);
            setIsTotal(false);
            setIsAdmin(true);
        }
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
                <section className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                    <div className='chart'>
                        <h1>Pendapatan Bulanan</h1>
                        <ChartComponentBulanan data={chartData} />
                    </div>
                </section>
            </article>
            <Navbar isHarian={isHarian} isBulanan={isBulanan} isTahunan={isTahunan} isTotal={isTotal} isAdmin={isAdmin} handleButtonClickMobile={handleButtonClickMobile} />
        </div >
    );
};

export default Home;
