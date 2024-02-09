import { useState } from "react";

export default function CartNavbar({ activeButtonType, handleButtonClick }) {
    // const [packingActive, setPackingActive] = useState(true);
    // const [antarkActive, setAntarkActive] = useState(false);
    // const [selesaiActive, setSelesaiActive] = useState(false);

    // const handleButtonClick = (buttonType) => {
    //     if (buttonType === "packing") {
    //         setPackingActive(true);
    //         setAntarkActive(false);
    //         setSelesaiActive(false);
    //     } else if (buttonType === "antar") {
    //         setPackingActive(false);
    //         setAntarkActive(true);
    //         setSelesaiActive(false);
    //     } else if (buttonType === "selesai") {
    //         setPackingActive(false);
    //         setAntarkActive(false);
    //         setSelesaiActive(true);
    //     }
    // };

    return (
        <>
            <div className="cartNavbar">
                <section>
                    <p>Pesanan diterima</p>
                    <p>Proses packing</p>
                    <p>Proses pengantaran</p>
                    <p>Pesanan selesai</p>
                </section>
                <section>
                    <div className="garis ">
                        <button className="bulat"></button>
                        <button
                            className={`bulat ${activeButtonType === "packing" ? "active" : ""}`}
                            onClick={() => handleButtonClick("packing")}
                        ></button>
                        <button
                            className={`bulat ${activeButtonType === "antar" ? "active" : ""}`}
                            onClick={() => handleButtonClick("antar")}
                        ></button>
                        <button
                            className={`bulat ${activeButtonType === "selesai" ? "active" : ""}`}
                            onClick={() => handleButtonClick("selesai")}
                        ></button>
                    </div>
                </section>
                <section className="time">
                    <p>20:00 WITA</p>
                    <p>20:01 WITA</p>
                    <p>22:10 WITA</p>
                    <p></p>
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
