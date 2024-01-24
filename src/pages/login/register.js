import Link from "next/link";

export default function Register() {
    return (
        <>
            <div className="register d-flex">
                <div className="registerFill d-flex">
                    <span>
                        <input type="email" placeholder="email address" />
                        <input type="text" placeholder="username" />
                        <input type="password" placeholder="password" />
                        <input type="password" placeholder="enter the password" />
                    </span>
                    <span>
                        <button style={{ backgroundColor: '#3598D7', color: '#fff' }}>Register</button>
                        <button>Login</button>
                    </span>
                </div>
            </div>
        </>
    )
}