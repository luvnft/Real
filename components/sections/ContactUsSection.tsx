import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

function ContactUsSection() {
  return (
    <Card className="w-full mb-8">
      <CardHeader className="bg-accent rounded-t-[15px] p-8 md:p-[60px]">
        <div className="flex flex-col md:flex-row gap-8 md:gap-[40px] items-center">
          <CardTitle className="px-2 bg-primary inline-block font-medium text-h2 rounded-md">
            Contact Us
          </CardTitle>
          <CardDescription className="text-p">
            Connect with Us: Lets Discuss Your Real Estate Needs
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-8 md:p-[60px]">
        <form>
          <RadioGroup defaultValue="say_hi" className="flex mb-6">
            <div className="flex items-center space-x-2 mr-4">
              <RadioGroupItem value="say_hi" id="r1" />
              <Label htmlFor="r1">Say Hi</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="get_a_quote" id="r2" />
              <Label htmlFor="r2">Get a Quote</Label>
            </div>
          </RadioGroup>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <Input id="email" type="email" placeholder="Email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message*</Label>
              <Textarea id="message" placeholder="Message" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="p-8 md:p-[60px]">
        <Button className="w-full bg-secondary text-white hover:bg-secondary/90 hover:text-white text-[18px]">
          Send Message
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ContactUsSection;