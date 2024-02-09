import { useRouter } from "next/router";
import { useState } from "react";
import { getNewData } from ".";
import CartNavbar from "./cartNavbar";

export default function DetailTransaksi({ cartItems }) {
    const newData = getNewData();
    console.log("ini passing", newData);
    const router = useRouter();
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
                        {/* <CartNavbar /> */}
                        <div className="cartNavbar">
                <section>
                    <p>Pesanan diterima</p>
                    <p>Proses packing</p>
                    <p>Proses pengantaran</p>
                    <p>Pesanan selesai</p>
                </section>
                <section> 
                    <div className="garis ">
                        <button onClick={handleButtonVisible} className="bulat"></button>
                        <button onClick={handleButtonVisible} className="bulat"></button>                                             
                        <button onClick={handleButtonVisible} className="bulat"></button>
                        <button onClick={handleButtonNoVisible} className="bulat"></button>
                    </div>
                </section>
                <section className="time">
                    <p>20:00 WITA</p>
                    <p>20:01 WITA</p>
                    <p>22:10 WITA</p>
                    <p></p>
                </section>
            </div>
                        <div className="section">
                            <div>
                                <div className="container">
                                    <div className="cards">
                                        <div className="row">
                                            {newData.map((item) => (
                                                <div className="col-md-12 mb-3" key={item}>
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
                                                                            <p className="card-text"><b>{item.name}</b></p>
                                                                        </span>
                                                                        <span>
                                                                            <p>{item.harga}</p>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                            <section className="plusMin lign-items-center p-1 d-flex">
                                                                <span>
                                                                    <div style={{marginTop: '40px'}}>
                                                                        <p className="m-auto">1</p>
                                                                    </div>
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
                                    <p>Masukkan No Kamar</p>
                                    <p>Metode Pembayaran</p>
                                    <p>Jumlah</p>
                                    <p>Harga Total</p>
                                </span>
                                <span style={{ textAlign: "right" }}>
                                    <p>R. Lab Riset</p>
                                    <p>Tunai</p>
                                    <p>{itemCounts.reduce((acc, count) => acc + count, 0)}</p>
                                    <p><b>{totalHarga}</b></p>
                                </span>
                            </div>
                        </div>
                    </section>
                    <section className={`section ${visible ? 'visibles' : 'hidden'} `}>
                        <button>Barang telah diterima</button>
                    </section>
                </div>
            </div>
        </>
    )
}