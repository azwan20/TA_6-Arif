import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import firebase from 'firebase/app';
import 'firebase/firestore';


import { db } from "../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc, orderBy, FieldPath } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });


async function updateData_ModelProduk(id, updatedData) {
  try {
    const produkRef = doc(db, 'model_produk', id);
    await updateDoc(produkRef, updatedData);
    console.log("Document successfully updated!");
    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    return false;
  }
}



async function updateData_ModelTransaksi(id, updatedData) {
  try {
    const produkRef = doc(db, 'model_transaksi', id);
    await updateDoc(produkRef, updatedData);
    console.log("Document successfully updated!");
    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    return false;
  }
}

// delete data produk
async function deleteData_ModelProduk(id) {
  try {
    const produkRef = doc(db, "model_produk", id);
    await deleteDoc(produkRef);
    console.log("Document successfully deleted!");
    return true;
  } catch (error) {
    console.error("Error deleting document: ", error);
    return false;
  }
}

// input data produk
async function AddData_ModelProduk(nama_produk, kode_produk, harga_produk, image_produk, created_at, jml_produk) {
  try {
    const docRef = await addDoc(collection(db, "model_produk"), {
      nama_produk: nama_produk,
      kode_produk: kode_produk,
      harga_produk: harga_produk,
      image_produk: image_produk,
      created_at: created_at,
      jml_produk: jml_produk,
    })
    console.log("Input Berhasil", docRef.id);
    return true;

  } catch (error) {
    console.error("Input gagal", error);
    return false;
  }
}

// input data Transaksi
async function AddData_ModelTransaksi(
  status_pemesanan,
  lokasi_ruangan,
  nama_admin,
  nama_user,
  date_terima_pesanan,
  date_proses_packing,
  date_pengantaran,
  date_selesai,
  telah_diterima,
  metode_pengambilan,
  menu_pesanan,
  metode_pembayaran,
  jumlah,
  harga_total,
  created_at,
) {
  try {
    const docRef = await addDoc(collection(db, "model_transaksi"), {
      status_pemesanan: status_pemesanan,
      lokasi_ruangan: lokasi_ruangan,
      nama_admin: nama_admin,
      nama_user: nama_user,
      date_terima_pesanan: date_terima_pesanan,
      date_proses_packing: date_proses_packing,
      date_pengantaran: date_pengantaran,
      date_selesai: date_selesai,
      telah_diterima: telah_diterima,
      metode_pengambilan: metode_pengambilan,
      menu_pesanan: menu_pesanan,
      metode_pembayaran: metode_pembayaran,
      jumlah: jumlah,
      harga_total: harga_total,
      created_at: created_at,
    })
    console.log("Input Berhasil", docRef.id);
    return true;

  } catch (error) {
    console.error("Input gagal", error);
    return false;
  }
}


