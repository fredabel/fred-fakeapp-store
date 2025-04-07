import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as Icon from 'react-bootstrap-icons';
import { Container, Carousel, Row, Col, Card, Button, Placeholder, Spinner } from "react-bootstrap";
import ErrorMessage from "./ErrorMessage";
import CartProductItem from "./CartProductItem";

function Cart(){
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [cartItems, setCartItems] = useState([]); // Cart items state from parent component

    useEffect(() => {
        const fetchCartItems = async () =>{
            try {
                const response = await axios.get('https://fakestoreapi.com/carts')
                setCartItems(response.data);
            }catch(error){
                setError(`Failed to fetch products: ${error.message}`);
            }finally{
                setLoading(false);
            }
        }
        fetchCartItems()
    },[])


    if(error){
        return(
           <ErrorMessage errMsg={error} modal={true} redirect={'/'} />
        )
    }

    return(
        <Container>
            <h1 className="text-center">Your Cart</h1>
            <div className="">
                {
                    cartItems.map((cartItem) =>(
                        <Card className="m-3 shadow" key={cartItem.id}>
                            <Card.Header className="d-flex flex-row justify-content-between align-items-center">
                                <div className="fw-bold">Cart ID: {cartItem.id}</div>
                                <div className="d-flex align-items-center gap-1">  
                                    <small className="text-secondary fw-bold">Items: {cartItem.products.length}</small>
                                </div>
                            </Card.Header>
                            <Card.Body className="d-flex flex-column gap-2">
                                {
                                      cartItem.products.map((product) => (
                                        <CartProductItem key={product.productId} productId={product.productId} />
                                    ))
            
                                }
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <div className="fw-bold"></div>
                                    <Button variant="primary">Checkout</Button>
                                </div>
                            </Card.Body>
                        </Card>
                
                        )
                    )   
                }
            </div>
        </Container> 
    )            

}
export default Cart;