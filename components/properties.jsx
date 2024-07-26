'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { Home, Building, Filter } from 'lucide-react';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

// Initialize Supabase client
const supabase = createClient(
  'https://tbnfcmekmqbhxfvrzmbp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmZjbWVrbXFiaHhmdnJ6bWJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDg1MjkyNSwiZXhwIjoyMDM2NDI4OTI1fQ.QPyLbV_M2ZGvw_bpbpPZui4HBtODsDHhFR92p4Yos1I'
);

export default function RealtorListings() {
  const [allListings, setAllListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listingType, setListingType] = useState('rent');
  const [locations, setLocations] = useState([]);

  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    minRent: '',
    maxRent: '',
    securityDeposit: ''
  });

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const filtered = allListings.filter((listing) => {
      if (listing.listingtype !== listingType) return false;

      if (listingType === 'rent') {
        return (
          (!filters.minRent ||
            listing.rentalprice >= parseFloat(filters.minRent)) &&
          (!filters.maxRent ||
            listing.rentalprice <= parseFloat(filters.maxRent)) &&
          (!filters.securityDeposit ||
            listing.securitydeposit <= parseFloat(filters.securityDeposit)) &&
          (!filters.location ||
            listing.city.toLowerCase() === filters.location.toLowerCase()) &&
          (!filters.bedrooms ||
            listing.bedrooms >= parseInt(filters.bedrooms)) &&
          (!filters.bathrooms ||
            listing.bathrooms >= parseInt(filters.bathrooms))
        );
      } else {
        return (
          (!filters.minPrice ||
            listing.price >= parseFloat(filters.minPrice)) &&
          (!filters.maxPrice ||
            listing.price <= parseFloat(filters.maxPrice)) &&
          (!filters.location ||
            listing.city.toLowerCase() === filters.location.toLowerCase()) &&
          (!filters.bedrooms ||
            listing.bedrooms >= parseInt(filters.bedrooms)) &&
          (!filters.bathrooms ||
            listing.bathrooms >= parseInt(filters.bathrooms))
        );
      }
    });

    setFilteredListings(filtered);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [listingType, filters, allListings]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('rentalinformation')
        .select('*');

      if (error) throw error;
      setAllListings(data);
      setFilteredListings(
        data.filter((listing) => listing.listingtype === listingType)
      );

      // Extract unique locations
      const uniqueLocations = [...new Set(data.map((listing) => listing.city))];
      setLocations(uniqueLocations);
    } catch (error) {
      console.error('Error fetching Supabase listings:', error);
    }
    setLoading(false);
  };

  const handleTypeChange = (type) => {
    setListingType(type);
    // Reset filters when changing listing type
    setFilters({
      minPrice: '',
      maxPrice: '',
      location: '',
      bedrooms: '',
      bathrooms: '',
      minRent: '',
      maxRent: '',
      securityDeposit: ''
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const renderListing = (listing) => (
    <Card key={listing.id} className="overflow-hidden">
      <div className="relative h-48">
        {listing.image_url ? (
          <img
            src={listing.image_url}
            alt="Property"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-200">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
        <Badge className="absolute right-2 top-2">{listing.listingtype}</Badge>
      </div>
      <CardContent className="p-4">
        <h2 className="mb-2 text-lg font-semibold">
          {`${listing.address}, ${listing.city}, ${listing.state}`}
        </h2>
        <p className="text-sm text-gray-600">
          {`Listed on: ${new Date(listing.created_at).toLocaleDateString()}`}
        </p>
        <p className="mt-2 text-sm font-bold">
          {listing.listingtype === 'sale'
            ? `Price: $${listing.price}`
            : `Rent: $${listing.rentalprice}/mo`}
        </p>
        {listing.listingtype === 'rent' && (
          <p className="text-sm text-gray-600">
            Security Deposit: ${listing.securitydeposit}
          </p>
        )}
        <p className="mt-1 text-sm text-gray-600">
          {`${listing.bedrooms} bed, ${listing.bathrooms} bath`}
        </p>
        <Badge className="mt-2">User Listing</Badge>
      </CardContent>
    </Card>
  );

  return (
    <div className="mb-4">
      <div className="mb-4 flex items-center justify-between space-y-2">
        <Heading
          title="Properties Section"
          description="View all Listed Properties for rent and sale based on your filters"
        />
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
                {listingType === 'sale' ? (
                  <>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label htmlFor="minPrice">Min Price</Label>
                      <Input
                        id="minPrice"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={(e) =>
                          handleFilterChange('minPrice', e.target.value)
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label htmlFor="maxPrice">Max Price</Label>
                      <Input
                        id="maxPrice"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={(e) =>
                          handleFilterChange('maxPrice', e.target.value)
                        }
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label htmlFor="minRent">Min Rent</Label>
                      <Input
                        id="minRent"
                        name="minRent"
                        value={filters.minRent}
                        onChange={(e) =>
                          handleFilterChange('minRent', e.target.value)
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label htmlFor="maxRent">Max Rent</Label>
                      <Input
                        id="maxRent"
                        name="maxRent"
                        value={filters.maxRent}
                        onChange={(e) =>
                          handleFilterChange('maxRent', e.target.value)
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label htmlFor="securityDeposit">
                        Max Security Deposit
                      </Label>
                      <Input
                        id="securityDeposit"
                        name="securityDeposit"
                        value={filters.securityDeposit}
                        onChange={(e) =>
                          handleFilterChange('securityDeposit', e.target.value)
                        }
                      />
                    </div>
                  </>
                )}
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="location">Location</Label>
                  <Select
                    onValueChange={(value) =>
                      handleFilterChange('location', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    value={filters.bedrooms}
                    onChange={(e) =>
                      handleFilterChange('bedrooms', e.target.value)
                    }
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    value={filters.bathrooms}
                    onChange={(e) =>
                      handleFilterChange('bathrooms', e.target.value)
                    }
                  />
                </div>
              </div>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Separator />

      <ScrollArea className="mt-4 h-[80vh]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => (
            <Link
              key={listing.id}
              href={`/dashboard/kanban/${listing.id}`}
              passHref
            >
              {renderListing(listing)}
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
