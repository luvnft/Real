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
import { Home, Building, Filter } from 'lucide-react'
import Link from 'next/link';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Initialize Supabase client
const supabase = createClient('https://tbnfcmekmqbhxfvrzmbp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmZjbWVrbXFiaHhmdnJ6bWJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDg1MjkyNSwiZXhwIjoyMDM2NDI4OTI1fQ.QPyLbV_M2ZGvw_bpbpPZui4HBtODsDHhFR92p4Yos1I');

export default function RealtorListings() {
  const [apiListings, setApiListings] = useState([]);
  const [supabaseListings, setSupabaseListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listingType, setListingType] = useState('rent');

  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    const filteredApiListings = apiListings.filter(listing => {
      return (
        (!filters.minPrice || listing.list_price >= parseFloat(filters.minPrice)) &&
        (!filters.maxPrice || listing.list_price <= parseFloat(filters.maxPrice)) &&
        (!filters.location || listing.location.address.city.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.bedrooms || listing.description.beds >= parseInt(filters.bedrooms)) &&
        (!filters.bathrooms || listing.description.baths >= parseInt(filters.bathrooms))
      );
    });

    const filteredSupabaseListings = supabaseListings.filter(listing => {
      return (
        (!filters.minPrice || listing.price >= parseFloat(filters.minPrice)) &&
        (!filters.maxPrice || listing.price <= parseFloat(filters.maxPrice)) &&
        (!filters.location || listing.city.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.bedrooms || listing.bedrooms >= parseInt(filters.bedrooms)) &&
        (!filters.bathrooms || listing.bathrooms >= parseInt(filters.bathrooms))
      );
    });

    setApiListings(filteredApiListings);
    setSupabaseListings(filteredSupabaseListings);
  };

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
        'x-rapidapi-key': '21584b3dedmshf00016c0cbfb311p1454d5jsnc4044cc9a45b'
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
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Properties</SheetTitle>
                <SheetDescription>
                  Set your preferences to filter the listings.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="minPrice">Min Price</Label>
                  <Input id="minPrice" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="maxPrice">Max Price</Label>
                  <Input id="maxPrice" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" value={filters.location} onChange={handleFilterChange} />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input id="bedrooms" name="bedrooms" value={filters.bedrooms} onChange={handleFilterChange} />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input id="bathrooms" name="bathrooms" value={filters.bathrooms} onChange={handleFilterChange} />
                </div>
              </div>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </SheetContent>
          </Sheet>
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

