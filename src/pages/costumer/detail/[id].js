import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getNewData } from "..";
import CartNavbar from "../cartNavbar";
import { db } from "../../../../public/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

async function fetchData_ModelTransaksi(id) {
    const docRef = doc(db, "model_transaksi", id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
        const data = { id: docSnapshot.id, ...docSnapshot.data() };
        return [data];
    } else {
        // Handle case where the document doesn't exist
        return [];
    }
}



export default function DetailTransaksi({ cartItems }) {
    const newData = getNewData();
    console.log("ini passing", newData);

    const router = useRouter();
    const { id } = router.query;

    const handleGoBack = () => {
        router.back();
    };

    const hargaPerItem = 45000;
    const initialItemState = Array.from({ length: 2 }, () => 1);
    const [itemCounts, setItemCounts] = useState(initialItemState);
    const [visible, setVisible] = useState(true);

    const handleButtonVisible = () => {
        setVisible(true);
    }

    const handleButtonNoVisible = () => {
        setVisible(false);
    }

    const [detailData, setDetailData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (id) {
                const data = await fetchData_ModelTransaksi(id);
                setDetailData(data);

                if (data.length > 0) {
                    // Assuming 'created_at' is a string representing time
                    const createdTime = data[0].created_at;
                    setTimeTerima(createdTime); // Set the time directly

                    const createdTimePacking = data[0].date_proses_packing;
                    setTimePacking(createdTimePacking);

                    const createdTimeAntar = data[0].date_pengantaran;
                    setTimeAntar(createdTimeAntar);
                }
            }
        }
        fetchData();
    }, [id]);


    console.log("Ini detail", detailData);

    const [timeTerima, setTimeTerima] = useState("");
    const [timePacking, setTimePacking] = useState("");
    const [timeAntar, setTimeAntar] = useState("");
    const [timeSelesai, setTimeSelesai] = useState("");
    console.log("Ini waktu packing", timeAntar);

    const [packingVisible, setPackingVisible] = useState(true);
    const [antarVisible, setAntarVisible] = useState(false);
    const [selesaiVisible, setSelesaiVisible] = useState(false);

    const [activeButtonType, setActiveButtonType] = useState(null);

    const [packingActive, setPackingActive] = useState(true);
    const [antarActive, setAntarActive] = useState(false);
    const [selesaiActive, setSelesaiActive] = useState(false);

    const handleButtonClick = (buttonType) => {
        detailData.map((item) => {
            if (buttonType === "packing" && item.status_pemesanan === "Proses Packing") {
                setActiveButtonType("packing");
                setPackingVisible(true);
                setAntarVisible(false);
                setSelesaiVisible(false);
            } else if (buttonType === "antar" && item.status_pemesanan === "Proses Pengantaran") {
                setActiveButtonType("antar");
                setPackingVisible(false);
                setAntarVisible(true);
                setSelesaiVisible(false);
            } else if (buttonType === "selesai" && item.status_pemesanan === "Proses Selesai") {
                setActiveButtonType("selesai");
                setPackingVisible(false);
                setAntarVisible(false);
                setSelesaiVisible(true);
            } else {
                setActiveButtonType(null);
                setPackingVisible(false);
                setAntarVisible(false);
                setSelesaiVisible(false);
            }
        });
    };



    const metodePengambilan = detailData && detailData[0] ? detailData[0].metode_pengambilan : '';

    const showAntarButton = metodePengambilan === 'Diantarkan'; // Change this condition based on your actual values

    const totalHarga = itemCounts.reduce((acc, count) => acc + count * hargaPerItem, 0);
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
                        <CartNavbar timeTerima={timeTerima} timePacking={timePacking} timeAntar={timeAntar} packingActive={packingActive} antarActive={antarActive} selesaiActive={selesaiActive} showAntarButton={showAntarButton} handleButtonClick={handleButtonClick} />
                        <div className="section">
                            <div>
                                <div className="container">
                                    <div className="cards">
                                        <div className="row">
                                            {detailData && detailData.map((item) => (
                                                <div className="col-md-12 mb-3" key={item}>
                                                    {item.menu_pesanan.map((menu) => (
                                                        <div className="card" style={{ border: 'none', marginBottom: '20px' }}>
                                                            <div className="card-body d-flex justify-content-between">
                                                                <section>
                                                                    <div className="d-flex">
                                                                        <img
                                                                            src="https://down-id.img.susercontent.com/file/4297d96793c0da24cfb79dd2760e8d8c"
                                                                            className="card-img-top"
                                                                            alt=""
                                                                        />
                                                                        <div className="d-flex flex-column justify-content-between p-1">
                                                                            <span>
                                                                                <p className="card-text"><b>{menu.name}</b></p>
                                                                            </span>
                                                                            <span>
                                                                                <p>{menu.harga}</p>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </section>
                                                                <section className="plusMin lign-items-center p-1 d-flex">
                                                                    <span>
                                                                        <div style={{ marginTop: '40px' }}>
                                                                            <p className="m-auto">{menu.jumlah}</p>
                                                                        </div>
                                                                    </span>
                                                                </section>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="sum">
                                <span>
                                    {showAntarButton && (
                                        <p>Masukkan No Kamar</p>
                                    )}
                                    <p>Metode Pembayaran</p>
                                    <p>Jumlah</p>
                                    <p>Harga Total</p>
                                </span>
                                {detailData && detailData.map((item) => (
                                    <span style={{ textAlign: "right" }}>
                                        {showAntarButton && (
                                            <p>{item.lokasi_ruangan}</p>
                                        )}
                                        <p>Tunai</p>
                                        <p>{item.jumlah}</p>
                                        <p>Rp.<b>{item.harga_total}</b></p>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                    {/* {(selesaiVisible) && (
                        <section className="section">
                            <button>Barang telah diterima</button>
                        </section>
                    )} */}
                </div>
            </div>
        </>
    )
}