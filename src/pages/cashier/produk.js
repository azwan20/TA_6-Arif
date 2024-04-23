import { useEffect, useState } from "react";
import CashierAside from "./cashierAside";
import Navar from "./navbar";
import { useRouter } from "next/router";
import { useUser } from "../../../public/user";
import { db, storage } from "../../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AddCategory from "./AddCategory";


async function updateDataInFirebase(id, updatedData) {
    try {
        const produkRef = doc(db, "produk", id);
        await updateDoc(produkRef, updatedData);
        // console.log("Document successfully updated!");
        return true;
    } catch (error) {
        console.error("Error updating document: ", error);
        return false;
    }
}

async function deleteDataFromFirebase(id) {
    try {
        const produkRef = doc(db, "produk", id);
        await deleteDoc(produkRef);
        // console.log("Document successfully deleted!");
        return true;
    } catch (error) {
        console.error("Error deleting document: ", error);
        return false;
    }
}

async function addDataToFirebase(name, gambar, kode, harga, jml_produk, kategori) {

    const jumlahProduk = parseInt(jml_produk, 10);

    try {
        const docRef = await addDoc(collection(db, "produk"), {
            name: name,
            gambar: gambar,
            kode: kode,
            harga: harga,
            jml_produk: jumlahProduk,
            kategori: kategori,
        });
        // console.log("Document input document ID : ", docRef.id);
        return true;
    } catch (error) {
        console.error("Error adding document: ", error);
        return false;
    }
}

async function addDataKategori(nama) {
    try {
        // Ubah inputan menjadi huruf kecil
        const lowerCaseNama = nama.toLowerCase();
        
        // Periksa apakah kategori sudah ada
        const querySnapshot = await getDocs(collection(db, "kategori"));
        const existingCategories = querySnapshot.docs.map(doc => doc.data().nama.toLowerCase());
        
        if(existingCategories.includes(lowerCaseNama)) {
            console.log("Kategori sudah ada");
            return false;
        } else {
            const docRef = await addDoc(collection(db, "kategori"), { nama: nama });
            return true;
        }
    } catch (error) {
        console.error("Error adding document: ", error);
        return false;
    }
}

