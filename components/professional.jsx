'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Search, MapPin, Star, Briefcase } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Phone, Mail, Globe } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Vapi from '@vapi-ai/web';
import { useUser } from '@clerk/nextjs';
// Initialize Supabase client
const supabase = createClient(
  'https://tbnfcmekmqbhxfvrzmbp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmZjbWVrbXFiaHhmdnJ6bWJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDg1MjkyNSwiZXhwIjoyMDM2NDI4OTI1fQ.QPyLbV_M2ZGvw_bpbpPZui4HBtODsDHhFR92p4Yos1I'
);

export default function BeautifiedProfessionalsPage() {
  const [filters, setFilters] = useState({
    location: '',
    specialty: '',
    rating: ''
  });
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('professionals').select('*');

      if (error) throw error;

      setProfessionals(data);
    } catch (error) {
      console.error('Error fetching professionals:', error);
      setError('Failed to fetch professionals. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredProfessionals = useMemo(() => {
    return professionals.filter((professional) => {
      const { location, specialty, rating } = filters;
      return (
        (location === '' ||
          professional.city.toLowerCase() === location.toLowerCase()) &&
        (specialty === '' ||
          professional.profession.toLowerCase() === specialty.toLowerCase()) &&
        (rating === '' || professional.rating >= parseInt(rating))
      );
    });
  }, [professionals, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="mb-4 flex items-center justify-between space-y-2">
        <Heading
          title="Real-Estate Tool Section"
          description="Use our AI-Integrated restate tools and make ease of using the Platform"
        />
        <div className="hidden items-center space-x-2 md:flex">
          <Link href="/dashboard/professionform">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Request New Tool
            </Button>
          </Link>
        </div>
      </div>

      <Card className="" style={{ borderRadius: '1px' }}>
        <main className="container mx-auto px-4 py-8 md:px-6">
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Filter Professionals
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <Select
                value={filters.location}
                onValueChange={(value) => handleFilterChange('location', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  {[...new Set(professionals.map((p) => p.city))].map(
                    (city) => (
                      <SelectItem key={city} value={city.toLowerCase()}>
                        {city}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <Select
                value={filters.specialty}
                onValueChange={(value) =>
                  handleFilterChange('specialty', value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Specialties</SelectItem>
                  {[...new Set(professionals.map((p) => p.profession))].map(
                    (profession) => (
                      <SelectItem
                        key={profession}
                        value={profession.toLowerCase()}
                      >
                        {profession}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <Select
                value={filters.rating}
                onValueChange={(value) => handleFilterChange('rating', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars &amp; Up</SelectItem>
                  <SelectItem value="3">3 Stars &amp; Up</SelectItem>
                </SelectContent>
              </Select>
              <Button className="mb-4 w-full text-white">Apply Filters</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProfessionals.map((professional) => (
              <Card
                key={professional.id}
                className="overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-4">
                  <CardTitle className="mb-2 text-xl font-bold">
                    {professional.fullName}
                  </CardTitle>
                  <p className="mb-4 text-gray-600">{professional.about}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {professional.city}
                    </div>
                    <div className="flex items-center" style={{ gap: '5px' }}>
                      <Briefcase className="mr-1 h-4 w-4" />
                      {professional.profession}
                    </div>
                    <div className="flex items-center">
                      <Star className="mr-1 h-4 w-4 text-yellow-400" />5
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 p-4">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        className="w-full text-white transition-colors duration-300 hover:bg-blue-600"
                        onClick={() => setSelectedProfessional(professional)}
                      >
                        View Profile
                      </Button>
                    </SheetTrigger>

                    <SheetContent className="p-0">
                      <ProfessionalProfile
                        professional={selectedProfessional}
                      />
                    </SheetContent>
                  </Sheet>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProfessionals.length === 0 && (
            <div className="mt-8 rounded-lg bg-gray-100 p-8 text-center text-gray-500">
              <Search className="mx-auto mb-4 h-16 w-16 text-gray-400" />
              <h3 className="mb-2 text-xl font-semibold">
                No professionals found
              </h3>
              <p>
                Try adjusting your filters or search for different criteria.
              </p>
            </div>
          )}
        </main>
      </Card>
    </div>
  );
}

function ProfessionalProfile({ professional }) {
  const [vapi, setVapi] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const vapiInstance = new Vapi('67b304bb-8cc0-4f4a-91fd-ebd0538e00d8');
    setVapi(vapiInstance);

    vapiInstance.on('call-start', () => {
      console.log('Call has started.');
      setIsCallActive(true);
    });

    vapiInstance.on('call-end', () => {
      console.log('Call has ended.');
      setIsCallActive(false);
    });

    vapiInstance.on('message', (msg) => {
      console.log('Received message:', msg);
      setMessage(JSON.stringify(msg, null, 2));
    });

    vapiInstance.on('error', (e) => {
      console.error('Error:', e);
    });

    return () => {
      if (vapiInstance) {
        vapiInstance.stop();
      }
    };
  }, []);

  const startCall = () => {
    if (vapi) {
      vapi.start({
        transcriber: {
          provider: 'deepgram',
          model: 'nova-2',
          language: 'en-US'
        },
        model: {
          provider: 'openai',
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a helpful assistant for ${professional.fullName}, a ${professional.profession}. Use the following content to assist users: ${professional.aiContent}`
            }
          ]
        },
        voice: {
          provider: 'playht',
          voiceId: 'jennifer'
        },
        name: `${professional.fullName} AI Assistant`
      });
    }
  };

  const stopCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  if (!professional) return null;

  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-6 p-6">
        <SheetHeader>
          <div className="flex items-center space-x-4" style={{ gap: '10px' }}>
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={professional.avatar}
                alt={professional.fullName}
              />
              <AvatarFallback style={{ width: '62px', height: '62px' }}>
                {professional.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="text-2xl font-bold">
                {professional.fullName}
              </SheetTitle>
              <p className="text-muted-foreground">{professional.profession}</p>
            </div>
          </div>
        </SheetHeader>

        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            <MapPin className="mr-1 h-3 w-3" />
            {professional.city}
          </Badge>
          <Badge variant="secondary">
            <Star className="mr-1 h-3 w-3" />
            {professional.rating}
          </Badge>
        </div>

        <Separator />

        <SheetDescription>
          <h3 className="mb-2 text-lg font-semibold">About</h3>
          <p className="text-sm text-gray-600">{professional.about}</p>
        </SheetDescription>

        <Card>
          <CardContent className="p-4">
            <h3 className="mb-2 text-lg font-semibold">Contact Information</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{professional.phone || 'N/A'}</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{professional.email || 'N/A'}</span>
              </li>
              <li className="flex items-center">
                <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{professional.website || 'N/A'}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="mb-2 text-lg font-semibold">Professional Details</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Skills: {professional.skills} years</span>
              </li>
              <li className="flex items-center">
                <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Specializations: {professional.profession} </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="mb-2 text-lg font-semibold">AI Assistant</h3>
            <div className="space-y-2" style={{ display: 'grid' }}>
              <Button onClick={startCall} disabled={isCallActive}>
                Start Call
              </Button>
              <Button onClick={stopCall} disabled={!isCallActive}>
                End Call
              </Button>
            </div>
            {message && (
              <div className="mt-4">
                <h4 className="font-semibold">Last Message:</h4>
                <pre className="whitespace-pre-wrap rounded bg-gray-100 p-2 text-sm">
                  {message}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