//baca data produk
async function fetchData_ModelProduk() {
  const querySnapshot = await getDocs(collection(db, "model_produk"));

  const data = [];

  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

//baca data produk
async function fetchData_ModelTransaksi() {
  const querySnapshot = await getDocs(collection(db, "model_transaksi"));

  const data = [];

  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}


export default function Home() {
  const [keranjangMenu, setKeranjangMenu] = useState([]);
  const [produkDataModelProduk, setProdukDataModelProduk] = useState([]);
  const [produkDataModelTransaksi, setProdukDataModelTransaksi] = useState([]);
  const [namaProduk, setNamaProduk] = useState('');
  const [imgProduk, setImgProduk] = useState('');
  const [kodeProduk, setKodeProduk] = useState('');
  const [jmlProduk, setJmlProduk] = useState('');
  const [hargaProduk, setHargaProduk] = useState('');

  // fungsi edit ModelProduk
  const handleEdit_ModelProduk = async (id, updatedData) => {
    const edited = await updateData_ModelProduk(id, updatedData);
    if (edited) {
      alert("Data edited in Firebase DB");
    }
  };

  // fungsi edit ModelTransaksi
  const handleEdit_ModelTransaksi = async (id, updatedData) => {
    const edited = await updateData_ModelTransaksi(id, updatedData);
    if (edited) {
      alert("Data edited in Firebase DB");
    }
  };

  // fungsi hapus, digunakan untuk menghapus data di Firebase
  const handleDelete_ModelProduk = async (id) => {
    const deleted = await deleteData_ModelProduk(id);
    if (deleted) {
      alert("Data deleted from Firebase DB");
    }
  };

  //fungsi baca data produk ModelProduk
  useEffect(() => {
    async function fetchData() {
      const data = await fetchData_ModelProduk();
      setProdukDataModelProduk(data);
    }
    fetchData();
  }, []);

  //fungsi baca data produk ModelTransaksi
  useEffect(() => {
    async function fetchData() {
      const data = await fetchData_ModelTransaksi();
      setProdukDataModelTransaksi(data);
    }
    fetchData();
  }, []);

  // fungsi submit ModelProduk
  const handleSubmit_ModelProduk = async (element) => {
    element.preventDefault();
    const added = await AddData_ModelProduk(
      namaProduk,
      kodeProduk,
      hargaProduk,
      imgProduk,
      Date.now(),
      jmlProduk,
    );
    if (added) {
      alert("Data added to firebase DB")
    }
  }

  // fungsi submit
  const handleSubmit_ModelTransaksi = async (element) => {
    element.preventDefault();
    const added = await AddData_ModelTransaksi(
      "Proses",
      "lokasi_ruangan",
      "nama_admin",
      "nama_user",
      "date_terima_pesanan",
      "date_proses_packing",
      "date_pengantaran",
      "date_selesai",
      "telah_diterima",
      "metode_pengambilan",
      keranjangMenu,
      "metode_pembayaran",
      "jumlah",
      "harga_total",
      "created_at",
    );
    if (added) {
      alert("Data added to firebase DB")
    }
  }



  const handle_MenuKeranjang = async (nama_produk, kode_produk, harga_produk, image_produk) => {
    const data = { nama_produk, kode_produk, harga_produk, image_produk };
    // console.log(data);
    setKeranjangMenu((prevKeranjang) => [...prevKeranjang, data]);
  };


  const consoleU = async (info) => {
    console.log(info)
  };

  return (
    <>
      <div style={{ marginLeft: '20px' }}>
        <h1>Arif fachmil</h1>

        <p>-------------------------------</p>
        <h3>total produk: {produkDataModelProduk.length}</h3>
        <h3>produk terjual: {produkDataModelTransaksi.length}</h3>
        <h3>produk tidak terjual: {produkDataModelProduk.length - produkDataModelTransaksi.length}</h3>
        <p>-------------------------------</p>
        <div style={{ marginBottom: '100px' }} />
        <h2>Tabel Products</h2>
        <div>
          <p>
            nama produk :
            <input type="text" value={namaProduk} onChange={(e) => setNamaProduk(e.target.value)}>
            </input>
          </p>
          <p>
            kode produk :
            <input type="text" value={kodeProduk} onChange={(e) => setKodeProduk(e.target.value)}>
            </input>
          </p>
          <p>
            harga produk :
            <input type="number" value={hargaProduk} onChange={(e) => setHargaProduk(e.target.value)}>
            </input>
          </p>
          <p>
            image produk :
            <input type="text" value={imgProduk} onChange={(e) => setImgProduk(e.target.value)}>
            </input>
          </p>
          <p>
            jumlah produk :
            <input type="number" value={jmlProduk} onChange={(e) => setJmlProduk(e.target.value)}>
            </input>
          </p>

        </div>
        <button onClick={handleSubmit_ModelProduk}>Submit</button>

        <div>
          {produkDataModelProduk.map((produks) => (
            <div key={produks.id}>
              <p>-----------------------------------------------------------------------------------------------------------------------------------------------------------</p>
              <h3>nama_produk: {produks.nama_produk}</h3>
              <p>kode_produk: {produks.kode_produk}</p>
              <p>harga_produk: {produks.harga_produk}</p>
              <p>link_image_produk: {produks.image_produk}</p>
              <p>jml_produk: {produks.jml_produk}</p>
              <p>created_at: {produks.created_at}</p>
              <button onClick={() => handleEdit_ModelProduk(produks.id, { nama_produk: "produk 3" })}>
                Edit Data
              </button>
              <p></p>
              <button onClick={() => handleDelete_ModelProduk(produks.id)}>
                Delete
              </button>
              <p></p>
              <button onClick={() => handle_MenuKeranjang(produks.nama_produk, produks.kode_produk, produks.harga_produk, produks.image_produk)}>
                Masukkan keranjang
              </button>
            </div>
          )
          )}
        </div>
        <div style={{ marginBottom: '100px' }} />
        <h2>Keranjang</h2>
        <button onClick={handleSubmit_ModelTransaksi}>Beli Sekarang</button>
        <p></p>
        <button onClick={() => setKeranjangMenu([])}>kosongkan keranjang</button>

        <div>
          {keranjangMenu.map((keranjang) => (
            <div>
              <p>-----------------------------------------------------------------------------------------------------------------------------------------------------------</p>
              <h3>Status: {keranjang.nama_produk}</h3>
              <p>Harga: {keranjang.harga_produk}</p>
            </div>
          )
          )}
        </div>

        <div style={{ marginBottom: '100px' }} />
        <h2>Tabel transaksi</h2>
        <div>
          {produkDataModelTransaksi.map((transaksi) => (
            <div key={transaksi.id}>
              <p>-----------------------------------------------------------------------------------------------------------------------------------------------------------</p>
              <h3>Status: {transaksi.status_pemesanan}</h3>
              <button onClick={() => handleEdit_ModelTransaksi(transaksi.id, { status_pemesanan: "Proses_Packing" })}>Proses Packing</button>
              <p></p>
              <button onClick={() => handleEdit_ModelTransaksi(transaksi.id, { status_pemesanan: "Proses_Pengantaran" })}>Proses Pengantaran</button>
              <p></p>
              <button onClick={() => handleEdit_ModelTransaksi(transaksi.id, { status_pemesanan: "Proses_Selesai" })}>Proses Selesai</button>
              <p>nama_admin: {transaksi.nama_admin}</p>
              <p>nama_user: {transaksi.nama_user}</p>
              <p>link_image_produk: {transaksi.image_produk}</p>
              <p>created_at: {transaksi.created_at}</p>

              <div>
                <div style={{ marginBottom: '20px' }} />
                <h3>Menu</h3>
                {transaksi.menu_pesanan.map((menu) => (
                  <div key={menu.id}>
                    <p>nama pesanan : {menu.nama_produk}</p>
                    <p>Harga: {menu.harga_produk}</p>
                  </div>
                )
                )}
              </div>
              <div style={{ marginBottom: '20px' }} />
            </div>
          )
          )}
        </div>
        <div style={{ marginBottom: '100px' }} />
      </div>

    </>
  );
}
