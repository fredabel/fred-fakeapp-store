import { useState, useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Carousel, Row, Col, Card, Button, Badge ,Spinner, Placeholder  } from 'react-bootstrap';
import UpdateItem from './UpdateItem';
import DeleteItem from './DeleteItem';
import ErrorMessage from './ErrorMessage';

function ProductDetailsPage(){

    const { productId } = useParams();  
    const [productDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);

    const [showModal, setShowModal] = useState(false)
    const handleCloseModal = () => setShowModal(false);

    const [cart,setCart] = useState(null)
    
    useEffect(() =>{
        const fetchProductDetails = async () =>{
            try{
                const productResponse = await axios.get(`https://fakestoreapi.com/products/${productId}`)
                setProductDetails(productResponse.data)
                setTimeout(() => {
                    setLoading(false); // Stop loading after a delay    
                },2000)
            }catch(error){
                setError(`Failed to fetch: ${error.message}`);
            }
        }
        if(productId){
            fetchProductDetails()
        }
    },[productId])

    const convertPrice = (price) => {
        return parseFloat(price).toFixed(2)
    }

    const handleAddToCart = () => {
        setCart(productDetails)
        setShowModal(true)
        if(cart) { console.log(cart) }
    }

    if(error){
        return(
            <ErrorMessage errMsg={error} modal={true} redirect={'/products'} />
        )
    }

    return(

        <Container className="">
            <div className="p-5 m-5 shadow rounded">
                {
                    productDetails ? 
                        <Row className="">
                            <Col lg="6" md="12" className="d-flex justify-content-center" >
                            <div className="p-4 border-0 product-detail-image-container">
                                    {
                                        !loading ? <img src={productDetails.image} className="img-fluid" /> 
                                        : <Placeholder animation="glow" ><Placeholder className="mb-5 product-detail-image"/></Placeholder>
                                    }
                            </div>
                            </Col>
                            <Col lg="6" md="12" className="d-flex flex-column justify-content-between ">
                                <div className="border border-0">
                                    {
                                        !loading ?  <h3 className="mt-2 mb-4 fw-bold">{productDetails.title}</h3>
                                        : <Placeholder animation="glow" ><Placeholder xs={6} className="mb-5"/></Placeholder>

                                    }
                                
                                    <p className="mb-4">
                                        {
                                            !loading ? <Badge bg="primary" className="text-uppercase">{productDetails.category}</Badge>
                                            : <Placeholder animation="glow"><Placeholder xs={4} className="mb-5"/></Placeholder>
                                        }
                                    </p>
                                    {
                                        !loading ?  
                                            <div className="d-flex">
                                                <h5>$</h5><h3 className="mb-4 fw-bold">{convertPrice(productDetails.price)}</h3>
                                            </div>
                                        :
                                        <Placeholder animation="glow"><Placeholder xs={6} className="mb-5"/></Placeholder>
                                    }
                                
                                    <p className="mb-4 ">
                                        {   !loading ? productDetails.description
                                            : 
                                            <Placeholder animation="glow">
                                                <Placeholder xs={6}/>
                                                <Placeholder xs={12}/>
                                                <Placeholder xs={6}/>
                                            </Placeholder>
                                        }
                                    </p> 
                                </div>
                                {
                                    !loading  ?
                                        <div className="d-flex  justify-content-between gap-3 flex-column">
                                            <div className="d-flex justify-content-between gap-3">
                                                <UpdateItem item={productDetails} modal={showModal} closeModal={handleCloseModal} />
                                                <DeleteItem  item={productDetails}  modal={showModal} closeModal={handleCloseModal} />
                                                
                                            </div>
                                            <Button variant="outline-secondary" className=" w-100" onClick={handleAddToCart}>Add to Cart</Button>
                                        </div> 
                                    :
                                    <Placeholder animation="glow">
                                        <Placeholder xs={4}/>  <Placeholder xs={4}/>
                                        <Placeholder xs={12}/>
                                    </Placeholder>
                                }
                            </Col>
                        </Row>
                    : ''
                }
            </div>
        </Container>
    )
}
export default ProductDetailsPage;