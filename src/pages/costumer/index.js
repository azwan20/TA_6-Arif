import Link from "next/link";
import CostumerAside from "./CostumerAside";
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import { db } from "../../../public/firebaseConfig";
import { collection, addDoc, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { useUser } from "../../../public/user";
import { useRouter } from "next/router";

async function fetchData_ModelKategori() {
    const querySnapshot = await getDocs(collection(db, "kategori"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}
async function fetchData_keranjang(email) {
    const querySnapshot = await getDocs(query(collection(db, "keranjang"), where("email", "==", email)));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    })
    return data;
}

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "produk"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

async function fetchData_ModelUser() {
    const querySnapshot = await getDocs(collection(db, "model_user"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

async function addDataToFirebase(id_produk, name, gambar, kode, harga, jml_produk, username, email) {

    const jumlahProduk = parseInt(jml_produk, 10);

    try {
        const docRef = await addDoc(collection(db, "keranjang"), {
            id_produk: id_produk,
            name: name,
            gambar: gambar,
            kode: kode,
            harga: harga,
            jml_produk: jumlahProduk,
            username: username,
            email: email,
            count: 1,
        });
        return true;
    } catch (error) {
        return false;
    }
}


function Home() {
    const { email, uid, role } = useUser();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState("");
    const [loading, setLoading] = useState(true); // Add loading state
    const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status
    const [dataKernajangs, setDataKeranjangs] = useState([]);

    const [isMenuProduk, setIsMenuProdukActive] = useState(true);
    const [isTransaksiMobActive, setIsTransaksiMobActive] = useState(false);
    const [isProfileMobActive, setIsProfileMobActive] = useState(false);

    const handleButtonClickMobile = (buttonType) => {
        if (buttonType === "menu_produk") {
            setIsMenuProdukActive(true);
            setIsTransaksiMobActive(false);
            setIsProfileMobActive(false);
        } else if (buttonType === "transaksi_mobile") {
            setIsMenuProdukActive(false);
            setIsTransaksiMobActive(true);
            setIsProfileMobActive(false);
        } else if (buttonType === "profile_mobile") {
            setIsMenuProdukActive(false);
            setIsTransaksiMobActive(false);
            setIsProfileMobActive(true);
        }
    };

    useEffect(() => {
        if (uid) {
            if (role === 'admin') {
                router.push('/cashier');
            } else if (role === 'user') {
                setIsLoggedIn(true); // User is logged in
                // router.push('/costumer');
            } else {
                router.push('/owner');
            }
        } else {
            router.push('/');
        }

    }, [uid]);

    useEffect(() => {
        if (email) {
            async function fetchDataProduk() {
                const data = await fetchData_keranjang(email);
                setDataKeranjangs(data);
            }
            async function fetchDataKetegori() {
                const data = await fetchData_ModelKategori();
                setModelKategori(data);
            }
            async function fetchDataKeranjang() {
                const data = await fetchDataFromFirestore();
                setProdukData(data);
            }
            async function fetchDataUser() {
                const data = await fetchData_ModelUser();
                const isEmailExist = data.find(user => user.email === email);
                if (isEmailExist) {
                    setProfile(isEmailExist.img_profil);
                    const targetUsername = isEmailExist.username;
                    setUsername(targetUsername);
                }
                setLoading(false); // Set loading to false once data is fetched
            }

            fetchDataUser();
            fetchDataProduk();
            fetchDataKetegori();
            fetchDataKeranjang();
        }
    }, []);

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

    const [produkData, setProdukData] = useState([]);
    const [isAnimationActive, setIsAnimationActive] = useState(false);

    const handleAddClick = async (items) => {
        const keranjangExist = dataKernajangs.find(k => k.id_produk === items.id);
        if (keranjangExist) {
            const keranjangRef = doc(db, "keranjang", keranjangExist.id);
            await updateDoc(keranjangRef, { count: (keranjangExist.count + 1) });

        } else {
            await addDataToFirebase(items.id, items.name, items.gambar, items.kode, items.harga, items.jml_produk, username, email);
        }
        setIsAnimationActive(true);

        const updatedData = await fetchData_keranjang(email);
        setDataKeranjangs(updatedData);

        // Menghentikan efek denyut setelah beberapa detik (sesuai kebutuhan)
        const timeoutId = setTimeout(() => {
            setIsAnimationActive(false);
        }, 200); // 2000 milliseconds (2 detik)
        // router.reload();
    };

    const [searchInput, setSearchInput] = useState("");

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };

    const filteredProdukData = produkData.filter((product) =>
        product.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const [isSelected, setIsSelected] = useState("All");
    const [isFilter, setIsFilter] = useState("All");
    const [modelKategori, setModelKategori] = useState([]);
    let filteredCategory = filteredProdukData;
    const handleCategory = (nama) => {
        setIsSelected(nama);
        setIsFilter(nama);
    };

    if (isSelected === "All") {
        filteredCategory = filteredProdukData;
    }
    else if (isSelected === isFilter) {
        filteredCategory = filteredProdukData.filter((product) => product.kategori === isFilter);
    }

    return (
        <>
            <div>
                <div className="costumer d-flex">
                    <CostumerAside isTransaksiActive={isTransaksiActive} isProdukActive={isProdukActive} email={username} profile={profile} handleButtonClick={handleButtonClick} />
                    <article className="d-flex" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                        <section>
                            <nav class="navbar navb" style={{ marginBottom: '20px' }}>
                                <div class="container-fluid">
                                    <Link href="/costumer/about">
                                        <button>About</button>
                                    </Link>
                                    <form class="d-flex" role="search">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="47" viewBox="0 0 46 47" fill="none">
                                            <rect x="23" y="0.960938" width="32.5269" height="32.5269" rx="16.2635" transform="rotate(45 23 0.960938)" fill="#E09200" />
                                            <rect x="20.1362" y="11.582" width="13.1959" height="13.1959" rx="6.59796" transform="rotate(45 20.1362 11.582)" fill="white" />
                                            <rect x="20.1362" y="14.5596" width="8.98584" height="8.98584" rx="4.49292" transform="rotate(45 20.1362 14.5596)" fill="#E09200" />
                                            <rect x="24.2476" y="23.5947" width="9.79524" height="2.02494" rx="1.01247" transform="rotate(45 24.2476 23.5947)" fill="white" />
                                        </svg>
                                        <input class="" type="search" placeholder="Search" aria-label="Search" value={searchInput}
                                            onChange={handleSearchChange} />
                                    </form>
                                </div>
                            </nav>
                            <div className="container">
                                <div className="kategoriButton">
                                    <button className={isSelected == "All" ? "active" : "disactive"} onClick={() => handleCategory("All")}>All</button>
                                    {modelKategori.map((kategori, value) => (
                                        <button className={isSelected == kategori.nama ? "active" : "disactive"} onClick={() => handleCategory(kategori.nama)}>
                                            {kategori.nama}
                                        </button>
                                    ))}
                                </div>
                                {filteredCategory.length == 0 && (
                                    <div className="card text-center">
                                        <div className="card-header">Produk tidak ada</div>
                                        <div class="card-body">
                                            Empty
                                        </div>
                                    </div>
                                )}
                                {filteredCategory.length != 0 && (
                                    <div className="row row-cols-2 row-cols-md-5 g-4">
                                        {filteredCategory.map((cardNumber) => (
                                            <div key={cardNumber} className="col">
                                                {cardNumber.jml_produk != 0 ? (
                                                    <div className="card">
                                                        <img
                                                            src={cardNumber.gambar}
                                                            className="card-img-top"
                                                            alt={`Card ${cardNumber}`}
                                                            style={{ objectFit: 'cover' }}
                                                        />
                                                        <div className="card-body d-flex">
                                                            <span style={{ marginBottom: '10px' }}>
                                                                <p className="">{cardNumber.name}</p>
                                                                <button className="add" onClick={() => handleAddClick(cardNumber)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                                                        <rect y="6.29004" width="15" height="2.41935" rx="1.20968" fill="white" />
                                                                        <rect x="6.29004" y="15" width="15" height="2.41935" rx="1.20968" transform="rotate(-90 6.29004 15)" fill="white" />
                                                                    </svg>
                                                                </button>
                                                            </span>
                                                            <span>
                                                                <p >
                                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(cardNumber.harga).replace(/\,00$/, '')}
                                                                </p>
                                                                <p className="card-text">Tersisa : {cardNumber.jml_produk}</p>
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="card">
                                                        <div className="card-overlay"><h5 style={{ rotate: '-45deg', fontSize: '3rem' }}>HABIS</h5></div>
                                                        <img
                                                            src={cardNumber.gambar}
                                                            className="card-img-top"
                                                            alt={`Card ${cardNumber}`}
                                                            style={{ objectFit: 'cover', backgroundColor: 'grey' }}
                                                        />
                                                        <div className="card-body d-flex">
                                                            <span style={{ marginBottom: '10px' }}>
                                                                <p className="">{cardNumber.name}</p>
                                                                <button className="add" disabled style={{ backgroundColor: 'grey' }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                                                        <rect y="6.29004" width="15" height="2.41935" rx="1.20968" fill="white" />
                                                                        <rect x="6.29004" y="15" width="15" height="2.41935" rx="1.20968" transform="rotate(-90 6.29004 15)" fill="white" />
                                                                    </svg>
                                                                </button>
                                                            </span>
                                                            <span>
                                                                <p >
                                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(cardNumber.harga).replace(/\,00$/, '')}
                                                                </p>
                                                                <p className="card-text">Tersisa : {cardNumber.jml_produk}</p>
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </section>
                        <section className="d-flex ms-auto" style={{ margin: '20px 20px 0px' }}>
                            <Link href={`/costumer/keranjang`} className="keranjangs d-flex" style={{ textDecoration: 'none', position: 'fixed', bottom: 0, right: 20, padding: '10px', color: '#3598D7' }}>
                                <svg className={`${isAnimationActive ? 'animate-section' : ''}`} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 80 80" fill="none">
                                    <rect width="79.0103" height="79.0103" rx="39.5051" fill="#fff" />
                                    <path d="M23.5913 30.3232H63.6671L56.3234 46.2696H30.935L23.5913 30.3232Z" fill="#E09200" />
                                    <rect x="29.7808" y="41.4434" width="3.56696" height="11.2254" rx="1.78348" fill="#E09200" />
                                    <rect x="22.8647" y="25.3096" width="3.56696" height="11.2254" rx="1.78348" transform="rotate(-30 22.8647 25.3096)" fill="#E09200" />
                                    <rect x="15.5132" y="24.9561" width="3.56696" height="14.8558" rx="1.78348" transform="rotate(-75 15.5132 24.9561)" fill="#E09200" />
                                    <rect x="55.4839" y="49.1025" width="3.56696" height="25.7031" rx="1.78348" transform="rotate(90 55.4839 49.1025)" fill="#E09200" />
                                    <rect x="51.4971" y="53.5088" width="3.9866" height="3.9866" rx="1.9933" fill="#E09200" />
                                    <rect x="30.8301" y="53.5088" width="3.9866" height="3.9866" rx="1.9933" fill="#E09200" />
                                </svg>
                                <p style={{ color: '#E09200' }}><b>{dataKernajangs.length}</b></p>

                            </Link>
                        </section>
                    </article>
                </div>
                <Navbar isMenuProduk={isMenuProduk} isTransaksiMobActive={isTransaksiMobActive} isProfileMobActive={isProfileMobActive} handleButtonClickMobile={handleButtonClickMobile} />
            </div>
        </>
    )
}

let newData = '';

export const getNewData = () => {
    return newData;
};

export default Home