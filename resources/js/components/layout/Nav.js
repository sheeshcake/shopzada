import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {Link, useHistory} from 'react-router-dom';

const Nav = () => {

    useEffect(() => {
        setInterval(() => {
            checkUser()
        })
    }, [])

    const history = useHistory()

    const logout = () => {
        localStorage.clear()
        history.push("/login")
    }


    const checkUser = () => {
        setUser(localStorage.getItem("user"))
    }

    const [user, setUser] = useState(localStorage.getItem("user"))    

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/">
                <a class="navbar-brand">Navbar</a>
            </Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <Link to="/">
                        <li class="nav-item">
                            <a class="nav-link">Home</a>
                        </li>
                    </Link>
                    <Link to="/products">
                        <li class="nav-item">
                            <a class="nav-link">Products</a>
                        </li>
                    </Link>
                    {
                        user != null ? 
                        <>
                        <Link to="/cart">
                            <li class="nav-item">
                                <a class="nav-link">Cart</a>
                            </li>
                        </Link>
                            <li class="nav-item">
                                <Button onClick={logout} className="nav-link">Logout</Button>
                            </li>
                        </>
                        :
                        <Link to="/login">
                            <li class="nav-item">
                                <a class="nav-link">Login</a>
                            </li>
                        </Link>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Nav;