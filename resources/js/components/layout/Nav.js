import React, { Component } from 'react';

import {Link} from 'react-router-dom';

class Nav extends Component {
    render() {
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
                        <Link to="/login">
                            <li class="nav-item">
                                <a class="nav-link">Login</a>
                            </li>
                        </Link>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;