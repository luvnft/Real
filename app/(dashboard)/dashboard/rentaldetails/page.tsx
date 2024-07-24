"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from '@/components/ui/scroll-area';
import BreadCrumb from '@/components/breadcrumb';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';

export default function Component() {

    const breadcrumbItems = [{ title: 'Rental', link: '/dashboard/rentaldetails' }];

  return (
   
     <ScrollArea className="h-full">
     <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        
     <BreadCrumb items={breadcrumbItems} />

     
     <Heading
          title={`Rental Details `}
          description="Manage users (Client side table functionalities.)"
        />
       
     
      <Separator />
     

  

    <div className="flex flex-col min-h-screen">
    
      <main className="flex-1 ">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src="/rr.jfif"
                width={600}
                height={400}
                alt="Rental Listing"
                className="rounded-lg w-full object-cover"
              />
              <div className="grid gap-4 mt-4">
                <div className="grid grid-cols-3 gap-4">
                  <img
                    src="/err.jfif"
                    width={200}
                    height={150}
                    alt="Rental Listing"
                    className="rounded-lg w-full object-cover"
                  />
                  <img
                    src="/err.jfif"
                    width={200}
                    height={150}
                    alt="Rental Listing"
                    className="rounded-lg w-full object-cover"
                  />
                  <img
                    src="/err.jfif"
                    width={200}
                    height={150}
                    alt="Rental Listing"
                    className="rounded-lg w-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <img
                    src="/err.jfif"
                    width={200}
                    height={150}
                    alt="Rental Listing"
                    className="rounded-lg w-full object-cover"
                  />
                  <img
                    src="/err.jfif"
                    width={200}
                    height={150}
                    alt="Rental Listing"
                    className="rounded-lg w-full object-cover"
                  />
                  <img
                    src="/err.jfif"
                    width={200}
                    height={150}
                    alt="Rental Listing"
                    className="rounded-lg w-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <h1 className="text-3xl font-bold">Luxury Penthouse</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BedIcon className="h-4 w-4" />
                  <span>3 Bedrooms</span>
                </div>
               
                <div className="flex items-center gap-1">
                  <RulerIcon className="h-4 w-4" />
                  <span>1200 sq ft</span>
                </div>
              </div>
              <p className="text-muted-foreground">
                Stunning penthouse with panoramic city views and high-end finishes.
              </p>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">$3,000/mo</div>
                  <Button>Book Now</Button>
                </div>
                <div className="grid gap-2">
                  <h2 className="text-2xl font-bold">Amenities</h2>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <WifiIcon className="h-4 w-4" />
                      <span>High-speed WiFi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <HomeIcon className="h-4 w-4" />
                      <span>Fitness Center</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <PocketIcon className="h-4 w-4" />
                      <span>Outdoor Pool</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ParkingMeterIcon className="h-4 w-4" />
                      <span>Parking Garage</span>
                    </li>
                  </ul>
                </div>
                <div className="grid gap-2">
                  <h2 className="text-2xl font-bold">Description</h2>
                  <p className="text-muted-foreground">
                    This stunning penthouse offers breathtaking views of the city skyline. With high-end finishes and
                    modern amenities, this is the perfect home for those who appreciate luxury and convenience. The
                    spacious layout includes 3 bedrooms and 2 bathrooms, providing ample room for relaxation and
                    entertaining. The building features a state-of-the-art fitness center, outdoor pool, and secure
                    parking garage. Dont miss your chance to live in the heart of the city in this exceptional rental.
                  </p>
                </div>
                <div className="grid gap-2">
                  <h2 className="text-2xl font-bold">Location</h2>
                  <p className="text-muted-foreground">
                    Located in the heart of the city, this penthouse is within walking distance to a variety of shops,
                    restaurants, and entertainment options. The building is just a short distance from the subway
                    station, making it easy to commute to work or explore the city.
                  </p>
                </div>
                <div className="grid gap-2">
                  <h2 className="text-2xl font-bold">Additional Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Available from June 1, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4" />
                      <span>$3,000 security deposit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DogIcon className="h-4 w-4" />
                      <span>Pets allowed (additional fee)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UtilityPoleIcon className="h-4 w-4" />
                      <span>Utilities included (electricity, water, gas)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
     
    </div>

   </div>
    </ScrollArea>
  
  )
}




function BedIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </svg>
  )
}


function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function DogIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5" />
      <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" />
      <path d="M8 14v.5" />
      <path d="M16 14v.5" />
      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
      <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306" />
    </svg>
  )
}


function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}





function ParkingMeterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 9a3 3 0 1 1 6 0" />
      <path d="M12 12v3" />
      <path d="M11 15h2" />
      <path d="M19 9a7 7 0 1 0-13.6 2.3C6.4 14.4 8 19 8 19h8s1.6-4.6 2.6-7.7c.3-.8.4-1.5.4-2.3" />
      <path d="M12 19v3" />
    </svg>
  )
}


function PocketIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z" />
      <polyline points="8 10 12 14 16 10" />
    </svg>
  )
}


function RulerIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
      <path d="m14.5 12.5 2-2" />
      <path d="m11.5 9.5 2-2" />
      <path d="m8.5 6.5 2-2" />
      <path d="m17.5 15.5 2-2" />
    </svg>
  )
}


function UtilityPoleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v20" />
      <path d="M2 5h20" />
      <path d="M3 3v2" />
      <path d="M7 3v2" />
      <path d="M17 3v2" />
      <path d="M21 3v2" />
      <path d="m19 5-7 7-7-7" />
    </svg>
  )
}


function WifiIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h.01" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <path d="M5 12.859a10 10 0 0 1 14 0" />
      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
    </svg>
  )
}