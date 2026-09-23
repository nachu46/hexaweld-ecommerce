import { Helmet } from 'react-helmet-async';
import { Truck } from 'lucide-react';

const ShippingPolicy = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Shipping & Delivery Policy | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="Shipping terms, delivery lead times, and logistical guidelines across Industrial Area, Doha, and Qatar sites." />
            </Helmet>

            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-md space-y-8 text-slate-800">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
                    <Truck className="w-8 h-8 text-[#0B132B]" />
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-black text-slate-900">Shipping & Delivery Policy</h1>
                        <p className="text-xs font-bold text-slate-400">Jaza Trading W.L.L Logistics Operations</p>
                    </div>
                </div>

                <div className="space-y-6 text-xs sm:text-sm font-medium leading-relaxed text-slate-600">
                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-slate-900">1. Delivery Coverage Areas</h2>
                        <p>
                            Jaza Trading W.L.L operates a dedicated delivery fleet servicing all municipalities in Qatar including Doha, Industrial Area, Al Rayyan, Al Wakrah, Ras Laffan, Mesaieed, Lusail, and Dukhan.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-slate-900">2. Delivery Timeframes</h2>
                        <p>
                            • Standard Warehouse Stock: Dispatched within 24 hours of order confirmation.<br />
                            • Specialized / Heavy Machinery: Scheduled delivery within 2 to 3 working days.<br />
                            • Express Emergency Delivery: Available upon request for critical project job sites.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-slate-900">3. Offloading & Site Access</h2>
                        <p>
                            Deliveries are made to ground floor receiving docks or designated site drop points. Customers are responsible for providing clear site access and offloading assistance for heavy bulk cargo unless crane delivery is pre-arranged.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
