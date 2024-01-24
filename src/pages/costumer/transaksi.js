import Link from "next/link";
import CostumerAside from "./CostumerAside";
import Navbar from "./navbar";

export default function Transaksi() {
    const transactions = [0];
    return (
        <>
            <div>
                <div className="transaksi d-flex">
                    <CostumerAside />
                    <article>
                        {transactions.length === 0 ? (
                            <div className="kosong d-flex">
                                <h1>Belum ada transaksi</h1>
                            </div>
                        ) : (
                            <div className="isi">
                                <div className="container">
                                    <div className="cards">
                                        <div className="row">
                                            {[0, 1, 2, 3].map((index) => (
                                                <div className="col-md-6 mb-3" key={index}>
                                                    <div className="card" style={{ border: 'none' }}>
                                                        <div className="card-body d-flex">
                                                            <section>
                                                                <div className="d-flex">
                                                                    <img
                                                                        src="https://down-id.img.susercontent.com/file/4297d96793c0da24cfb79dd2760e8d8c"
                                                                        className="card-img-top"
                                                                        alt=""
                                                                    />
                                                                    <div className="d-flex flex-column justify-content-between p-1">
                                                                        <span>
                                                                            <p className="card-text">Kripik Makaroni</p>
                                                                            <p className="card-text">Kripik Makaroni Balado</p>
                                                                        </span>
                                                                        <span>
                                                                            <h5 className="card-title">Rp 45.000</h5>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                            <section className="align-items-end p-1">
                                                                <span>
                                                                    <b className="card-title">Proses Packing</b>
                                                                </span>
                                                                <span>
                                                                    <p>12/01/2025</p>
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