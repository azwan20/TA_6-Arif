import Link from "next/link";
import FormError from "./error";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from "../../../public/user";
import { useForm } from "react-hook-form";
import { SignUp as SignUpToFirebase, GetSignUpErrorMessage, db, SignOut } from "../../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc, orderBy, FieldPath } from "firebase/firestore";

async function AddData_ModelUser(img_profil, email, username) {
    try {
        const docRef = await addDoc(collection(db, "model_user"), {
            img_profil: img_profil,
            email: email,
            username: username,
            role: "user",
        });
    } catch (error) {
    }
}

export default function Register() {
    const [username, setUsername] = useState("");
    const [img_profil, setImg_profil] = useState("https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/person-icon.png");
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { email, uid } = useUser();

    useEffect(() => {
        if (uid) {
            router.push('/');
        }
    }, [uid]);

    const onSubmit = async (values) => {
        const { email, password } = values

        try {
            await SignUpToFirebase(email, password)
            await AddData_ModelUser(img_profil, email, username);
            await SignOut()
            alert("Register berhasil")
            // router.push('/');
            location.reload();

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
                        <input
                            id="email"
                            type="email"
                            name="email"
                            label="Email"
                            variant="filled"
                            placeholder="email"
                            {...register("email", { required: true })}
                        />
                        <FormError error={errors.email} />
                        <input
                            id="username"
                            type="text"
                            name="username"
                            label="username"
                            value={username}
                            placeholder="username"
                            onChange={(e) => {
                                const inputUsername = e.target.value;
                                const trimmedUsername = inputUsername.trim();
                                if (!trimmedUsername.includes(" ")) {
                                    setUsername(trimmedUsername);
                                }
                            }}

                        />
                        <FormError error={errors.email} />
                        <input
                            id="password"
                            name="password"
                            type={'password'}
                            label="Password"
                            variant="filled"
                            placeholder="password"
                            {...register("password", { required: true, minLength: 8 })}
                        />
                        <FormError error={errors.password} />
                    </span>
                    <span>
                        <button style={{ backgroundColor: '#E09200', color: '#fff' }} onClick={handleSubmit(onSubmit)}>Register</button>
                        <Link href="/login/login"><button style={{color: '#E09200'}}>Login</button></Link>
                    </span>
                </div>
            </div>
        </>
    )
}