import { useRouter } from "next/router";
import { useState } from "react";
import { getNewData } from ".";
import CartNavbar from "./cartNavbar";
import NavbarButton from "./navbarButton";
import Link from "next/link";
import { db } from "../../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc, orderBy, FieldPath } from "firebase/firestore";

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

        console.log("Input Berhasil", docRef.id);
        return true;
    } catch (error) {
        console.error("Input gagal", error);
        return false;
    }
}

export default function Keranjang() {
    // const newData = getNewData();
    const [newData, setNewData] = useState(getNewData());
    const [noKamar, setNoKamar] = useState('');

    console.log("ini passing", newData);
    const router = useRouter();
    const handleGoBack = () => {
        router.back();
        // router.push("/costumer");
        // location.reload();
    };

    // const [jumlah_produk, setJumalah_produk] = useState("");

    // newData.map((item) => {
    //     setJumalah_produk(item.jml_produk);
    // })

    // console.log(jumlah_produk);

    const hargaPerItem = 45000;

    const [ambilActive, setAmbilActive] = useState(true);
    const [diantarActive, setAntarActive] = useState(false);
    const [visible, setVisible] = useState(true);

    const handleButtonClick2 = (buttonType) => {
        if (buttonType === "ambil") {
            setAmbilActive(true);
            setAntarActive(false);
            setVisible(true);
        } else if (buttonType === "antar") {
            setAmbilActive(false);
            setAntarActive(true);
            setVisible(false);
        }
    };


    // const handleButtonVisible = () => {
    // }

    // const handleButtonNoVisible = () => {
    // }

    const initialItemState = Array.from({ length: 2 }, () => 1);
    const [itemCounts, setItemCounts] = useState(Array(newData.length).fill(1));
    const [cart, setCart] = useState([]);

    const handleTambahClick = (index) => {
        setItemCounts((prevCounts) => {
            const newCounts = [...prevCounts];
            newCounts[index] += 1;

            // Tambahkan produk ke dalam keranjang jika belum ada
            if (!cart.find((item) => item.id === newData[index].id)) {
                setCart((prevCart) => [...prevCart, newData[index]]);
            }

            return newCounts;
        });
    };


    const handleKurangClick = (index) => {
        if (itemCounts[index] > 1) {
            setItemCounts((prevCounts) => {
                const newCounts = [...prevCounts];
                newCounts[index] -= 1;
                return newCounts;
            });
        } else {
            // Hapus produk dari cart
            setCart((prevCart) => prevCart.filter((item) => item.id !== newData[index].id));

            // Hapus produk dari newData
            setNewData((prevData) => {
                const newDataCopy = [...prevData];
                newDataCopy.splice(index, 1); // Hapus item yang jumlahnya mencapai 0
                return newDataCopy;
            });

            // Pastikan itemCounts tetap selaras dengan newData
            setItemCounts((prevCounts) => {
                const newCounts = [...prevCounts];
                newCounts.splice(index, 1); // Hapus jumlah yang sesuai dengan produk yang dihapus
                return newCounts;
            });
        }
    };



    const currentDate = new Date();
    const [keranjangMenu, setKeranjangMenu] = useState([]);

    const totalHarga = newData.reduce((acc, item, index) => acc + itemCounts[index] * item.harga, 0);
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    // const handleTambahKeranjang = () => {
    // };

    const handleSubmit_ModelTransaksi = async (event) => {
        event.preventDefault();

        try {
            const firstItem = newData[0];
            const itemUsername = newData[0];
            const menuPesanan = newData.map((item, index) => ({
                id: item.id,
                name: item.name,
                gambar: item.gambar,
                harga: item.harga,
                jumlah: itemCounts[index],
                totalHarga: itemCounts[index] * item.harga,
                tanggal: formattedDate,
                jumlahProduk: item.jml_produk,
            }));


            const now = new Date();
            const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            let metodePengambilan = visible ? 'Ambil Sendiri' : 'Diantarkan';
            console.log("Ini jam", timeString);

            const updateOperations = newData.map((item, index) =>
                updateDoc(doc(db, "produk", item.id), {
                    jml_produk: item.jml_produk - itemCounts[index]
                })
            );

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
                menuPesanan, // Pass the menuPesanan array
                "Tunai",
                itemCounts.reduce((acc, count) => acc + count, 0),
                totalHarga,
                timeString
            );

            if (added) {
                // Update stok produk di Firebase
                const updateOperations = cart.map((item) =>
                    updateDoc(doc(db, "produk", item.id), {
                        jml_produk: item.jml_produk - itemCounts[index]
                    })
                );

                await Promise.all(updateOperations);

                router.push("/costumer/transaksi");
            } else {
                console.error("Failed to add data to the database.");
            }
        } catch (error) {
            console.error("Error in submitting data: ", error);
        }
    };

    console.log("Cart", cart);
    console.log("item cart", itemCounts);

    return (
        <>
            <div className="keranjang d-flex">
                <div className="cart" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    <section>
                        <svg onClick={handleGoBack} style={{ cursor: 'pointer', marginBottom: '20px' }} xmlns="http://www.w3.org/2000/svg" width="32" height="23" viewBox="0 0 32 23" fill="none">
                            <rect x="0.0808105" y="11.3643" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-45 0.0808105 11.3643)" fill="#3598D7" />
                            <rect x="11.4458" y="22.8916" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-135 11.4458 22.8916)" fill="#3598D7" />
                            <rect x="9.05811" y="11.3643" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-45 9.05811 11.3643)" fill="#3598D7" />
                            <rect x="20.4231" y="22.8916" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-135 20.4231 22.8916)" fill="#3598D7" />
                        </svg>
                        <div className="navbarButton">
                            <button className={ambilActive ? "active" : ""} onClick={() => handleButtonClick2("ambil")}>Ambil sendiri</button>
                            <button className={diantarActive ? "active" : ""} onClick={() => handleButtonClick2("antar")}>Diantarkan</button>
                        </div>
                        <div className="section">
                            <div>
                                <div className="container">
                                    <div className="cards">
                                        <div className="row">
                                            {newData.map((item, index) => (
                                                <div className="col-md-12 mb-3" key={item}>
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
                                                                    <svg onClick={() => handleKurangClick(index)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                                        <circle cx="15" cy="15" r="15" fill="#BD0000" />
                                                                        <rect x="6" y="13" width="19" height="3.06452" rx="1.53226" fill="white" />
                                                                        Kurang
                                                                    </svg>
                                                                </span>
                                                                <span>
                                                                    <div>
                                                                        <p className="m-auto">{itemCounts[index]}</p>
                                                                    </div>
                                                                </span>
                                                                <span>
                                                                    <svg onClick={() => handleTambahClick(index)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
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
                                    {/* <p>3pcs</p> */}
                                    <p>{itemCounts.reduce((acc, count) => acc + count, 0)}</p>
                                    <p><b>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalHarga).replace(/\,00$/, '')}</b></p>
                                </span>
                            </div>
                        </div>
                    </section>
                    <section className="section">
                        <button onClick={handleSubmit_ModelTransaksi} style={{ backgroundColor: '#3598D7', color: '#fff' }}>Beli Sekarang</button>
                    </section>
                </div>
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
                    background-color: #3598D7;
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

console.log("new Kernajang", dataKernajang);

export const getDataKernajnag = () => {
    return dataKernajang;
};