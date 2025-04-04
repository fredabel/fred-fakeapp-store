import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Carousel, Row, Col, Card, Button, Badge ,Modal, Spinner } from 'react-bootstrap';
import ErrorMessage from './ErrorMessage';
function DeleteItem({item}){

    const navigate = useNavigate(); 

    const [deletedItem, setDeletedItem] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        navigate('/products')
    }

    const handleDeleteItem = () => {
        setShowDeleteModal(true)
    }
   
    const handleDeleteProduct = async () => {

        try{
            setLoading(true); // Start loading
            const response = await axios.delete(`https://fakestoreapi.com/products/${item.id}`)
            setShowDeleteModal(false)
            setShowSuccessModal(true)

            setTimeout(() => {
                setLoading(false); 
            }, 2000); 

        }catch(err){
            setError(`Error submitting the form. Please try again: ${err.message}`);
        }
       
    }

    const convertPrice = (price) => {
        return parseFloat(price).toFixed(2)
    }

    return(
        <>
        
           <Button variant="danger" className="flex-grow-1" onClick={handleDeleteItem}>Delete</Button>

           { error ? <ErrorMessage errMsg={error} modal={true} redirect={'/products/'+item.id} />: ''}

           <Modal show={showDeleteModal} onHide={handleDeleteItem} size="lg" centered>
            <Modal.Body>
                <Row className="align-items-center">
                    <Col lg={12} md={12} sm={12}><h3 className="m-4 text-danger text-center">Are you sure you want to delete this product?</h3></Col>
                    <Col lg={5} md={12} sm={12} className="d-flex justify-content-center" >
                        <Card className="p-4 border-0 img-container-md" >
                            <Card.Img src={item.image} className="img-fluid" /> 
                        </Card>
                    </Col>
                    <Col lg={7} md={12} sm={12}>
                        <Card.Body>
                            <Card.Title className="mb-4">{item.title}</Card.Title>
                            <Card.Text>
                                <p className="mb-4">
                                    <Badge bg="primary" className="text-uppercase">{item.category}</Badge>
                                </p>
                                <div className="d-flex">
                                    <h5>$</h5>
                                    <h3 className="mb-4 fw-bold">{convertPrice(item.price)}</h3>
                                </div>
                                <p className="mb-4">{item.description}</p>
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>     
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeleteModal}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteProduct}>
                    Delete
                </Button>
            </Modal.Footer>
           </Modal>

           {/* Success Modal */}
           <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
            <Modal.Header >
                <Modal.Title >{!loading ? `Successfully Deleted!` : `Deleting Product #${item.id}`} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    loading ? 
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading... </span>
                        </Spinner>
                        <p>Please wait while deleting the product.</p>
                    </div>
                    : 
                    <Row>
                    <Col>
                       <p className="text-success">{`You have successfully deleted the Product #${item.id}!`}</p>
                    </Col>
                </Row>
                }
               
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseSuccessModal}>
                    Close
                </Button>
            </Modal.Footer>
           </Modal>
        </>
    )
}
export default DeleteItem;