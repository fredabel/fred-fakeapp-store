import {useState} from 'react'
import axios from 'axios';
import * as Icon from 'react-bootstrap-icons';
import { Modal, Container, Carousel, Row, Col, Card, Button, Badge, Form, Spinner} from 'react-bootstrap';
import ErrorMessage from './ErrorMessage';

function AddProduct(){

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(null)

    const [showAddProductModal, setShowAddProductModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const handleCloseAddProductModal = () => setShowAddProductModal(false)
    const handleCloseSuccessModal = () => setShowSuccessModal(false)
       
    const handleAddProduct = () =>{
        setValidated(false) //Always reset validation 
        setShowAddProductModal(true)
    }

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: '',
        description:''
    })
    const [validated, setValidated] = useState(false);

    const convertPrice = (price) =>{
        return parseFloat(price).toFixed(2)
    }

    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }else{

            try{
                setLoading(true)
                const response = await axios.post(`https://fakestoreapi.com/products`,formData)
                setProduct(response.data)
                setFormData({ // Reset the form data
                    title: '',
                    price: '',
                    category: '',
                    description: ''
                });
               
                setShowAddProductModal(false); // Close the add product modal
                setShowSuccessModal(true); // Show success modal

                setTimeout(() => {
                    setLoading(false); // Stop loading
                }, 2000);
                
            }catch(err){
                setError(`Error submitting the form. Please try again: ${err.message}`);
                setShowAddProductModal(false); // Close the add product modal
                setShowSuccessModal(false); // Close success modal
            }
        }
        setValidated(true);
    }

    return(
        <>
            <Button variant="outline-success" size="sm" className="mr-4 max-w-10" onClick={handleAddProduct}><Icon.Plus size={20} />Add Product</Button>
            { error ? <ErrorMessage errMsg={error} modal={true} redirect={'/'} />: ''}
            <Modal show={showAddProductModal} onHide={handleCloseAddProductModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                placeholder="0.00" 
                                name="price"
                                value={formData.price}
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
                            <Button variant="secondary" onClick={handleCloseAddProductModal}>
                                Cancel
                            </Button>
                            <Button variant="success" type="submit" >
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>    
            </Modal>

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-success">{!loading ? 'Successfully saved!' : 'Saving product..'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        !loading ?
                            product ? 
                                <Row className="align-items-center">
                                    <Col lg={6} md={6} sm={12}>
                                        <Card className="p-4 border-0 ">
                                            <Card.Img src="https://placehold.co/500x500"  fluid/>
                                        </Card>
                                    </Col>
                                    <Col lg={6} md={6} sm={12}>
                                        <Card.Body>
                                            <Card.Title className="mb-4">{product.title}</Card.Title>
                                            <Card.Text> <Badge bg="primary" className="text-uppercase">{product.category}</Badge></Card.Text>
                                            <Card.Text className="d-flex"><h5>$</h5><h3 className="mb-4 fw-bold">{convertPrice(product.price)}</h3></Card.Text>
                                            <Card.Text className="mb-4">{product.description}</Card.Text>
                                        </Card.Body>
                                    </Col>
                                </Row>
                                : ''
                            :  
                            <div className="text-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading... </span>
                                </Spinner>
                                <p>Please wait while saving your product.</p>
                            </div>
                        }
                </Modal.Body>
                <Modal.Footer>
                    { !loading ? <Button variant="primary" onClick={handleCloseSuccessModal}>Close</Button> : '' }
                </Modal.Footer>
            </Modal>
        </>
    )

}
export default AddProduct