import axios from 'axios';
import { User } from 'models/user';
import React, { Dispatch, useState } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';
import { setUser } from 'redux/actions/setUserAction';

const Nav = (props: { user: User, setUser: (user: User) => void }) => {
    const logout = async () => {
        await axios.post("/logout");
        props.setUser(new User);
    }

    let menu;

    if (props.user?.id) {
        menu = (
            <div className="col-md-4 text-end">
                <Link to="/rankings" className="btn me-2">Rankings</Link>
                <Link to="/stats" className="btn me-2">Stats</Link>
                <button type='button' className="btn btn-outline-danger me-2"
                    onClick={logout} >
                    Logout
                </button>
                <Link to="/profile" className="btn btn-primary">{props.user.first_name} {props.user.last_name}</Link>
            </div>
        )
    } else {
        menu = (
            <div className="col-md-4 text-end">
                <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
                <Link to="/register" className="btn btn-success">Sign-up</Link>
            </div>
        )
    }

    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li>
                        <NavLink to="/"
                            className={({ isActive }) =>
                                isActive ? "nav-link px-2 link-dark" : "nav-link px-2 link-secondary"
                            }>
                            Frontend
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/backend" className={({ isActive }) =>
                            isActive ? "nav-link px-2 link-dark" : "nav-link px-2 link-secondary"
                        }>
                            Backend
                        </NavLink>
                    </li>
                </ul>
                {menu}
            </header>
        </div>
    )
}

export default connect(
    (state: { user: User }) => ({
        user: state.user
    }),
    (dispatch: Dispatch<any>) => ({
        setUser: (user: User) => dispatch(setUser(user))
    })
)(Nav);