import Link from "next/link";
import { useState } from "react";

export default function Navbar({ isHarian, isBulanan, isTahunan, isTotal, isAdmin, handleButtonClickMobile }) {
    return (
        <>
            <nav className="navbar navbars">
                <div className="container-fluid">
                    <Link href="/owner">
                        <span className={`mb-0 ${isHarian ? "active" : ""}`} onClick={() => handleButtonClickMobile("harian")}>
                            <p>HARIAN</p>
                        </span>
                    </Link>
                    <Link href="/owner/pendapatan-bulanan">
                        <span className={`mb-0 ${isBulanan ? "active" : ""}`} onClick={() => handleButtonClickMobile("bulanan")}>
                            <p>BULANAN</p>
                        </span>
                    </Link>
                    <Link href="/owner/pendapatan-tahunan">
                        <span className={`mb-0 ${isTahunan ? "active" : ""}`} onClick={() => handleButtonClickMobile("tahunan")}>
                            <p>Tahunan</p>
                        </span>
                    </Link>
                    <Link href="/owner/pendapatan-total">
                        <span className={`mb-0 ${isTotal ? "active" : ""}`} onClick={() => handleButtonClickMobile("total")}>
                            <p>Total</p>
                        </span>
                    </Link>
                    <Link href="/owner/data-admin">
                        <span className={`mb-0 ${isAdmin ? "active" : ""}`} onClick={() => handleButtonClickMobile("admin")}>
                            <p>Admin</p>
                        </span>
                    </Link>
                </div>
            </nav>
            <style jsx>{`
                span {
                    background-color: #ffffff;
                    border: none;
                    padding: 0px;
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
