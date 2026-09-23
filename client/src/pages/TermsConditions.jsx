import { Helmet } from 'react-helmet-async';
import { FileText } from 'lucide-react';

const TermsConditions = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Terms & Conditions | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="Terms and conditions governing commercial sales, quotations, warranties, and website usage for Jaza Trading W.L.L." />
            </Helmet>

            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-md space-y-8 text-slate-800">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
                    <FileText className="w-8 h-8 text-[#0B132B]" />
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-black text-slate-900">Terms & Conditions</h1>
                        <p className="text-xs font-bold text-slate-400">Jaza Trading W.L.L • Division of Sana Group, Qatar</p>
                    </div>
                </div>

                <div className="space-y-6 text-xs sm:text-sm font-medium leading-relaxed text-slate-600">
                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-slate-900">1. Quotations & Pricing</h2>
                        <p>
                            All product prices listed or quoted by Jaza Trading W.L.L are in Qatari Riyals (QAR) unless explicitly stated otherwise. Official formal quotations issued by sales engineers remain valid for 15 calendar days from date of issue.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-slate-900">2. B2B Orders & Payment</h2>
                        <p>
                            Orders are confirmed upon receipt of an authorized Purchase Order (PO) or approved payment agreement. Payment terms (EFT, Cheque, COD, or Credit Account) are defined in the formal quotation contract.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-slate-900">3. Equipment Warranties</h2>
                        <p>
                            Industrial machinery, welding plants, and power tools carry manufacturer warranties as specified on product documentation. Warranty covers manufacturing defects and excludes damage caused by improper voltage connection or operator misuse.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-slate-900">4. Intellectual Property</h2>
                        <p>
                            All brand logos, trademarks (including TORK®, EUREX®, NEXT®, MARK SAFETY PRO®, CLEXO®, EDON®, TENZO®), graphics, and website materials belong to Jaza Trading W.L.L or their respective trademark holders.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsConditions;
