import { useRouter } from "next/router";
import { useState } from "react";

export default function Keranjang() {
    const router = useRouter();
    const handleGoBack = () => {
        router.back(); // Fungsi untuk kembali ke halaman sebelumnya
    };

    const hargaPerItem = 45000;
    const initialItemState = Array.from({ length: 2 }, () => 1);
    const [itemCounts, setItemCounts] = useState(initialItemState);

    const handleTambahClick = (index) => {
        setItemCounts((prevCounts) => {
            const newCounts = [...prevCounts];
            newCounts[index] += 1;
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
        }
    };
    
    const totalHarga = itemCounts.reduce((acc, count) => acc + count * hargaPerItem, 0);
    return (
        <>
            <div className="keranjang d-flex">
                <div className="cart" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    <section>
                        <svg onClick={handleGoBack} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="32" height="23" viewBox="0 0 32 23" fill="none">
                            <rect x="0.0808105" y="11.3643" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-45 0.0808105 11.3643)" fill="#3598D7" />
                            <rect x="11.4458" y="22.8916" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-135 11.4458 22.8916)" fill="#3598D7" />
                            <rect x="9.05811" y="11.3643" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-45 9.05811 11.3643)" fill="#3598D7" />
                            <rect x="20.4231" y="22.8916" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-135 20.4231 22.8916)" fill="#3598D7" />
                        </svg>
                        <div className="section">
                            <div>
                                <div className="container">
                                    <div className="cards">
                                        <div className="row">
                                        {itemCounts.map((count, index) => (
                                                <div className="col-md-12 mb-3" key={index}>
                                                    <div className="card" style={{ border: 'none' }}>
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
                                                                            <p className="card-text"><b>Kripik Ambong</b></p>
                                                                        </span>
                                                                        <span>
                                                                            <p>Rp 45.000</p>
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
                                                                        <p className="m-auto">{count}</p>
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
                            <div className="sum">
                                <span>
                                    <p>Jumlah</p>
                                    <p>Harga Total</p>
                                </span>
                                <span style={{ textAlign: "right" }}>
                                    <p>{itemCounts.reduce((acc, count) => acc + count, 0)}</p>
                                    <p><b>{totalHarga}</b></p>
                                </span>
                            </div>
                        </div>
                    </section>
                    <section className="section">
                        <button>Beli Sekarang</button>
                    </section>
                </div>
            </div>
        </>
    )
}