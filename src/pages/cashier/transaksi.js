import Link from "next/link";
import { useState } from "react";
import CashierAside from "./cashierAside";
import Navar from "./navbar";

export default function Transaksi() {
    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (index) => {
        setSelectedCard(index === selectedCard ? null : index);
    };
    return (
        <>
            <div>
                <div className="kasir d-flex">
                    <CashierAside />
                    <article className={` ${selectedCard !== null ? 'article' : ''} `} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                        <div className="container">
                            <h4>Transaksi Costumer</h4>
                            <div className="cards">
                                <div className="row">
                                    {[0, 1, 2, 3, 4].map((index) => (
                                        <div className={`col-md-${selectedCard !== null ? '12' : '4'} mb-3`} key={index}>
                                            <div className={`card ${selectedCard === index ? 'bg-primary' : ''}`} onClick={() => handleCardClick(index)}>
                                                <div className="card-body">
                                                    <section style={{ marginBottom: '20px' }}>
                                                        <span>
                                                            <p className="card-text">Nama costumer</p>
                                                            <h5 className="card-title">Fulan</h5>
                                                        </span>
                                                        <Link href="#" className="btn btn-primary">
                                                            Proses
                                                        </Link>
                                                    </section>
                                                    <section>
                                                        <span>
                                                            <h4 className="card-title">12 Pesanan</h4>
                                                        </span>
                                                        <span>
                                                            <p>Tanggal</p>
                                                            <b>12/01/2025</b>
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
                                            <li><a class="dropdown-item" href="#">Prosess packing</a></li>
                                            <li><a class="dropdown-item" href="#">Siap diambil</a></li>
                                            <li><a class="dropdown-item" href="#">Selesai</a></li>
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
                                    <p><b>: Fulana</b></p>
                                    <p><b>: Nama Admin</b></p>
                                    <p><b>: Tunai</b></p>
                                    <p><b>: 12/01/2025</b></p>
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
                                        <tr>
                                            <th scope="row">Kripik Makaroni</th>
                                            <td>02034012</td>
                                            <td>Rp 20.000</td>
                                            <td>2</td>
                                            <td>Rp 40.000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
                <Navar />
            </div>
        </>
    )
}