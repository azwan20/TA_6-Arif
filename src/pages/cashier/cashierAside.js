import Link from "next/link";
import { useState } from "react";

export default function CashierAside() {
    const [isTransaksiActive, setIsTransaksiActive] = useState(true);
    const [isProdukActive, setIsProdukActive] = useState(false);

    const handleButtonClick = (buttonType) => {
        if (buttonType === "transaksi") {
            setIsTransaksiActive(true);
            setIsProdukActive(false);
        } else if (buttonType === "produk") {
            setIsTransaksiActive(false);
            setIsProdukActive(true);
        }
    };

    return (
        <>
            <aside>
                <section style={{ height: '35%' }}>
                    <img src="https://live.staticflickr.com/3188/2592549734_29b72b0e4e_z.jpg" className="rounded-circle" alt="Profile" width={100} height={100} />
                    <div className="container-fluid d-flex flex-column align-items-center">
                        <h5>Hilmi Ambong</h5>
                        <button className="edit"><p>Edit</p></button>
                    </div>
                    <div />
                </section>
                <section style={{ height: '65%' }}>
                    <span style={{ width: '90%' }}>
                        <Link href="/cashier/transaksi">
                            <button className={isTransaksiActive ? "active" : ""} onClick={() => handleButtonClick("transaksi")}>
                                Transaksi
                            </button>
                        </Link>
                        <Link href="/cashier/produk">
                            <button className={isProdukActive ? "active" : ""} onClick={() => handleButtonClick("produk")}>
                                Produk
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
