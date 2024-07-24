import React from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

function FooterSection() {
  const links = ["About us", "Services", "Use Cases", "Pricing", "Blog"];
  const socials = [
    { icon: "/images/linkedin_icon.png", alt: "LinkedIn" },
    { icon: "/images/facebook_icon.png", alt: "Facebook" },
    { icon: "/images/twitter_icon.png", alt: "Twitter" },
  ];

  return (
    <footer className="bg-secondary rounded-t-[45px] p-8 md:p-[60px] text-white">
      <div className="flex flex-col gap-8 md:flex-row justify-between items-center mb-16">
        <img src="/images/footer_logo.png" alt="footer logo" className="h-12" />
        <nav className="flex flex-wrap gap-6">
          {links.map((link, index) => (
            <Link key={index} href="#" className="text-white hover:underline">
              {link}
            </Link>
          ))}
        </nav>
        <div className="flex gap-4">
          {socials.map((social, index) => (
            <Button key={index} variant="ghost" size="icon" asChild>
              <Link href="#">
                <img src={social.icon} alt={social.alt} className="w-6 h-6" />
              </Link>
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 justify-between mb-16">
        <div>
          <span className="px-2 bg-primary text-black font-medium text-lg rounded-md">
            Contact Us:
          </span>
          <address className="not-italic mt-6 space-y-4">
            <p>Email: info@positivus.com</p>
            <p>Phone: 555-567-8901</p>
            <p>Address: 1234 Main St<br />Moonstone City, Stardust State 12345</p>
          </address>
        </div>
        <Card className="bg-[#292A32]">
          <CardContent className="flex flex-col sm:flex-row gap-4 p-8">
            <Input placeholder="Email" className="h-12 rounded-md" />
            <Button className="bg-primary text-black hover:bg-primary/90">
              Subscribe to news
            </Button>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm">© 2023 Positivus. All Rights Reserved.</p>
        <Link href="#" className="text-sm hover:underline">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}

export default FooterSection;