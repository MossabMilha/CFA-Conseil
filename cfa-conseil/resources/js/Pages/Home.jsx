import React from 'react';
import { Head } from '@inertiajs/react';
import Nav from '@/Components/Nav';
import ServiceCard from '@/Components/ServiceCard';

export default function Home() {
    return (
        <div className="relative">
            <Nav />
            <main>
                <section className='min-h-screen from-[#92afc9] from-0% via-[#6886ab] via-50% to-[#6886ab] bg-gradient-to-br'>
                    <div className='relative px-8 flex items-center h-screen '>
                        <h1 className='text-8xl text-white font-bold'>
                            Votre partenaire
                            <br/>de confiance en
                            <br/> <i>finance</i>,
                            <br/> <i>conformité</i>
                            <br/>et <i>croissance</i>.
                        </h1>
                    </div>
                </section>

                <section className='relative py-16'>
                    <div className='absolute left-0 top-0 -z-10 grid grid-cols-3 '>
                        <div className='bg-[#252550] w-16 h-16 rounded-full rounded-tl-none'></div>
                        <div className='bg-[#252550] w-16 h-16'><div className='bg-white w-16 h-16 rounded-full rounded-br-none'></div></div>
                        <div className='bg-[#6886ab] w-16 h-16 rounded-full rounded-bl-none'></div>
                        <div className='bg-[#6886ab] w-16 h-16 rounded-full rounded-tr-none'></div>
                        <div className='bg-[#6886ab] w-16 h-16'><div className='bg-white w-16 h-16 rounded-full rounded-tl-none'></div></div>
                        <div></div>
                        <div className='bg-[#252550] w-16 h-16 rounded-full rounded-br-none'></div>
                    </div>
                    <div className='absolute right-0 top-0 -z-10 grid grid-cols-3 '>
                        <div className='bg-[#252550] w-16 h-16 rounded-full rounded-tl-none'></div>
                        <div className='bg-[#252550] w-16 h-16'><div className='bg-white w-16 h-16 rounded-full rounded-br-none'></div></div>
                        <div className='bg-[#6886ab] w-16 h-16 rounded-full rounded-bl-none'></div>
                        <div className='bg-[#6886ab] w-16 h-16 rounded-full rounded-tr-none'></div>
                        <div className='bg-[#6886ab] w-16 h-16'><div className='bg-white w-16 h-16 rounded-full rounded-tl-none'></div></div>
                        <div></div>
                        <div className='bg-[#252550] w-16 h-16 rounded-full rounded-br-none'></div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h2 className='text-5xl font-bold text-[#252550] mb-4'>Qui sommes-nous ?</h2>
                        <p className='text-[#252550] text-lg max-w-5xl text-justify'>
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

                <section className='py-16 bg-[#92afc9]'>
                    <div className='flex items-center justify-center gap-8 px-16 mx-auto'>
                        <div className='flex flex-col border-l-8 border-[#6392b6] pl-8'>
                            <h3 className='text-2xl font-bold text-[#252550] mb-4'>Plus Rapide</h3>
                            <h2 className='text-8xl font-bold text-[#252550]'>100%</h2>
                        </div>
                        <div className='flex flex-col border-l-8 border-[#6392b6] pl-8'>
                            <h3 className='text-2xl font-bold text-[#252550] mb-4'>Expérience</h3>
                            <h2 className='text-8xl font-bold text-[#252550]'>30ans</h2>
                        </div>
                        <div className='flex flex-col border-l-8 border-[#6392b6] pl-8'>
                            <h3 className='text-2xl font-bold text-[#252550] mb-4'>Consultants</h3>
                            <h2 className='text-8xl font-bold text-[#252550]'>10k+</h2>
                        </div>
                        <div className='flex flex-col border-l-8 border-[#6392b6] pl-8'>
                            <h3 className='text-2xl font-bold text-[#252550] mb-4'>Personnes aimées</h3>
                            <h2 className='text-8xl font-bold text-[#252550]'>1.7k+</h2>
                        </div>
                    </div>
                </section>

                <section className='bg-[#eaeaea] py-16'>
                    <div className='container mx-auto px-4'>
                        <div className='flex flex-col items-center text-center mb-12'>
                            <h2 className='text-5xl font-bold text-[#252550] mb-4'>Nos Services</h2>
                            <h3 className='text-2xl font-bold text-[#252550] mb-8 max-w-2xl'>
                                Découvrez tous les services dont votre entreprise a besoin
                            </h3>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4'>
                            <ServiceCard 
                                title="Missions Comptables"
                                description="Nous assurons la tenue et le suivi complet de votre comptabilité, avec des états financiers fiables et conformes aux normes en vigueur."
                                bgColor="#d7d7d7"
                            />
                            <ServiceCard 
                                title="Missions de conseil-gestion"
                                description="Un conseil stratégique et opérationnel pour optimiser la performance de votre entreprise et renforcer vos outils de pilotage."
                                bgColor="#92aec8"
                            />
                            <ServiceCard 
                                title="Missions d'audit"
                                description="Nous réalisons des audits financiers et organisationnels approfondis afin d'identifier les risques et garantir la fiabilité de vos données."
                                bgColor="#252550"
                            />
                            <ServiceCard 
                                title="Missions sociales et RH"
                                description="Un accompagnement personnalisé dans la gestion de vos ressources humaines : contrats, paie, déclarations sociales et obligations légales."
                                bgColor="#92aec8"
                            />
                            <ServiceCard 
                                title="Missions juridiques"
                                description="Nous vous accompagnons dans vos démarches juridiques : création d'entreprise, rédaction de statuts, assemblées générales et formalités."
                                bgColor="#252550"
                            />
                            <ServiceCard 
                                title="Missions fiscales"
                                description="Un suivi rigoureux de vos obligations fiscales et l'optimisation de votre fiscalité pour sécuriser et alléger vos charges."
                                bgColor="#d7d7d7"
                            />
                            <ServiceCard 
                                title="Mise en place S.M.G"
                                description="Nous vous guidons dans la mise en place et le suivi d'un Systéme de Management de la Qualité, adapté a vos objectifs et exigences."
                                bgColor="#252550"
                            />
                            <ServiceCard 
                                title="Formation"
                                description="Des programmes de formation ciblés et pratiques, destinés a renforcer les compétences de vos équipes dans leurs domaines d'expertise."
                                bgColor="#d7d7d7"
                            />
                            <ServiceCard 
                                title="Gestion des projets"
                                description="Nous vous assistons dans la planification, le suivi et la réussite de vos projets, en assurant qualité, respect des délais et efficacité."
                                bgColor="#92aec8"
                            />
                        </div>
                    </div>
                </section>

                <section className='py-16'>
                    <div className='container mx-auto px-4'>
                        <div className='flex flex-col items-center text-center mb-12'>
                            <h2 className='text-5xl font-bold text-[#252550] mb-4'>Pourquoi Nous Choisir</h2>
                            <p className='text-[#252550] text-lg max-w-5xl text-justify'>
                            Choisir CFA, c'est choisir I'expertise dans toute sans ampleur grace ses multiples interventions et confrontations aux différentes
                            situations dans des secteurs d'activité différents, CFA Conseil a bénéficié de la capitalisation d'une forte expérience et d'une
                            compétence organisationnelle et technique qui le distingue comme un cabinet comptable marocain a forte valeur ajoutée.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}