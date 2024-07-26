'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useUser } from '@clerk/nextjs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  MessageSquare,
  Bed,
  Bath,
  Maximize,
  Briefcase,
  PenTool
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { Home, Calendar, DollarSign, Ruler, FileText } from 'lucide-react';
import Link from 'next/link';

import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
// Initialize Supabase client
const supabase = createClient(
  'https://tbnfcmekmqbhxfvrzmbp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmZjbWVrbXFiaHhmdnJ6bWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA4NTI5MjUsImV4cCI6MjAzNjQyODkyNX0.M5pBYdFpa3oonK4yXrW0hDsjhrlq7NNjB5p7PY4DmCI'
);

const UserProfile = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listedProperties, setListedProperties] = useState([]);

  const handleEditClick = () => {
    window.location.href = '/dashboard/profileupdate';
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        console.log(user.id);
        // Check each role table
        const tables = [
          'buyers',
          'sellers',
          'agents',
          'attorneys',
          'professionals',
          'landinspectors',
          'users'
        ];
        let foundUserData = null;

        for (const table of tables) {
          const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq('userid', user.id)
            .single();

          if (data && !error) {
            foundUserData = { ...data, role: table.slice(0, -1) }; // Remove 's' from table name for role
            break;
          }
        }

        if (foundUserData) {
          setUserData(foundUserData);
          console.log(foundUserData);

          // Fetch listed properties
          const { data: properties, error } = await supabase
            .from('rentalinformation')
            .select('id, image_url, sellername, price, listingtype')
            .eq('userid', user.id);

          if (properties && !error) {
            setListedProperties(properties);
          } else {
            console.error('Error fetching listed properties:', error);
          }
        } else {
          console.error('User data not found in any table');
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleEditProperty = (propertyId) => {
    window.location.href = `/dashboard/editproperty/${propertyId}`;
  };

  const handleCompleteProfile = () => {
    if (userData && userData.role) {
      window.location.href = '/dashboard/profileupdate';
    } else {
      console.error('User role is undefined');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const isProfileIncomplete = () => {
    if (userData.role === 'buyer') {
      return !userData.fullName || !userData.email;
    } else if (userData.role === 'seller') {
      return !userData.fullName || !userData.askingPrice;
    } else if (userData.role === 'professional') {
      return !userData.fullName || !userData.profession;
    } else if (userData.role === 'attorney') {
      return !userData.barNumber || !userData.lawFirmName;
    } else if (userData.role === 'landinspector') {
      return !userData.fullName || !userData.licenseNumber;
    } else if (userData.role === 'agent') {
      return !userData.licenseNumber || !userData.brokerageName;
    }
    return true;
  };

  if (isProfileIncomplete()) {
    return (
      <div className="mx-auto max-w-4xl ">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Please add your account information to complete your{' '}
              {userData.role} profile.
            </p>
            <Button onClick={handleCompleteProfile}>Complete Profile</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderPropertyList = (listingType) => (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      {listedProperties
        .filter((prop) => prop.listingtype === listingType)
        .map((property) => (
          <Card key={property.id} className="p-4">
            <div className="relative">
              <img
                src={property.image_url}
                alt={property.sellername}
                className="h-48 w-full rounded object-cover"
              />
              <button
                onClick={() => handleEditProperty(property.id)}
                className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-md transition-colors duration-200 hover:bg-gray-100"
              >
                <Edit className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <CardContent>
              <h3 className="font-semibold">{property.sellername}</h3>
              <p>${property.price}</p>
            </CardContent>
          </Card>
        ))}
    </div>
  );

  const renderBuyerProfile = () => (
    <>
      <div className="mb-4 flex items-center justify-between space-y-2">
        <Heading
          title="Profile Section"
          description="Check your Profile details and keep updated your profile"
        />
        <div className="hidden items-center space-x-2 md:flex">
          <Link href="/dashboard/professionform">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
      <div className="">
        <Card className="overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <CardContent className="relative -mt-16 px-6">
            <div className="mt-4 flex flex-col items-center md:flex-row md:items-start">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage
                  src={userData.avatar_url}
                  alt={userData.fullName}
                />
                <AvatarFallback style={{ width: '63px', height: '63px' }}>
                  {userData.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="mt-4 text-center md:ml-6 md:mt-0 md:text-left">
                <h2 className="text-2xl font-bold">{userData.fullName}</h2>
                <p className="text-gray-500">Buyer</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleEditClick}>
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-4 mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                <span>
                  {userData.desiredLocation || 'Location not specified'}
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-gray-500" />
                <span>{userData.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-gray-500" />
                <span>{userData.email}</span>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="mb-4 mt-4 mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <DollarSign className="mx-auto mb-2 h-8 w-8 text-gray-500" />
                    <h3 className="font-semibold">Budget</h3>
                    <p>
                      ${userData.budget?.toLocaleString() || 'Not specified'}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Home className="mx-auto mb-2 h-8 w-8 text-gray-500" />
                    <h3 className="font-semibold">Desired Property</h3>
                    <p>
                      {userData.minBedrooms || '0'}+ Bed,{' '}
                      {userData.minBathrooms || '0'}+ Bath
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Maximize className="mx-auto mb-2 h-8 w-8 text-gray-500" />
                    <h3 className="font-semibold">Min. Square Footage</h3>
                    <p>{userData.minSquareFootage || 'Not specified'} sq ft</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator className="my-6" />

            <div className="mb-4 mt-4">
              <h3 className="mb-2 text-xl font-semibold">
                Additional Requirements
              </h3>
              <p className="text-gray-700">
                {userData.additionalRequirements ||
                  'No additional requirements specified.'}
              </p>
            </div>

            <Separator className="my-6" />

            <div className="mb-4 mt-4">
              <h3 className="mb-2 text-xl font-semibold">
                Pre-approval Status
              </h3>
              <Badge
                variant={
                  userData.preApprovalStatus === 'Approved'
                    ? 'success'
                    : 'warning'
                }
              >
                {userData.preApprovalStatus || 'Not specified'}
              </Badge>
            </div>

            <Separator className="my-6" />

            <Card className="mt-4 p-4">
              <Tabs defaultValue="for-sale">
                <TabsList>
                  <TabsTrigger value="for-sale">For Sale</TabsTrigger>
                  <TabsTrigger value="for-rent">For Rent</TabsTrigger>
                </TabsList>
                <TabsContent value="for-sale">
                  <h2 className="mb-4 text-2xl font-bold">
                    Properties For Sale
                  </h2>
                  {renderPropertyList('sale')}
                </TabsContent>
                <TabsContent value="for-rent">
                  <h2 className="mb-4 text-2xl font-bold">
                    Properties For Rent
                  </h2>
                  {renderPropertyList('rent')}
                </TabsContent>
              </Tabs>
            </Card>
          </CardContent>
        </Card>

        {/* Keep the existing Tabs section for properties if applicable */}
      </div>
    </>
  );

  const renderSellerProfile = () => (
    <>
      <div className="mb-4 flex items-center justify-between space-y-2">
        <Heading
          title="Profile Section"
          description="Check your Profile details and keep updated your profile"
        />
        <div className="hidden items-center space-x-2 md:flex">
          <Link href="/dashboard/professionform">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
      <div className="">
        <Card className="overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-green-500 to-blue-600"></div>
          <CardContent className="relative -mt-16 px-6">
            <div className="mb-4 mt-4 flex flex-col items-center md:flex-row md:items-start">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage
                  src={userData.avatar_url}
                  alt={userData.fullName}
                />
                <AvatarFallback style={{ width: '63px', height: '63px' }}>
                  {userData.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="mt-4 text-center md:ml-6 md:mt-0 md:text-left">
                <h2 className="text-2xl font-bold">{userData.fullName}</h2>
                <p className="text-gray-500">Seller</p>
                <Button variant="ghost" size="icon" onClick={handleEditClick}>
                  <Edit className="h-4 w-4" />
                </Button>
                <div className="mt-2">
                  <Badge variant="secondary">
                    {userData.numberOfProperties} Properties
                  </Badge>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="mb-4 mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-gray-500" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-gray-500" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                  <span>{userData.propertyAddress}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-gray-500" />
                  <span>Asking Price: ${userData.askingPrice}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-gray-500" />
                  <span>
                    Price Range: ${userData.minimumPrice} - $
                    {userData.maximumPrice}
                  </span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="mb-4 mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Home className="mx-auto mb-2 h-8 w-8 text-gray-500" />
                    <h3 className="font-semibold">Property Details</h3>
                    <p>Bedrooms: {userData.bedrooms}</p>
                    <p>Bathrooms: {userData.bathrooms}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Ruler className="mx-auto mb-2 h-8 w-8 text-gray-500" />
                    <h3 className="font-semibold">Size</h3>
                    <p>{userData.squareFootage} sq ft</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Calendar className="mx-auto mb-2 h-8 w-8 text-gray-500" />
                    <h3 className="font-semibold">Year Built</h3>
                    <p>{userData.yearBuilt}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator className="my-6" />

            <div className="mb-4 mt-4">
              <h3 className="mb-2 text-xl font-semibold">
                Property Description
              </h3>
              <p className="text-gray-700">{userData.propertyDescription}</p>
            </div>

            <Separator className="my-6" />

            <Card className="mt-4 p-4">
              <Tabs defaultValue="for-sale">
                <TabsList>
                  <TabsTrigger value="for-sale">For Sale</TabsTrigger>
                  <TabsTrigger value="for-rent">For Rent</TabsTrigger>
                </TabsList>
                <TabsContent value="for-sale">
                  <h2 className="mb-4 text-2xl font-bold">
                    Properties For Sale
                  </h2>
                  {renderPropertyList('sale')}
                </TabsContent>
                <TabsContent value="for-rent">
                  <h2 className="mb-4 text-2xl font-bold">
                    Properties For Rent
                  </h2>
                  {renderPropertyList('rent')}
                </TabsContent>
              </Tabs>
            </Card>
          </CardContent>
        </Card>
      </div>
    </>
  );

  const renderAgentProfile = () => (
    <>
      <div className="mb-4 flex items-center justify-between space-y-2">
        <Heading
          title="Profile Section"
          description="Check your Profile details and keep updated your profile"
        />
        <div className="hidden items-center space-x-2 md:flex">
          <Link href="/dashboard/professionform">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
      <div className="">
        <Card className="overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-yellow-500 to-red-600"></div>
          <CardContent className="relative -mt-16 px-6">
            <div className="mt-4 flex flex-col items-center md:flex-row md:items-start">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage
                  src={userData.avatar_url}
                  alt={userData.fullName}
                />
                <AvatarFallback style={{ width: '63px', height: '63px' }}>
                  {userData.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="mt-4 text-center md:ml-6 md:mt-0 md:text-left">
                <h2 className="text-2xl font-bold">{userData.fullName}</h2>
                <p className="text-gray-500">Real Estate Agent</p>
                <Badge variant="secondary" className="mt-2">
                  {userData.specialization}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" onClick={handleEditClick}>
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-4 mt-4 mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-gray-500" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-gray-500" />
                <span>{userData.phone}</span>
              </div>
              <div className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-gray-500" />
                <a
                  href={userData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {userData.website}
                </a>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="mb-4 mt-4 mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Award className="mx-auto mb-2 h-8 w-8 text-gray-500" />
                    <h3 className="font-semibold">License Number</h3>
                    <p>{userData.licenseNumber}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Briefcase className="mx-auto mb-2 h-8 w-8 text-gray-500" />
                    <h3 className="font-semibold">Brokerage</h3>
                    <p>{userData.brokerageName}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Calendar className="mx-auto mb-2 h-8 w-8 text-gray-500" />
                    <h3 className="font-semibold">Experience</h3>
                    <p>{userData.yearsOfExperience} years</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator className="my-6" />

            <div className="mb-4 mt-4">
              <h3 className="mb-2 text-xl font-semibold">About Me</h3>
              <p className="text-gray-700">{userData.bio}</p>
            </div>

            <Separator className="my-6" />

            <div className="mb-4 mt-4">
              <h3 className="mb-2 text-xl font-semibold">Service Areas</h3>
              <p className="text-gray-700">{userData.serviceAreas}</p>
            </div>

            <Separator className="my-6" />

            <Card className="mt-4 p-4">
              <Tabs defaultValue="for-sale">
                <TabsList>
                  <TabsTrigger value="for-sale">For Sale</TabsTrigger>
                  <TabsTrigger value="for-rent">For Rent</TabsTrigger>
                </TabsList>
                <TabsContent value="for-sale">
                  <h2 className="mb-4 text-2xl font-bold">
                    Properties For Sale
                  </h2>
                  {renderPropertyList('sale')}
                </TabsContent>
                <TabsContent value="for-rent">
                  <h2 className="mb-4 text-2xl font-bold">
                    Properties For Rent
                  </h2>
                  {renderPropertyList('rent')}
                </TabsContent>
              </Tabs>
            </Card>
          </CardContent>
        </Card>
      </div>
    </>
  );

  const renderProfessionalProfile = () => (
    <>
      <div className="mb-4 flex items-center justify-between space-y-2">
        <Heading
          title="Profile Section"
          description="Check your Profile details and keep updated your profile"
        />
        <div className="hidden items-center space-x-2 md:flex">
          <Link href="/dashboard/professionform">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
      <Card className="">
        <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-pink-600"></div>
        <CardContent className="relative -mt-16 px-6">
          <div className="mt-4 flex flex-col items-center md:flex-row md:items-start">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={userData.avatar_url} alt={userData.fullName} />
              <AvatarFallback style={{ width: '63px', height: '63px' }}>
                {userData.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="mt-4 text-center md:ml-6 md:mt-0 md:text-left">
              <h2 className="text-2xl font-bold">{userData.fullName}</h2>
              <p className="text-gray-500">{userData.profession}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleEditClick}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-4 mt-4 mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-gray-500" />
              <span>{userData.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-gray-500" />
              <span>{userData.phone}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-gray-500" />
              <span>{userData.city}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="mr-2 h-5 w-5 text-gray-500" />
              <span>{userData.experience} years experience</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-4 mt-4">
            <h3 className="mb-2 text-xl font-semibold">About Me</h3>
            <p className="text-gray-700">{userData.about}</p>
          </div>

          <Separator className="my-6" />

          <div className="mb-4 mt-4">
            <h3 className="mb-2 text-xl font-semibold">Skills</h3>
            <p className="text-gray-700">{userData.skills}</p>
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderLandInspectorProfile = () => (
    <>
      <div className="mb-4 flex items-center justify-between space-y-2">
        <Heading
          title="Profile Section"
          description="Check your Profile details and keep updated your profile"
        />
        <div className="hidden items-center space-x-2 md:flex">
          <Link href="/dashboard/professionform">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
      <Card className="">
        <div className="relative h-48 bg-gradient-to-r from-teal-500 to-cyan-600"></div>
        <CardContent className="relative -mt-16 px-6">
          <div className="mt-4 flex flex-col items-center md:flex-row md:items-start">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={userData.avatar_url} alt={userData.fullName} />
              <AvatarFallback style={{ width: '63px', height: '63px' }}>
                {userData.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" onClick={handleEditClick}>
              <Edit className="h-4 w-4" />
            </Button>
            <div className="mt-4 text-center md:ml-6 md:mt-0 md:text-left">
              <h2 className="text-2xl font-bold">{userData.fullName}</h2>
              <p className="text-gray-500">Land Inspector</p>
            </div>
          </div>

          <div className="mb-4 mt-4 mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-gray-500" />
              <span>{userData.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-gray-500" />
              <span>{userData.phone}</span>
            </div>
            <div className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-gray-500" />
              <span>License: {userData.licenseNumber}</span>
            </div>
            <div className="flex items-center">
              <PenTool className="mr-2 h-5 w-5 text-gray-500" />
              <span>{userData.yearsOfExperience} years experience</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-4 mt-4">
            <h3 className="mb-2 text-xl font-semibold">Certifications</h3>
            <p className="text-gray-700">{userData.certifications}</p>
          </div>

          <Separator className="my-6" />

          <div className="mb-4 mt-4">
            <h3 className="mb-2 text-xl font-semibold">Specializations</h3>
            <p className="text-gray-700">{userData.specializations}</p>
          </div>

          <Separator className="my-6" />

          <div className="mb-4 mt-4">
            <h3 className="mb-2 text-xl font-semibold">Service Areas</h3>
            <p className="text-gray-700">{userData.serviceAreas}</p>
          </div>

          <Separator className="my-6" />

          <div className="mb-4 mt-4">
            <h3 className="mb-2 text-xl font-semibold">
              Types of Inspections Offered
            </h3>
            <p className="text-gray-700">{userData.inspectionTypes}</p>
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderAttorneyProfile = () => (
    <>
      <div className="mb-4 flex items-center justify-between space-y-2">
        <Heading
          title="Profile Section"
          description="Check your Profile details and keep updated your profile"
        />
        <div className="hidden items-center space-x-2 md:flex">
          <Link href="/dashboard/professionform">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
      <Card className="">
        <div className="relative h-48 bg-gradient-to-r from-purple-500 to-blue-600"></div>
        <CardContent className="relative -mt-16 px-6">
          <div className="mt-4 flex flex-col items-center md:flex-row md:items-start">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={userData.avatar_url} alt={userData.fullName} />
              <AvatarFallback style={{ width: '63px', height: '63px' }}>
                {userData.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="mt-4 text-center md:ml-6 md:mt-0 md:text-left">
              <h2 className="text-2xl font-bold">{userData.fullName}</h2>
              <p className="text-gray-500">Attorney</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleEditClick}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-4 mt-4 mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-gray-500" />
              <span>{userData.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-gray-500" />
              <span>{userData.phone}</span>
            </div>
            <div className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-gray-500" />
              <span>Bar Number: {userData.barNumber}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="mr-2 h-5 w-5 text-gray-500" />
              <span>{userData.lawFirmName}</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-4 mt-4">
            <h3 className="mb-2 text-xl font-semibold">Practice Areas</h3>
            <p className="text-gray-700">{userData.practiceAreas}</p>
          </div>

          <Separator className="my-6" />

          <div className="mb-4 mt-4">
            <h3 className="mb-2 text-xl font-semibold">Professional Bio</h3>
            <p className="text-gray-700">{userData.bio}</p>
          </div>

          <Separator className="my-6" />

          <div className="mb-4 mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Education</h3>
              <p className="text-gray-700">{userData.education}</p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Experience</h3>
              <p className="text-gray-700">
                {userData.yearsOfExperience} years
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );

  return (
    <>
      {userData.role === 'buyer' && renderBuyerProfile()}
      {userData.role === 'seller' && renderSellerProfile()}
      {userData.role === 'agent' && renderAgentProfile()}
      {userData.role === 'professional' && renderProfessionalProfile()}
      {userData.role === 'landinspector' && renderLandInspectorProfile()}
      {userData.role === 'attorney' && renderAttorneyProfile()}
    </>
  );
};

export default UserProfile;
