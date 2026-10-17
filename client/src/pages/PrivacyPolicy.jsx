import { Helmet } from 'react-helmet-async';
import { Shield } from 'lucide-react';

import PageBanner from '../components/PageBanner';
const PrivacyPolicy = () => {
    return (
        <div className="bg-white min-h-screen text-[#111111]">
            <Helmet>
                <title>Privacy Policy | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="Privacy Policy and data protection guidelines for Jaza Trading W.L.L customers and website visitors." />
            </Helmet>
            <PageBanner page="policies" title="Privacy Policy" />
            <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 sm:p-14 border border-neutral-200 space-y-8 text-neutral-800">
<div className="space-y-6 text-xs sm:text-sm font-medium leading-relaxed text-neutral-600">
                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-neutral-900">1. Information We Collect</h2>
                        <p>
                            Jaza Trading W.L.L respects your privacy. When you place a Request for Quote (RFQ), submit an inquiry, or interact with our site, we may collect your name, company name, email address, phone number, and delivery details in Qatar.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-neutral-900">2. How We Use Your Information</h2>
                        <p>
                            We use the collected information solely to process product inquiries, issue quotation documents, arrange equipment deliveries, and respond to your customer service communications.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-neutral-900">3. Data Protection & Sharing</h2>
                        <p>
                            We do not sell, rent, or trade your personal or business data to third parties. Data is stored securely and shared only with logistics handlers or regulatory authorities when necessary to fulfill orders in Qatar.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-neutral-900">4. Cookies & Analytics</h2>
                        <p>
                            Our website uses standard cookies to maintain user session data and analyze website traffic to improve user experience. You can disable cookies in your browser settings if preferred.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-base font-bold text-neutral-900">5. Contact Information</h2>
                        <p>
                            If you have questions regarding this Privacy Policy, please contact us at <a href="mailto:jazatrading@gmail.com" className="text-neutral-900 underline">jazatrading@gmail.com</a> or visit our office at Al Kassarat Street, Industrial Area, Street 5, Qatar.
                        </p>
                    </section>
                </div>
            </div>
        </div>
        </div>
    );
};

export default PrivacyPolicy;
