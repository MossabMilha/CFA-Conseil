import React from 'react';  
import FacebookIcon from '@/assets/icons-facebook.svg?react';
import TwitterIcon from '@/assets/icons-x.svg?react';
import LinkedInIcon from '@/assets/icons-linkedin.svg?react';
import GoogleIcon from '@/assets/icons-google-plus.svg?react';

export default function Footer() { 

return (
  <div className='flex justify-center items-center py-8 bg-[#252550]'>
    <footer className='text-white  py-8'>
      <div className='flex gap-16 mb-8'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-4xl font-bold'>CFA Conseil</h3>
          <p className='text-lg max-w-[300px]'>CFA Conseil, cabinet comptable 
          agréé basé a Casablanca,
          accompagne PME et grandes
          entreprises en comptabilité,
          finance, audit, conseil juridique
          et fiscal. Votre partenaire de
          confiance pour des solutions
          fiables et une croissance
          durable.</p>
        </div>
        <div className='flex flex-col gap-2'>
          <h3 className='text-2xl font-bold'>Short links</h3>
          <ul className='list-inside text-lg'>
            <li><a href='#' rel='noopener noreferrer'>Accueil</a></li>
            <li><a href='#' rel='noopener noreferrer'>Qui sommes-nous</a></li>
            <li><a href='#' rel='noopener noreferrer'>Pourquoi nous choisissez</a></li>
            <li><a href='#' rel='noopener noreferrer'>Notre services</a></li>
                <li><a href='#' rel='noopener noreferrer'>Contact</a></li>
            </ul>
        </div>
        <div className='flex flex-col gap-2'>
          <h3 className='text-2xl font-bold'>Contactez-nous</h3>
          <div className='flex flex-col gap-0.5'>
            <h4 className='text-lg font-bold'>Telephone</h4>
            <div>
              <p className='text-lg'>+212 5 22 21 03 93</p>
              <p className='text-lg'>+212 6 70 05 04 47</p>
            </div>
          </div>
          <div className='flex flex-col gap-0.5'>
            <h4 className='text-lg font-bold'>Email</h4>
            <p className='text-lg'>contact@cfa-conseil.com</p>
          </div>
          <div className='flex flex-col gap-0.5'>
            <h4 className='text-lg font-bold'>Adresse</h4>
            <p className='text-lg'>Horizon Business Center,<br/>
            Avenue Yafa N 3, Ain Chok<br/>
            Casablanca</p>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h3 className='text-2xl font-bold'>Follow us</h3>
          <div className='flex gap-2'>
            <a href="" rel="noopener noreferrer"><FacebookIcon className='w-8 h-8' style={{ '--fill-color': '#fff' }} /></a>
            <a href="" rel="noopener noreferrer"><TwitterIcon className='w-8 h-8' style={{ '--fill-color': '#fff' }} /></a>
            <a href="" rel="noopener noreferrer"><LinkedInIcon className='w-8 h-8' style={{ '--fill-color': '#fff' }} /></a>
            <a href="" rel="noopener noreferrer"><GoogleIcon className='w-8 h-8' style={{ '--fill-color': '#fff' }} /></a>
          </div>
        </div>
        <div className='flex items-end'>
          <div className='grid grid-cols-4'>
            <div className='bg-[#6885ab] w-24 h-24 rounded-full rounded-br-none'></div>
            <div className='bg-[#6885ab] w-24 h-24'><div className='bg-[#252550] w-24 h-24 rounded-full rounded-bl-none'></div></div>
            <div></div>
            <div></div>

            <div></div>
            <div className='bg-[#6885ab] w-24 h-24'><div className='bg-[#252550] w-24 h-24 rounded-full rounded-tl-none'></div></div>
            <div className='bg-[#6885ab] w-24 h-24'><div className='bg-[#252550] w-24 h-24 rounded-full rounded-br-none'></div></div>
            <div className='bg-[#6885ab] w-24 h-24 rounded-full rounded-bl-none'></div>

            <div className='bg-[#6885ab] w-24 h-24'><div className='bg-[#252550] w-24 h-24 rounded-full rounded-br-none'></div></div>
            <div className='bg-[#6885ab] w-24 h-24 rounded-full rounded-bl-none'></div>
            <div className='bg-[#6885ab] w-24 h-24 rounded-full rounded-tr-none'></div>
            <div className='bg-[#6885ab] w-24 h-24'><div className='bg-[#252550] w-24 h-24 rounded-full rounded-tl-none'></div></div>

            <div className='bg-[#6885ab] w-24 h-24 rounded-full rounded-tr-none'></div>
            <div className='bg-[#6885ab] w-24 h-24 rounded-full rounded-tl-none'></div>
            <div></div>
            <div className='bg-[#6885ab] w-24 h-24 rounded-full rounded-tl-none'></div>
          </div>
        </div>
      </div>
      <p>© {new Date().getFullYear()} CFA Conseil. Tous droits réservés.</p>
    </footer>
  </div> 
  )
}