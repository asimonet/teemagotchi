"use client";

import Image from 'next/image'
import TopBar from "@/components/TopBar";
import EmotionBars from "@/components/EmotionBars";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center p-2 overflow-x-hidden">
      <TopBar />
      <EmotionBars />

      {/* 1) wrapper still uses your 100px hack + full viewport width */}
      <div className="absolute top-[74px] right-[-100px] w-screen overflow-hidden">
        <div className="relative inline-block">
          {/* 2) your image (extends 100px past the screen on the right) */}
          <Image
            src="/live-mascot.png"
            alt=""
            width={467}
            height={679}
            className="block"
          />

          {/* 3) text, bottom-aligned to the image, right-aligned to the screen */}
          <span
            className="
              absolute bottom-0 right-[100px]
              text-accent-30 jersey25
              text-[186.646px] font-normal leading-[100%]
              pointer-events-none
            "
          >
            tee
          </span>
        </div>
      </div>
    </main>
  );
}
