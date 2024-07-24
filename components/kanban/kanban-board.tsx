'use client';


import { Separator } from '@/components/ui/separator';
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"



export function KanbanBoard() {
  

  return (
    <div className="flex flex-col min-h-screen">
 
    <main className="flex-1">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Rental Listings</h1>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <FilterIcon className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by:</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Checkbox />
                  <span>Bedrooms</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Checkbox />
                  <span>Bathrooms</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Checkbox />
                  <span>Price</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Checkbox />
                  <span>Location</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <ListOrderedIcon className="h-4 w-4" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Sort by:</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <RadioGroup value="price-asc">
                    <RadioGroupItem value="price-asc" />
                    <span>Price: Low to High</span>
                  </RadioGroup>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RadioGroup value="price-desc">
                    <RadioGroupItem value="price-desc" />
                    <span>Price: High to Low</span>
                  </RadioGroup>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RadioGroup value="bedrooms-asc">
                    <RadioGroupItem value="bedrooms-asc" />
                    <span>Bedrooms: Low to High</span>
                  </RadioGroup>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RadioGroup value="bedrooms-desc">
                    <RadioGroupItem value="bedrooms-desc" />
                    <span>Bedrooms: High to Low</span>
                  </RadioGroup>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
      
        </div>

        <Separator />

        <div className="grid gap-6 mt-4">
          <Card className="flex flex-col md:flex-row gap-4 md:gap-6 p-4">
            <img
              src="/rr.jfif"
              width={400}
              height={300}
              alt="Rental Listing"
              className="rounded-lg md:w-[400px] md:h-[300px] object-cover"
            />
            <div className="flex-1 grid gap-2">
              <h3 className="text-xl font-bold">Modern Apartment</h3>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BedIcon className="h-4 w-4" />
                  <span>2 Bedrooms</span>
                </div>
               
                <div className="flex items-center gap-1">
                  <RulerIcon className="h-4 w-4" />
                  <span>800 sq ft</span>
                </div>
              </div>
              <p className="text-muted-foreground">Spacious and modern apartment in the heart of the city.</p>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold">$1,500/mo</div>
                <Link href="/dashboard/rentaldetails" >
                   <Button>View Listing</Button>
                  </Link>
              </div>
            </div>
          </Card>
          <Card className="flex flex-col md:flex-row gap-4 md:gap-6 p-4">
            <img
              src="/err.jfif"
              width={400}
              height={300}
              alt="Rental Listing"
              className="rounded-lg md:w-[400px] md:h-[300px] object-cover"
            />
            <div className="flex-1 grid gap-2">
              <h3 className="text-xl font-bold">Cozy Cottage</h3>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BedIcon className="h-4 w-4" />
                  <span>1 Bedroom</span>
                </div>
               
                <div className="flex items-center gap-1">
                  <RulerIcon className="h-4 w-4" />
                  <span>600 sq ft</span>
                </div>
              </div>
              <p className="text-muted-foreground">Charming cottage with a cozy atmosphere and a private backyard.</p>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold">$1,200/mo</div>
                <Link href="/dashboard/rentaldetails" >
                   <Button>View Listing</Button>
                  </Link>
              </div>
            </div>
          </Card>
          <Card className="flex flex-col md:flex-row gap-4 md:gap-6 p-4">
            <img
              src="/sre.jfif"
              width={400}
              height={300}
              alt="Rental Listing"
              className="rounded-lg md:w-[400px] md:h-[300px] object-cover"
            />
            <div className="flex-1 grid gap-2">
              <h3 className="text-xl font-bold">Luxury Penthouse</h3>
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
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold">$3,000/mo</div>
                <Link href="/dashboard/rentaldetails" >
                   <Button>View Listing</Button>
                  </Link>
              </div>
            </div>
          </Card>
          <Card className="flex flex-col md:flex-row gap-4 md:gap-6 p-4">
            <img
              src="/download.jfif"
              width={400}
              height={300}
              alt="Rental Listing"
              className="rounded-lg md:w-[400px] md:h-[300px] object-cover"
            />
            <div className="flex-1 grid gap-2">
              <h3 className="text-xl font-bold">Charming Townhouse</h3>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BedIcon className="h-4 w-4" />
                  <span>2 Bedrooms</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <RulerIcon className="h-4 w-4" />
                  <span>900 sq ft</span>
                </div>
              </div>
              <p className="text-muted-foreground">
                Charming townhouse with a private patio and easy access to local amenities.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold">$1,800/mo</div>
                <Link href="/dashboard/rentaldetails" >
                   <Button>View Listing</Button>
                  </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
   
  </div>
  )
};

 
  
  
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
  
  
  function FilterIcon(props : any) {
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
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    )
  }
  
  
  function ListOrderedIcon(props : any) {
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
        <line x1="10" x2="21" y1="6" y2="6" />
        <line x1="10" x2="21" y1="12" y2="12" />
        <line x1="10" x2="21" y1="18" y2="18" />
        <path d="M4 6h1v4" />
        <path d="M4 10h2" />
        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
      </svg>
    )
  }
  
  
 
  
  function RulerIcon(props : any) {
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


