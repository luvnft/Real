"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

interface Process {
  label: string;
  title: string;
  description: string;
}

const processes: Process[] = [
  {
    label: "01",
    title: "Property Evaluation",
    description:
      "Evaluate the property's market value, potential, and condition to determine the best approach for marketing and sales.",
  },
  {
    label: "02",
    title: "Listing Strategy",
    description:
      "Develop a comprehensive strategy for property listings that maximizes exposure and attracts qualified buyers.",
  },
  {
    label: "03",
    title: "Negotiation and Closing",
    description:
      "Manage negotiations between buyers and sellers to achieve optimal outcomes, ensuring smooth transactions.",
  },
  {
    label: "04",
    title: "Transaction Management",
    description:
      "Oversee the entire transaction process, from offer acceptance to closing, ensuring all legal and financial aspects are handled efficiently.",
  },
  {
    label: "05",
    title: "Post-Sale Support",
    description:
      "Provide ongoing support and assistance after the sale to ensure client satisfaction and facilitate any necessary follow-up actions.",
  },
  {
    label: "06",
    title: "Client Feedback",
    description:
      "Gather feedback from clients to continuously improve our services and enhance customer satisfaction.",
  },
];

function OurWorkingProcessSection() {
  return (
    <section className="mt-8 space-y-8 mb-8">
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center">
        <h2 className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-2xl font-semibold">
          Our Working Process
        </h2>
        <p className="text-muted-foreground">
          Step-by-Step Guide to Successfully Navigate Real Estate Transactions
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            {processes.map((process, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold">
                      {process.label}
                    </span>
                    <span className="font-medium">{process.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground pl-14">
                    {process.description}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
}

export default OurWorkingProcessSection;