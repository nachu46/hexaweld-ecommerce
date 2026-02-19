import Header from './Header';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

const Layout = ({ children }) => (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <Header />
        <main className="flex-1">
            {children}
        </main>
        <Footer />
        <WhatsAppFloat />
    </div>
);

export default Layout;
