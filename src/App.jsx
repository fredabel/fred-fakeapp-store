import {Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ProductListingPage from './components/ProductListingPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import Cart from './components/Cart';
import './App.css';
function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/products" element={<ProductListingPage/>} />
        <Route path="/products/:productId" element={<ProductDetailsPage/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </>
  )
}

export default App
