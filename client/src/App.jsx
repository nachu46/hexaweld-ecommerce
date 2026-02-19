import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';
// Admin pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProductList from './pages/admin/ProductList';
import ProductEdit from './pages/admin/ProductEdit';
import CategoryList from './pages/admin/CategoryList';
import Analytics from './pages/admin/Analytics';
import AdminManagement from './pages/admin/AdminManagement';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <HelmetProvider>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<Login />} />
                    <Route path="/admin/dashboard" element={
                        <ProtectedRoute adminOnly><Dashboard /></ProtectedRoute>
                    } />
                    <Route path="/admin/products" element={
                        <ProtectedRoute adminOnly><ProductList /></ProtectedRoute>
                    } />
                    <Route path="/admin/product/:id/edit" element={
                        <ProtectedRoute adminOnly><ProductEdit /></ProtectedRoute>
                    } />
                    <Route path="/admin/product/create" element={
                        <ProtectedRoute adminOnly><ProductEdit /></ProtectedRoute>
                    } />
                    <Route path="/admin/categories" element={
                        <ProtectedRoute adminOnly><CategoryList /></ProtectedRoute>
                    } />
                    <Route path="/admin/analytics" element={
                        <ProtectedRoute adminOnly><Analytics /></ProtectedRoute>
                    } />
                    <Route path="/admin/admins" element={
                        <ProtectedRoute adminOnly><AdminManagement /></ProtectedRoute>
                    } />
                    <Route path="/admin/enquiries" element={
                        <ProtectedRoute adminOnly><AdminEnquiries /></ProtectedRoute>
                    } />
                </Routes>
            </Layout>
        </HelmetProvider>
    );
}

export default App;
