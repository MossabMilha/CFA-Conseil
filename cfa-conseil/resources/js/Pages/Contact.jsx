import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Mail, MapPin, Phone } from 'lucide-react';
import axios from 'axios';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        post: '',
        country: '',
        city: '',
        message: '',
        subject: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });

    const requiredFields = ['name', 'email', 'phone', 'city', 'country', 'subject', 'message'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear field error dynamically as user types
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        requiredFields.forEach((field) => {
            if (!formData[field].trim()) {
                newErrors[field] = 'Ce champ est obligatoire.';
            }
        });

        // Basic email format check
        if (formData.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            newErrors.email = 'Veuillez entrer une adresse e-mail valide.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus({ success: null, message: '' });

        // Validate form before sending
        if (!validateForm()) {
            setSubmitStatus({
                success: false,
                message: 'Veuillez remplir tous les champs obligatoires correctement.',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post('/contact-form', formData);
            setSubmitStatus({
                success: true,
                message: 'Votre message a été envoyé avec succès !',
            });
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                post: '',
                country: '',
                city: '',
                message: '',
                subject: '',
            });
            setErrors({});
        } catch (error) {
            console.error('Erreur lors de l’envoi du formulaire :', error);
            setSubmitStatus({
                success: false,
                message: "Une erreur s’est produite. Veuillez réessayer plus tard.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="pt-28 pb-16">
            <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-32 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-start font-bold text-[#252550] mb-4">
                        Contactez-nous <br /> dès aujourd’hui
                    </h2>

                    <form onSubmit={handleContactSubmit}>
                        {submitStatus.message && (
                            <div
                                className={`mb-4 p-3 rounded-md ${
                                    submitStatus.success
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                }`}
                            >
                                {submitStatus.message}
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                            {[
                                { name: 'name', label: 'Nom et prénom', type: 'text', placeholder: 'Nom et prénom' },
                                { name: 'email', label: 'Email', type: 'email', placeholder: 'Email' },
                                { name: 'phone', label: 'Téléphone', type: 'tel', placeholder: 'Téléphone' },
                                { name: 'company', label: 'Société', type: 'text', placeholder: 'Société' },
                                { name: 'post', label: 'Poste', type: 'text', placeholder: 'Poste' },
                                { name: 'country', label: 'Pays', type: 'text', placeholder: 'Pays' },
                                { name: 'city', label: 'Ville', type: 'text', placeholder: 'Ville' },
                                { name: 'subject', label: 'Sujet', type: 'text', placeholder: 'Sujet' },
                            ].map(({ name, label, type, placeholder }) => (
                                <div
                                    key={name}
                                    className={`flex flex-col ${
                                        name === 'name' || name === 'subject' ? 'sm:col-span-2' : ''
                                    }`}
                                >
                                    <label className="mb-2" htmlFor={name}>
                                        {label}
                                    </label>
                                    <input
                                        className={`p-2 border ${
                                            errors[name] ? 'border-red-500' : 'border-transparent'
                                        } bg-[#eaeaea] rounded-md`}
                                        type={type}
                                        id={name}
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        placeholder={placeholder}
                                    />
                                    {errors[name] && (
                                        <span className="text-red-600 text-sm mt-1">{errors[name]}</span>
                                    )}
                                </div>
                            ))}

                            <div className="col-span-1 sm:col-span-2 flex flex-col">
                                <label className="mb-2" htmlFor="message">
                                    Message
                                </label>
                                <textarea
                                    className={`p-2 border ${
                                        errors.message ? 'border-red-500' : 'border-transparent'
                                    } bg-[#eaeaea] rounded-md min-h-32`}
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Message"
                                ></textarea>
                                {errors.message && (
                                    <span className="text-red-600 text-sm mt-1">{errors.message}</span>
                                )}
                            </div>

                            <div className="col-span-1 sm:col-span-2 mt-2">
                                <button
                                    type="submit"
                                    className="py-2 px-6 border-0 bg-[#92aec8] text-white rounded-md hover:bg-[#7aa3c0] transition-colors duration-200 disabled:opacity-50"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-3 rounded-md">
                            <div className="flex items-center gap-2 text-xl sm:text-2xl pb-2">
                                <MapPin size="1em" color="#252550" />
                                <h3 className="text-[#252550] font-bold">Adresse</h3>
                            </div>
                            <p className="text-sm sm:text-base">
                                HORIZON BUSINESS <br /> CENTER, Avenue YAFA N3,<br /> AIN CHOK-CASABLANCA
                            </p>
                        </div>
                        <div className="p-3 rounded-md">
                            <div className="flex items-center gap-2 text-xl sm:text-2xl pb-2">
                                <Phone />
                                <h3 className="text-[#252550] font-bold">Téléphone</h3>
                            </div>
                            <p className="text-sm sm:text-lg">+212 5 22 21 03 93</p>
                            <p className="text-sm sm:text-lg">+212 6 61 24 31 46</p>
                        </div>
                        <div className="p-3 rounded-md">
                            <div className="flex items-center gap-2 text-xl sm:text-2xl pb-2">
                                <Mail />
                                <h3 className="text-[#252550] font-bold">Email</h3>
                            </div>
                            <p className="text-sm sm:text-lg">contact@cfa-conseil.com</p>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border grow h-64 sm:h-80 md:h-96">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.1234!2d-7.5898!3d33.5731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7c0d1f!2sCasablanca!5e0!3m2!1sen!2sma!4v1695761234567!5m2!1sen!2sma"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="CFA Conseil Location"
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

// Add seo to the layout function at the bottom:

Contact.layout = (page) => {
    return (
        <AppLayout
            children={page}
            seo={{
                title: "Contactez-nous",
                description: "Contactez le Cabinet Comptable Agréé CFA pour vos besoins en comptabilité et gestion financière.",
                slug: "contact",
                keywords: "contact comptable, devis comptabilité, conseil financier",
            }}
        />
    );
};
