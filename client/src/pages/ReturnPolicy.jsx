import { Helmet } from 'react-helmet-async';
import { RotateCcw } from 'lucide-react';

import PageBanner from '../components/PageBanner';
const ReturnPolicy = () => {
    return (
        <div className="bg-white min-h-screen text-[#111111]">
            <Helmet>
                <title>Return & Refund Policy | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="Return terms, exchange guidelines, and warranty claim procedures for Jaza Trading W.L.L customers." />
            </Helmet>
            <PageBanner page="policies" title="Return & Refund Policy" />
            <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 sm:p-14 border border-neutral-200 space-y-8 text-neutral-800">
<div className="space-y-6 text-xs sm:text-sm font-medium leading-relaxed text-neutral-600">
                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-neutral-900">1. Return Eligibility</h2>
                        <p>
                            Items may be returned or exchanged within 7 days of delivery provided they are unused, in original sealed packaging, and accompanied by the original tax invoice.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-neutral-900">2. Damaged or Defective Items</h2>
                        <p>
                            If an item is received with transit damage or a manufacturing defect, notify our support team within 24 hours of delivery. We will arrange free replacement or immediate repair under warranty.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-neutral-900">3. Non-Returnable Items</h2>
                        <p>
                            Custom-cut cables, specially ordered non-standard machinery, and opened consumables (e.g. opened paint cans or unsealed welding electrode packs) cannot be returned unless verified defective.
                        </p>
                    </section>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ReturnPolicy;
