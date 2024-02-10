import Link from "next/link";

export default function LupaPassword() {
    return (
        <>
            <div className="register  d-flex">
                <div className="registerFill lupaPassword d-flex">
                    <span>
                        <input type="email" placeholder="email address" />
                    </span>
                    <span>
                        <button style={{ backgroundColor: '#3598D7', color: '#fff' }}>Kirim Verifikasi ke Email</button>
                    </span>
                </div>
            </div>
        </>
    )
}