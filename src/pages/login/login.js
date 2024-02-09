import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/router';
import FormError from "./error";
import { useForm } from 'react-hook-form'
import { SignIn, GetSignInErrorMessage, SignOut } from "../../../public/firebaseConfig";

export default function Login() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (values) => {
        const { email, password } = values
        try {
            await SignIn(email, password)
            alert("login berhasil")
            router.push('/');
        } catch (error) {
            const message = GetSignInErrorMessage(error.code)
            console.log(message)
            alert(message)
        }
    }
    return (
        <>
            <div className="login d-flex">
                <section className="loginFill">
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
                                <Link href="#">Forget Password</Link>
                            </span>
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