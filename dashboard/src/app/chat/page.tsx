"use client";

import Image from 'next/image'
import { ChatBox } from '@/components/ChatBox';

export default function Home() {



  return (
    <main className="relative flex min-h-screen h-screen flex-col w-full items-center overflow-x-hidden">

      <section className="w-full bg-accent-10">
        {/* this div will always be a square */}
        <div className="relative w-full h-[232px] overflow-hidden">
          {/* 2) the mascot image fills the square */}
          <div className="absolute top-[20px] right-[-290px] w-full"> 
            <Image
              src="/landing-mascot.png"
              alt="Teamagotchi"
              width={238}
              height={336}
              className="
                block 
                h-auto               /* maintain aspect ratio */
                rotate-[-20deg]       /* rotate 10° */
                origin-bottom-left   /* rotate around bottom-left corner */
              "
            />
          </div>

          {/* 3) any overlay text, bottom-aligned */}
          <div className="absolute bottom-0 right-35 pointer-events-none text-center mx-8 my-8">
            <span className="text-accent-30 jersey25 text-9xl/1 font-normal leading-[70%] block">
              tee
            </span>
            <span className="text-accent-30 text-4xl/1 font-normal leading-[100%] block">
              iExec
            </span>
          </div>
        </div>
      </section>

      <section className="w-full max-w-md h-full max-h-[600px]">
        <ChatBox />
      </section>

    </main>
  );
}