async function fetchData_ModelUser() {
    const querySnapshot = await getDocs(collection(db, "model_user"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

async function fetchData_ModelKategori() {
    const querySnapshot = await getDocs(collection(db, "kategori"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

async function fetchData_ModelProduk() {
    const querySnapshot = await getDocs(collection(db, "produk"));

    const data = [];

    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

export default function Produk() {
    const [showProdukInput, setShowProdukInput] = useState(false);
    const [showKategori, setShowKategori] = useState(false);
    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [gambar, setGambar] = useState(null);
    // const [url_gambar, setUrlGambar] = useState();
    const [kode, setKode] = useState('');
    const [harga, setHarga] = useState('');
    const [jml_produk, setJml_produk] = useState(0);
    const [kategori, setKategori] = useState("");
    const [produkData, setProdukData] = useState([]);
    const [modelKategori, setModelKategori] = useState([]);


    const router = useRouter();
    const { email, uid, role } = useUser();
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState("");

    useEffect(() => {
        if (uid) {
            // console.log('ini kategori', modelKategori);

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

    useEffect(() => {
        async function fetchData() {
            const dataProduk = await fetchData_ModelProduk();
            const kategori = await fetchData_ModelKategori();
            setProdukData(dataProduk);
            setModelKategori(kategori);
        }
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (gambar !== null) {
            const allowedExtensions = ["jpeg", "jpg", "png"];
            const fileExtension = gambar[0].name.split('.').pop().toLowerCase();
    
            // Periksa apakah ekstensi file gambar sesuai
            if (!allowedExtensions.includes(fileExtension)) {
                alert("File harus berupa gambar dengan ekstensi jpeg, jpg, atau png");
                return;
            }
    
            // Validasi kode produk
            const kodeRegex = /^[A-Za-z0-9\/]+$/;
            if (!kodeRegex.test(kode)) {
                alert("Format kode produk salah. Harus terdiri dari huruf, angka ");
                return;
            }
    
            // Validasi harga
            const hargaRegex = /^[0-9]+$/;
            if (!hargaRegex.test(harga)) {
                alert("Format harga salah. Harus terdiri dari angka saja");
                return;
            }
    
            const fileName = gambar[0].name;
            const fileref = ref(storage, `imgProduk/${fileName}`);
    
            try {
                // Upload image to storage
                const snapshot = await uploadBytes(fileref, gambar[0]);
                const url = await getDownloadURL(snapshot.ref);
    
                // Add new data to Firebase
                const added = await addDataToFirebase(name, url, kode, harga, jml_produk, kategori);
    
                if (added) {
                    // If data is successfully added, fetch the updated data
                    const newData = await fetchData_ModelProduk();
                    setProdukData(newData);
    
                    // Reset form fields
                    setName("");
                    setGambar("");
                    setKode("");
                    setHarga("");
                    setJml_produk(0);
                    setKategori("");
    
                    // Optionally, show a success message
                    alert("Data berhasil di upload");
                } else {
                    console.error("Data gagal di upload");
                }
            } catch (error) {
                console.error("gagal upload image:", error);
                // Handle the error, show an error message, etc.
            }
        } else {
            alert("Pilih gambar");
        }
    };
    
    

    useEffect(() => {
        if (email) {
            // alert(email)
            async function fetchData() {
                const data = await fetchData_ModelUser();
                const isEmailExist = data.find(user => user.email === email);
                if (isEmailExist) {
                    setProfile(isEmailExist.img_profil);
                    const targetUsername = "@" + isEmailExist.username;
                    setUsername(targetUsername);
                }
            }
            fetchData();
        }
    }, []);


    // // fungsi hapus, digunakan untuk menghapus data di Firebase
    const handleDelete = async (id) => {
        try {
            // Delete the data from Firebase
            const deleted = await deleteDataFromFirebase(id);

            if (deleted) {
                // If the data is successfully deleted, update the state without reloading
                const newData = await fetchData_ModelProduk();
                setProdukData(newData);

                // Optionally, show a success message
                alert("Data deleted from Firebase DB");
            }
        } catch (error) {
            console.error("Error deleting data: ", error);
            // Handle the error, show an error message, etc.
        }
    };


    const handleCardClick = () => {
        setShowProdukInput(!showProdukInput);
    };

    const handleShowCategory = () => {
        setShowKategori(!showKategori);
    };

    const handleAddKategori = async () => {
        // Periksa apakah inputan tidak kosong
        if (addKategori.trim() === "") {
            alert("Inputan kategori tidak boleh kosong");
            return;
        }
        
        const isAdd = await addDataKategori(addKategori);
        if (isAdd) {
            router.reload();
            setShowKategori(!showKategori);
        } else {
            // Tampilkan pesan bahwa kategori sudah ada
            alert("Kategori sudah ada");
        }
    };
    


    // const [produkData, setProdukData] = useState([]);
    const [idSementara, setIdSementara] = useState('');
    const [editedName, setEditedName] = useState('');
    const [editedGambar, setEditedGambar] = useState('');
    const [editedHarga, setEditedHarga] = useState('');
    const [editedKode, setEditedKode] = useState('');
    const [editedJml_produk, setEditedJml_produk] = useState(0);
    const [editedKategori, setEditedKategori] = useState('');

    const [editPopupVisible, setEditPopupVisible] = useState(false);

    const [addKategori, setAddkategori] = useState('');

    const popups = (id, name, gambar, kode, harga, jml_produk, kategori) => {
        setIdSementara(id);
        setEditedName(name);
        setEditedGambar(gambar);
        setEditedKode(kode);
        setEditedHarga(harga);
        setEditedJml_produk(jml_produk);
        setEditedKategori(kategori)
        setEditPopupVisible(true);
    };

    const handlePopupClose = () => {
        setEditPopupVisible(false);

    }

    const handleEdit = async (id) => {
        try {
            let updatedData;

            if (typeof editedGambar !== 'string') {
                const fileName = editedGambar[0].name;
                const fileref = ref(storage, `imgProduk/${fileName}`);

                const snapshot = await uploadBytes(fileref, editedGambar[0]);
                const url = await getDownloadURL(snapshot.ref);

                updatedData = {
                    name: editedName,
                    gambar: url,
                    kode: editedKode,
                    harga: editedHarga,
                    jml_produk: editedJml_produk,
                    kategori: editedKategori,
                };
            } else {
                updatedData = {
                    name: editedName,
                    kode: editedKode,
                    harga: editedHarga,
                    jml_produk: editedJml_produk,
                    kategori: editedKategori,
                };
            }

            // Update the data in Firebase
            const isUpdated = await updateDataInFirebase(id, updatedData);

            if (isUpdated) {
                // If the data is successfully updated, update the state
                setProdukData((prevData) =>
                    prevData.map((item) =>
                        item.id === id
                            ? {
                                ...item,
                                ...updatedData,
                            }
                            : item
                    )
                );

                // Optionally, close the edit popup
                setEditPopupVisible(false);

                alert("Data berhasil diupdate");
            } else {
                console.error("Data gagal diupdate");
            }
        } catch (error) {
            console.error("Error updating data: ", error);
            // Handle the error, show an error message, etc.
        }
    };



    const [isTransaksiActive, setIsTransaksiActive] = useState(false);
    const [isProdukActive, setIsProdukActive] = useState(true);

    const handleButtonClick = (buttonType) => {
        if (buttonType === "transaksi") {
            setIsTransaksiActive(true);
            setIsProdukActive(false);
        } else if (buttonType === "produk") {
            setIsTransaksiActive(false);
            setIsProdukActive(true);
        }
    };

    return (
        <>
            <div>
                <div className="produk d-flex">
                    <CashierAside isTransaksiActive={isTransaksiActive} isProdukActive={isProdukActive} handleButtonClick={handleButtonClick} email={username} profile={profile} />
                    <article className={`${showProdukInput ? 'article' : ''}`} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                        <div className="addProduc">
                            <button className="d-flex justify-content-center mx-3" onClick={() => handleShowCategory()}>Add Category</button>
                            <button type="button" onClick={() => handleCardClick()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <rect y="6.29004" width="15" height="2.41935" rx="1.20968" fill="white" />
                                    <rect x="6.29004" y="15" width="15" height="2.41935" rx="1.20968" transform="rotate(-90 6.29004 15)" fill="white" />
                                </svg>
                                Tambah Produk
                            </button>
                        </div>
                        <div>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col" style={{ display: 'none' }}>id</th>
                                        <th scope="col">Nama Produk</th>
                                        <th scope="col">Gambar</th>
                                        <th scope="col">Kode Produk</th>
                                        <th scope="col">Harga</th>
                                        <th scope="col">Jumlah Produk</th>
                                        <th scope="col">Kategori Produk</th>
                                        <th scope="col">Edit | Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {produkData.map((produks, value) => (
                                        <tr key={produks.id}>
                                            <td scope="row">{value + 1}</td>
                                            <td style={{ display: 'none' }}>{produks.id}</td>
                                            <td>{produks.name}</td>
                                            <td>
                                                <img
                                                    src={produks.gambar}
                                                    style={{ objectFit: 'cover' }}
                                                    width={80} height={80}
                                                />
                                            </td>
                                            <td>{produks.kode}</td>
                                            <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(produks.harga).replace(/\,00$/, '')}</td>
                                            <td>{produks.jml_produk}</td>
                                            <td>{produks.kategori}</td>
                                            <td>
                                                <button
                                                    // onClick={() => handleSimpanClick(produks.id)}
                                                    onClick={() => popups(produks.id, produks.name, produks.gambar, produks.kode, produks.harga, produks.jml_produk, produks.kategori)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 50 50" fill="none">
                                                        <path d="M34.3271 6.25838C34.675 6.28963 34.8271 6.71463 34.5771 6.96255L17.2438 24.2959C17.048 24.4918 16.9078 24.7363 16.8375 25.0042L14.7542 32.9834C14.6854 33.2471 14.6868 33.5242 14.7582 33.7871C14.8296 34.0501 14.9686 34.2899 15.1613 34.4826C15.354 34.6753 15.5937 34.8142 15.8567 34.8856C16.1197 34.957 16.3968 34.9584 16.6605 34.8896L24.6375 32.8063C24.9057 32.7354 25.1501 32.5944 25.3459 32.398L42.925 14.8188C42.98 14.7623 43.0501 14.7228 43.1268 14.7049C43.2036 14.687 43.2839 14.6915 43.3582 14.7178C43.4325 14.7441 43.4977 14.7911 43.5461 14.8533C43.5945 14.9155 43.6241 14.9903 43.6313 15.0688C44.3626 22.0472 44.3207 29.085 43.5063 36.0542C43.0417 40.023 39.8521 43.1375 35.898 43.5813C28.6556 44.3842 21.3466 44.3842 14.1042 43.5813C10.148 43.1375 6.95837 40.023 6.49378 36.0542C5.63488 28.7105 5.63488 21.2917 6.49378 13.948C6.95837 9.97713 10.148 6.86255 14.1042 6.42088C20.8219 5.67641 27.5983 5.62196 34.3271 6.25838Z" fill="#163E71" />
                                                        <path d="M37.1312 8.82709C37.1796 8.77858 37.237 8.7401 37.3003 8.71384C37.3636 8.68759 37.4314 8.67407 37.4999 8.67407C37.5684 8.67407 37.6363 8.68759 37.6995 8.71384C37.7628 8.7401 37.8203 8.77858 37.8687 8.82709L40.8145 11.775C40.9118 11.8726 40.9665 12.0049 40.9665 12.1427C40.9665 12.2806 40.9118 12.4128 40.8145 12.5104L23.5374 29.7917C23.4716 29.8569 23.3896 29.9036 23.2999 29.9271L19.3124 30.9688C19.2245 30.9917 19.1322 30.9912 19.0445 30.9674C18.9568 30.9436 18.8769 30.8973 18.8127 30.8331C18.7485 30.7688 18.7022 30.6889 18.6784 30.6013C18.6546 30.5136 18.6541 30.4212 18.677 30.3333L19.7187 26.3458C19.7419 26.256 19.7886 26.174 19.8541 26.1083L37.1312 8.82709Z" fill="#163E71" />
                                                    </svg>
                                                </button>
                                                |
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
                            <form onSubmit={handleSubmit} method="post" action="">
                                <section>
                                    <svg onClick={() => handleCardClick()} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="32" height="23" viewBox="0 0 32 23" fill="none">
                                        <rect x="0.0805664" y="11.4731" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-45 0.0805664 11.4731)" fill="#3598D7" />
                                        <rect x="11.4458" y="22.9995" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-135 11.4458 22.9995)" fill="#3598D7" />
                                        <rect x="9.05811" y="11.4731" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-45 9.05811 11.4731)" fill="#3598D7" />
                                        <rect x="20.4233" y="22.9995" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-135 20.4233 22.9995)" fill="#3598D7" />
                                    </svg>
                                    <span>
                                        <p>Nama Produk</p>
                                        <input type="text" id="nama" value={name} onChange={(e) => setName(e.target.value)} />
                                    </span>
                                    <span>
                                        <p>Gambar</p>
                                        <input
                                            type="file"
                                            onChange={(e) => setGambar(e.target.files)}
                                        />
                                    </span>
                                    <span>
                                        <p>Kode Produk</p>
                                        <input type="text" id="kode" value={kode} onChange={(e) => setKode(e.target.value)} />
                                    </span>
                                    <span>
                                        <p>Harga</p>
                                        <input type="text" id="harga" value={harga} onChange={(e) => setHarga(e.target.value)} />
                                    </span>
                                    <span>
                                        <p>Jumlah Produk</p>
                                        <input type="number" id="harga" value={jml_produk} onChange={(e) => setJml_produk(e.target.value)} />
                                    </span>
                                    <span>
                                        <p>Pilih Category</p>
                                        <select value={kategori} onChange={(e) => setKategori(e.target.value)}>
                                            <option disabled>Pilih Category</option>
                                            {modelKategori.map((kategori, value) => (
                                                <option value={kategori.nama}>{kategori.nama}</option>
                                            ))}
                                        </select>
                                        {/* <input type="number" id="harga" value={jml_produk} onChange={(e) => setJml_produk(e.target.value)} /> */}
                                    </span>
                                </section>
                                <section>
                                    <button type="submit">UPLOAD</button>
                                </section>
                            </form>
                        </div>
                    )}
                </div>
                <Navar isTransaksiActive={isTransaksiActive} isProdukActive={isProdukActive} handleButtonClick={handleButtonClick} />
            </div>
            <div>
                {editPopupVisible && (
                    <div className="popup">
                        <div className="popup-content">
                            <h2 className="p-2">Edit Data</h2>
                            {/* <h2>Edit ID: {getEditedFieldValue(editPopupRow, 'id')}</h2> */}
                            <span>
                                <p style={{ display: 'none' }}>id</p>
                                <input type="text" id="id" style={{ display: 'none' }} value={idSementara} readOnly />
                            </span>
                            <span>
                                <p>Nama Produk</p>
                                <input type="text" id="nama"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                />
                            </span>
                            <span>
                                <p>Gambar</p>
                                <input type="file" id="gambar"
                                    onChange={(e) => setEditedGambar(e.target.files)}
                                    style={{ width: '53%' }}
                                />
                            </span>
                            <span>
                                <p>Kode Produk</p>
                                <input type="text" id="kode"
                                    value={editedKode}
                                    onChange={(e) => setEditedKode(e.target.value)}
                                />
                            </span>
                            <span>
                                <p>Harga</p>
                                <input type="text" id="harga"
                                    value={editedHarga}
                                    onChange={(e) => setEditedHarga(e.target.value)} />
                            </span>
                            <span>
                                <p>Kateogri</p>
                                <select value={editedKategori} onChange={(e) => setEditedKategori(e.target.value)} style={{ width: '53%' }}>
                                    <option disabled>Pilih Category</option>
                                    {modelKategori.map((kategori, value) => (
                                        <option value={kategori.nama}>{kategori.nama}</option>

                                    ))}
                                    {/* <option value="Makanan">Makanan</option>
                                    <option value="Minuman">Minuman</option>
                                    <option value="Alat Kebersihan">Alat Kebersihan</option>
                                    <option value="Lainnya">Lainnya</option> */}
                                </select>
                            </span>
                            <span>
                                <p>Jumlah Produk</p>
                                <input type="number" id="jml_produk"
                                    value={editedJml_produk}
                                    onChange={(e) => setEditedJml_produk(e.target.value)} />
                            </span>
                            {/* <button onClick={handleSaveClick}>Save</button> */}
                            <button onClick={() => handleEdit(idSementara)}
                            >Save</button>
                            <button onClick={handlePopupClose}>Close</button>
                        </div>
                    </div>
                )}
            </div>
            {showKategori && (
                <div className="popKategori">
                    <div className="upKategori">
                        <div>
                            <section className="mb-2">
                                <b>Edit Kategori</b>
                                <div className="btn p-0" onClick={handleShowCategory}><b>Done</b></div>
                            </section>
                            {modelKategori.map((kategori, value) => (
                                <section key={kategori.id} className="d-flex align-items-center">
                                    <AddCategory id={kategori.id} />
                                </section>
                            ))}

                            <section className="mt-2">
                                <input
                                    style={{ border: '1px solid black' }}
                                    type="text"
                                    className="w-100"
                                    required
                                    value={addKategori}
                                    onChange={(e) => setAddkategori(e.target.value)}
                                />
                                <button className="ms-2" type="button" onClick={handleAddKategori} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        <rect y="6.29004" width="15" height="2.41935" rx="1.20968" fill="var(--primary-color)" />
                                        <rect x="6.29004" y="15" width="15" height="2.41935" rx="1.20968" transform="rotate(-90 6.29004 15)" fill="var(--primary-color)" />
                                    </svg>
                                </button>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
