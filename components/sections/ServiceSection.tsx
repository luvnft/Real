import React from "react";
import ServiceCard from "../cards/ServiceCard";

export default function ServiceSection() {
  const services = [
    {
      titleTop: "Broker Contact",
      titleBottom: "details",
      bg: "bg-accent",
      titleBg: "bg-primary",
      image: "/images/s_1.png",
      darkArrow: true,
      link: "/",
    },

    {
      titleTop: "Seller Contact",
      titleBottom: "details",
      bg: "bg-primary",
      titleBg: "bg-white",
      image: "/images/s_2.png",
      darkArrow: true,
      link: "/",
    },

    {
      titleTop: "List Your",
      titleBottom: "Property",
      bg: "bg-secondary",
      titleBg: "bg-white",
      image: "/images/s_3.png",
      darkArrow: false,
      link: "/",
    },

    {
      titleTop: "Buyer Contact",
      titleBottom: "Details",
      bg: "bg-accent",
      titleBg: "bg-primary",
      image: "/images/s_4.png",
      darkArrow: true,
      link: "/",
    },

    {
      titleTop: "CRM Advance",
      titleBottom: "Tool",
      bg: "bg-primary",
      titleBg: "bg-white",
      image: "/images/s_5.png",
      darkArrow: true,
      link: "/",
    },

    {
      titleTop: "User Admin",
      titleBottom: "Dashboard",
      bg: "bg-secondary",
      titleBg: "bg-white",
      image: "/images/s_6.png",
      darkArrow: false,
      link: "/",
    },
  ];
  return (
    <section className="mt-8">
      <div className="flex flex-col md:flex-row gap-8 md:gap-[40px] items-center ">
        <div className="px-2 bg-primary inline-block font-medium text-h2 rounded-md">
          Features
        </div>
        <p className="text-p" style={{textAlign:'center'}}>
       At Our platform connects buyers, sellers, and brokers in the real estate market, streamlining transactions and maximizing opportunities for all parties involved
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] mt-[80px]" style={{color:'black'}}>
        {services.map((service, index) => (
          <ServiceCard {...service} key={index} />
        ))}
      </div>
    </section>
  );
}
