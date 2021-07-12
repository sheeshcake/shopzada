import React, {useState, useEffect} from 'react';
import {
    Link,
    useHistory
} from 'react-router-dom';
import {Container, Button, Card, Form, Col, Row} from 'react-bootstrap';



function Login() {


    let history = useHistory()

    useEffect(() => {
        viewAuth()
    }, [])

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [auth, setAuth] = useState([])

    const viewAuth = () => {
        let data
        if(data = JSON.parse(localStorage.getItem("user"))){
            setAuth(data)
            history.push("/cart")
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        const data = await axios.post("/api/login", user)
        localStorage.setItem("user", JSON.stringify(data.data))
        history.push("/cart")
    }
    return ( 
        <Container className="d-flex justify-content-center">
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
        </Container>
    )

}
 
export default Login;