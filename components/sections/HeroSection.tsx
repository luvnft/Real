'use client';

import React from 'react';
import { ContainerScroll } from '../ui/container-scroll-animation';
import Image from 'next/image';
import LogoSection from './logosection';
import LogoGroupSection from './LogoGroupSection';

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <div className="mb-2 flex items-center justify-center sm:mb-8 md:mb-12">
              <LogoSection />
            </div>
            <h1 className="text-center text-2xl font-semibold text-black sm:text-3xl md:text-4xl lg:text-5xl dark:text-white">
              Unleash the power of <br />
              <span className="mt-1 block text-3xl font-bold leading-tight sm:text-4xl sm:leading-none md:text-5xl lg:text-6xl xl:text-7xl">
                UnMLLH RealEstate
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/ss.gif`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto h-full rounded-2xl object-cover object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
