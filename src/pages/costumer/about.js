import { useRouter } from "next/router";

export default function About() {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };
    return (
        <>
            <div className="about d-flex">
                <section className="contentAb" style={{ width: '40%' }}>
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
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
                            electronic typesetting, remaining essentially unchanged</p>
                    </span>
                    <span style={{ marginTop: '30px' }}>
                        <button onClick={handleGoBack}>Lanjutan</button>
                    </span>
                </section>
                <section className="imgAbout" style={{ width: '60%' }}></section>
                <section className="buttonLanjut" style={{ marginTop: '30px' }}>
                    <button onClick={handleGoBack}>Lanjutan</button>
                </section>
            </div>
        </>
    )
}