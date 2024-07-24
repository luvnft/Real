"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";
import LogoSection from './logosection'
import LogoGroupSection from "./LogoGroupSection";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      
      <ContainerScroll
        titleComponent={
          <>
          <div className="mb-12" style={{display:'flex',alignItems:"center",justifyContent:'center'}}>
          <LogoSection />
          </div>
            <h1 className="text-4xl font-semibold text-black dark:text-white" style={{fontSize:'70px'}}  >
              Unleash the power of <br />
              <span className=" md:text-[6rem] font-bold mt-1 leading-none" >
                UnMLLH RealEsate 
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/demo.webp`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
        
      </ContainerScroll>
     
    </div>
  );
}
