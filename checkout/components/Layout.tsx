import React, { ReactNode } from 'react'

export default function Layout(props: { children: ReactNode }) {
    return (
        <div className='container'>
            {props.children}
        </div>
    )
}
