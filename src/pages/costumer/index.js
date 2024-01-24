import Link from "next/link";
import CostumerAside from "./CostumerAside";
import { useState } from "react";
import Navbar from "./navbar";

export default function Home() {
    const cards = Array.from({ length: 10 }, (_, index) => index + 1); // Creating an array of 10 items
    const [clickCount, setClickCount] = useState(0);

    const handleAddClick = () => {
        setClickCount((prevCount) => prevCount + 1);
    };
    return (
        <>
        <div>
            <div className="costumer d-flex">
                <CostumerAside />
                <article className="d-flex" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    <section>
                        <nav class="navbar" style={{ marginBottom: '20px' }}>
                            <div class="container-fluid">
                                <form class="d-flex ms-auto" role="search">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="47" viewBox="0 0 46 47" fill="none">
                                        <rect x="23" y="0.960938" width="32.5269" height="32.5269" rx="16.2635" transform="rotate(45 23 0.960938)" fill="#3598D7" />
                                        <rect x="20.1362" y="11.582" width="13.1959" height="13.1959" rx="6.59796" transform="rotate(45 20.1362 11.582)" fill="white" />
                                        <rect x="20.1362" y="14.5596" width="8.98584" height="8.98584" rx="4.49292" transform="rotate(45 20.1362 14.5596)" fill="#3598D7" />
                                        <rect x="24.2476" y="23.5947" width="9.79524" height="2.02494" rx="1.01247" transform="rotate(45 24.2476 23.5947)" fill="white" />
                                    </svg>
                                    <input class="" type="search" placeholder="Search" aria-label="Search" />
                                </form>
                            </div>
                        </nav>
                        <div className="container">
                            <div className="row row-cols-2 row-cols-md-5 g-4">
                                {cards.map((cardNumber) => (
                                    <div key={cardNumber} className="col">
                                        <div className="card">
                                            <img
                                                src="https://down-id.img.susercontent.com/file/4297d96793c0da24cfb79dd2760e8d8c"
                                                className="card-img-top"
                                                alt={`Card ${cardNumber}`}
                                            />
                                            <div className="card-body d-flex">
                                                <span>
                                                    <b className="card-title">Kripik Ambong</b>
                                                    <p className="card-text">
                                                        Rp 20.000
                                                    </p>
                                                </span>
                                                <span>
                                                <button className="add" onClick={handleAddClick}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                                            <rect y="6.29004" width="15" height="2.41935" rx="1.20968" fill="white" />
                                                            <rect x="6.29004" y="15" width="15" height="2.41935" rx="1.20968" transform="rotate(-90 6.29004 15)" fill="white" />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="d-flex ms-auto" style={{ margin: '20px 20px 0px' }}>
                    <Link href={`/costumer/keranjang`} className="keranjangs d-flex" style={{textDecoration: 'none', position: 'fixed', bottom: 0, right: 20, padding: '10px', color: '#3598D7' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 80 80" fill="none">
                                <rect width="79.0103" height="79.0103" rx="39.5051" fill="#E9F6FF" />
                                <path d="M23.5913 30.3232H63.6671L56.3234 46.2696H30.935L23.5913 30.3232Z" fill="#3598D7" />
                                <rect x="29.7808" y="41.4434" width="3.56696" height="11.2254" rx="1.78348" fill="#3598D7" />
                                <rect x="22.8647" y="25.3096" width="3.56696" height="11.2254" rx="1.78348" transform="rotate(-30 22.8647 25.3096)" fill="#3598D7" />
                                <rect x="15.5132" y="24.9561" width="3.56696" height="14.8558" rx="1.78348" transform="rotate(-75 15.5132 24.9561)" fill="#3598D7" />
                                <rect x="55.4839" y="49.1025" width="3.56696" height="25.7031" rx="1.78348" transform="rotate(90 55.4839 49.1025)" fill="#3598D7" />
                                <rect x="51.4971" y="53.5088" width="3.9866" height="3.9866" rx="1.9933" fill="#3598D7" />
                                <rect x="30.8301" y="53.5088" width="3.9866" height="3.9866" rx="1.9933" fill="#3598D7" />
                            </svg>
                            <p><b>{clickCount}</b></p>
                        </Link>
                    </section>
                </article>
            </div>
            <Navbar />
            </div>
        </>
    )
}