import Link from "next/link";
import { useRouter } from "next/router";
import { db, SignOut } from "../../../public/firebaseConfig";
import { useUser } from "../../../public/user";
import Navbar from "./navbar";
import { useState } from "react";

export default function CashierAside({ isTransaksiActive, isProdukActive, handleButtonClick, email, profile }) {
    const router = useRouter();
    const goToPage = (page) => {
        router.push(page);
    };

    const [isMenuProduk, setIsMenuProdukActive] = useState(false);
    const [isTransaksiMobActive, setIsTransaksiMobActive] = useState(false);
    const [isProfileMobActive, setIsProfileMobActive] = useState(true);

    const handleButtonClickMobile = (buttonType) => {
        if (buttonType === "menu_produk") {
            setIsMenuProdukActive(true);
            setIsTransaksiMobActive(false);
            setIsProfileMobActive(false);
        } else if (buttonType === "transaksi_mobile") {
            setIsMenuProdukActive(false);
            setIsTransaksiMobActive(true);
            setIsProfileMobActive(false);
        } else if (buttonType === "profile_mobile") {
            setIsMenuProdukActive(false);
            setIsTransaksiMobActive(false);
            setIsProfileMobActive(true);
        }
    };

    const handleLogout = async () => {
        await SignOut();
        // Reload halaman setelah logout
        window.location.reload();
    };

    return (
        <>
            <aside className="asideCostumer" style={{ backgroundColor: '#fff', boxShadow: '3px 0px 5px 0px rgba(0,0,0,0.1)', zIndex: '999' }}>
                <section style={{ height: '35%' }}>
                    <img
                        src={profile}
                        className="rounded-circle" alt="Profile" width={100} height={100}
                    />
                    <div className="container-fluid d-flex flex-column align-items-center">
                        <h5>{email}</h5>
                        <button className="edit" onClick={() => goToPage('/costumer/editProfile')} ><p>Edit</p></button>
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
                        <button className='logout' onClick={handleLogout}>Logout</button>
                    </span>
                </section>
            </aside>
            <Navbar isMenuProduk={isMenuProduk} isTransaksiMobActive={isTransaksiMobActive} isProfileMobActive={isProfileMobActive} handleButtonClickMobile={handleButtonClickMobile} />
            <style jsx>{`
                button {
                    background-color: #ffffff;
                    border: 1px solid #E09200;
                    padding: 10px;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                a{
                    text-decoration: none;
                }

                button.active {
                    background-color: #E09200;
                    color: #ffffff;
                }

                .logout {

                }
            `}</style>
        </>
    )
}