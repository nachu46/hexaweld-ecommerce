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
            <div className="min-h-screen bg-[#F6F4EE] text-[#1C1B17] font-sans">
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3500,
                        style: {
                            background: '#1C1B17',
                            color: '#FFFFFF',
                            borderRadius: '12px',
                            fontSize: '13px',
                            fontWeight: '600',
                            border: '1px solid #2E4046',
                            boxShadow: '0 10px 25px rgba(28, 27, 23, 0.25)',
                        },
                        success: {
                            iconTheme: {
                                primary: '#B15E2B',
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
        <div className="min-h-screen bg-[#F6F4EE] flex flex-col relative overflow-hidden font-sans">
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3500,
                    style: {
                        background: '#1C1B17',
                        color: '#FFFFFF',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: '600',
                        border: '1px solid #2E4046',
                        boxShadow: '0 10px 25px rgba(28, 27, 23, 0.25)',
                    },
                    success: {
                        iconTheme: {
                            primary: '#B15E2B',
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
