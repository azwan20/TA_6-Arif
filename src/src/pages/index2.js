import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import { db } from "../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

async function updateDataInFirebase(id, updatedData) {
  try {
    const produkRef = doc(db, "produk", id);
    await updateDoc(produkRef, updatedData);
    console.log("Document successfully updated!");
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
    console.log("Document successfully deleted!");
    return true;
  } catch (error) {
    console.error("Error deleting document: ", error);
    return false;
  }
}

async function addDataToFirebase(name, harga, gambar, jml_produk, kode) {
  try {
    const docRef = await addDoc(collection(db, "produk"), {
      name: name,
      harga: harga,
      gambar: gambar,
      jml_produk: jml_produk,
      kode: kode,
    })
    console.log("Document input document ID : ", docRef.id);
    return true;

  } catch (error) {
    console.error("error input document", error);
    return false;
  }
}

async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "produk"));

  const data = [];

  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}


export default function Home() {
  const [produkData, setProdukData] = useState([]);
  const [idSementara, setIdSementara] = useState('');
  const [editedHarga, setEditedHarga] = useState('');
  const [editedKode, setEditedKode] = useState('');

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setProdukData(data);
    }
    fetchData();
  }, []);

  // fungsi input, fungsi ini di pake di setiap halaman yg perlu input ke firebase
  const handleSubmit = async (element) => {
    element.preventDefault();
    const added = await addDataToFirebase(
      "Kripik pisang Ambon",
      20000,
      "https://firebasestorage.googleapis.com/v0/b/arif-fachmil.appspot.com/o/wp10055389-epic-samurai-wallpapers.jpg?alt=media&token=bb7183c2-408b-4070-aa8e-356c9f1447e5",
      18,
    );
    if (added) {
      alert("Data added to firebase DB")
    }
  }


  // fungsi edit, digunakan untuk mengedit data di Firebase
  const handleEdit = async (id, updatedData) => {
    const edited = await updateDataInFirebase(id, updatedData);
    if (edited) {
      alert("Data edited in Firebase DB");
      setPopupOpen(false);
    }
  };

  // fungsi hapus, digunakan untuk menghapus data di Firebase
  const handleDelete = async (id) => {
    const deleted = await deleteDataFromFirebase(id);
    if (deleted) {
      alert("Data deleted from Firebase DB");
    }
  };

  const popups = async (id, harga, kode) => {
    setIdSementara(id);
    setEditedHarga(harga);
    setEditedKode(kode);
    setPopupOpen(!isPopupOpen);
  };

  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleTogglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };
  return (
    <>

      <div>
        {/* <button onClick={handleTogglePopup}>Buka Popup</button> */}

        {isPopupOpen && (
          <div className="popup">
            <div className="popup-content">
              <p><input
                type="number"
                id="editedHarga"
                name="editedHarga"
                value={editedHarga}
                onChange={(e) => setEditedHarga(e.target.value)}
                placeholder="Masukkan harga"
              /></p>
              <p><input
                type="text"
                id="editedKode"
                name="editedKode"
                value={editedKode}
                onChange={(e) => setEditedKode(e.target.value)}
                placeholder="Masukkan Kode"
              /></p>
              <button onClick={handleTogglePopup}>Tutup Popup</button>
              <button onClick={() => handleEdit(idSementara, { harga: editedHarga , kode: editedKode})}>Edit</button>
            </div>
          </div>
        )}

        {/* Gaya CSS untuk popup */}
        <style jsx>{`
        .popup {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }
      `}</style>
      </div>
      <h1>belajar NEXT JS</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          Submit
        </button>
      </form>

      <h1>Read Data</h1>

      <div>
        {produkData.map((produks) => (
          <div key={produks.id}>
            <p>-------------------------------</p>
            <p>{produks.name}</p>
            <p>{produks.harga}</p>
            <p>{produks.kode}</p>
            <p>{produks.jml_produk}</p>
          </div>
        )
        )}
      </div>
      <p>-------------------------------</p>
      <div>
        {produkData.map((produks) => (
          <div key={produks.id}>
            <button onClick={() => popups(produks.id, produks.harga, produks.kode)}>
              Edit Data
            </button>
            <button onClick={() => handleDelete(produks.id)}>
              Delete
            </button>
          </div>
        ))}
      </div >
    </>
  );
}