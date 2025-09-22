import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/styles.css';


export default function SignupForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch("http://localhost:8000/api/auth/users/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password, re_password: rePassword }),
        });

        const data = await res.json();
        if (res.ok) {
            alert("Signup successful! Please login.");
            navigate('/login');
        } else {
            alert(JSON.stringify(data.username || data.email || data.password || data.re_password || data.non_field_errors));
        }
    }

    return (
        <>
            <style>
                {`
                .auth-card-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #f0f2f5;
                }
                
                .auth-card {
                    background-color: #fff;
                    border-radius: 12px;
                    padding: 2rem;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
                    width: 100%;
                    max-width: 400px;
                }
                
                .auth-card h2 {
                    text-align: center;
                    margin-bottom: 1.5rem;
                    color: #333;
                }
                
                .auth-form {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }
                
                .auth-form label {
                    margin-bottom: 0.5rem;
                    color: #444;
                    font-weight: 500;
                }
                
                .auth-form input {
                    padding: 0.7rem;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    margin-bottom: 1rem;
                    font-size: 1rem;
                    background-color: #fff;
                    color: #333;
                    box-sizing: border-box;
                }
                
                .auth-form button {
                    margin-top: 0.5rem;
                    padding: 0.8rem;
                    background-color: #4a90e2;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1rem;
                }
                
                .auth-form button:hover {
                    background-color: #3578d6;
                }
                `}
            </style>
            <div className="auth-card-container">
                <div className="auth-card">
                    <h2>Sign Up</h2>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <label>Username</label>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label>Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            required
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    );
}