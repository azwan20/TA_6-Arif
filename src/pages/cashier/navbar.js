import Link from "next/link";
import { useState } from "react";

export default function Navbar({isTransaksiActive, isProdukActive, isProfileActive, handleButtonClick }) {
    // const [isTransaksiActive, setIsTransaksiActive] = useState(true);
    // const [isProdukActive, setIsProdukActive] = useState(false);
    // const [isProfileActive, setIsProfileActive] = useState(false);

    // const handleButtonClick = (buttonType) => {
    //     if (buttonType === "transaksi") {
    //         setIsTransaksiActive(true);
    //         setIsProdukActive(false);
    //         setIsProfileActive(false);
    //     } else if (buttonType === "produk") {
    //         setIsTransaksiActive(false);
    //         setIsProdukActive(true);
    //         setIsProfileActive(false);
    //     } else if (buttonType === "profile") {
    //         setIsTransaksiActive(false);
    //         setIsProdukActive(false);
    //         setIsProfileActive(true);
    //     }
    // };

    return (
        <>
            <nav className="navbar navbars">
                <div className="container-fluid">
                    <Link href="/cashier/transaksi">
                        <span className={`mb-0 ${isTransaksiActive ? "active" : ""}`} onClick={() => handleButtonClick("transaksi")}>
                            <p>Transaksi</p>
                        </span>
                    </Link>
                    <Link href="/cashier/produk">
                        <span className={`mb-0 ${isProdukActive ? "active" : ""}`} onClick={() => handleButtonClick("produk")}>
                            <p>Produk</p>
                        </span>
                    </Link>
                    <Link href="/cashier/cashierAside">
                        <span className={`mb-0 ${isProfileActive ? "active" : ""}`} onClick={() => handleButtonClick("profile")}>
                            <p>Profile</p>
                        </span>
                    </Link>
                </div>
            </nav>
            <style jsx>{`
                span {
                    background-color: #ffffff;
                    border: none;
                    padding: 10px;
                    cursor: pointer;
                }

                span.active {
                    background-color: #3598D7;
                    color: #ffffff;
                }

                .logout {

                }
            `}</style>
        </>
    );
}
