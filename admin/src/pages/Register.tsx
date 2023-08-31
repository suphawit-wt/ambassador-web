import React, { SyntheticEvent, useState } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (password === "" || confirmPassword === "") {
            alert("Password and Confirm Password field is required.");
        } else {
            if (password !== confirmPassword) {
                alert("Password must be matched with Confirm Password.");
            } else {
                await axios.post('/register', {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password
                })

                setRedirect(true)
            }
        }

    }

    if (redirect) {
        return <Navigate to='/login' />
    }

    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please register</h1>

                <div className="form-floating mb-2">
                    <input type="text" className="form-control" placeholder="First Name"
                        onChange={e => setFirstName(e.target.value)} />
                    <label >First Name</label>
                </div>
                <div className="form-floating mb-2">
                    <input type="text" className="form-control" placeholder="Last Name"
                        onChange={e => setLastName(e.target.value)} />
                    <label >Last Name</label>
                </div>
                <div className="form-floating mb-2">
                    <input type="email" className="form-control" placeholder="name@example.com"
                        onChange={e => setEmail(e.target.value)} />
                    <label >Email address</label>
                </div>
                <div className="form-floating mb-2">
                    <input type="password" className="form-control" placeholder="Password"
                        onChange={e => setPassword(e.target.value)} />
                    <label >Password</label>
                </div>
                <div className="form-floating mb-2">
                    <input type="password" className="form-control" placeholder="Confirm Password"
                        onChange={e => setConfirmPassword(e.target.value)} />
                    <label >Confirm Password</label>
                </div>

                <button className="btn btn-success w-100 mt-3" type="submit">Register</button>
            </form>
        </main>
    )
}

export default Register