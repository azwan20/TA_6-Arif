import Link from "next/link";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from "../../../public/user";
import { useForm } from "react-hook-form";
import {
    SignUp as SignUpToFirebase,
    GetSignUpErrorMessage
} from "../../../public/firebaseConfig";

export default function Register() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { email, uid } = useUser();

    useEffect(() => {
        if (uid) {
            router.push('/costumer');
        }
    }, [uid]);

    const onSubmit = async (values) => {
        const { email, password } = values
        try {
            await SignUpToFirebase(email, password)
            alert("Register berhasil")
            router.push('/');
        } catch (error) {
            const message = GetSignUpErrorMessage(error.code)
            console.log(message)
        }
    }
    return (
        <>
            <div className="register d-flex">
                <div className="registerFill d-flex">
                    <span>
                        <h1 >Register</h1>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            label="Email"
                            variant="filled"
                            placeholder="email"
                            {...register("email", { required: true })}
                        />
                        <input
                            id="password"
                            name="password"
                            type={'password'}
                            label="Password"
                            variant="filled"
                            placeholder="password"
                            {...register("password", { required: true, minLength: 8 })}
                        />
                    </span>
                    <span>
                        <button style={{ backgroundColor: '#3598D7', color: '#fff' }} onClick={handleSubmit(onSubmit)}>Register</button>
                        <Link href="/login/login"><button>Login</button></Link>
                    </span>
                </div>
            </div>
        </>
    )
}