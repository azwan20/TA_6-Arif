import Link from "next/link";
import FormError from "./error";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from "../../../public/user";
import { useForm } from 'react-hook-form'
import { SignIn, GetSignInErrorMessage, SignOut } from "../../../public/firebaseConfig";
import { db } from "../../../public/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";



async function fetchData_ModelUser() {
    const querySnapshot = await getDocs(collection(db, "model_user"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

export default function Login() {
    const router = useRouter();
    const { email, uid, role } = useUser();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (uid) {
            if (role === 'admin') {
                router.push('/cashier');
            } else if (role === 'user') {
                router.push('/costumer');
            } else {
                router.push('/owner');
            }
        }
    }, [uid]);

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (values) => {
        const { email, password } = values
        try {
            const data = await fetchData_ModelUser();
            const userData = data.find(user => user.email === email);

            await SignIn(email, password);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            if (userData.role === 'admin') {
                router.push('/cashier');
            } else if (userData.role === 'user') {
                router.push('/costumer');
            } else {
                router.push('/owner');
            }

        } catch (error) {
            const message = GetSignInErrorMessage(error.code)
            // console.log("ini salah")
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
                                <div className="email">
                                    <input placeholder="Email"
                                        id="email"
                                        type="email"
                                        name="email"
                                        label="Email atau nomor telepon"
                                        variant="filled"
                                        {...register("email", { required: true })}
                                    />
                                    <FormError error={errors.email} />
                                </div>
                                <div className="passw d-flex">
                                    <input id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        label="Password"
                                        variant="filled"
                                        {...register("password", { required: true, minLength: 8 })}
                                        style={{ width: '90%' }}
                                        placeholder="Password" />
                                    <button
                                        type="button"
                                        className="material-symbols-outlined"
                                        style={{ width: '10%' }}
                                        onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </button>
                                </div>
                                <FormError error={errors.password} />
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
