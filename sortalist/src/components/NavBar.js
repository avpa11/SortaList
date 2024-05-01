import React, {useState} from 'react'
//import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <div>
                {/* Logo and App Name */}
                    <img src="./public/images/logo.png" alt="SortaList Logo" width="50" height="50" />
                    <span>SortaList</span>
                </div>
                <div>
                    {/* Navbar Links */}
                    <a href="#">How it works</a>
                    <a href="#">About us</a>
                    <a href="#">Contact</a>
                    {/*<Button>Login</Button>
                    <Button>Sign Up</Button>*/}
                </div>
            </div>
        </nav>
    </>
  )
}

export default NavBar