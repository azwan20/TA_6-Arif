import Link from "next/link";
import { SignOut } from "../../../public/firebaseConfig";

export default function OwnerAside({ harianAktive, bulananActive, tahunanActive, totalActive, adminActive, handleButtonClick, username, profile }) {
    return (
        <>
            <aside>
                <section style={{ height: '20%' }}>
                    <img src={profile} alt="Profile" />
                    <h5>{username}</h5>
                    <div />
                </section>
                <section style={{ height: '80%' }}>
                    <span>
                        <Link href="/owner">
                            <button className={harianAktive ? "active" : ""} onClick={() => handleButtonClick("harian")}>
                                Pendapatan harian
                            </button>
                        </Link>
                        <Link href="/owner/pendapatan-bulanan">
                            <button className={bulananActive ? "active" : ""} onClick={() => handleButtonClick("bulanan")}>
                                Pendapatan bulanan</button>
                        </Link>
                        <Link href="/owner/pendapatan-tahunan">
                            <button className={tahunanActive ? "active" : ""} onClick={() => handleButtonClick("tahunan")}>
                                Pendapatan tahunan</button>
                        </Link>
                        <Link href="/owner/pendapatan-total">
                            <button className={totalActive ? "active" : ""} onClick={() => handleButtonClick("total")}>
                                Pendapatan Total</button>
                        </Link>
                        <Link href="/owner/data-admin">
                            <button className={adminActive ? "active" : ""} onClick={() => handleButtonClick("admin")}>
                                Data Admin</button>
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