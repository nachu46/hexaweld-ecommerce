import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';

// Public Directory Pages
import BrandDirectory from './pages/BrandDirectory';
import BrandDetailsPage from './pages/BrandDetailsPage';
import CategoryDirectory from './pages/CategoryDirectory';
import CategoryDetailsPage from './pages/CategoryDetailsPage';

// Business & Legal Pages
import Services from './pages/Services';
import Certificates from './pages/Certificates';
import Industries from './pages/Industries';
import FAQ from './pages/FAQ';
import Career from './pages/Career';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnPolicy from './pages/ReturnPolicy';

// Shopping & Auth Pages
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import LoginUser from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import CustomerAccount from './pages/CustomerAccount';
import NotFound from './pages/NotFound';

// Admin pages
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProductList from './pages/admin/ProductList';
import ProductEdit from './pages/admin/ProductEdit';
import CategoryList from './pages/admin/CategoryList';
import Analytics from './pages/admin/Analytics';
import AdminManagement from './pages/admin/AdminManagement';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminBanners from './pages/admin/AdminBanners';
import AdminAnnouncement from './pages/admin/AdminAnnouncement';
import BrandList from './pages/admin/BrandList';
import BrandEdit from './pages/admin/BrandEdit';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <HelmetProvider>
            <ScrollToTop />
            <CartDrawer />
            <Layout>
                <Routes>
                    {/* Public Main Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />

                    {/* Brand & Category Public Routes */}
                    <Route path="/brands" element={<BrandDirectory />} />
                    <Route path="/certificates" element={<Certificates />} />
                    <Route path="/brand/:slug" element={<BrandDetailsPage />} />
                    <Route path="/categories" element={<CategoryDirectory />} />
                    <Route path="/category/:slug" element={<CategoryDetailsPage />} />

                    {/* Business & Legal Routes */}
                    <Route path="/services" element={<Services />} />
                    <Route path="/industries" element={<Industries />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/career" element={<Career />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-and-conditions" element={<TermsConditions />} />
                    <Route path="/shipping-policy" element={<ShippingPolicy />} />
                    <Route path="/return-policy" element={<ReturnPolicy />} />

                    {/* Customer Account & Shopping Routes */}
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/login" element={<LoginUser />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/account" element={<CustomerAccount />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={
                        <ProtectedRoute requireAdmin><Dashboard /></ProtectedRoute>
                    } />
                    <Route path="/admin/products" element={
                        <ProtectedRoute requireAdmin><ProductList /></ProtectedRoute>
                    } />
                    <Route path="/admin/product/:id/edit" element={
                        <ProtectedRoute requireAdmin><ProductEdit /></ProtectedRoute>
                    } />
                    <Route path="/admin/product/create" element={
                        <ProtectedRoute requireAdmin><ProductEdit /></ProtectedRoute>
                    } />
                    <Route path="/admin/categories" element={
                        <ProtectedRoute requireAdmin><CategoryList /></ProtectedRoute>
                    } />
                    <Route path="/admin/brands" element={
                        <ProtectedRoute requireAdmin><BrandList /></ProtectedRoute>
                    } />
                    <Route path="/admin/brands/new" element={
                        <ProtectedRoute requireAdmin><BrandEdit /></ProtectedRoute>
                    } />
                    <Route path="/admin/brands/:id/edit" element={
                        <ProtectedRoute requireAdmin><BrandEdit /></ProtectedRoute>
                    } />
                    <Route path="/admin/analytics" element={
                        <ProtectedRoute requireAdmin><Analytics /></ProtectedRoute>
                    } />
                    <Route path="/admin/admins" element={
                        <ProtectedRoute requireAdmin><AdminManagement /></ProtectedRoute>
                    } />
                    <Route path="/admin/enquiries" element={
                        <ProtectedRoute requireAdmin><AdminEnquiries /></ProtectedRoute>
                    } />
                    <Route path="/admin/banners" element={
                        <ProtectedRoute requireAdmin><AdminBanners /></ProtectedRoute>
                    } />
                    <Route path="/admin/announcement" element={<ProtectedRoute requireAdmin><AdminAnnouncement /></ProtectedRoute>} />

                    {/* Catch-all 404 Route */}
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </HelmetProvider>
    );
}

export default App;
