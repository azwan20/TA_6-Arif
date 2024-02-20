import OwnerAside from './ownerAside';
import Link from "next/link";
import FormError from '../login/error';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from "../../../public/user";
import { useForm } from "react-hook-form";
import { SignUp, GetSignUpErrorMessage, db, SignOut, SignIn } from "../../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc, orderBy, FieldPath } from "firebase/firestore";

async function AddData_ModelUser(img_profil, email, username) {
    try {
        const docRef = await addDoc(collection(db, "model_user"), {
            img_profil: img_profil,
            email: email,
            username: username,
            role: "admin",
        });
    } catch (error) {
        console.error("Error adding user document: ", error);
        // Handle the error, e.g., show an error message to the user
    }
}

async function fetchData_ModelUser() {
    const querySnapshot = await getDocs(collection(db, "model_user"));
    const data = [];

    querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.role === 'admin') {
            data.push({ id: doc.id, ...userData });
        }
    });

    return data;
}

async function fetchData_ModelUser2() {
    const querySnapshot = await getDocs(collection(db, "model_user"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

async function deleteDataFromFirebase(id) {
    try {
        const produkRef = doc(db, "model_user", id);
        await deleteDoc(produkRef);
        // console.log("Document successfully deleted!");
        return true;
    } catch (error) {
        console.error("Error deleting document: ", error);
        return false;
    }
}


export default function DataAdmin() {
    const [showProdukInput, setShowProdukInput] = useState(false);
    const [modelUser, setModelUser] = useState([]);
    const { email, uid, role } = useUser();
    const [usernames, setUsernames] = useState("");
    const [profile, setProfile] = useState("");
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [img_profil, setImg_profil] = useState("https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/person-icon.png");
    const { register, handleSubmit, formState: { errors } } = useForm()

    // console.log("ini username", username);
    useEffect(() => {
        if (uid) {
            // console.log("ini uid user: ", uid);
            // console.log("ini email user: ", email);
            // console.log("ini role user: ", role);
            if (role === 'admin') {
                // router.push('/cashier');
            } else if (role === 'user') {
                // router.push('/costumer');
            } else {
                // router.push('/owner');
            }
        } else {
            router.push('/');
        }

    }, [uid]);
    //fungsi baca data user
    useEffect(() => {
        if (email) {
            const local_email = localStorage.getItem('email');
            const local_password = localStorage.getItem('password');
            console.log("email owner sekarang : ", local_email);
            console.log("password owner sekarang : ", local_password);
            // alert(email)
            async function fetchData() {
                const data = await fetchData_ModelUser2();
                const isEmailExist = data.find(user => user.email === email);
                if (isEmailExist) {
                    setProfile(isEmailExist.img_profil);
                    const targetUsername = "@" + isEmailExist.username;
                    setUsernames(targetUsername);
                }
            }
            fetchData();
        }
    }, []);

    const handleCardClick = () => {
        setShowProdukInput(!showProdukInput);
    };

    const [harianAktive, setHarianActive] = useState(false);
    const [bulananActive, setBulananActive] = useState(false);
    const [tahunanActive, setTahunanActive] = useState(false);
    const [totalActive, setTotalActive] = useState(false);
    const [adminActive, setAdminActive] = useState(true);

    const handleButtonClick = (buttonType) => {
        if (buttonType === "harian") {
            setHarianActive(true);
            setBulananActive(false);
            setTahunanActive(false);
            setTotalActive(false);
            setAdminActive(false);
        } else if (buttonType === "bulanan") {
            setHarianActive(false);
            setBulananActive(true);
            setTahunanActive(false);
            setTotalActive(false);
            setAdminActive(false);
        } else if (buttonType === "tahunan") {
            setHarianActive(false);
            setBulananActive(false);
            setTahunanActive(true);
            setTotalActive(false);
            setAdminActive(false);
        } else if (buttonType === "total") {
            setHarianActive(false);
            setBulananActive(false);
            setTahunanActive(false);
            setTotalActive(true);
            setAdminActive(false);
        } else if (buttonType === "admin") {
            setHarianActive(false);
            setBulananActive(false);
            setTahunanActive(false);
            setTotalActive(false);
            setAdminActive(true);
        }
    }

    const onSubmit = async (values, event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const { email, password } = values;
        const local_email = localStorage.getItem('email');
        const local_password = localStorage.getItem('password');

        try {

            await SignUp(email, password);
            await AddData_ModelUser(img_profil, email, username);
            // await SignOut()

            await SignIn(local_email, local_password);
            // if (loginLagi) {
            //     console.log("login lagi")
            // } else {
            //     console.log("login lagi gagal")
            //     await SignOut()
            // }
            location.reload(); // Reload the page after successful form submission
        } catch (error) {
            const message = GetSignUpErrorMessage(error.code);
            console.error("Registration error: ", message);
            // Handle the error, e.g., show an error message to the user
        }
    };


    useEffect(() => {
        async function fetchData() {
            const data = await fetchData_ModelUser();
            setModelUser(data);
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            // Delete the data from Firebase
            const deleted = await deleteDataFromFirebase(id);

            if (deleted) {
                // If the data is successfully deleted, update the state without reloading
                const newData = await fetchData_ModelUser();
                setModelUser(newData);

                // Optionally, show a success message
                alert("Data deleted from Firebase DB");
            }
        } catch (error) {
            console.error("Error deleting data: ", error);
            // Handle the error, show an error message, etc.
        }
    };

    // console.log("ini model user", modelUser)

    return (
        <>
            <div className="dataAdmin d-flex">
                <OwnerAside
                    harianAktive={harianAktive}
                    bulananActive={bulananActive}
                    tahunanActive={tahunanActive}
                    totalActive={totalActive}
                    adminActive={adminActive}
                    handleButtonClick={handleButtonClick}
                    username={usernames}
                    profile={profile}
                />
                <article className={`${showProdukInput ? 'article' : ''}`} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    <div className="addProduc">
                        <button type="button" onClick={() => handleCardClick()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <rect y="6.29004" width="15" height="2.41935" rx="1.20968" fill="white" />
                                <rect x="6.29004" y="15" width="15" height="2.41935" rx="1.20968" transform="rotate(-90 6.29004 15)" fill="white" />
                            </svg>
                            Tambah Admin
                        </button>
                    </div>
                    <div>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col" style={{ display: 'none' }}>id</th>
                                    <th scope="col">Email Admin</th>
                                    <th scope="col">Username Admin</th>
                                    <th scope="col">Image Profile</th>
                                    <th scope="col">Delete Account</th>
                                </tr>
                            </thead>
                            <tbody>
                                {modelUser.map((produks, value) => (
                                    <tr key={produks.id}>
                                        <td scope="row">{value + 1}</td>
                                        <td style={{ display: 'none' }}>{produks.id}</td>
                                        <td>{produks.email}</td>
                                        <td>{produks.username}</td>
                                        <td>
                                                <img
                                                    src={produks.img_profil}
                                                    style={{ objectFit: 'cover' }}
                                                    width={80} height={80}
                                                />
                                            </td>
                                        <td>
                                            <button
                                            onClick={() => handleDelete(produks.id)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="39" viewBox="0 0 50 49" fill="none">
                                                    <path d="M20.4334 34.7083H22.5167V16.3333H20.4334V34.7083ZM27.4834 34.7083H29.5668V16.3333H27.4834V34.7083ZM12.5001 40.8333V12.25H10.4167V10.2083H18.7501V8.63623H31.2501V10.2083H39.5834V12.25H37.5001V40.8333H12.5001Z" fill="#163E71" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </article>
                {showProdukInput && (
                    <div className={`produkInput d-flex ${showProdukInput ? 'addProduk' : ''}`}>
                        <form method="post" action="">
                            <section>
                                <svg onClick={() => handleCardClick()} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="32" height="23" viewBox="0 0 32 23" fill="none">
                                    <rect x="0.0805664" y="11.4731" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-45 0.0805664 11.4731)" fill="#3598D7" />
                                    <rect x="11.4458" y="22.9995" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-135 11.4458 22.9995)" fill="#3598D7" />
                                    <rect x="9.05811" y="11.4731" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-45 9.05811 11.4731)" fill="#3598D7" />
                                    <rect x="20.4233" y="22.9995" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-135 20.4233 22.9995)" fill="#3598D7" />
                                </svg>
                                <span>
                                    <p>Email</p>
                                    <input id="email"
                                        type="email"
                                        name="email"
                                        label="Email"
                                        variant="filled"
                                        placeholder="email"
                                        {...register("email", { required: true })} />
                                    <FormError error={errors.email} />
                                </span>
                                <span>
                                    <p>Username</p>
                                    <input id="username"
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
                                </span>
                                <span>
                                    <p>Password</p>
                                    <input id="password"
                                        name="password"
                                        type={'password'}
                                        label="Password"
                                        variant="filled"
                                        placeholder="password"
                                        {...register("password", { required: true, minLength: 8 })}
                                    />
                                    <FormError error={errors.password} />
                                </span>
                            </section>
                            <section>
                                <button type="submit" onClick={handleSubmit(onSubmit)}>UPLOAD</button>
                            </section>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}