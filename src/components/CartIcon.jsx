import {useState, useEffect, use} from 'react';
import axios from 'axios';
import * as Icon from 'react-bootstrap-icons';
function CartIcon(){
    const [loading, setLoading] = useState(true) // Loading state
    const [error, setError] = useState(null) // Error state
    const [cartItems, setCartItems] = useState([]) // Cart items state from parent component
    const [cartCount, setCartCount] = useState(0); // Cart count state from parent component   

    useEffect(() => {
        setLoading(true); // Start loading
        axios.get('https://fakestoreapi.com/carts')
        .then(response => {
            setCartItems(response.data);
            // setTimeout(() => {
            //     setLoading(false);
            // }, 2000); 
        }).catch(error =>{
            setError(`Failed to fetch products: ${error.message}`);
            setLoading(false);
        })

    },[])

    useEffect(() => {
        if(cartItems.length > 0){
            setCartCount(cartItems.length)
        }
    },[cartItems])

    

    return (
        <div className="position-relative ">
            <Icon.Cart2 className="fw-bold" size={25} id="cart" role="button" /> 
            <span className="position-absolute top-0 end-80 translate-middle badge rounded-pill bg-danger">{cartCount}</span>
        </div>
    )
}
export default CartIcon;