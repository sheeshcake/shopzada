import { Container, Row, Col, Card, CardImg, Button, Alert } from 'react-bootstrap';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Products() {


    useEffect(() => {
        fetchItems();
    }, [])

    const [products, setProducts] = useState([])

    const [alert, setAlert] = useState("")

    const fetchItems = async () =>{
        try{
            const data = await axios.get("/api/products")
            const products = data.data.products
            console.log(products)
            setProducts(products)
        }catch(e){
            console.log(e)
        }
    }

    const addToCart = async (id) =>{
        let user = JSON.parse(localStorage.getItem("user"))
        if(user != null){
            console.log(user);
            let resp = await axios.post("/api/add", {
                product_id: id,
                user_id: user.data.user.id,
                accessToken: user.data.accessToken
            })
            setAlert(resp.data.msg)
        }
    }

    

    console.log(products)

    return (
        <Container>
            <Container className="justify-content-center">
                <h1>This is Products</h1>
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
                {products.length > 0 && products.map((product) => { return (
                    <Col key={product.id}>
                        <Card>
                            <CardImg top="true" width="100%" src="https://via.placeholder.com/318x180" alt="Card image cap" />
                            <Card.Body>
                                <Container className="justify-content-center">
                                    {product.product_name}
                                    <Container className="justify-content-center">
                                        <Button onClick={addToCart.bind(this, product.id)}>Add to Cart</Button>
                                    </Container>
                                 </Container>
                             </Card.Body>
                         </Card>
                     </Col>
                )})}
            </Row>
        </Container>
    );
}

export default Products;