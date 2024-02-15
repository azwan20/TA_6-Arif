// pages/index.js

import React, { useEffect, useState } from 'react';
import PieChart from './pieChart';
import OwnerAside from './ownerAside';
import { db } from "../../../public/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

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


const IndexPage = () => {
    const [produkData, setProdukData] = useState([]);
    const [totalProduk, setTotalProduk] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const { data, totalProduk } = await fetchDataFromFirestore();
            setProdukData(data);
            setTotalProduk(totalProduk);
        }
        fetchData();
    }, []);

    // Menghitung jumlah transaksi pada masing-masing label
    const transactionsByLabel = calculateTransactionsByLabel(produkData);

    // Menghasilkan data dan label untuk diagram pie
    const chartData = [totalProduk, transactionsByLabel.jumlah];
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
    return (
        <div className="owner d-flex">
            <OwnerAside harianAktive={harianAktive} bulananActive={bulananActive} tahunanActive={tahunanActive} totalActive={totalActive} adminActive={adminActive} handleButtonClick={handleButtonClick} />
            <article className="d-flex" style={{ display: 'flex', height: '100vh', padding: '20px' }}>
                <section className="d-flex justify-content-center" style={{ height: '100%' }}>
                    <div className='pieCharts'>
                        <h1>Pendapatan Total</h1>
                        <p>Total Produk: {totalProduk}</p>
                        <p>Produk Terjual: {transactionsByLabel.jumlah}</p>
                        <PieChart data={chartData} labels={chartLabels} />
                    </div>
                </section>
            </article>
        </div >
    );
};

export default IndexPage;
