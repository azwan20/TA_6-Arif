import Link from "next/link";
import CostumerAside from "./CostumerAside";
import Navbar from "./navbar";
import { getDataKernajnag } from "./keranjang";
import { useEffect, useState } from "react";
import { db } from "../../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc, orderBy, FieldPath } from "firebase/firestore";
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

async function fetchData_ModelUser() {
    const querySnapshot = await getDocs(collection(db, "model_user"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

export default function Transaksi() {
    const [isTransaksiActive, setIsTransaksiActive] = useState(true);
    const [isProdukActive, setIsProdukActive] = useState(false);
    const [produkDataModelTransaksi, setProdukDataModelTransaksi] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (email) {
            // alert(email)
            async function fetchData() {
                const data = await fetchData_ModelUser();
                const isEmailExist = data.find(user => user.email === email);
                if (isEmailExist) {
                    const targetUsername = "@" + isEmailExist.username;
                    setUsername(targetUsername);
                }
                // setLoading(false); // Set loading to false once data is fetched
            }
            fetchData();
        }
    }, []);

    const handleButtonClick = (buttonType) => {
        if (buttonType === "transaksi") {
            setIsTransaksiActive(true);
            setIsProdukActive(false);
        } else if (buttonType === "produk") {
            setIsTransaksiActive(false);
            setIsProdukActive(true);
        }
    };

    const { email, uid, role } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (uid) {
            // console.log("ini uid user: ", uid);
            // console.log("ini email user: ", email);
            // console.log("ini role user: ", role);
            if (role === 'admin') {
                router.push('/cashier');
            } else if (role === 'user') {
                // router.push('/costumer');
            } else {
                router.push('/owner');
            }
        }

    }, [uid]);

    const dataKernajnag = getDataKernajnag();

    // console.log("ini data Keranjang", dataKernajnag);


    const addDataToFirestore = async () => {
        try {
            // Assuming dataKernajnag is an array of objects
            for (const produk of dataKernajnag) {
                const docRef = await addDoc(collection(db, "model_transaksi"), {
                    nama_produk: produk.name,
                    harga_total: produk.totalHarga,
                    created_at: produk.tanggal,
                    // Add other properties as needed
                    timestamp: serverTimestamp(),
                });
            }
        } catch (error) {
            console.error("Error adding document: ", error);
        }
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
        router.push(`detail/${id}`);
    };

    return (
        <>
            <div>
                <div className="transaksi d-flex">
                    <CostumerAside isTransaksiActive={isTransaksiActive} isProdukActive={isProdukActive} email={username} handleButtonClick={handleButtonClick} />
                    <article style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                        {produkDataModelTransaksi.length === 0 ? (
                            <div className="kosong d-flex">
                                <h1>Belum ada transaksi</h1>
                            </div>
                        ) : (
                            <div className="isi">
                                <div className="container">
                                    <div className="cards">
                                        <div className="row">
                                            {produkDataModelTransaksi.map((produk, index) => (
                                                <div className="col-md-6 mb-3" key={produk}>
                                                    <div onClick={() => handleDetailTransaksi(produk.id)} className="card" style={{ border: 'none' }}>
                                                        <div className="card-body d-flex">
                                                            <section>
                                                                <div className="d-flex">
                                                                    <img
                                                                        src={produk.menu_pesanan[0].gambar}
                                                                        className="card-img-top"
                                                                        alt=""
                                                                    />
                                                                    <div className="d-flex flex-column justify-content-between p-1">
                                                                        <span>
                                                                            {produk.menu_pesanan.map((menu) => (
                                                                                <p className="card-text">{menu.name}</p>
                                                                            ))}
                                                                        </span>
                                                                        <span>
                                                                            <h5 className="card-title">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(produk.harga_total).replace(/\,00$/, '')}</h5>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                            <section className="align-items-end p-1 cardd">
                                                                <span>
                                                                    <b className={`card-title btn ${produk.status_pemesanan === 'Proses Selesai' ? 'btn-success' : 'btn-secondary'}`}>{produk.status_pemesanan}</b>
                                                                </span>
                                                                <span>
                                                                    <p>{produk.menu_pesanan[0].tanggal}</p>
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
                        )}
                    </article>
                </div>
                <Navbar />
            </div>
        </>
    )
}