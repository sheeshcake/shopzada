import axios from 'axios';
import React, {useState} from 'react';
import {
    Container,
    Card,
    Form,
    Button
} from "react-bootstrap";
import {
    Redirect
 } from "react-router-dom";

const Register = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [response, setResponse] = useState([])
    
    const [auth, setAuth] = useState([])

    const viewAuth = () => {
        const data = JSON.parse(localStorage.getItem("user"))
        if(data){
            setAuth(data)
            return true
        }
        return false
    }

    const handleRegister = async(event) => {
        event.preventDefault()
        try{
            let response = await axios.post('/api/register', data)
            setResponse(response)
        }catch(e){
            
        }
    }

    return (
        <Container>
            {viewAuth() ? <Redirect to="/cart" /> :
            <Card>
                <Card.Header>
                    <h3>Register</h3>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleRegister}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" onChange={(e)=> setData({...data, name: e.target.value})}/>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" onChange={(e) => setData({...data, email: e.target.value})}/>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => setData({...data, password: e.target.value})} />
                        </Form.Group>
                        <Container className="justify-content-center">
                            <Button type="submit">Register</Button>
                        </Container>
                    </Form>
                </Card.Body>
            </Card>
            }
        </Container>
    )
}

export default Register;

