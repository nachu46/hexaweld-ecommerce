import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    if (isAdminRoute) {
        return (
            <div className="min-h-screen bg-[#F5F5F5] text-[#111111] font-sans">
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3500,
                        style: {
                            background: '#111111',
                            color: '#FFFFFF',
                            borderRadius: '4px',
                            fontSize: '13px',
                            fontWeight: '600',
                            border: '1px solid #3F3F3F',
                            
                        },
                        success: {
                            iconTheme: {
                                primary: '#111111',
                                secondary: '#FFFFFF',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#EF4444',
                                secondary: '#FFFFFF',
                            },
                        },
                    }}
                />
                {children}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col relative overflow-hidden font-sans">
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3500,
                    style: {
                        background: '#111111',
                        color: '#FFFFFF',
                        borderRadius: '4px',
                        fontSize: '13px',
                        fontWeight: '600',
                        border: '1px solid #3F3F3F',
                        
                    },
                    success: {
                        iconTheme: {
                            primary: '#111111',
                            secondary: '#FFFFFF',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#EF4444',
                            secondary: '#FFFFFF',
                        },
                    },
                }}
            />
            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
            <WhatsAppFloat />
        </div>
    );
};

export default Layout;
