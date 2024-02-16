import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/router';
import { ResetPass } from "../../../public/firebaseConfig";
import { SignUp as SignUpToFirebase, GetSignUpErrorMessage, db, SignOut } from "../../../public/firebaseConfig";

export default function LupaPassword() {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const resetPass = async (email) => {
        try {
            await ResetPass(email);
            alert('Email reset password telah terkirim!');
            SignOut()
            router.push('/');
        } catch (error) {
            alert("masukkan email");
        }
    };

    return (
        <>
            <div className="register  d-flex">
                <div className="registerFill lupaPassword d-flex">
                    <span>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            label="Email"
                            value={email}
                            placeholder="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </span>
                    <span>
                        <button style={{ backgroundColor: '#3598D7', color: '#fff' }} onClick={() => resetPass(email)}>Kirim Verifikasi ke Email</button>
                    </span>
                </div>
            </div>
        </>
    )
}