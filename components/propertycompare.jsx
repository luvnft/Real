'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from '@/components/ui/separator';
import { Heading } from './ui/heading';
import Link from 'next/link';
// Initialize Supabase client
const supabase = createClient('https://tbnfcmekmqbhxfvrzmbp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmZjbWVrbXFiaHhmdnJ6bWJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDg1MjkyNSwiZXhwIjoyMDM2NDI4OTI1fQ.QPyLbV_M2ZGvw_bpbpPZui4HBtODsDHhFR92p4Yos1I');

const PropertyCard = ({ property, isApi, isSelected, onSelect }) => (
  <Card className={`h-full overflow-hidden cursor-pointer ${isSelected ? 'border-4 border-blue-500' : ''}`} onClick={onSelect}>
    <div className="relative h-48">
      {property.image_url || (isApi && property.primary_photo) ? (
        <img
          src={isApi ? property.primary_photo.href : property.image_url}
          alt="Property"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No image available</span>
        </div>
      )}
      <Badge className="absolute top-2 right-2">
        {isApi ? property.status : property.listingtype}
      </Badge>
    </div>
    <CardContent className="p-4">
      <h2 className="text-lg font-semibold mb-2">
        {isApi 
          ? `${property.location.address.line}, ${property.location.address.city}`
          : `${property.address}, ${property.city}, ${property.state}`}
      </h2>
      <p className="text-sm font-bold mt-2">
        {isApi
          ? property.list_price
            ? `Price: $${property.list_price}`
            : `Rent: $${property.list_price_max}/mo`
          : property.listingtype === 'sale'
            ? `Price: $${property.price}`
            : `Rent: $${property.rentalprice}/mo`
        }
      </p>
      <p className="text-sm text-gray-600 mt-1">
        {isApi
          ? `${property.description.beds} bed, ${property.description.baths} bath`
          : `${property.bedrooms} bed, ${property.bathrooms} bath`
        }
      </p>
      <Badge className="mt-2">
        {isApi ? 'API Listing' : 'User Listing'}
      </Badge>
      <Link 
  href={isApi ? `/dashboard/kanban/${property.property_id}` : `/dashboard/kanban/${property.id}`} 
  passHref
>
  <Button className="mt-2 w-full" onClick={(e) => e.stopPropagation()}>
    More Details
  </Button>
</Link>

    </CardContent>
  </Card>
);

const ComparisonTable = ({ property1, property2 }) => {
  const getPropertyValue = (property, key) => {
    if (!property) return 'N/A';
    const isApi = property.status !== undefined;
    
    switch(key) {
      case 'address':
        return isApi 
          ? `${property.location.address.line}, ${property.location.address.city}`
          : `${property.address}, ${property.city}, ${property.state}`;
      case 'price':
        return isApi
          ? property.list_price
            ? `$${property.list_price}`
            : `$${property.list_price_max}/mo`
          : property.listingtype === 'sale'
            ? `$${property.price}`
            : `$${property.rentalprice}/mo`;
      case 'beds':
        return isApi ? property.description.beds : property.bedrooms;
      case 'baths':
        return isApi ? property.description.baths : property.bathrooms;
      case 'sqft':
        return isApi ? property.description.sqft : property.squarefootage;
      case 'type':
        return isApi ? property.description.type : property.propertytype;
      case 'year_built':
        return isApi ? property.description.year_built : property.yearbuilt;
      case 'listing_type':
        return isApi ? property.status : property.listingtype;
      default:
        return 'N/A';
    }
  };

  const rows = [
    { label: 'Address', key: 'address' },
    { label: 'Price', key: 'price' },
    { label: 'Bedrooms', key: 'beds' },
    { label: 'Bathrooms', key: 'baths' },
    { label: 'Square Footage', key: 'sqft' },
    { label: 'Property Type', key: 'type' },
    { label: 'Year Built', key: 'year_built' },
    { label: 'Listing Type', key: 'listing_type' },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Feature</TableHead>
          <TableHead>Property 1</TableHead>
          <TableHead>Property 2</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.key}>
            <TableCell>{row.label}</TableCell>
            <TableCell>{getPropertyValue(property1, row.key)}</TableCell>
            <TableCell>{getPropertyValue(property2, row.key)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const PropertyComparison = ({ listingType }) => {
  const [apiListings, setApiListings] = useState([]);
  const [supabaseListings, setSupabaseListings] = useState([]);
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);

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

  const handleLeftChange = (direction) => {
    const totalListings = apiListings.length + supabaseListings.length;
    setLeftIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % totalListings;
      } else {
        return (prevIndex - 1 + totalListings) % totalListings;
      }
    });
  };

  const handleRightChange = (direction) => {
    const totalListings = apiListings.length + supabaseListings.length;
    setRightIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % totalListings;
      } else {
        return (prevIndex - 1 + totalListings) % totalListings;
      }
    });
  };

  const getPropertyByIndex = (index) => {
    if (index < apiListings.length) {
      return { property: apiListings[index], isApi: true };
    } else {
      return { property: supabaseListings[index - apiListings.length], isApi: false };
    }
  };

  const handleSelect = (side, property) => {
    if (side === 'left') {
      setSelectedLeft(property);
    } else {
      setSelectedRight(property);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <Card style={{padding:'20px'}}>
    <div className="flex flex-col gap-4"   >
      <div className="flex flex-col md:flex-row gap-4" style={{display:"flex",flexDirection:'row'}}   >
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <Button onClick={() => handleLeftChange('prev')} variant="outline">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button onClick={() => handleLeftChange('next')} variant="outline">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <PropertyCard 
            {...getPropertyByIndex(leftIndex)}
            isSelected={selectedLeft === getPropertyByIndex(leftIndex).property}
            onSelect={() => handleSelect('left', getPropertyByIndex(leftIndex).property)}
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <Button onClick={() => handleRightChange('prev')} variant="outline">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button onClick={() => handleRightChange('next')} variant="outline">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <PropertyCard 
            {...getPropertyByIndex(rightIndex)}
            isSelected={selectedRight === getPropertyByIndex(rightIndex).property}
            onSelect={() => handleSelect('right', getPropertyByIndex(rightIndex).property)}
          />
        </div>
      </div>
      
      <div style={{marginTop:'30px'}}>
      
        {selectedLeft && selectedRight && (
            <>
            <Separator  />
            <div style={{textAlign:"center",paddingBottom:'19px',marginTop:'30px'}}>
            <Heading  title="Properties Section" description="Use our AI-Integrated real estate tools and make ease of using the Platform" />
            </div>
        

            <Card>
            <ComparisonTable
          property1={selectedLeft}
          property2={selectedRight}
        />
            </Card>
        </>
      )}
        
      </div>
    </div>
    </Card>
  );
};

export default PropertyComparison;