import Link from "next/link";
import { SignOut } from "../../../public/firebaseConfig";
import { useRouter } from "next/router";

export default function OwnerAside({ harianAktive, bulananActive, tahunanActive, totalActive, adminActive, handleButtonClick, username, profile }) {
    const router = useRouter();
    const goToPage = (page) => {
        router.push(page);
    };

    return (
        <>
            <aside>
                <section style={{ height: '30%' }}>
                    <img src={profile} alt="Profile" className="rounded-circle" width={100} height={100} />
                    <div className="container-fluid d-flex flex-column align-items-center">
                        <h5>{username}</h5>
                        <button className="edit" onClick={() => goToPage('/owner/editProfile')} ><p>Edit</p></button>
                    </div>
                    <div />
                </section>
                <section style={{ height: '70%' }}>
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