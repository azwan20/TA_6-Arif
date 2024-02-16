import Link from "next/link";
import { useRouter } from "next/router";
import { db, SignOut } from "../../../public/firebaseConfig";
import { useUser } from "../../../public/user";

export default function CashierAside({ isTransaksiActive, isProdukActive, handleButtonClick, email, profile }) {
    const router = useRouter();
    const goToPage = (page) => {
        router.push(page);
    };

    console.log("ini profile", profile)
    return (
        <>
            <aside>
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
                        <button className='logout' onClick={SignOut}>Logout</button>
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