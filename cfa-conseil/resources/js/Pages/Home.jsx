import React, {useState} from 'react';
import axios from 'axios';
import ServiceCard from '@/Components/ServiceCard';
import IconOne from '@/assets/one.svg?react';
import IconTwo from '@/assets/two.svg?react';
import IconThree from '@/assets/three.svg?react';
import IconFour from '@/assets/four.svg?react';
import { MapPin, Phone, Mail, Rocket, Heart, User2, Star } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Autoplay from "embla-carousel-autoplay"

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/Components/ui/carousel';


export default function Home() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        post: '',
        country: '',
        city: '',
        message: '',
        subject: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ success: null, message: '' });

        try {
            const response = await axios.post('/api/contact-form', formData);
            setSubmitStatus({
                success: true,
                message: 'Votre message a été envoyé avec succès!'
            });
            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                post: '',
                country: '',
                city: '',
                message: '',
                subject: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus({
                success: false,
                message: "Une erreur s'est produite. Veuillez réessayer plus tard."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative">
            <Head title="CFA Conseil - Accueil" />
            <main>
                <section className='relative min-h-screen from-[#92afc9] from-0% via-[#6886ab] via-50% to-[#6886ab] bg-gradient-to-br'>
                    <div className='absolute w-full h-full -z-9'
                    style={{
                        backgroundImage: 'url(/storage/images/asset-pattern.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'left',
                        backgroundRepeat: 'no-repeat',

                    }}/>
                    <div className='relative px-8 flex items-center justify-between h-screen '>
                        <h1 className='2xl:text-8xl xl:text-7xl lg:text-7xl md:text-6xl text-5xl text-white font-bold'>
                            Votre partenaire
                            <br/>de confiance en
                            <br/> <i>finance</i>,
                            <br/> <i>conformité</i>
                            <br/>et <i>croissance</i>.
                        </h1>


                    </div>
                </section>

                <section id='about' className='relative py-16'>
                    <div className='absolute left-0 top-0 -z-10 grid grid-cols-3 '>
                        <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tl-none'></div>
                        <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16'><div className='bg-white w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-br-none'></div></div>
                        <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-bl-none'></div>
                        <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tr-none'></div>
                        <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16'><div className='bg-white w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tl-none'></div></div>
                        <div></div>
                        <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-br-none'></div>
                    </div>
                    <div className='absolute right-0 top-0 -z-10 grid grid-cols-3 '>
                        <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tr-none'></div>
                        <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16'><div className='bg-white w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-bl-none'></div></div>
                        <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tr-none'></div>
                        <div></div>
                        <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-bl-none'></div>
                        <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16'><div className='bg-white w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-bl-none'></div></div>
                        <div></div>
                        <div></div>
                        <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-br-none'></div>
                    </div>
                    <div className='flex flex-col items-center container mx-auto'>
                        <h2 className='md:text-5xl text-3xl font-bold text-[#252550] mb-4'>Qui sommes-nous ?</h2>
                        <p className='text-[#252550] md:text-lg text-md lg:max-w-3xl md:max-w-xl sm:max-w-lg mx-6 sm:mx-0 max-w-md text-justify'>
                        Fondé en 2006 par Monsieur Radouane EL KHALTI, CFA Conseil est un cabinet comptable agréé installé au coeur de Casablanca, capitale
                        économique du Royaume.
                        <br/>
                        Spécialisé en comptabilité, finance, audit et conseil juridique et fiscal, notre cabinet accompagne aussi bien les PME que les grandes entreprises, opérant dans des secteurs variés : industrie, agriculture, agroalimentaire, immobilier, santé, textile, tourisme ou distribution.
                        <br/>
                        Avec une équipe de professionnels hautement qualifiés et expérimentés, CFA Conseil adopte une approche pluridisciplinaire, permettant
                        d'anticiper les défis, d'atteindre les objectifs et d'assurer une croissance durable et structurée.
                        <br/>
                        Pour répondre aux besoins spécifiques de chaque organisation, nous proposons une large gamme de services spécialisés, adaptés aux exigences de chaque secteur d'activité.
                            </p>
                    </div>
                </section>

                <section className='flex py-16 bg-[#92afc9]'>
                    <div className='flex flex-col justify-center sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-8 md:px-16 mx-auto'>
                        <div className='flex flex-col-reverse sm:flex-col border-l-8 border-[#6392b6] pl-4 sm:pl-6'>
                            <h3 className='flex items-center text-2xl md:text-lg lg:text-xl font-bold text-[#252550] sm:mb-4 gap-2 min-w-32'><Rocket size={'1rem'} stroke="#457da8"/><span className='whitespace-nowrap'>Plus Rapide</span></h3>
                            <h2 className='flex items-end text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#252550]'>100<span className='text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl'>%</span></h2>
                        </div>
                        <div className='flex flex-col-reverse sm:flex-col border-l-8 border-[#6392b6] pl-4 sm:pl-6'>
                            <h3 className='flex items-center text-2xl md:text-lg lg:text-xl font-bold text-[#252550] sm:mb-4 gap-2 min-w-32'><Star size={'1rem'} stroke="#457da8"/><span className='whitespace-nowrap'>Expérience</span></h3>
                            <h2 className='flex items-end text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#252550]'>30<span className='text-2xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl'>ans</span></h2>
                        </div>
                        <div className='flex flex-col-reverse sm:flex-col border-l-8 border-[#6392b6] pl-4 sm:pl-6'>
                            <h3 className='flex items-center text-2xl md:text-lg lg:text-xl font-bold text-[#252550] sm:mb-4 gap-2 min-w-32'><User2 size={'1rem'} stroke="#457da8"/><span className='whitespace-nowrap'>Consultants</span></h3>
                            <h2 className='flex items-end text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#252550]'>10<span className='text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl'>k+</span></h2>
                        </div>
                        <div className='flex flex-col-reverse sm:flex-col border-l-8 border-[#6392b6] pl-4 sm:pl-6'>
                            <h3 className='flex items-center text-2xl md:text-lg lg:text-xl font-bold text-[#252550] sm:mb-4 gap-2 min-w-32'><Heart size={'1rem'} stroke="#457da8"/><span className='whitespace-nowrap'>Satisfaits</span></h3>
                            <h2 className='flex items-end text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#252550]'>90<span className='text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl'>%</span></h2>
                        </div>
                    </div>
                </section>

                <section id='services' className='bg-[#eaeaea] py-16'>
                    <div className='container mx-auto px-4'>
                        <div className='flex flex-col items-center text-center mb-12'>
                            <h2 className='text-5xl font-bold text-[#252550] mb-4'>Nos Services</h2>
                            <h3 className='text-2xl text-[#252550] mb-8 max-w-2xl'>
                                Découvrez tous les services dont votre entreprise a besoin
                            </h3>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4'>
                            <ServiceCard
                                imageUrl='storage/images/services/business-man-financial-inspector-secretary-making-report-calculating-checking-balance-internal-revenue-service-inspector-checking-document-audit-concept.webp'
                                title="Missions Comptables"
                                description="Nous assurons la tenue et le suivi complet de votre comptabilité, avec des états financiers fiables et conformes aux normes en vigueur."
                                bgColor="#d7d7d7"
                                buttonLink={`/services/missions-comptables`}
                            />
                            <ServiceCard
                                imageUrl='storage/images/services/business-team-discussing-their-ideas-office.webp'
                                title="Missions de conseil-gestion"
                                description="Un conseil stratégique et opérationnel pour optimiser la performance de votre entreprise et renforcer vos outils de pilotage."
                                bgColor="#92aec8"
                                buttonLink={`/services/conseil-gestion`}
                            />
                            <ServiceCard
                                imageUrl='storage/images/services/working-process-startup-businessman-working-wood-table-with-new-finance-project-modern-notebook-table-pen-holding-hand.webp'
                                title="Missions d'audit"
                                description="Nous réalisons des audits financiers et organisationnels approfondis afin d'identifier les risques et garantir la fiabilité de vos données."
                                bgColor="#252550"
                                buttonLink={`/services/audit`}
                            />
                            <ServiceCard
                                imageUrl='storage/images/services/female-applicant-interviewed-by-hr-mangers.webp'
                                title="Missions sociales et RH"
                                description="Un accompagnement personnalisé dans la gestion de vos ressources humaines : contrats, paie, déclarations sociales et obligations légales."
                                bgColor="#92aec8"
                                buttonLink={`/services/sociales-rh`}
                            />
                            <ServiceCard
                                imageUrl='storage/images/services/closeup-gavel-judgement-concept.webp'
                                title="Missions juridiques"
                                description="Nous vous accompagnons dans vos démarches juridiques : création d'entreprise, rédaction de statuts, assemblées générales et formalités."
                                bgColor="#252550"
                                buttonLink={`/services/juridiques`}
                            />
                            <ServiceCard
                                imageUrl='storage/images/services/mid-section-anonymous-male-accountant-calculating-financial-data.webp'
                                title="Missions fiscales"
                                description="Un suivi rigoureux de vos obligations fiscales et l'optimisation de votre fiscalité pour sécuriser et alléger vos charges."
                                bgColor="#d7d7d7"
                                buttonLink={`/services/fiscales`}
                            />
                            <ServiceCard
                                imageUrl='storage/images/services/reading-business-report.webp'
                                title="Mise en place S.M.Q"
                                description="Nous vous guidons dans la mise en place et le suivi d'un Systéme de Management de la Qualité, adapté a vos objectifs et exigences."
                                bgColor="#252550"
                                buttonLink={`/services/smq`}
                            />
                            <ServiceCard
                                imageUrl='storage/images/services/team-businessmen-listening-business-lecture-briefing.webp'
                                title="Formation"
                                description="Des programmes de formation ciblés et pratiques, destinés a renforcer les compétences de vos équipes dans leurs domaines d'expertise."
                                bgColor="#d7d7d7"
                                buttonLink={`/services/formation`}
                            />
                            <ServiceCard
                                imageUrl='storage/images/services/business-people-are-brainstorming.webp'
                                title="Gestion des projets"
                                description="Nous vous assistons dans la planification, le suivi et la réussite de vos projets, en assurant qualité, respect des délais et efficacité."
                                bgColor="#92aec8"
                                buttonLink={`/services/gestion-projets`}
                            />
                        </div>
                    </div>
                </section>

                <section id='why-choose-us' className='py-16'>
                    <div className='container mx-auto px-4'>
                        <div className='flex flex-col items-center text-center mb-12'>
                            <h2 className='text-4xl md:text-5xl font-bold text-[#252550] mb-4'>Pourquoi Nous Choisissez</h2>
                            <p className='text-[#252550] text-md md:text-lg max-w-5xl text-justify'>
                            Choisir CFA, c'est choisir I'expertise dans toute sans ampleur grace ses multiples interventions et confrontations aux différentes
                            situations dans des secteurs d'activité différents, CFA Conseil a bénéficié de la capitalisation d'une forte expérience et d'une
                            compétence organisationnelle et technique qui le distingue comme un cabinet comptable marocain a forte valeur ajoutée.
                            </p>
                        </div>
                        <div className='flex justify-center mb-12'>
                            <div className='flex items-end font-bold text-center text-[#252550] w-24 font-jetbrains mr-6'>
                                <IconOne height={100} width={100} style={{ "--number-color": "#252550" }} />
                            </div>
                            <div className='text-[#252550] text-lg max-w-5xl text-justify bg-[#92aec8] p-4'>
                                <h3 className='font-bold text-2xl sm:text-3xl mb-2 text-left'>Une équipe compétente et hautement qualifiée</h3>
                                <p className='text-left'>Formée dans les grandes écoles et universités nationales et internationales, notre équipe bénéficie en permanence de formations continues adaptées au domaine de compétence de chacun de ses membres. </p>
                            </div>
                        </div>
                        <div className='flex flex-row-reverse justify-center mb-12'>
                            <div className='flex items-end font-bold text-center text-[#252550] w-24 font-jetbrains ml-6'>
                                <IconTwo height={100} width={100} style={{ "--number-color": "#92aec8" }} />
                            </div>
                            <div className='text-[#252550] text-lg max-w-5xl text-justify bg-[#d7d7d7] p-4'>
                                <h3 className='font-bold text-2xl sm:text-3xl mb-2 text-left'>Des outils modernes et performants</h3>
                                <p className='text-left'>Nous mettons a la disposition de nos clients des solutions informatiques et techniques avancées, conçues pour suivre chaque évolution et garantir un accompagnement efficace face aux changements futurs.</p>
                            </div>
                        </div>
                        <div className='flex justify-center mb-12'>
                            <div className='flex items-end font-bold text-center text-[#252550] w-24 font-jetbrains mr-6'>
                                <IconThree height={100} width={100} style={{ "--number-color": "#d7d7d7" }} />
                            </div>
                            <div className='text-[#d7d7d7] text-lg max-w-5xl text-justify bg-[#252550] p-4'>
                                <h3 className='font-bold text-2xl sm:text-3xl mb-2 text-left'>Une expertise solide et diversifiée</h3>
                                <p className='text-left'>Avec plusieurs années d'expérience en audit et en comptabilité dans des secteurs variés, nous offrons une vision claire et à long terme, capable d'anticiper les risques et de prévenir les dysfonctionnements. </p>
                            </div>
                        </div>
                        <div className='flex flex-row-reverse justify-center mb-12'>
                            <div className='flex items-end font-bold text-center text-[#252550] w-24 font-jetbrains ml-6'>
                                <IconFour height={100} width={100} style={{ "--number-color": "#252550" }} />
                            </div>
                            <div className='text-[#252550] text-lg max-w-5xl text-justify bg-[#92aec8] p-4'>
                                <h3 className='font-bold text-2xl sm:text-3xl mb-2 text-left'>Un réseau professionnel de confiance</h3>
                                <p className='text-left'>Grace a nos liens étroits avec des acteurs majeurs du secteur financier et de grandes entreprises marocaines, nous assurons à nos clients un appui stratégique et un accompagnement de haute valeur. </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='flex justify-center py-8 bg-[#eaeaea]'>
                    <div className='flex mx-auto px-4 gap-4 md:gap-16'>
                        <div className='flex justify-center items-center'>
                            <div className='grid grid-cols-2'>
                                <div className='bg-[#92aec8] w-6 h-6 sm:w-8 sm:h-8 rounded-full rounded-tl-none'></div>
                                <div className='bg-[#92aec8] w-6 h-6 sm:w-8 sm:h-8 rounded-full rounded-tr-none'></div>
                                <div className='bg-[#92aec8] w-6 h-6 sm:w-8 sm:h-8 rounded-full rounded-tl-none'></div>
                                <div className='bg-[#92aec8] w-6 h-6 sm:w-8 sm:h-8 rounded-full rounded-tr-none'></div>
                                <div className='bg-[#92aec8] w-6 h-6 sm:w-8 sm:h-8 rounded-full rounded-bl-none'></div>
                                <div className='bg-[#92aec8] w-6 h-6 sm:w-8 sm:h-8 rounded-full rounded-br-none'></div>

                            </div>
                        </div>

                        <div className='flex flex-col justify-center items-center p-4'>
                            <h2 className='text-3xl sm:text-5xl text-center font-bold text-[#252550] mb-4'>Nos References</h2>
                            <Carousel
                                className="max-w-xs md:max-w-md lg:max-w-3xl"
                                 opts={{
                                    loop: true,
                                    align: "start",
                                }}
                                plugins={[
                                    Autoplay({
                                        delay: 3000
                                    })
                                ]}
                            >
                                <CarouselContent>
                                    <CarouselItem className="flex items-center justify-center h-24 p-4 md:basis-1/2 lg:basis-1/3">
                                        <img
                                            src="storage/images/logos/dimaPlast.webp"
                                            alt="DimaPlast"
                                            className="h-14 w-auto object-contain select-none"
                                        />
                                    </CarouselItem>
                                    <CarouselItem className="flex items-center justify-center h-24 p-4 md:basis-1/2 lg:basis-1/3">
                                        <img
                                            src="storage/images/logos/villa-des-Lilas.webp"
                                            alt="Villa des Lilas"
                                            className="h-16 w-auto object-contain select-none"
                                        />
                                    </CarouselItem>
                                    <CarouselItem className="flex items-center justify-center h-24 p-4 md:basis-1/2 lg:basis-1/3">
                                        <img
                                            src="storage/images/logos/first4com.webp"
                                            alt="First4com"
                                            className="h-12 w-auto object-contain select-none"
                                        />
                                    </CarouselItem>
                                    <CarouselItem className="flex items-center justify-center h-24 p-4 md:basis-1/2 lg:basis-1/3">
                                        <img
                                            src="storage/images/logos/networker.webp"
                                            alt="Networker"
                                            className="h-10 w-auto object-contain select-none"
                                        />
                                    </CarouselItem>
                                </CarouselContent>
                                <CarouselPrevious className="bg-[#92aec8] text-white cursor-pointer translate-x-1/2 h-6 w-6 hidden md:inline-flex" />
                                <CarouselNext className="bg-[#92aec8] text-white cursor-pointer -translate-x-1/2 h-6 w-6 hidden md:inline-flex" />
                            </Carousel>
                        </div>

                        <div className='flex justify-center items-center'>
                            <div className='grid grid-cols-2'>
                                <div className='bg-[#92aec8] w-6 h-6 sm:w-8 sm:h-8 rounded-full rounded-tl-none'></div>
                                <div className='bg-[#92aec8] w-6 h-6 sm:w-8 sm:h-8 rounded-full rounded-tr-none'></div>
                                <div className='bg-[#92aec8] w-6 h-6 sm:w-8 sm:h-8 rounded-full rounded-tl-none'></div>
                                <div className='bg-[#92aec8] w-6 h-6 sm:w-8 sm:h-8 rounded-full rounded-tr-none'></div>
                                <div className='bg-[#92aec8] w-6 h-6 sm:w-8 sm:h-8 rounded-full rounded-bl-none'></div>
                                <div className='bg-[#92aec8] w-6 h-6 sm:w-8 sm:h-8 rounded-full rounded-br-none'></div>

                            </div>
                        </div>
                    </div>
                </section>

                <section id='contact' className='flex justify-center py-8'>
                    <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-32 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-start font-bold text-[#252550] mb-4">
                                Contactez-nous <br /> dès aujourd'hui
                            </h2>
                            <div>
                                <form onSubmit={handleContactSubmit}>
                                    {submitStatus.message && (
                                        <div className={`mb-4 p-3 rounded-md ${
                                            submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            {submitStatus.message}
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                                        <div className="col-span-1 sm:col-span-2 flex flex-col">
                                            <label className="mb-2" htmlFor="name">Nom et Prenom</label>
                                            <input
                                                className="p-2 border-0 bg-[#eaeaea] rounded-md"
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Nom et Prenom"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="mb-2" htmlFor="email">Email</label>
                                            <input
                                                className="p-2 border-0 bg-[#eaeaea] rounded-md"
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="mb-2" htmlFor="phone">Téléphone</label>
                                            <input
                                                className="p-2 border-0 bg-[#eaeaea] rounded-md"
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Téléphone"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="mb-2" htmlFor="company">Société</label>
                                            <input
                                                className="p-2 border-0 bg-[#eaeaea] rounded-md"
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                placeholder="Société"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="mb-2" htmlFor="post">Poste</label>
                                            <input
                                                className="p-2 border-0 bg-[#eaeaea] rounded-md"
                                                type="text"
                                                id="post"
                                                name="post"
                                                value={formData.post}
                                                onChange={handleChange}
                                                placeholder="Poste"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="mb-2" htmlFor="country">Pays</label>
                                            <input
                                                className="p-2 border-0 bg-[#eaeaea] rounded-md"
                                                type="text"
                                                id="country"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                placeholder="Pays"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="mb-2" htmlFor="city">Ville</label>
                                            <input
                                                className="p-2 border-0 bg-[#eaeaea] rounded-md"
                                                type="text"
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                placeholder="Ville"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1 sm:col-span-2 flex flex-col">
                                            <label className="mb-2" htmlFor="subject">Sujet</label>
                                            <input
                                                className="p-2 border-0 bg-[#eaeaea] rounded-md"
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="Sujet"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1 sm:col-span-2 flex flex-col">
                                            <label className="mb-2" htmlFor="message">Message</label>
                                            <textarea
                                                className="p-2 border-0 bg-[#eaeaea] rounded-md min-h-32"
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Message"
                                                required
                                            ></textarea>
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
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="p-3 rounded-md">
                                    <div className="flex items-center gap-2 text-xl sm:text-2xl">
                                        <MapPin size="1em" color="#252550" />
                                        <h3 className="text-[#252550] font-bold">Adresse</h3>
                                    </div>
                                    <p className="text-sm sm:text-base">
                                        HORIZON BUSINESS CENTER, Avenue YAFA N3, AIN CHOK-CASABLANCA
                                    </p>
                                </div>
                                <div className="p-3 rounded-md">
                                    <div className="flex items-center gap-2 text-xl sm:text-2xl">
                                        <Phone />
                                        <h3 className="text-[#252550] font-bold">Telephone</h3>
                                    </div>
                                    <p className="inline mr-2 text-sm sm:text-lg">+212 522210393 / +212 661243146</p>
                                </div>
                                <div className="p-3 rounded-md">
                                    <div className="flex items-center gap-2 text-xl sm:text-2xl">
                                        <Mail />
                                        <h3 className="text-[#252550] font-bold">Email</h3>
                                    </div>
                                    <p className="text-sm sm:text-lg">contact@cfa-conseil.com</p>
                                </div>
                            </div>
                            <div className=" overflow-hidden grow rounded-md h-72">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.1234!2d-7.5898!3d33.5731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7c0d1f!2sCasablanca!5e0!3m2!1sen!2sma!4v1695761234567!5m2!1sen!2sma"
                                    width="600"
                                    height="450"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="CFA Conseil Location"
                                    className="w-full h-full"
                                />
                            </div>

                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}

Home.layout = page => <AppLayout children={page} />;
