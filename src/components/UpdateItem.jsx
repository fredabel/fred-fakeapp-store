import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Container, Carousel, Row, Col, Card, Button, Badge, Form, Spinner   } from 'react-bootstrap';
import ErrorMessage from './ErrorMessage';

function UpdateItem({item}){

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)


    const [showEditModal, setShowEditModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleCloseEditModal = () => setShowEditModal(false);
    const handleCloseSuccessModal = () => setShowSuccessModal(false);

    const handleEditItem = () => {
        setShowEditModal(true)
    }

    const [formData, setFormData] = useState(item)
    const [validated, setValidated] = useState(false);

    const [product,setProduct] = useState(null)//Store updated product
    
    const convertPrice = (price) => {
        return parseFloat(price).toFixed(2)
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
      };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        }else{
            try{
                setLoading(true); // Start loading
                const response = await axios.put(`https://fakestoreapi.com/products/${item.id}`,formData)
                setProduct(response.data)
                setError(null);
                setShowEditModal(false); // Close the edit modal
                setShowSuccessModal(true); // Open the success modal
                setTimeout(() => {
                    setLoading(false)
                },2000)
            }catch(err){
                setError(`Error submitting the form. Please try again: ${err.message}`);
                setShowEditModal(false); // Close the edit modal
                setShowSuccessModal(false); // Close the success modal
            }
        }
        
        setValidated(true);
    } 


    return(
        <>
            
            <Button variant="primary"className="flex-grow-1" onClick={handleEditItem}>Edit</Button>
            
            { error ? <ErrorMessage errMsg={error} modal={true} redirect={'/products/'+item.id} />: ''}

            <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Update Product #{item.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {
                    item ? 
                        <Row className="align-items-center">
                        <Col lg="5" md="12" className="d-flex justify-content-center" >
                            <Card className="p-4 border-0 img-container-md" >
                                <Card.Img src={item.image} className="img-fluid" /> 
                            </Card>
                        </Col>
                        <Col lg="7" md="12" className="d-flex flex-column justify-content-between ">
                            <Form onSubmit={handleSubmit} noValidate validated={validated}>
                                <Form.Group className="mb-3" >
                                    <Form.Label className="fw-bold">Title:</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Input title here"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a title
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                                <Form.Group className="mb-3" >
                                    <Form.Label className="fw-bold">Category:</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Input category here"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a category
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label className="fw-bold">Price:</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        placeholder="Input price here" 
                                        name="price"
                                        value={convertPrice(formData.price)}
                                        onChange={handleChange}
                                        required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a price
                                        </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label className="fw-bold">Description:</Form.Label>
                                    <Form.Control as="textarea" 
                                        rows={5} 
                                        placeholder="Input description here" 
                                        name="description"
                                        value={formData.description} 
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a description
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseEditModal}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" type="submit" >
                                        Update
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </Col>
                    </Row>
                        : ''
                }
                </Modal.Body>
              
            </Modal>

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
                
                <Modal.Header closeButton>
                    <Modal.Title >{!loading ? 'Successfuly Updated!' : 'Updating the product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        loading ? 
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading... </span>
                            </Spinner>
                            <p>Please wait while updating the product.</p>
                        </div>
                        : 
                        <Row>
                            <Col>
                            <p className="text-success">Your changes have been saved successfully!</p>
                            </Col>
                        </Row>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {
                        !loading ?  <Button variant="primary" onClick={handleCloseSuccessModal}>Close</Button>: ''
                    }
                   
                </Modal.Footer>
            </Modal>
            
            
        </>
    )
}
export default UpdateItem;