import { useRouter } from "next/router";

export default function About() {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };
    return (
        <>
            <div className="about d-flex">
                <section className="contentAb" style={{ width: '50%' }}>
                    <span style={{ marginBottom: '30px' }}>
                        <svg onClick={handleGoBack} style={{ cursor: 'pointer', marginBottom: '20px' }} xmlns="http://www.w3.org/2000/svg" width="32" height="23" viewBox="0 0 32 23" fill="none">
                            <rect x="0.0808105" y="11.3643" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-45 0.0808105 11.3643)" fill="#fff" />
                            <rect x="11.4458" y="22.8916" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-135 11.4458 22.8916)" fill="#fff" />
                            <rect x="9.05811" y="11.3643" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-45 9.05811 11.3643)" fill="#fff" />
                            <rect x="20.4231" y="22.8916" width="16.0724" height="2.59233" rx="1.29616" transform="rotate(-135 20.4231 22.8916)" fill="#fff" />
                        </svg>
                    </span>
                    <span>
                        <h1>Nur Afia Store</h1>
                    </span>
                    <span>
                        <p style={{ textAlign: 'justify' }}>Minimarket Nur Afiah yang berlokasi di RS. Wahidin Sudirohusodo adalah sebuah usaha menengah
                            yang menyediakan berbagai kebutuhan sehari-hari bagi para pengunjung rumah sakit dan masyarakat sekitar.
                            Dengan suasana yang ramah dan nyaman, minimarket ini menjadi tempat yang praktis bagi para pasien,
                            pihak rumah sakit, serta para konsumen lainnya untuk memenuhi kebutuhan mereka tanpa harus meninggalkan
                            area rumah sakit. Di dalam minimarket ini, Anda akan menemukan beragam produk mulai dari makanan ringan,
                            minuman, bahan makanan pokok, kebutuhan keseharian, buah buahan, hingga perlengkapan kebersihan. pilihannya
                            cukup lengkap untuk memenuhi kebutuhan sehari-hari. Dengan menyediakan produk-produk berkualitas dan harga yang
                            bersaing, Nur Afiah berusaha memberikan layanan terbaik kepada para Konsumen.</p>
                    </span>
                    <span style={{ marginTop: '30px' }}>
                        <button onClick={handleGoBack}>Lanjutan</button>
                    </span>
                </section>
                <section className="imgAbout" style={{ width: '50%' }}></section>
                <section className="buttonLanjut" style={{ marginTop: '30px' }}>
                    <button onClick={handleGoBack}>Lanjutan</button>
                </section>
            </div>
        </>
    )
}