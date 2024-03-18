import React, { useEffect, useState } from 'react';
import PieChart from './pieChart';
import OwnerAside from './ownerAside';
import { db } from "../../../public/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useRouter } from 'next/router';
import { useUser } from '../../../public/user';
import Navbar from './navbar';
import Link from 'next/link';

// ... (kode sebelumnya)

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "model_transaksi"));
    const data = [];
    let totalProduk = 0;
    let jumlah = 0;  // Inisialisasi variabel untuk menyimpan total harga

    querySnapshot.forEach((doc) => {
        const transactionData = { id: doc.id, ...doc.data() };
        data.push(transactionData);

        jumlah += transactionData.jumlah || 0;

        // Hitung total produk
        if (transactionData.menu_pesanan) {
            transactionData.menu_pesanan.forEach(pesanan => {
                totalProduk += pesanan.jumlahProduk || 0;
            });
        }
    });

    // Mengembalikan data dan total produk
    return { data, totalProduk, jumlah };
}

async function fetchDataFromFirestoreProduk() {
    const querySnapshot = await getDocs(collection(db, "produk"));
    const data = [];
    let totalProduk = 0;

    querySnapshot.forEach((doc) => {
        const transactionData = { id: doc.id, ...doc.data() };
        data.push(transactionData);

        totalProduk = totalProduk + transactionData.jml_produk;
    });

    // Mengembalikan data dan total produk
    return { data, totalProduk };
}


async function fetchData_ModelUser() {
    const querySnapshot = await getDocs(collection(db, "model_user"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

// Menambahkan fungsi untuk menghitung jumlah transaksi pada masing-masing label
function calculateTransactionsByLabel(data) {
    const transactionsByLabel = {
        totalProduk: 0,  // Inisialisasi totalProduk
        jumlah: 0,
    };

    data.forEach(item => {
        // Akumulasi totalProduk dari setiap transaksi
        transactionsByLabel.jumlah += item.jumlah || 0;

        // Gantilah dengan properti label yang sesuai jika ada properti lain yang ingin Anda hitung
    });

    return transactionsByLabel;
}

function calculateTotalJmlProduk(data) {
    const totalJmlProduk = {
        totalProduk: 0,
        jumlah_produk: 0,
    };

    data.forEach(item => {
        // Accumulate totalJmlProduk from each transaction
        totalJmlProduk.jumlah_produk += item.jml_produk || 0;
        // Add more properties here if needed
    });

    return totalJmlProduk;
}



const IndexPage = () => {
    const [produkData, setProdukData] = useState([]);
    const [produkData2, setProdukData2] = useState([]);
    const [totalProduk, setTotalProduk] = useState(0);
    const { email, uid, role } = useUser();
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState("");
    const router = useRouter();

    // console.log("ini produk data", produkData2[0].jml_produk)

    useEffect(() => {
        if (uid) {
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

    useEffect(() => {
        async function fetchData() {
            const { data, totalProduk } = await fetchDataFromFirestore();
            setProdukData(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const { data, totalProduk } = await fetchDataFromFirestoreProduk();
            setProdukData2(data);
            setTotalProduk(totalProduk);
        }
        fetchData();
    }, []);


    // Menghitung jumlah transaksi pada masing-masing label
    const transactionsByLabel = calculateTransactionsByLabel(produkData);

    const totalJmlProduk = calculateTotalJmlProduk(produkData2);
    console.log("ini total produk", totalJmlProduk.jumlah_produk);

    // Menghasilkan data dan label untuk diagram pie
    const chartData = [totalJmlProduk.jumlah_produk, transactionsByLabel.jumlah];
    const chartLabels = ['Total Produk', 'Produk Terjual'];

    const [harianAktive, setHarianActive] = useState(false);
    const [bulananActive, setBulananActive] = useState(false);
    const [tahunanActive, setTahunanActive] = useState(false);
    const [totalActive, setTotalActive] = useState(true);
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
    const [isBulanan, setIsBulanan] = useState(false);
    const [isTahunan, setIsTahunan] = useState(false);
    const [isTotal, setIsTotal] = useState(true);
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
                <section className="d-flex justify-content-center" style={{ height: '100%' }}>
                    <div className='pieCharts'>
                        <h1>Pendapatan Total</h1>
                        <section className='totals'>
                            <span>
                                <p>Total Produk: {totalProduk}</p>
                                <p>Produk Terjual: {transactionsByLabel.jumlah}</p>
                            </span>
                            <span>
                                <Link href="/owner/rekap-penjualan"><button>Cetak Rekap Penjualan</button></Link>
                            </span>
                        </section>
                        <PieChart data={chartData} labels={chartLabels} />
                    </div>
                </section>
            </article>
            <Navbar isHarian={isHarian} isBulanan={isBulanan} isTahunan={isTahunan} isTotal={isTotal} isAdmin={isAdmin} handleButtonClickMobile={handleButtonClickMobile} />
        </div >
    );
};

export default IndexPage;
