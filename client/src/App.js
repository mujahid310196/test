import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Products from './component/Products';

const Home = () => {
  return (
    <div className='product-container'>
      <h2>Home Page</h2>
      <p>This is the Home page</p></div>
  );
}
const About = () => {
  return (
    <div className='product-container'>
      <h2>About Page</h2>
      <p>This is the About page</p></div>
  );
}

// comment

const Contact = () => {
  return (
    <div className='product-container'>
      <h2>Contact Page</h2>
      <p>This is the Contact page</p></div>
  );
}

const LocationDisplay = () => {
  const location = useLocation();
  //console.log(location);
  return (
    <div className='product-container'>
      <p>Current Path: {location.pathname}</p>
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/products">Products</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
      </Routes>

      {/* Component to display current location */}
      {/* <LocationDisplay /> */}
    </Router>
  );
}

export default App;