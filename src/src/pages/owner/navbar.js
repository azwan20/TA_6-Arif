import Link from "next/link";
import { useState } from "react";

export default function Navbar({ isHarian, isBulanan, isTahunan, isTotal, isAdmin, handleButtonClickMobile }) {
    return (
        <>
            <nav className="navbar navbars">
                <div className="container-fluid navOwners">
                    <Link href="/owner">
                        <span className={`mb-0 ${isHarian ? "active" : ""}`} onClick={() => handleButtonClickMobile("harian")}>
                            <p>Harian</p>
                        </span>
                    </Link>
                    <Link href="/owner/pendapatan-bulanan">
                        <span className={`mb-0 ${isBulanan ? "active" : ""}`} onClick={() => handleButtonClickMobile("bulanan")}>
                            <p>Bulanan</p>
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
