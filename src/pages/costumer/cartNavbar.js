import { useState } from "react";

export default function CartNavbar({ timeTerima, timePacking, timeAntar, timeSelesai, terimaActive, packingActive, antarActive, selesaiActive, handleButtonClick, showAntarButton }) {

    return (
        <>
            <div className="cartNavbar">
                <section>
                    <p>Pesanan diterima</p>
                    {showAntarButton && (
                        <p>Proses packing</p>
                    )}
                    {showAntarButton ?
                        <p>Proses pengantaran</p>
                        :
                        <p>Siap diambil</p>
                    }
                    <p>Pesanan selesai</p>
                </section>
                <section>
                    <div className="garis ">
                        <button
                            className={`bulat ${terimaActive ? "active" : ""}`}
                            onClick={() => handleButtonClick("terima")}
                        ></button>
                        {showAntarButton && (
                            <button
                                className={`bulat ${packingActive ? "active" : ""}`}
                                onClick={() => handleButtonClick("packing")}
                            ></button>
                        )}
                        <button
                            className={`bulat ${antarActive ? "active" : ""}`}
                            onClick={() => handleButtonClick("antar")}
                        ></button>
                        <button
                            className={`bulat ${selesaiActive ? "active" : ""}`}
                            onClick={() => handleButtonClick("selesai")}
                        ></button>
                    </div>
                </section>
                <section className="time">
                    <p>{timeTerima ? `${timeTerima} WITA` : ""}</p>
                    {showAntarButton && (
                        <p style={{ paddingRight: timeAntar === "" ? "50px" : "0" }}>{timePacking ? `${timePacking} WITA` : ""}</p>
                    )}
                    <p style={{ paddingRight: timeSelesai === "" ? "50px" : "0" }}>{timeAntar ? `${timeAntar} WITA` : ""}</p>
                    <p>{timeSelesai ? `${timeSelesai} WITA` : ""}</p>
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
                    background-color: #E09200;
                    color: #ffffff;
                }

                .logout {

                }
            `}</style>
        </>
    )
}
