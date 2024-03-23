import { useEffect, useState } from "react";
import { db, storage } from "../../../public/firebaseConfig";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/router";

async function updateDataInFirebase(id, kategori) {
    try {
        const produkRef = doc(db, "kategori", id);
        await updateDoc(produkRef, kategori);
        // console.log("Document successfully updated!");
        return true;
    } catch (error) {
        console.error("Error updating document: ", error);
        return false;
    }
}

async function fetchData_ModelKategori() {
    const querySnapshot = await getDocs(collection(db, "kategori"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

export default function AddCategory({ id }) {
    const router = useRouter();
    const [showEditInput, setShowEditInput] = useState(false);
    const [kategori, setkategori] = useState({});
    const [inputEdited, setInputEdited] = useState("");

    useEffect(() => {
        // console.log('ini id', id);
        async function fetchData() {
            const data = await fetchData_ModelKategori();
            const findData = data.find(item => item.id === id);
            const someData = data.some(item => item.id === id);
            if (someData) {
                setkategori(findData);
                setInputEdited(findData.nama);
            } else {
                console.log("Data dengan ID yang diberikan tidak ditemukan.");
            }
        }
        fetchData();
    }, []);

    const handleEdit = async (dataEdited) => {
        const isUpdated = await updateDataInFirebase(id, { nama: dataEdited });
        // console.log('ini data edit', dataEdited);
        if (isUpdated) {
            setkategori({ nama: inputEdited });
            setShowEditInput(!showEditInput);
            // router.reload();
        }
    }
    const onEdit = () => {
        setShowEditInput(!showEditInput);
    }

    return (
        <>
            <span>
                {showEditInput && (<div className="me-3 my-2 btn btn-sm" onClick={onEdit}>❌</div>)}
                {!showEditInput && (
                    <div className="me-3 my-2 btn btn-sm" >
                        <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 1.38889H15L13.5714 0H6.42857L5 1.38889H0V4.16667H20M1.42857 22.2222C1.42857 22.9589 1.72959 23.6655 2.26541 24.1864C2.80123 24.7073 3.52795 25 4.28571 25H15.7143C16.472 25 17.1988 24.7073 17.7346 24.1864C18.2704 23.6655 18.5714 22.9589 18.5714 22.2222V5.55556H1.42857V22.2222Z" fill="#A0A1A2" />
                        </svg>
                    </div>
                )}

                {showEditInput && (
                    <input style={{ border: "1px solid black" }} type="text" value={inputEdited} onChange={(e) => setInputEdited(e.target.value)} />
                )}
                {!showEditInput && (kategori.nama)}

            </span>
            <span>
                {!showEditInput && (
                    <div className="btn btn-sm" onClick={onEdit}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5565 4.40918H2.778C1.24316 4.40918 0 5.72734 0 7.35108V22.0578C0 23.683 1.24316 24.9997 2.778 24.9997H18.057C19.5919 24.9997 20.835 23.683 20.835 22.0578V11.2931L15.3985 17.0491C14.9237 17.5568 14.3054 17.9076 13.6261 18.0547L9.90219 18.8437C7.47144 19.3576 5.3296 17.0894 5.81575 14.5169L6.56025 10.5736C6.69499 9.8624 7.02557 9.20818 7.51033 8.69564L11.5565 4.40918Z" fill="#A0A1A2" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.3982 1.82937C23.2594 1.47304 23.0533 1.14672 22.7912 0.868184C22.5346 0.595134 22.2256 0.376437 21.8828 0.225077C21.5448 0.0766429 21.1797 0 20.8105 0C20.4414 0 20.0762 0.0766429 19.7382 0.225077C19.3954 0.376437 19.0865 0.595134 18.8298 0.868184L18.0714 1.67103L22.0328 5.86581L22.7912 5.06158C23.0535 4.78322 23.2596 4.45685 23.3982 4.10039C23.6838 3.37032 23.6838 2.55944 23.3982 1.82937ZM20.0702 7.94515L16.1074 3.74897L9.4721 10.7773C9.3742 10.8816 9.30818 11.0118 9.28181 11.1524L8.5373 15.0971C8.44007 15.611 8.86927 16.0639 9.35403 15.9611L13.0793 15.1735C13.2151 15.144 13.3387 15.0737 13.4335 14.9721L20.0702 7.94515Z" fill="#A0A1A2" />
                        </svg>
                    </div>
                )}

                {showEditInput && (<div className="btn btn-sm" onClick={() => handleEdit(inputEdited)}>✔</div>)}
            </span>
        </>
    )
}