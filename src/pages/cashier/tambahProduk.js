import { useState } from "react";
import CashierAside from "./cashierAside";

export default function TambahProduk() {
    const [showProdukInput, setShowProdukInput] = useState(false);

    const handleCardClick = () => {
        setShowProdukInput(!showProdukInput);
    };
    return (
        <>
            <div className="produk d-flex">
                <CashierAside />
                <article className={`${showProdukInput ? 'article' : ''}`} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    <div className="addProduc">
                        <button type="button" onClick={() => handleCardClick()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <rect y="6.29004" width="15" height="2.41935" rx="1.20968" fill="white" />
                                <rect x="6.29004" y="15" width="15" height="2.41935" rx="1.20968" transform="rotate(-90 6.29004 15)" fill="white" />
                            </svg>
                            Tambah Produk
                        </button>
                    </div>
                    <div>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Nama Produk</th>
                                    <th scope="col">Kode Produk</th>
                                    <th scope="col">Harga</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="row">1</td>
                                    <td>Kripik Makaroni</td>
                                    <td>02034012</td>
                                    <td>Rp 20.000</td>
                                    <td>edit delete</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </article>
                {showProdukInput && (
                    <div className="produkInput d-flex">
                        <section>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="23" viewBox="0 0 32 23" fill="none">
                                <rect x="0.0805664" y="11.4731" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-45 0.0805664 11.4731)" fill="#3598D7" />
                                <rect x="11.4458" y="22.9995" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-135 11.4458 22.9995)" fill="#3598D7" />
                                <rect x="9.05811" y="11.4731" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-45 9.05811 11.4731)" fill="#3598D7" />
                                <rect x="20.4233" y="22.9995" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-135 20.4233 22.9995)" fill="#3598D7" />
                            </svg>
                            <span>
                                <p>Nama Produk</p>
                                <input type="text" />
                            </span>
                            <span>
                                <p>Kode Produk</p>
                                <input type="text" />
                            </span>
                            <span>
                                <p>Harga</p>
                                <input type="text" />
                            </span>
                        </section>
                        <section>
                            <button>UPLOAD</button>
                        </section>
                    </div>
                )}
            </div>
        </>
    )
}