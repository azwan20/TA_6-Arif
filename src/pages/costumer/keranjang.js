import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getNewData } from ".";
import CartNavbar from "./cartNavbar";
import NavbarButton from "./navbarButton";
import Link from "next/link";
import { db } from "../../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc, orderBy, FieldPat, query, where } from "firebase/firestore";
import { useUser } from "../../../public/user";

async function deleteDataFromFirebase(id) {
    try {
        const produkRef = doc(db, "keranjang", id);
        await deleteDoc(produkRef);
        return true;
    } catch (error) {
        return false;
    }
}

async function AddData_ModelTransaksi(
    status_pemesanan,
    lokasi_ruangan,
    nama_admin,
    nama_user,
    email_user,
    date_terima_pesanan,
    date_proses_packing,
    date_pengantaran,
    date_selesai,
    telah_diterima,
    metode_pengambilan,
    menu_pesanan,
    metode_pembayaran,
    jumlah,
    harga_total,
    created_at,
) {
    try {
        const docRef = await addDoc(collection(db, "model_transaksi"), {
            status_pemesanan: status_pemesanan,
            lokasi_ruangan: lokasi_ruangan,
            nama_admin: nama_admin,
            nama_user: nama_user,
            email_user: email_user,
            date_terima_pesanan: date_terima_pesanan,
            date_proses_packing: date_proses_packing,
            date_pengantaran: date_pengantaran,
            date_selesai: date_selesai,
            telah_diterima: telah_diterima,
            metode_pengambilan: metode_pengambilan,
            menu_pesanan: menu_pesanan, // Store all products in a single array
            metode_pembayaran: metode_pembayaran,
            jumlah: jumlah,
            harga_total: harga_total,
            created_at: created_at,
        });

        return true;
    } catch (error) {
        return false;
    }
}

async function fetchData_keranjang(email) {
    const querySnapshot = await getDocs(query(collection(db, "keranjang"), where("email", "==", email)));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    })
    return data;
}

async function updateData_keranjang(newData, count) {
    try {
        const keranjangRef = doc(db, "keranjang", newData.id);
        await updateDoc(keranjangRef, {
            name: newData.name,
            gambar: newData.gambar,
            kode: newData.kode,
            harga: newData.harga,
            jml_produk: newData.jml_produk,
            username: newData.username,
            email: newData.email,
            count: count,
        });
        return true;
    } catch (error) {
        return false;
    }
}

