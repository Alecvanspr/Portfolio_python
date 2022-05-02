import React from 'react'
import logo from './logo.svg'
import "./Header.css"

export default function Header(){
    return (
        <nav>
            <div className='LogoNaam'>
                <img src={ logo } width='50px'></img>
                <h1>ReactFacts</h1>
            </div>
            <p>React Course - Project 1</p>
        </nav>
    )
}