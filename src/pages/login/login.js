import Link from "next/link";

export default function Login() {
    return (
        <>
            <div className="login d-flex">
                <section className="loginFill">
                    <div style={{ width: '90%' }}>
                        <h1>Login</h1>
                        <p>Selamat datang kembali! Ayo login untuk pengalaman belanja online yang lebih mudah dan aman</p>
                    </div>
                    <div className="cards d-flex">
                        <div className="card">
                            <span>
                                <input type="text" placeholder="Username" />
                                <input type="password" placeholder="Password" />
                                <Link href="#">Forget Password</Link>
                            </span>
                            <span>
                                <button>Login With Google</button>
                                <button style={{backgroundColor: '#3598D7'}}>Login</button>
                                <p style={{textAlign: 'center'}}>Don't have an account? <Link href="#">Register</Link></p>
                            </span>
                        </div>
                    </div>
                </section>
                <section className="loginBg"></section>
            </div>
        </>
    )
}