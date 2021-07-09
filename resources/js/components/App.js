import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Cart from "./pages/Cart";
import AdminLogin from './pages/AdminLogin';
import Register from "./pages/Register";
import PrivateRoute from "./route/PrivateRoute";
import Nav from './layout/Nav';


function App() {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/products" component={Products} />
                <Route path="/login" component={Login} />
                <Route path="/adminlogin" component={AdminLogin} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/cart" component={Cart} />
                <PrivateRoute path="/add" component={Products} />
            </Switch>
        </Router>
    );
}

export default App;
ReactDOM.render(<App/>,document.getElementById('app'));