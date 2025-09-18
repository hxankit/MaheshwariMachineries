
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Login from './components/login';
// import SignUp from './components/signUp';
import Main from './components/Pages/mainScreen';
import CategoryPage from './components/Pages/CategoriesPage';
import NavBar from './components/miniComponents/navabar';
import ProductsPage from './components/miniComponents/ProductPage';
import ProductDetailsPage from './components/miniComponents/ProductDetails';
import GalleryPage from './components/Pages/GalleryPage';
import AboutPage from './components/Pages/AboutUs';
import ContactForm from './components/Pages/contactUs';
import SearchResults from './components/miniComponents/SearchResults';
import DashboardHome from './components/features/admin/Dashboard';
import AdminLayout from './components/features/admin/DashboardLayout';
import AdminLogin from './components/features/admin/Adminlogin';
import AddProduct from './components/features/admin/AddProduct';
import CategoryAdd from './components/features/admin/AddCategory';
import AdminRoute from './components/Guards/AdminGuard';
import LoginGuard from './components/Guards/LoginGuard';
import ViewCategory from './components/features/admin/ViewCateList';
import ContactList from './components/features/admin/contacts';
import ContactDetail from './components/features/admin/ContactDetails';
import CategoryDetailsPage from './components/features/admin/categorydetails';

function App() {


  return (

    <Router>
      {/* <NavBar /> */}
      <Routes>

        <Route path="/" element={<Main />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/:categoryname/:categoryid" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/search" element={<SearchResults />} />

        <Route 
        path="/login" 
        element={
          <LoginGuard>
        <AdminLogin />
        </LoginGuard>
        } />




        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
          <Route index element={<DashboardHome />} />
          <Route path="categories/product/create" element={<AddProduct />} />
          <Route path="categries" element={<ViewCategory />} />
          <Route path="categries/catergory" element={<CategoryDetailsPage />} />
          <Route path="add-category" element={<CategoryAdd />} />
          <Route path="contacts" element={<ContactList />} />
          <Route path="contacts/Details" element={<ContactDetail />} />
          
          {/* <Route path="categories" element={<Categories />} /> */}
        </Route>

      </Routes>

    </Router>


  )
}

export default App
