import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

import PageBanner from '../components/PageBanner';
const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            category: 'Quotation & Ordering',
            question: 'How do I place an inquiry or request a bulk quotation?',
            answer: 'You can submit an inquiry directly through any product page by clicking "Enquire on WhatsApp" or filling out our Request for Quote form on the Contact page. Our sales engineers respond within 1 to 2 business hours with formal pricing, availability, and delivery schedules.',
        },
        {
            category: 'Delivery & Shipping',
            question: 'What are your delivery locations and lead times across Qatar?',
            answer: 'We provide daily deliveries to Industrial Area, Ras Laffan, Mesaieed, Lusail, Doha, and major construction sites across Qatar. Standard stock items are delivered within 24 hours. Specialized machinery orders are scheduled based on customer site requirements.',
        },
        {
            category: 'Brands & Authenticity',
            question: 'Are all your products genuine and covered by warranty?',
            answer: 'Yes. Jaza Trading W.L.L is an authorized distributor and importer of certified brands including TORK®, EUREX®, NEXT®, MARK SAFETY PRO®, CLEXO®, EDON®, and TENZO®. All equipment includes original manufacturer warranties and test certificates upon request.',
        },
        {
            category: 'Payment Methods',
            question: 'What payment options do you accept for B2B orders?',
            answer: 'We accept Bank Transfers (EFT), Company Cheques, Credit/Debit Cards, and Cash on Delivery (COD) for verified corporate accounts. Corporate credit facilities are available for qualified long-term contracting clients.',
        },
        {
            category: 'Services & Support',
            question: 'Do you offer machine repair, calibration, or spare parts?',
            answer: 'Yes! We operate a fully equipped service workshop in Street 5, Industrial Area, Qatar. We provide diagnostic repairs, routine maintenance, calibration certificates, and genuine replacement spare parts for welding machines and power tools.',
        },
    ];

    return (
        <div className="bg-white min-h-screen text-[#111111]">
            <Helmet>
                <title>Frequently Asked Questions (FAQ) | Jaza Trading W.L.L</title>
                <meta name="description" content="Find answers to common questions about ordering, delivery times in Qatar, product warranties, payment methods, and technical support." />
            </Helmet>
            <PageBanner page="faq" title="Frequently Asked Questions" subtitle="Answers about quotations, delivery across Qatar, payment and warranties." />
            <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-10">
{/* FAQ Accordion List */}
                <div className="space-y-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={idx}
                                className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden transition-all"
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-[#111111] hover:text-[#111111] transition-colors"
                                >
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-bold text-[#111111]">
                                            {faq.category}
                                        </span>
                                        <span className="text-base sm:text-lg">{faq.question}</span>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 text-neutral-400 transition-transform duration-300 shrink-0 ${
                                            isOpen ? 'rotate-180 text-[#111111]' : ''
                                        }`}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="px-6 pb-6 text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed border-t border-[#F5F5F5] pt-4">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Contact Help CTA */}
                <div className="bg-white rounded-xl p-8 border border-[#E5E5E5] text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                    <div className="text-left">
                        <h3 className="text-lg font-bold text-[#111111] mb-1">Still have a specific question?</h3>
                        <p className="text-xs text-neutral-600 font-medium">Our sales team is ready to assist your procurement needs in Qatar.</p>
                    </div>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#333333] text-white px-6 py-3 rounded font-bold text-xs shrink-0 transition-colors"
                    >
                        <PhoneCall className="w-4 h-4" />
                        Contact Support Team
                    </Link>
                </div>
            </div>
        </div>
        </div>
    );
};

export default FAQ;
