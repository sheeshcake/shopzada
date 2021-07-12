import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
    Container,
    Card,
    Form,
    Button
} from "react-bootstrap";
import {
    useHistory
 } from "react-router-dom";

const Register = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const history = useHistory()

    useEffect(()=>{
        viewAuth()
    },[])

    const [response, setResponse] = useState([])
    

    const viewAuth = () => {
        if(JSON.parse(localStorage.getItem("user"))){
            history.push("/login")
        }
    }

    const handleRegister = async(event) => {
        event.preventDefault()
        try{
            let response = await axios.post('/api/register', data)
            setResponse(response)
            history.push("/login")
        }catch(e){
            console.log(data)
        }
    }

    return (
        <Container>
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
        </Container>
    )
}

export default Register;

