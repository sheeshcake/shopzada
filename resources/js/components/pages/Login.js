import React, {useState, useEffect} from 'react';
import {
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';
import {Container, Button, Card, Form, Col, Row} from 'react-bootstrap';



function Login() {


    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [auth, setAuth] = useState([])


    const viewAuth = () => {
        const data = JSON.parse(localStorage.getItem("user"))
        if(data){
            setAuth(data)
            return true
        }
        return false
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        const data = await axios.post("/api/login", user)
        localStorage.setItem("user", JSON.stringify(data.data))
    }
    return ( 
        <Container className="d-flex justify-content-center">
            {viewAuth() ? <Redirect to="/cart" /> :
            <Card>
                <Card.Header>
                    <h3>Login</h3>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleLogin}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" onChange={(e)=> setUser({...user, email: e.target.value})}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e)=> setUser({...user, password: e.target.value})}/>
                        </Form.Group>
                        <Button type="submit">Login</Button>
                    </Form>
                    <hr/>
                    <Container className="justify-content-center">
                        <Link to="/register">
                            <Button>Register</Button>
                        </Link>
                        <Link to="/adminlogin">
                            <Button>Login as Admin</Button>
                        </Link>
                    </Container>
                </Card.Body>
            </Card>
            }
        </Container>
    )

}
 
export default Login;