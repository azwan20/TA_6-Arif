import Link from "next/link";
import { useEffect } from 'react';
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
    const { emaill, uid, role } = useUser();

    useEffect(() => {
        if (uid) {
            console.log("ini uid use effe: ", uid);



        }
    }, [uid]);
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (values) => {
        const { email, password } = values
        try {
            console.log("step one")

            await SignIn(email, password);
            console.log("step two")

            const data = await fetchData_ModelUser();
            const userData = data.find(user => user.email === email);

            console.log("step three")

            if (userData.role != 'admin') {
                router.push('/costumer');
            } else {
                router.push('/cashier');
            }

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
                                <input placeholder="Email"
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