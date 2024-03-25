import Link from "next/link";
import { useState } from "react";

export default function Navbar({ isMenuProduk, isTransaksiMobActive, isProfileMobActive, handleButtonClickMobile }) {
    return (
        <>
            <nav className="navbar navbars">
                <div className="container-fluid">
                    <Link href="/costumer">
                        <span className={`mb-0 ${isMenuProduk ? "active" : ""}`} onClick={() => handleButtonClickMobile("menu_produk")}>
                            <p>Menu Produk</p>
                        </span>
                    </Link>
                    <Link href="/costumer/transaksi">
                        <span className={`mb-0 ${isTransaksiMobActive ? "active" : ""}`} onClick={() => handleButtonClickMobile("transaksi_mobile")}>
                            <p>Transaksi</p>
                        </span>
                    </Link>
                    <Link href="/costumer/CostumerAside">
                        <span className={`mb-0 ${isProfileMobActive ? "active" : ""}`} onClick={() => handleButtonClickMobile("profile_mobile")}>
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
                    width: 100%;
                    color : #E09200;
                }

                span.active {
                    background-color: #E09200;
                    color: #ffffff;
                }

                .logout {

                }
            `}</style>
        </>
    );
}
