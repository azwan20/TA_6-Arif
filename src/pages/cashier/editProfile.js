import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db, storage } from "../../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc, orderBy, FieldPath, getDoc } from "firebase/firestore";
import { useUser } from "../../../public/user";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

async function updateData_DataUser(id, updatedData) {
    try {
        const produkRef = doc(db, 'model_user', id);
        await updateDoc(produkRef, updatedData);
        // location.reload();
        return true;
    } catch (error) {
        console.error("Error updating document: ", error);
        return false;
    }
}

async function fetchData_DataUser() {
    const querySnapshot = await getDocs(collection(db, "model_user"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}


export default function editProfile() {
    const { email, uid, role } = useUser();
    const [gambar, setGambar] = useState(null);
    const [username, setUsername] = useState(null);

    const [DataUser, setDataUser] = useState([]);
    const router = useRouter();

    const goToPage = (page) => {
        router.push(page);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (gambar !== null) {
            const fileref = ref(storage, `imgProfileCashier/${uid}`);
            // console.log(gambar)

            try {
                const snapshot = await uploadBytes(fileref, gambar[0]);
                const url = await getDownloadURL(snapshot.ref);

                console.log(url);

                const added = await updateData_DataUser(DataUser.id, { img_profil: url, username: username });
                added ? console.error("Data berhasil di upload") : console.error("Data gagal di upload");
            } catch (error) {
                console.error("gagal upload image:", error);
            }
        } else {
            const added = await updateData_DataUser(DataUser.id, { username: username });
            added ? console.error("Data berhasil di upload") : console.error("Data gagal di upload");
        }
        router.push('/cashier');
    };



    useEffect(() => {
        if (uid) {
            async function fetchData() {
                const data = await fetchData_DataUser();
                const userData = data.find(DbUser => DbUser.email === email);
                setUsername(userData.username)
                setDataUser(userData);
                // console.log("ini username: ", userData)
            }
            fetchData();
        }
    }, []);

    useEffect(() => {
        if (uid) {
            if (role === 'admin') {
                // router.push('/cashier');
            } else if (role === 'user') {
                router.push('/costumer');
            } else {
                router.push('/owner');
            }
        } else {
            router.push('/');
        }
    }, [uid]);
    return (
        <>
            <div className="register  d-flex">
                <div className="registerFill lupaPassword d-flex">
                    <span>
                        <h5>Edit Profile</h5>
                        <input
                            id="username"
                            type="username"
                            name="username"
                            label="username"
                            value={username}
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </span>
                    <span>
                        <input
                            type="file"
                            placeholder="profile"
                            onChange={(e) => setGambar(e.target.files)}
                        />
                    </span>
                    <span>
                        <button
                            style={{ backgroundColor: '#b20000', color: '#fff' }}
                            onClick={() => goToPage('/login/lupa-password')}
                        >Reset Password</button>
                    </span>
                    <span>
                        <button
                            style={{ backgroundColor: '#3598D7', color: '#fff' }}
                            onClick={handleSubmit}
                        >Submit</button>
                    </span>
                </div>
            </div>
        </>
    )
}