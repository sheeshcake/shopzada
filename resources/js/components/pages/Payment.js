import React, {useState, useEffect} from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import StripeCheckout  from 'react-stripe-checkout'
import { useHistory } from 'react-router-dom'
import {Card} from "react-bootstrap"
import axios from 'axios'

export default function Payment({total, carts}) {

    useEffect(() => {
        checkUser()
    }, [])

    console.log("recieved data" + total)

    const stripePromise = 'pk_test_51JBXXxKSSWLfzugkIYESqx6d9qF2O0IZI9fchVOoujkkAnVdWDCNpZNtQfQi9xw5p2ocbUBVZK7xZv6Lzm9Ratbi00C1GiwCIA'

    const [user, setUser] = useState([])


    let history = useHistory()

    const checkUser = () => {
        let user = JSON.parse(localStorage.getItem("user"))
        console.log(setUser(user))
    }

    console.log("stripe Promise:" + stripePromise)

    const handlePayment = (token, addresses) => {
        let data = {
            stripeToken: token.id,
            amount: total,
            name: token.card.name,
            email: token.email,
            currency: 'PHP',
            customer: user.data.user.id,
            description: 'Test Shopzada',
            address: token.card.address_city ,
            address_country: token.card.address_country,
            address_line1: token.card.address_line_1
        }

        if(total > 0){
            axios.put('/api/pay', {carts: carts, data: data}).then((resp) => {
                console.log(resp)
            })
        }
    }

    return (
        <Elements stripe={loadStripe(stripePromise)}>
            <Card>
                <Card.Header>
                    <h3>Payment: {total}</h3>
                </Card.Header>
                <Card.Body>
                    <StripeCheckout 
                                    token={handlePayment}
                                    stripeKey={stripePromise}
                                    currency="PHP"
                                    amaount={total}
                                    billingAddress
                                    shippingAddress
                                />
                </Card.Body>
            </Card>
        </Elements>
    )
}

