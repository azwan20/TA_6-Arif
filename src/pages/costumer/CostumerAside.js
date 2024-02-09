import Link from "next/link";
import { useState } from "react";

export default function CashierAside({isTransaksiActive, isProdukActive, handleButtonClick }) {

    return (
        <>
            <aside>
                <section style={{ height: '35%' }}>
                    <img src="https://yt3.googleusercontent.com/JEUJQpROm96FqcQwLO_vMDp1WrY-KaT67Tgx28JPw_mS7ZT9pfl45SqeOSyJV4oZ83AuySpjYA=s176-c-k-c0x00ffffff-no-rj" className="rounded-circle" alt="Profile" width={100} height={100} />
                    <div className="container-fluid d-flex flex-column align-items-center">
                        <h5>Hilmi Ambong</h5>
                        <button className="edit"><p>Edit</p></button>
                    </div>
                    <div />
                </section>
                <section style={{ height: '65%' }}>
                    <span style={{ width: '90%' }}>
                        <Link href="/costumer">
                            <button className={isProdukActive ? "active" : ""} onClick={() => handleButtonClick("produk")}>
                                Menu Produk
                            </button>
                        </Link>
                        <Link href="/costumer/transaksi">
                            <button className={isTransaksiActive ? "active" : ""} onClick={() => handleButtonClick("transaksi")}>
                                Transaksi
                            </button>
                        </Link>
                    </span>
                    <span style={{ width: '80%' }}>
                        <button className='logout'>Logout</button>
                    </span>
                </section>
            </aside>
            <style jsx>{`
                button {
                    background-color: #ffffff;
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
