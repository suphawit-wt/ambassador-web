import React, { Dispatch, ReactNode, useEffect, useState } from 'react'
import Nav from 'components/Nav'
import Header from 'components/Header'
import { User } from 'models/user'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { setUser } from 'redux/actions/setUserAction'
import { connect } from 'react-redux'

const Layout = (props: { children: ReactNode, setUser: (user: User) => void }) => {
    const location = useLocation();

    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await axios.get('/user');

                    props.setUser(data);
                } catch (e) {
                    console.log(e)
                }
            }
        )();
    }, []);

    let header;

    if (location.pathname === "/" || location.pathname === "/backend") {
        header = <Header />
    }

    return (
        <>
            <Nav />
            <main>
                {header}
                <div className="album py-5 bg-body-tertiary">
                    <div className="container">
                        {props.children}
                    </div>
                </div>
            </main>
        </>
    )
}

const mapStateToProps = (state: { user: User }) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);