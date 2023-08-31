import React, { ReactNode } from 'react'
import Nav from 'components/Nav'
import Header from 'components/Header'

const Layout = (props: { children: ReactNode }) => {
    return (
        <>
            <Nav />
            <main>
                <Header />
                <div className="album py-5 bg-body-tertiary">
                    <div className="container">
                        {props.children}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Layout