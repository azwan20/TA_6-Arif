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
                                    {/* <th scope="col">Edit | Delete</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {modelUser.map((produks, value) => (
                                    <tr key={produks.id}>
                                        <td scope="row">{value + 1}</td>
                                        <td style={{ display: 'none' }}>{produks.id}</td>
                                        <td>{produks.email}</td>
                                        <td>{produks.username}</td>
                                        <td>{produks.img_profil}</td>
                                        {/* <td>
                                            <button
                                            // onClick={() => handleSimpanClick(produks.id)}
                                            // onClick={() => popups(produks.id, produks.name, produks.gambar, produks.kode, produks.harga, produks.jml_produk)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 50 50" fill="none">
                                                    <path d="M34.3271 6.25838C34.675 6.28963 34.8271 6.71463 34.5771 6.96255L17.2438 24.2959C17.048 24.4918 16.9078 24.7363 16.8375 25.0042L14.7542 32.9834C14.6854 33.2471 14.6868 33.5242 14.7582 33.7871C14.8296 34.0501 14.9686 34.2899 15.1613 34.4826C15.354 34.6753 15.5937 34.8142 15.8567 34.8856C16.1197 34.957 16.3968 34.9584 16.6605 34.8896L24.6375 32.8063C24.9057 32.7354 25.1501 32.5944 25.3459 32.398L42.925 14.8188C42.98 14.7623 43.0501 14.7228 43.1268 14.7049C43.2036 14.687 43.2839 14.6915 43.3582 14.7178C43.4325 14.7441 43.4977 14.7911 43.5461 14.8533C43.5945 14.9155 43.6241 14.9903 43.6313 15.0688C44.3626 22.0472 44.3207 29.085 43.5063 36.0542C43.0417 40.023 39.8521 43.1375 35.898 43.5813C28.6556 44.3842 21.3466 44.3842 14.1042 43.5813C10.148 43.1375 6.95837 40.023 6.49378 36.0542C5.63488 28.7105 5.63488 21.2917 6.49378 13.948C6.95837 9.97713 10.148 6.86255 14.1042 6.42088C20.8219 5.67641 27.5983 5.62196 34.3271 6.25838Z" fill="#163E71" />
                                                    <path d="M37.1312 8.82709C37.1796 8.77858 37.237 8.7401 37.3003 8.71384C37.3636 8.68759 37.4314 8.67407 37.4999 8.67407C37.5684 8.67407 37.6363 8.68759 37.6995 8.71384C37.7628 8.7401 37.8203 8.77858 37.8687 8.82709L40.8145 11.775C40.9118 11.8726 40.9665 12.0049 40.9665 12.1427C40.9665 12.2806 40.9118 12.4128 40.8145 12.5104L23.5374 29.7917C23.4716 29.8569 23.3896 29.9036 23.2999 29.9271L19.3124 30.9688C19.2245 30.9917 19.1322 30.9912 19.0445 30.9674C18.9568 30.9436 18.8769 30.8973 18.8127 30.8331C18.7485 30.7688 18.7022 30.6889 18.6784 30.6013C18.6546 30.5136 18.6541 30.4212 18.677 30.3333L19.7187 26.3458C19.7419 26.256 19.7886 26.174 19.8541 26.1083L37.1312 8.82709Z" fill="#163E71" />
                                                </svg>
                                            </button>
                                            |
                                            <button
                                            // onClick={() => handleDelete(produks.id)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="39" viewBox="0 0 50 49" fill="none">
                                                    <path d="M20.4334 34.7083H22.5167V16.3333H20.4334V34.7083ZM27.4834 34.7083H29.5668V16.3333H27.4834V34.7083ZM12.5001 40.8333V12.25H10.4167V10.2083H18.7501V8.63623H31.2501V10.2083H39.5834V12.25H37.5001V40.8333H12.5001Z" fill="#163E71" />
                                                </svg>
                                            </button>
                                        </td> */}
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