import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Card, Row, Container, Button, Col, Image, InputGroup, Form, FormControl} from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import Payment from "./Payment"

function Cart() {

    let history = useHistory()

    useEffect(() => {
        getCart()
    }, [])

    const [alert, setAlert] = useState([])

    const [carts, setCarts] = useState([])

    const [total, setTotal] = useState([])

    const getCart = async () =>{
        let user = JSON.parse(localStorage.getItem("user"))
        console.log(user)
        let data = await axios.post("/api/cart", {user_id: user.data.user.id})
        console.log(data)
        setTotal(0)
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

    const check = (e) => {
        console.log(e.target.id)
        const newchecked = [...carts]
        const checked = newchecked.find(checked => checked.cart_id == e.target.id)
        checked.is_checked = !checked.is_checked
        setCarts(newchecked)
        submitPurchase()
    }

    const submitPurchase = () => {
        let user = JSON.parse(localStorage.getItem("user"))
        axios.post("/api/purchase", {cart_id: carts, user_id: user.data.user.id}).then((resp) => {
            console.log(resp.data.total)
            setTotal(resp.data.total)
        })
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
                                    <Col>
                                        <Form.Check type="checkbox" checked={cart.is_checked} id={cart.cart_id} onChange={check}/>
                                        <Image src="https://via.placeholder.com/150"></Image>
                                    </Col>
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
            <Payment total={total} carts={carts} getCart={getCart}></Payment>
        </Container>
    )
}

export default Cart
