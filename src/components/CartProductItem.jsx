import { useEffect, useState } from "react";
import axios from "axios";
import { Placeholder } from 'react-bootstrap';
import ErrorMessage from './ErrorMessage';

const productCache = new Map(); // shared cache to avoid repeated fetches

function CartProductItem({ productId }) {
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const convertPrice = (price) => parseFloat(price).toFixed(2);

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (productCache.has(productId)) {
                setProductDetails(productCache.get(productId));
                setLoading(false);
                return;
            }

            try {
                const { data } = await axios.get(`https://fakestoreapi.com/products/${productId}`);
                productCache.set(productId, data);
                setProductDetails(data);
            } catch (err) {
                setError(`Failed to fetch: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (productId) fetchProductDetails();
    }, [productId]);

    if (error) {
        return <ErrorMessage errMsg={error} modal={true} redirect={'/products'} />;
    }

    if (loading || !productDetails) {
        return (
            <div className="d-flex flex-row border-top border-bottom p-3">
                <Placeholder animation="glow">
                    <Placeholder className="cart-product-img mb-3" />
                </Placeholder>
                <div className="flex-grow-1 ps-3">
                    <Placeholder as="h6" animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder.Button variant="secondary" xs={2} />
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex flex-row align-items-center border-top border-bottom p-3">
            <div className="cart-product-img-container">
                <img src={productDetails.image} alt={productDetails.title} className="cart-product-img" />
            </div>
            <div className="d-flex flex-column gap-2 ps-3">
                <h6>{productDetails.title}</h6>
                <div className="fw-bold">
                    <small>$</small>{convertPrice(productDetails.price)}
                </div>
            </div>
        </div>
    );
}

export default CartProductItem;
