import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {CheckCircle} from 'lucide-react';
import * as LucideIcons from 'lucide-react';


const Service = ({ service }) => {
    // Service data - in a real app, this would come from your backend
    const serviceData = {
        title: service?.title || "Missions Comptables",
        description: service?.description || "Nous assurons la tenue et le suivi complet de votre comptabilité, avec des états financiers fiables et conformes aux normes en vigueur.",
        image: service?.image || "/images/accounting-service.jpg",
        longDescription: service?.longDescription,
        features: service?.features || [],
        benefits: service?.benefits || []
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title={serviceData.title} />

            {/* Hero Section */}
            <div className="relative h-96 w-full">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage: `url(${serviceData.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute inset-0 bg-[#252550] opacity-70"></div>
                </div>
                <div className="relative z-10 h-full flex items-center">
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{serviceData.title}</h1>
                        <p className="text-xl text-gray-200 max-w-2xl">{serviceData.description}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-[#252550] mb-6">À propos de ce service</h2>
                            <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                                {serviceData.longDescription}
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-[#252550] mb-6">Nos engagements</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {serviceData.benefits.map((benefit, index) => {
                                const IconComponent = LucideIcons[benefit.icon] || LucideIcons.HelpCircle;
                                return (
                                    <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                <IconComponent/>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-[#252550] mb-2">{benefit.title}</h3>
                                                <p className="text-gray-600">{benefit.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )})}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="bg-gray-50 p-6 rounded-lg top-8">
                            <h3 className="text-xl font-bold text-[#252550] mb-4">Ce service comprend</h3>
                            <ul className="space-y-3">
                                {serviceData.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-[#252550] mb-4">Vous avez des questions ?</h3>
                                <p className="text-gray-700 mb-4">Notre équipe est à votre disposition pour répondre à toutes vos questions.</p>
                                <Link
                                    href="/contact"
                                    className="inline-block bg-[#252550] text-white px-6 py-3 rounded-md font-medium hover:bg-[#1a1a3d] transition-colors"
                                >
                                    Nous contacter
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-[#6886ab] text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">Prêt à optimiser votre comptabilité ?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment nous pouvons vous aider à atteindre vos objectifs financiers.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/contact"
                            className="bg-white text-[#252550] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                        >
                            Demander un devis
                        </Link>
                        <a
                            href="tel:+212522210393"
                            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-[#252550] transition-colors"
                        >
                            Appelez-nous
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

Service.layout = page => <AppLayout children={page} />;

export default Service;
