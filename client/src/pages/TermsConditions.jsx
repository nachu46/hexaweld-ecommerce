import { Helmet } from 'react-helmet-async';
import { FileText } from 'lucide-react';

import PageBanner from '../components/PageBanner';
const TermsConditions = () => {
    return (
        <div className="bg-white min-h-screen text-[#111111]">
            <Helmet>
                <title>Terms & Conditions | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="Terms and conditions governing commercial sales, quotations, warranties, and website usage for Jaza Trading W.L.L." />
            </Helmet>
            <PageBanner page="policies" title="Terms & Conditions" />
            <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 sm:p-14 border border-neutral-200 space-y-8 text-neutral-800">
<div className="space-y-6 text-xs sm:text-sm font-medium leading-relaxed text-neutral-600">
                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-neutral-900">1. Quotations & Pricing</h2>
                        <p>
                            All product prices listed or quoted by Jaza Trading W.L.L are in Qatari Riyals (QAR) unless explicitly stated otherwise. Official formal quotations issued by sales engineers remain valid for 15 calendar days from date of issue.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-neutral-900">2. B2B Orders & Payment</h2>
                        <p>
                            Orders are confirmed upon receipt of an authorized Purchase Order (PO) or approved payment agreement. Payment terms (EFT, Cheque, COD, or Credit Account) are defined in the formal quotation contract.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-neutral-900">3. Equipment Warranties</h2>
                        <p>
                            Industrial machinery, welding plants, and power tools carry manufacturer warranties as specified on product documentation. Warranty covers manufacturing defects and excludes damage caused by improper voltage connection or operator misuse.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-neutral-900">4. Intellectual Property</h2>
                        <p>
                            All brand logos, trademarks (including TORK®, EUREX®, NEXT®, MARK SAFETY PRO®, CLEXO®, EDON®, TENZO®), graphics, and website materials belong to Jaza Trading W.L.L or their respective trademark holders.
                        </p>
                    </section>
                </div>
            </div>
        </div>
        </div>
    );
};

export default TermsConditions;
