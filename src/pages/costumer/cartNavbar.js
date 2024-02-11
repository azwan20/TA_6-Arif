import { useState } from "react";

export default function CartNavbar({ timeTerima, timePacking, timeAntar, timeSelesai, packingActive, antarActive, selesaiActive, handleButtonClick, showAntarButton }) {

    return (
        <>
            <div className="cartNavbar">
                <section>
                    <p>Pesanan diterima</p>
                    {showAntarButton ?
                        <p>Proses packing</p>
                        :
                        <p>Siap diambil</p>
                    }
                    {showAntarButton && (
                        <p>Proses pengantaran</p>
                    )}
                    <p>Pesanan selesai</p>
                </section>
                <section>
                    <div className="garis ">
                        <button className="bulat"></button>
                        <button
                            className={`bulat ${packingActive ? "active" : ""}`}
                            onClick={() => handleButtonClick("packing")}
                        ></button>
                        {showAntarButton && (
                            <button
                                className={`bulat ${antarActive ? "active" : ""}`}
                                onClick={() => handleButtonClick("antar")}
                            ></button>
                        )}
                        <button
                            className={`bulat ${selesaiActive ? "active" : ""}`}
                            onClick={() => handleButtonClick("selesai")}
                        ></button>
                    </div>
                </section>
                <section className="time">
                    <p>{timeTerima} WITA</p>
                    <p>{timePacking} WITA</p>
                    {showAntarButton && (
                        <p>{timeAntar} WITA</p>
                    )}
                    <p>{timeSelesai} WITA</p>
                </section>
            </div>
            <style jsx>{`
                button {
                    background-color: #000;
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
