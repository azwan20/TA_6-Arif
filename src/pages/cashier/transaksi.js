import Link from "next/link";
import { useEffect, useState } from "react";
import CashierAside from "./cashierAside";
import Navar from "./navbar";
import { db } from "../../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc, orderBy, FieldPath, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useUser } from "../../../public/user";

async function fetchData_ModelTransaksi() {
    const querySnapshot = await getDocs(collection(db, "model_transaksi"));

    const data = [];

    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

async function fetchData_ModelTransaksi2(id) {
    try {
        const docRef = doc(db, "model_transaksi", id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const data = { id: docSnapshot.id, ...docSnapshot.data() };
            return data;
        } else {
            // Handle case where the document doesn't exist
            return null;
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
        return null;
    }
}

async function updateData_ModelTransaksi(id, updatedData) {
    try {
        const produkRef = doc(db, 'model_transaksi', id);
        await updateDoc(produkRef, updatedData);
        console.log("Document successfully updated!");
        location.reload();
        return true;
    } catch (error) {
        console.error("Error updating document: ", error);
        return false;
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


export default function Transaksi() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [produkDataModelTransaksi, setProdukDataModelTransaksi] = useState([]);
    const [isDetailTransaksi, setDetailTransaksi] = useState([]);

    const handleCardClick = (index) => {
        setSelectedCard(index === selectedCard ? null : index);
    };

    useEffect(() => {
        async function fetchData() {
            const data = await fetchData_ModelTransaksi();
            setProdukDataModelTransaksi(data);
        }
        fetchData();
    }, []);

    const handleDetailTransaksi = (id) => {
        // Redirect to /detail-transaksi/[id]
        // router.push(`detail/${id}`);
        setDetailTransaksi(id);
    };

    console.log("ini id", isDetailTransaksi);

    const [detailData, setDetailData] = useState(null);
    const [totalHarga, setTotalHarga] = useState(0);

    useEffect(() => {
        async function fetchData() {
            if (isDetailTransaksi) {
                const data = await fetchData_ModelTransaksi2(isDetailTransaksi);

                var tempHarga = 0;
                if (data) {

                    data.menu_pesanan.forEach(e => {
                        tempHarga += e.totalHarga;
                    });


                }
                setDetailData(data);
                setTotalHarga(tempHarga);
            }
        }
        fetchData();
    }, [isDetailTransaksi]);




    console.log("ini id", detailData);

    const handleEdit_ModelTransaksi = async (id, updatedData) => {
        if (updatedData.status_pemesanan === "Proses Packing") {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const currentTime = `${hours}:${minutes}`;

            updatedData.date_proses_packing = currentTime;
        } else if (updatedData.status_pemesanan === "Proses Pengantaran") {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const currentTime = `${hours}:${minutes}`;

            updatedData.date_pengantaran = currentTime;

        }


        const edited = await updateData_ModelTransaksi(id, updatedData);
        if (edited) {
            alert("Data edited in Firebase DB");
            // Refresh the detailData after updating
            const updatedDetailData = await fetchData_ModelTransaksi2(id);
            setDetailData(updatedDetailData);
        }
    };

    const [isTransaksiActive, setIsTransaksiActive] = useState(true);
    const [isProdukActive, setIsProdukActive] = useState(false);

    const handleButtonClick = (buttonType) => {
        if (buttonType === "transaksi") {
            setIsTransaksiActive(true);
            setIsProdukActive(false);
        } else if (buttonType === "produk") {
            setIsTransaksiActive(false);
            setIsProdukActive(true);
        }
    };






    return (
        <>
            <div>
                <div className="kasir d-flex">
                    <CashierAside isTransaksiActive={isTransaksiActive} isProdukActive={isProdukActive} handleButtonClick={handleButtonClick} />
                    <article className={` ${selectedCard !== null ? 'article' : ''} `} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                        <div className="container">
                            <h4>Transaksi Costumer</h4>
                            <div className="cards">
                                <div className="row">
                                    {produkDataModelTransaksi.map((item, index) => (
                                        <div className={`col-md-${selectedCard !== null ? '12' : '4'} mb-3`} key={index}>
                                            <div className={`card ${selectedCard === index ? 'bg-primary' : ''}`} onClick={() => handleCardClick(index)}>
                                                <div onClick={() => handleDetailTransaksi(item.id)} className="card-body">
                                                    <section style={{ marginBottom: '20px' }}>
                                                        <span>
                                                            <p className="card-text">Nama costumer</p>
                                                            <h5 className="card-title">{item.nama_user}</h5>
                                                        </span>
                                                        <Link href="#" className={`btn ${item.status_pemesanan === 'Proses Selesai' ? 'btn-success' : 'btn-primary'}`}>
                                                            {item.status_pemesanan}
                                                        </Link>
                                                    </section>
                                                    <section>
                                                        <span>
                                                            <h4 className="card-title">{item.jumlah} Pesanan</h4>
                                                        </span>
                                                        <span>
                                                            <p>Tanggal</p>
                                                            <b>{item.menu_pesanan[0].tanggal}</b>
                                                        </span>
                                                    </section>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>
                    {selectedCard !== null && (
                        <div className={` detailCos ${selectedCard ? 'addProduk' : ''}`}>
                            {detailData && (
                                <div>
                                    <div className="mobileKasir">
                                        <svg className={`${selectedCard ? 'back' : ''}`} onClick={() => handleCardClick()} style={{ cursor: 'pointer', marginLeft: '10px' }} xmlns="http://www.w3.org/2000/svg" width="32" height="23" viewBox="0 0 32 23" fill="none">
                                            <rect x="0.0805664" y="11.4731" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-45 0.0805664 11.4731)" fill="#3598D7" />
                                            <rect x="11.4458" y="22.9995" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-135 11.4458 22.9995)" fill="#3598D7" />
                                            <rect x="9.05811" y="11.4731" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-45 9.05811 11.4731)" fill="#3598D7" />
                                            <rect x="20.4233" y="22.9995" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-135 20.4233 22.9995)" fill="#3598D7" />
                                        </svg>
                                        <div className="dropdowns">
                                            <div class="dropdown">
                                                <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Status
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">Batal</a></li>
                                                    <li><a class="dropdown-item" onClick={() => handleEdit_ModelTransaksi(detailData.id, { status_pemesanan: "Proses Packing" })} href="#">Prosess packing</a></li>
                                                    <li><a class="dropdown-item" onClick={() => handleEdit_ModelTransaksi(detailData.id, { status_pemesanan: "Proses Pengantaran" })} href="#">Siap diambil</a></li>
                                                    <li><a class="dropdown-item" onClick={() => handleEdit_ModelTransaksi(detailData.id, { status_pemesanan: "Proses Selesai" })} href="#">Selesai</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="data">
                                        <section>
                                            <p>No</p>
                                            <p>Nama Costumer</p>
                                            <p>Nama Admin</p>
                                            <p>Jenis Pembayaran</p>
                                            <p>Tanggal</p>
                                        </section>
                                        <section>
                                            <p><b>: 1</b></p>
                                            <p><b>: {detailData.nama_user}</b></p>
                                            <p><b>: {detailData.nama_admin}</b></p>
                                            <p><b>: {detailData.metode_pembayaran}</b></p>
                                            <p><b>: {detailData.menu_pesanan[0].tanggal}</b></p>
                                        </section>
                                    </div>
                                    <div>
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nama Produk</th>
                                                    <th scope="col">Kode Produk</th>
                                                    <th scope="col">Harga</th>
                                                    <th scope="col">Jumlah</th>
                                                    <th scope="col">Total Harga</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {detailData.menu_pesanan.map((menu, index) => (
                                                    <tr key={index}>
                                                        <th scope="row">{menu.name}</th>
                                                        <td>02034012</td>
                                                        <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(menu.harga).replace(/\,00$/, '')}</td>
                                                        <td>{menu.jumlah}</td>
                                                        <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(menu.totalHarga).replace(/\,00$/, '')}</td>
                                                    </tr>
                                                ))}
                                                <tr className="table-primary">
                                                    <th colspan="4">Total Harga</th>
                                                    <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalHarga).replace(/\,00$/, '')}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <Navar isTransaksiActive={isTransaksiActive} isProdukActive={isProdukActive} handleButtonClick={handleButtonClick} />
            </div>
        </>
    )
}