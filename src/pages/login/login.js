import Link from "next/link";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from "../../../public/user";
import { useForm } from 'react-hook-form'
import { SignIn, GetSignInErrorMessage, SignOut } from "../../../public/firebaseConfig";

export default function Login() {
    const router = useRouter();
    const { email, uid } = useUser();

    useEffect(() => {
        if (uid) {
            router.push('/costumer');
        }
    }, [uid]);
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (values) => {
        const { email, password } = values
        try {
            await SignIn(email, password)
            alert("login berhasil")
            router.push('/costumer');
        } catch (error) {
            const message = GetSignInErrorMessage(error.code)
            console.log(message)
            alert(message)
        }
    }
    return (
        <>
            <div className="login d-flex">
                <section className="loginFill" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    <div style={{ width: '90%' }}>
                        <h1>Login</h1>
                        <p>Selamat datang kembali! Ayo login untuk pengalaman belanja online yang lebih mudah dan aman</p>
                    </div>
                    <div className="cards d-flex">
                        <div className="card">
                            <span>
                                <input placeholder="Username"
                                    id="email"
                                    type="email"
                                    name="email"
                                    label="Email atau nomor telepon"
                                    variant="filled"
                                    {...register("email", { required: true })}
                                />
                                <input id="password"
                                    name="password"
                                    type={'password'}
                                    label="Password"
                                    variant="filled"
                                    {...register("password", { required: true, minLength: 8 })}
                                    placeholder="Password" />
                                <Link href="login/lupa-password">Forget Password</Link>
                            </span>
                            <div className="loginBgn"></div>
                            <span>
                                <button>Login With Google</button>
                                <button type="button" onClick={handleSubmit(onSubmit)} style={{ backgroundColor: '#3598D7' }}>Login</button>
                                <p style={{ textAlign: 'center' }}>Don't have an account? <Link href="/login/register">Register</Link></p>
                            </span>
                        </div>
                    </div>
                </section>
                <section className="loginBg"></section>
            </div>
        </>
    )
}