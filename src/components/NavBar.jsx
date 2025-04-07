
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import CartIcon from './CartIcon';

function NavBar(){

    return(
        <Navbar bg="light" data-bs-theme="light"  variant="light" expand="lg" className="p-3 mb-4">
            <Navbar.Brand href="/">Fred ReactStore</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                <Nav>
                    <Nav.Link as={NavLink} to="/" activeclassname="active">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/products" activeclassname="active" className="">Products</Nav.Link>
                </Nav>
                <Nav>
                <Nav.Link as={NavLink} to="/cart" activeclassname="active"><CartIcon /></Nav.Link>
                </Nav>
            </Navbar.Collapse>
      </Navbar>
    )
}
export default NavBar;