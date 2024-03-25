import { useEffect, useState } from 'react';
// import ChartComponentBulanan from './chartBulanan';
import { db } from "../../../public/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useRouter } from 'next/router';
import { useUser } from '../../../public/user';
import React from 'react';


async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "model_transaksi"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

async function fetchDataFromFirestoreProduk() {
    const querySnapshot = await getDocs(collection(db, "produk"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

export default function RekapPenjualan() {
    const [produkData, setProdukData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('All'); // Default selected month
    const [dataProduk, setDataProduk] = useState([]);
    const [totalHarga, setTotalHarga] = useState(0);
    const router = useRouter();
    const { email, uid, role } = useUser();

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
        fetchData();
        fetchDataKeranjang();
    }, []);

    const fetchData = async () => {
        const data = await fetchDataFromFirestore();

        setProdukData(data);
    };

    const fetchDataKeranjang = async () => {
        const data = await fetchDataFromFirestoreProduk();
        setDataProduk(data);
    };

    function convertTimestampToMonth(jsonTimestamp) {
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const fireBaseTime = new Date(
            jsonTimestamp.seconds * 1000 + jsonTimestamp.nanoseconds / 1000000,
        );
        const monthIndex = fireBaseTime.getMonth();

        return months[monthIndex];
    }

    // const formattedDates = [];

    const formatDate = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('id-ID', options);
    };


    // Filter data based on the selected month
    const filteredProdukData = produkData.filter(item => {
        if (item.date_selesai === "date_selesai") {
            return false;
        }

        if (selectedMonth === 'All') {
            return true;
        } else {
            const monthName = convertTimestampToMonth(item.date_selesai);
            return monthName === selectedMonth;
        }
    });

    const sortedProdukData = filteredProdukData.slice().sort((a, b) => a.date_selesai.seconds - b.date_selesai.seconds);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <div className="rekap">
            <button className="print-button" onClick={() => window.print()}>Cetak</button>
            <div className='pilihBulan'>
                <span>
                    <label htmlFor="monthSelect">Pilih Bulan : </label>
                    <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange}>
                        <option value="All">All</option>
                        <option value="Januari">Januari</option>
                        <option value="Februari">Februari</option>
                        <option value="Maret">Maret</option>
                        <option value="April">April</option>
                        <option value="Mei">Mei</option>
                        <option value="Juni">Juni</option>
                        <option value="Juli">Juli</option>
                        <option value="Agustus">Agustus</option>
                        <option value="September">September</option>
                        <option value="September">September</option>
                        <option value="Oktober">Oktober</option>
                        <option value="November">November</option>
                        <option value="Desember">Desember</option>
                    </select>
                </span>
            </div>
            {sortedProdukData.length === 0 ? (
                <div className="kosong d-flex">
                    <h1>Belum ada transaksi pada {selectedMonth}</h1>
                </div>
            ) : (
                <div>

                    <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Rekap Penjualan - {selectedMonth}</h1>
                    <table className="table table-bordered">
                        <thead>
                            <tr className='text-center align-middle'>
                                <th rowSpan="2">No</th>
                                <th rowSpan="2">Tanggal</th>
                                <th colSpan="5">Detail Produk</th>
                                <th rowSpan="2">Total Jumlah</th>
                                <th rowSpan="2">Harga Total</th>
                                <th rowSpan="2">Nama Admin</th>
                            </tr>
                            <tr className='text-center align-middle'>
                                <th>Nama Produk</th>
                                <th>Harga Satuan</th>
                                <th>Jumlah</th>
                                <th>Harga total</th>
                                <th>Produk Tersisa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedProdukData.map((value, index) => (
                                <React.Fragment key={index}>
                                    <tr className='align-middle'>
                                        <td className='text-center' rowSpan={value.menu_pesanan.length + 1}>{index + 1}</td>
                                        <td rowSpan={value.menu_pesanan.length + 1}>{formatDate(value.date_selesai)}</td>
                                        <td style={{ padding: '0', margin: '0' }} colSpan="5">{/* Add Produk terjual value here */}</td>
                                        <td className='text-center' rowSpan={value.menu_pesanan.length + 1}>{value.menu_pesanan.reduce((sum, item) => sum + item.jumlah, 0)}</td>
                                        <td rowSpan={value.menu_pesanan.length + 1}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value.harga_total).replace(/\,00$/, '')}</td>
                                        <td rowSpan={value.menu_pesanan.length + 1}>{value.nama_admin}</td>
                                    </tr>
                                    {value.menu_pesanan.map((items, itemIndex) => (
                                        <tr key={itemIndex}>
                                            <td>{items.name}</td>
                                            <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(items.harga).replace(/\,00$/, '')}</td>
                                            <td className='text-center'>{items.jumlah}</td>
                                            <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(items.totalHarga).replace(/\,00$/, '')}</td>
                                            <td className='text-center'>{dataProduk.find((produk) => produk.kode === items.kode)?.jml_produk}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                            <tr className='text-center align-middle'>
                                <th colSpan={7}>Total Pendapatan</th>
                                {/* <td>Rp {sortedProdukData.reduce((sum, value) => sum + value.menu_pesanan.reduce((itemSum, items) => itemSum + parseInt(items.harga, 10), 0), 0)}</td> */}
                                <th>{sortedProdukData.reduce((sum, value) => sum + value.menu_pesanan.reduce((itemSum, items) => itemSum + items.jumlah, 0), 0)}</th>
                                <th>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(sortedProdukData.reduce((sum, value) => sum + value.menu_pesanan.reduce((itemSum, items) => itemSum + items.totalHarga, 0), 0)).replace(/\,00$/, '')}</th>
                                <th></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}