import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
)

// Fade out the opening screen from index.html once the app is on screen
// (kept up for at least a moment so the logo animation doesn't just flash)
const splash = document.getElementById('splash');
if (splash) {
    const started = performance.now();
    requestAnimationFrame(() => {
        const wait = Math.max(0, 900 - (performance.now() - started));
        setTimeout(() => {
            splash.classList.add('hide');
            setTimeout(() => splash.remove(), 700);
        }, wait);
    });
}
