"use client";

import Image from 'next/image'
import TopBar from "@/components/TopBar";
import EmotionBars from "@/components/EmotionBars";
import { CarouselThumbnails } from '@/components/CarouselThumbnails'
import { Barometer } from '@/components/Barometer'
import { InfoCardCarousel } from '@/components/InfoCardCarousel'
import { BigAssButton } from '@/components/BigAssButton'

export default function Home() {
  const thumbnails = [
    { src: '/thumbnails/1.png', alt: 'Tech team', bgcolor: 'bg-pink' },
    { src: '/thumbnails/2.png', alt: 'Adoption team', bgcolor: 'bg-brand-20' },
    { src: '/thumbnails/3.png', alt: 'Corporate team', bgcolor: 'bg-accent-50' },
    { src: '/thumbnails/4.png', alt: 'Ecosystem team', bgcolor: 'bg-green-30' },
  ]

  const cards = [
    {
      title: 'Joie',
      headerBg: 'bg-accent-50',
      content: (
        <p>Besoin d’un boost d’énergie positive? Découvrez comment cultiver la bonne humeur au travail 😊</p>
      ),
    },
    {
      title: 'Procrastination',
      headerBg: 'bg-brand-20',
      content: (
        <p>Besoin d’un boost d’énergie positive ? Découvre comment cultiver la bonne humeur au travail 🌞</p>
      ),
    },
    {
      title: 'Gestion du stress',
      headerBg: 'bg-pink',
      content: (
        <p>Besoin d’un boost d’énergie positive ? Découvre comment cultiver la bonne humeur au travail 🌞</p>
      ),
    },
  ]


  return (
    <main className="relative flex min-h-screen flex-col w-full items-center overflow-x-hidden">

      <section className="w-full bg-accent-10">  
        {/* this div will always be a square */}
        <div className="relative w-full aspect-square overflow-hidden">
          <div className="p-2">
            <TopBar className="absolute top-0 left-0 w-full" />
          </div>

          {/* 2) the mascot image fills the square */}
          <div className="absolute bottom-[-90px] left-[-180px] w-[400px]"> 
            <Image
              src="/landing-mascot.png"
              alt="Teamagotchi"
              width={1192}
              height={1684}
              className="
                block 
                w-full               /* fill the 300px container */
                h-auto               /* maintain aspect ratio */
                rotate-[20deg]       /* rotate 10° */
                origin-bottom-left   /* rotate around bottom-left corner */
              "
            />
          </div>

          {/* 3) any overlay text, bottom-aligned */}
          <div className="absolute bottom-0 right-0 pointer-events-none text-center mx-8 my-8">
            <span className="text-accent-30 jersey25 text-9xl/1 font-normal leading-[70%] block">
              tee
            </span>
            <span className="text-accent-30 text-4xl/1 font-normal leading-[100%] block">
              iExec
            </span>
          </div>
        </div>
      </section>

      <section className="w-full py-5 text-center bg-white">
        <div className="mx-auto w-3/5">
          <span className="text-brand-3 jersey25 text-xl">
            “Si j’avais des bras, je te ferais un high five numérique !”
          </span>
        </div>
      </section>

      <section className="w-full py-4 bg-accent">
        <div className="mx-auto px-8 pb-4">
          <span className="text-brand-3 text-xl font-semibold">Baromètre</span><br />
        </div>

        <Barometer />
      </section>

      <section className="w-full py-4 bg-accent flex justify-center items-center">
        <BigAssButton label="Dis tee ?" href="/chat" className="" />
      </section>

      <section className="w-full pb-5">
        <div className="mx-auto px-8 py-4">
          <span className="text-brand-3 text-xl font-semibold">Teamagotchi</span><br />
          <span className="text-brand-3 text-xl">comment vont vos équipes ?</span>
        </div>

        <CarouselThumbnails images={thumbnails} />
      </section>

      <section className="w-full py-4 pb-5">
        <div className="mx-auto px-8 pb-4">
          <span className="text-brand-3 text-xl font-semibold">Mood-lectures du jour</span><br />
        </div>

        <InfoCardCarousel cards={cards} /> 

      </section>

    </main>
  );
}
