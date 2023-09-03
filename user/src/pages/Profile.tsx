import axios from 'axios';
import Layout from 'components/Layout'
import { User } from 'models/user';
import React, { Dispatch, SyntheticEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { setUser } from 'redux/actions/setUserAction';

const Profile = (props: { user: User, setUser: (user: User) => void }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        setFirstName(props.user.first_name);
        setLastName(props.user.last_name);
        setEmail(props.user.email);
    }, [props.user])

    const updateInfoSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put('/users/info', {
            first_name: firstName,
            last_name: lastName,
            email: email
        })

        const user: User = {
            id: props.user?.id,
            first_name: firstName,
            last_name: lastName,
            email: email,
            revenue: props.user?.revenue
        }

        props.setUser(user)
    }

    const changePasswordSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (password === "" || confirmPassword === "") {
            alert("Password and Confirm Password field is required.");
        } else {
            if (password !== confirmPassword) {
                alert("Password must be matched with Confirm Password.");
            } else {
                await axios.put('/users/password', {
                    password
                })
            }
        }

    }

    return (
        <Layout>
            <h3>Account Information</h3>
            <form onSubmit={updateInfoSubmit}>
                <div className='mb-3'>
                    <label>First Name</label>
                    <input className='form-control'
                        defaultValue={firstName}
                        onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label>Last Name</label>
                    <input className='form-control'
                        defaultValue={lastName}
                        onChange={e => setLastName(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label>Email</label>
                    <input className='form-control' type='email'
                        defaultValue={email}
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <button className='btn btn-outline-secondary' type='submit'>Submit</button>
            </form>

            <h3>Change Password</h3>
            <form onSubmit={changePasswordSubmit}>
                <div className='mb-3'>
                    <label>Password</label>
                    <input className='form-control' type='password'
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label>Confirm Password</label>
                    <input className='form-control' type='password'
                        onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <button className='btn btn-outline-secondary' type='submit'>Submit</button>
            </form>
        </Layout>
    )
}

export default connect(
    (state: { user: User }) => ({
        user: state.user
    }),
    (dispatch: Dispatch<any>) => ({
        setUser: (user: User) => dispatch(setUser(user))
    })
)(Profile);