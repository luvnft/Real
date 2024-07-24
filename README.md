models lab spi key = yEUXUFfNDwuFKFLHBDcOCZmNorZ6gDdvA3gLnaS2ONlF78kvDoy85sG73Ihn

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 20 14.3% 4.1%;

    --card: 0 0% 100%;
    --card-foreground: 20 14.3% 4.1%;

    --popover: 0 0% 100%;
    --popover-foreground: 20 14.3% 4.1%;

    --primary: 24.6 95% 53.1%;
    --primary-foreground: 60 9.1% 97.8%;

    --secondary: 60 4.8% 95.9%;
    --secondary-foreground: 24 9.8% 10%;

    --muted: 60 4.8% 95.9%;
    --muted-foreground: 25 5.3% 44.7%;

    --accent: 60 4.8% 95.9%;
    --accent-foreground: 24 9.8% 10%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 60 9.1% 97.8%;

    --border: 20 5.9% 90%;
    --input: 20 5.9% 90%;
    --ring: 24.6 95% 53.1%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 20 14.3% 4.1%;
    --foreground: 60 9.1% 97.8%;

    --card: 24 9.8% 8%;
    --card-foreground: 0 0% 95%;

    --popover: 20 14.3% 4.1%;
    --popover-foreground: 60 9.1% 97.8%;

    --primary: 20.5 90.2% 48.2%;
    --primary-foreground: 60 9.1% 97.8%;

    --secondary: 12 6.5% 15.1%;
    --secondary-foreground: 60 9.1% 97.8%;

    --muted: 12 6.5% 15.1%;
    --muted-foreground: 24 5.4% 63.9%;

    --accent: 12 6.5% 15.1%;
    --accent-foreground: 60 9.1% 97.8%;

    --destructive: 0 72.2% 50.6%;
    --destructive-foreground: 60 9.1% 97.8%;

    --border: 12 6.5% 15.1%;
    --input: 12 6.5% 15.1%;
    --ring: 20.5 90.2% 48.2%;
  }
}

.shadow-light {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.085);
}

.shadow-dark {
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.141);
}




'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { Home, Building } from 'lucide-react'
import Link from 'next/link';

// Initialize Supabase client
const supabase = createClient('https://tbnfcmekmqbhxfvrzmbp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmZjbWVrbXFiaHhmdnJ6bWJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDg1MjkyNSwiZXhwIjoyMDM2NDI4OTI1fQ.QPyLbV_M2ZGvw_bpbpPZui4HBtODsDHhFR92p4Yos1I');

export default function RealtorListings() {
  const [apiListings, setApiListings] = useState([]);
  const [supabaseListings, setSupabaseListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listingType, setListingType] = useState('rent');

  useEffect(() => {
    fetchAllListings(listingType);
  }, [listingType]);

  const fetchAllListings = async (type) => {
    setLoading(true);
    await Promise.all([
      fetchApiListings(type),
      fetchSupabaseListings(type)
    ]);
    setLoading(false);
  };

  const fetchApiListings = async (type) => {
    const options = {
      method: 'GET',
      url: type === 'rent' 
        ? 'https://realtor-base.p.rapidapi.com/realtor/SearchForRent'
        : 'https://realtor-base.p.rapidapi.com/realtor/SearchForSale',
      params: type === 'rent' 
        ? {
            location: 'New Jersey, NJ',
            sort: 'best_match',
            property_type: 'Apartment'
          }
        : {
            location: 'California',
            sort: 'relevant_listings',
            listing_status: 'ExistingHomes',
            days_on_realtor: 'Today',
            stories: 'Single',
            garage: '1'
          },
      headers: {
        'x-rapidapi-host': 'realtor-base.p.rapidapi.com',
        'x-rapidapi-key': '38d78d1a70mshd316d5e9d36e570p1c4892jsnbb61a848a56b'
      }
    };

    try {
      const response = await axios.request(options);
      setApiListings(response.data.data);
    } catch (error) {
      console.error('Error fetching API listings:', error);
    }
  };

  const fetchSupabaseListings = async (type) => {
    try {
      const { data, error } = await supabase
        .from('rentalinformation')
        .select('*')
        .eq('listingtype', type === 'rent' ? 'rent' : 'sale');

      if (error) throw error;
      setSupabaseListings(data);
    } catch (error) {
      console.error('Error fetching Supabase listings:', error);
    }
  };

  const handleTypeChange = (type) => {
    setListingType(type);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const renderListing = (listing, isApi) => (
    <Card key={isApi ? listing.property_id : listing.id} className="overflow-hidden">
      <div className="relative h-48">
        {isApi && listing.primary_photo ? (
          <img
            src={listing.primary_photo.href}
            alt="Property"
            className="w-full h-full object-cover"
          />
        ) : listing.image_url ? (
          <img
            src={listing.image_url}
            alt="Property"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
        <Badge className="absolute top-2 right-2">
          {isApi ? listing.status : listing.listingtype}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2">
          {isApi 
            ? `${listing.location.address.line}, ${listing.location.address.city}`
            : `${listing.address}, ${listing.city}, ${listing.state}`}
        </h2>
        <p className="text-sm text-gray-600">
          {isApi 
            ? `Listed on: ${new Date(listing.list_date).toLocaleDateString()}`
            : `Listed on: ${new Date(listing.created_at).toLocaleDateString()}`}
        </p>
        <p className="text-sm font-bold mt-2">
          {isApi
            ? listing.list_price
              ? `Price: $${listing.list_price}`
              : `Rent: $${listing.list_price_max}/mo`
            : listing.listingtype === 'sale'
              ? `Price: $${listing.price}`
              : `Rent: $${listing.rentalprice}/mo`
          }
        </p>
        <p className="text-sm text-gray-600 mt-1">
          {isApi
            ? `${listing.description.beds} bed, ${listing.description.baths} bath`
            : `${listing.bedrooms} bed, ${listing.bathrooms} bath`
          }
        </p>
        <Badge className="mt-2">
          {isApi ? 'API Listing' : 'User Listing'}
        </Badge>
      </CardContent>
    </Card>
  );

  return (
    <div className='mb-4'>
      <div className="flex items-center justify-between space-y-2 mb-4">
        <Heading title="Properties Section" description="Use our AI-Integrated real estate tools and make ease of using the Platform" />
        <div className="hidden items-center space-x-2 md:flex">
          <Button 
            onClick={() => handleTypeChange('rent')}
            variant={listingType === 'rent' ? 'default' : 'outline'}
          >
            <Building className="mr-2 h-4 w-4" /> Rent
          </Button>
          <Button 
            onClick={() => handleTypeChange('sale')}
            variant={listingType === 'sale' ? 'default' : 'outline'}
          >
            <Home className="mr-2 h-4 w-4" /> Sale
          </Button>
        </div>
      </div>
      
      <Separator />

      <ScrollArea className="h-[80vh] mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apiListings.map((listing) => (
            <Link key={listing.property_id} href={`/dashboard/kanban/${listing.property_id}`} passHref>
              {renderListing(listing, true)}
            </Link>
          ))}
          {supabaseListings.map((listing) => (
            <Link key={listing.id} href={`/dashboard/kanban/${listing.id}`} passHref>
              {renderListing(listing, false)}
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}