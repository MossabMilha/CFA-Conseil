import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import {Mail, MapPin, Phone} from "lucide-react";

export default function Contact() {

    return (
        <main className="pt-28 pb-16">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-32 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-start font-bold text-[#252550] mb-4">
                        Contactez-nous <br /> dès aujourd'hui
                    </h2>
                    <div>
                        <form action="">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                                <div className="col-span-1 sm:col-span-2 flex flex-col">
                                    <label className="mb-2" htmlFor="name">Nom et Prenom</label>
                                    <input className="p-2 border-0 bg-[#eaeaea] rounded-md" type="text" id="name" name="name" placeholder="Nom et Prenom" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2" htmlFor="email">Email</label>
                                    <input className="p-2 border-0 bg-[#eaeaea] rounded-md" type="email" id="email" name="email" placeholder="Email" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2" htmlFor="phone">Téléphone</label>
                                    <input className="p-2 border-0 bg-[#eaeaea] rounded-md" type="tel" id="phone" name="phone" placeholder="Téléphone" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2" htmlFor="company">Société</label>
                                    <input className="p-2 border-0 bg-[#eaeaea] rounded-md" type="text" id="company" name="company" placeholder="Société" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2" htmlFor="post">Poste</label>
                                    <input className="p-2 border-0 bg-[#eaeaea] rounded-md" type="text" id="post" name="post" placeholder="Poste" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2" htmlFor="country">Pays</label>
                                    <input className="p-2 border-0 bg-[#eaeaea] rounded-md" type="text" id="country" name="country" placeholder="Pays" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2" htmlFor="city">Ville</label>
                                    <input className="p-2 border-0 bg-[#eaeaea] rounded-md" type="text" id="city" name="city" placeholder="Ville" />
                                </div>
                                <div className="col-span-1 sm:col-span-2 flex flex-col">
                                    <label className="mb-2" htmlFor="message">Message</label>
                                    <textarea className="p-2 border-0 bg-[#eaeaea] rounded-md min-h-32" id="message" name="message" placeholder="Message"></textarea>
                                </div>
                            </div>
                            <button className="py-2 px-4 border-0 bg-[#92aec8] rounded-md hover:bg-[#7aa3c0] transition-colors duration-200">
                                Envoyer
                            </button>
                        </form>
                    </div>
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
                                <h3 className="text-[#252550] font-bold">Telephone</h3>
                            </div>
                            <p className="text-sm sm:text-lg">+212 5 22 21 03 93</p>
                            <p className="text-sm sm:text-lg">+212 6 70 05 04 47</p>
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
        </main>

    );
}

Contact.layout = page => <AppLayout children={page} />;
