import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Card, Row, Container, Button, Col, Image, InputGroup, FormControl} from 'react-bootstrap'

function Cart() {

    useEffect(() => {
        getCart()
    }, [])

    const [alert, setAlert] = useState([])

    const [carts, setCarts] = useState([])

    const getCart = async () =>{
        let user = JSON.parse(localStorage.getItem("user"))
        let data = await axios.post("/api/cart", {user_id: user.data.user.id})
        console.log(data)
        setCarts(data.data.cart)
    }

    const decrement = async (id) => {
        let resp = await axios.post("/api/update", {mode: "decrement", id: id})
        getCart()
    }

    const increment = async (id) => {
        let resp = await axios.post("/api/update", {mode: "increment", id: id})
        getCart()
    }


    return (
        <Container>
            <Container className="justify-content-center">
            <h1>Cart</h1>
            </Container>
            {
                alert != "" ? 
                <Alert className="alert-success">
                    {alert}
                </Alert>
                :
                ""
            }
            <Row>
                {carts.map((cart) => {
                    return (
                        <Card key={cart.cart_id}>
                            <Card.Body>
                                <Row>
                                    <Col><Image src="https://via.placeholder.com/150"></Image></Col>
                                    <Col>
                                        <p>{cart.product_name}</p>
                                        <p>{cart.product_price}</p>
                                    </Col>
                                    <Col>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <Button onClick={decrement.bind(this, cart.cart_id)}>-</Button>
                                            </InputGroup.Prepend>
                                            <FormControl value={cart.product_count} readOnly />
                                            <InputGroup.Append>
                                                <Button onClick={increment.bind(this, cart.cart_id)}>+</Button>
                                            </InputGroup.Append>
                                        </InputGroup>                                        
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    )
                })}

            </Row>
            
        </Container>
    )
}

export default Cart
