import Link from "next/link";
import { useState } from "react";
import Navar from "./navbar";

export default function CashierAside({ isTransaksiActive, isProdukActive, handleButtonClick }) {
    const [isTransaksiActive2, setIsTransaksiActive] = useState(false);
    const [isProdukActive2, setIsProdukActive] = useState(false);
    const [isProfileActive2, setIsProfileActive] = useState(true);

    const handleButtonClick2 = (buttonType) => {
        if (buttonType === "transaksi") {
            setIsTransaksiActive(true);
            setIsProdukActive(false);
            setIsProfileActive(false);
        } else if (buttonType === "produk") {
            setIsTransaksiActive(false);
            setIsProdukActive(true);
            setIsProfileActive(false);
        } else if (buttonType === "profile") {
            setIsTransaksiActive(false);
            setIsProdukActive(false);
            setIsProfileActive(true);
        }
    };

    return (
        <>
            <aside className="asideCashier">
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
            <Navar isTransaksiActive={isTransaksiActive2} isProdukActive={isProdukActive2} isProfileActive={isProfileActive2} handleButtonClick={handleButtonClick2} />
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