export default function Keranjang() {
    const { email, uid, role } = useUser();
    const [newData, setData] = useState([]);

    const [noKamar, setNoKamar] = useState('');

    const router = useRouter();
    const handleGoBack = () => {
        router.back();
    };

    const [ambilActive, setAmbilActive] = useState(true);
    const [diantarActive, setAntarActive] = useState(false);
    const [visible, setVisible] = useState(true);
    const [minBelanja, setMinBelanja] = useState(false);

    const handleButtonClick2 = (buttonType) => {
        if (buttonType === "ambil") {
            setAmbilActive(true);
            setAntarActive(false);
            setVisible(true);
            setMinBelanja(false);
        } else if (buttonType === "antar" && totalsHarga >= 50000) {
            setAmbilActive(false);
            setAntarActive(true);
            setVisible(false);
        } else if (buttonType === "antar" && totalsHarga <= 50000) {
            setMinBelanja(true);
        } else if (buttonType === "tutup") {
            setMinBelanja(false);
        }
    };

    const initialItemState = Array.from({ length: 2 }, () => 1);
    const [itemCounts, setItemCounts] = useState(0);

    const [cart, setCart] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const handleTambahClick = async (index) => {
        let tCount = index.count + 1;
        await updateData_keranjang(index, tCount);
        const data = await fetchData_keranjang(email);
        setDataKeranjangs(data);
        let tTotals = 0;
        let tItem = 0;
        data.map((value) => {
            tTotals += value.harga * value.count;
            tItem += value.count;
        })
        setTotalsHarga(tTotals);
        setTotalItems(tItem);
    };


    // Function to decrement the item count
    const handleKurangClick = async (id) => {
        const produkExist = dataKernajangs.find(p => p.id === id);
        if (produkExist.count === 1) {
            const produkRef = doc(db, "keranjang", produkExist.id);
            await deleteDoc(produkRef);
        } else {
            const keranjangRef = doc(db, "keranjang", id);
            await updateDoc(keranjangRef, { count: (produkExist.count - 1) });
        }

        let tCount = id.count - 1;
        await updateData_keranjang(id, tCount);
        const data = await fetchData_keranjang(email);
        setDataKeranjangs(data);
        let tTotals = 0;
        let tItem = 0;
        data.map((value) => {
            tTotals += value.harga * value.count;
            tItem += value.count;
        })
        setTotalsHarga(tTotals);
        setTotalItems(tItem);
        return true;
    };

    const [dataKernajangs, setDataKeranjangs] = useState([]);

    useEffect(() => {
        async function fetchData() {

            const data = await fetchData_keranjang(email);
            setDataKeranjangs(data);
            let tTotals = 0;
            let tItem = 0;
            data.map((value) => {
                tTotals += value.harga * value.count;
                tItem += value.count;
            })
            setTotalsHarga(tTotals);
            setTotalItems(tItem);
        }
        fetchData();
    }, []);

    console.log("data keranjang", dataKernajangs);

    const currentDate = new Date();
    const [keranjangMenu, setKeranjangMenu] = useState([]);

    const totalHarga = newData.reduce((acc, item, index) => acc + itemCounts[index] * item.harga, 0);
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;



    const handleSubmit_ModelTransaksi = async (event) => {
        event.preventDefault();

        try {
            const firstItem = dataKernajangs[0];
            const itemUsername = dataKernajangs[0];
            // const updateOperations = dataKernajangs.map((item, index) => {
            //     // Capture the index in a variable
            //     const currentIndex = index;
            //     return updateDoc(doc(db, "produk", item.id), {
            //         jml_produk: item.jml_produk - totalItems[currentIndex]
            //     });
            // });

            const menuPesanan = dataKernajangs.map((item, index) => ({
                id: item.id,
                name: item.name,
                gambar: item.gambar,
                harga: item.harga,
                jumlah: item.count,
                totalHarga: item.harga * item.count,
                kode: item.kode,
                tanggal: formattedDate,
                jumlahProduk: item.jml_produk,
            }));

            const now = new Date();
            const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            let metodePengambilan = visible ? 'Ambil Sendiri' : 'Diantarkan';

            const added = await AddData_ModelTransaksi(
                "Pesanan Diterima",
                noKamar,
                "nama_admin",
                itemUsername.username,
                firstItem.email,
                "date_terima_pesanan",
                "",
                "",
                "date_selesai",
                "telah_diterima",
                metodePengambilan,
                menuPesanan,
                "Tunai",
                totalItems,
                totalsHarga,
                timeString
            );

            if (added) {
                // Update stok produk di Firebase
                // await Promise.all(updateOperations);
                dataKernajangs.forEach(async (item) => {
                    await deleteDoc(doc(db, 'keranjang', item.id));
                });
                for (let index = dataKernajangs.length; index < dataKernajangs.length; index++) {
                    const produkRef = doc(db, "keranjang", data[index].id);
                    await deleteDoc(produkRef);
                    return true;
                }
                router.push("/costumer/transaksi");
            } else {
            }
        } catch (error) {
        }
    };

    const [totalsHarga, setTotalsHarga] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    return (
        <>
            <div className="keranjang d-flex">
                <div className="cart" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    <section>
                        <svg onClick={handleGoBack} style={{ cursor: 'pointer', marginBottom: '20px' }} xmlns="http://www.w3.org/2000/svg" width="32" height="23" viewBox="0 0 32 23" fill="none">
                            <rect x="0.0808105" y="11.3643" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-45 0.0808105 11.3643)" fill="#E09200" />
                            <rect x="11.4458" y="22.8916" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-135 11.4458 22.8916)" fill="#E09200" />
                            <rect x="9.05811" y="11.3643" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-45 9.05811 11.3643)" fill="#E09200" />
                            <rect x="20.4231" y="22.8916" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-135 20.4231 22.8916)" fill="#E09200" />
                        </svg>
                        <div className="navbarButton">
                            <button className={ambilActive ? "active" : ""} onClick={() => handleButtonClick2("ambil")}>Ambil sendiri</button>
                            <button className={diantarActive && totalsHarga >= 50000 ? "active" : ""} onClick={() => handleButtonClick2("antar")}>Diantarkan</button>
                        </div>
                        <div className="section">
                            <div>
                                <div className="container">
                                    <div className="cards">
                                        <div className="row">
                                            {dataKernajangs.map((item, index) => (
                                                <div className="col-md-12 mb-3" key={item.id}>
                                                    <div className="card" style={{ border: 'none' }}>
                                                        <div className="card-body d-flex justify-content-between">
                                                            <section>
                                                                <div className="d-flex">
                                                                    <img
                                                                        src={item.gambar}
                                                                        className="card-img-top"
                                                                        alt=""
                                                                    />
                                                                    <div className="d-flex flex-column justify-content-between p-1">
                                                                        <span>
                                                                            <p className="card-text"><b>{item.name}</b></p>
                                                                        </span>
                                                                        <span>
                                                                            <p>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.harga).replace(/\,00$/, '')}</p>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                            <section className="plusMin lign-items-center p-1 d-flex">
                                                                <span>
                                                                    <svg onClick={() => handleKurangClick(item.id)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                                        <circle cx="15" cy="15" r="15" fill="#BD0000" />
                                                                        <rect x="6" y="13" width="19" height="3.06452" rx="1.53226" fill="white" />
                                                                        Kurang
                                                                    </svg>
                                                                </span>
                                                                <span>
                                                                    <div>
                                                                        <p className="m-auto">{item.count}</p>
                                                                    </div>
                                                                </span>
                                                                <span>
                                                                    <svg onClick={() => handleTambahClick(item)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                                        <circle cx="14.9995" cy="15" r="15" fill="#0EAC00" />
                                                                        <rect x="5.99951" y="13.9688" width="19" height="3.06452" rx="1.53226" fill="white" />
                                                                        <rect x="13.9675" y="25" width="19" height="3.06452" rx="1.53226" transform="rotate(-90 13.9675 25)" fill="white" />
                                                                        Tambah
                                                                    </svg>
                                                                </span>
                                                            </section>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <span className="inputan d-flex justify-content-between align-items-center">
                                <p className={` ${visible ? 'visibles' : 'hidden'}`}>Masukkan No Kamar</p>
                                <input className={` ${visible ? 'visibles' : 'hidden'}`} type="text"
                                    placeholder="mis R. Lab Riset"
                                    id="noKamar" value={noKamar} onChange={(e) => setNoKamar(e.target.value)}
                                />
                            </span>
                            <span className="metode">
                                <p>Metode pembayaran</p>
                                <p>Tunai</p>
                            </span>
                            <div className="sum">
                                <span>
                                    <p>Jumlah</p>
                                    <p>Harga Total</p>
                                </span>
                                <span style={{ textAlign: "right" }}>
                                    <p>{totalItems}</p>
                                    <p><b>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalsHarga).replace(/\,00$/, '')}</b></p>
                                </span>
                            </div>
                        </div>
                    </section>
                    <section className="section">
                        <button onClick={handleSubmit_ModelTransaksi} style={{ backgroundColor: '#E09200', color: '#fff' }}>Beli Sekarang</button>
                    </section>
                </div>
                {minBelanja && (
                    <div className="minBelanja">
                        <div>
                            <span><p>Opsi diantarkan hanya bisa dilakukan jika <br />minimal pembelanjaan anda Rp 50.000 rupiah</p></span>
                            <span>
                                <button onClick={() => handleButtonClick2("tutup")}>Tutup</button>
                            </span>
                        </div>
                    </div>
                )}
            </div>
            <style jsx>{`
                button {
                    background-color: #ffffff;
                    color: #000000;
                    border: none;
                    padding: 10px;
                    cursor: pointer;
                }

                button.active {
                    background-color: #E09200;
                    color: #ffffff;
                }

                .logout {

                }
            `}</style>
        </>
    )
}

const dataKernajang = [

];

export const getDataKernajnag = () => {
    return dataKernajang;
};
