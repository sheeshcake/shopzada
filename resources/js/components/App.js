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
import AdminLogin from './pages/AdminLogin';
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
            </Switch>
        </Router>
    );
}

export default App;
ReactDOM.render(<App/>,document.getElementById('app'));