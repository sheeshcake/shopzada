import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';



class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email: "",
            password: ""
        }
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handlePasswordChange = (event) =>{
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = event => {
        alert(this.state.email + " " + this.state.password);
        event.preventDefault();
    }
    render(){
        return ( 
            <div class="d-flex justify-content-center">
                <div class="card">
                    <div class="card-header">
                        <h3>Login</h3>
                    </div>
                    <div class="card-body">
                        <form onSubmit={this.handleLogin}>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" value={this.state.email} class="form-control" onChange={this.handleEmailChange}/>
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" value={this.state.password} class="form-control" onChange={this.handlePasswordChange}/>
                            </div>
                            <input type="submit" class="btn btn-primary" value="Login"/>
                        </form>
                        <hr/>
                        <Link to="/adminlogin">
                            <a class="btn btn-primary">Login as Admin</a>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

}
 
export default Login;