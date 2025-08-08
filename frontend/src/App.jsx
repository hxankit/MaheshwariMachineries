import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Login from './components/login';
// import SignUp from './components/signUp';
import Main from './components/mainScreen';
import CategoryPage from './components/CategoriesPage';
import NavBar from './components/navabar';
import ProductsPage from './components/ProductPage';
import ProductDetailsPage from './components/ProductDetails';
import GalleryPage from './components/GalleryPage';
import AboutPage from './components/AboutUs';
import AdminLogin from './components/Adminlogin';
import AdminDashboard from './components/AdminDash';

function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
      <NavBar />
      <Routes>
        {/* Define routes here */}
        {/* <Route path="/login" element={<Login />} />
          <Route path="/about" element={<SignUp />} /> */}
        <Route path="/" element={<Main />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/category/:category" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindash" element={<AdminDashboard />} />
      </Routes>

    </Router>


  )
}

export default App
