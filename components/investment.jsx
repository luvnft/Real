'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Vapi from '@vapi-ai/web';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Home, DollarSign, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

// Initialize Supabase client
const supabase = createClient(
  'https://tbnfcmekmqbhxfvrzmbp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmZjbWVrbXFiaHhmdnJ6bWJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDg1MjkyNSwiZXhwIjoyMDM2NDI4OTI1fQ.QPyLbV_M2ZGvw_bpbpPZui4HBtODsDHhFR92p4Yos1I'
);

export default function PropertyPage() {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    name: '',
    type: '',
    price: '',
    roi: '',
    userid: '',
    ai_prompt: ''
  });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [vapi, setVapi] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchProperties();
    }

    // Initialize Vapi
    const vapiInstance = new Vapi('67b304bb-8cc0-4f4a-91fd-ebd0538e00d8');
    setVapi(vapiInstance);

    // Set up event listeners
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

    // Clean up
    return () => {
      if (vapiInstance) {
        vapiInstance.stop();
      }
    };
  }, [user]);

  const fetchProperties = async () => {
    if (!user) return;

    const { data, error } = await supabase.from('investment').select('*');

    if (error) console.error('Error fetching properties:', error);
    else setProperties(data);
  };

  const handleInputChange = (e) => {
    setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error('No user logged in');
      return;
    }

    const propertyWithUserId = {
      ...newProperty,
      userid: user.id
    };

    const { data, error } = await supabase
      .from('investment')
      .insert([propertyWithUserId]);

    if (error) console.error('Error adding property:', error);
    else {
      fetchProperties();
      setNewProperty({
        name: '',
        type: '',
        price: '',
        roi: '',
        userid: '',
        ai_prompt: ''
      });
    }
  };

  const handleInvestNow = (property) => {
    setSelectedProperty(property);
  };

  const startCall = () => {
    if (vapi && selectedProperty) {
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
              content:
                selectedProperty.ai_prompt ||
                'You are a helpful assistant for discussing real estate investments.'
            }
          ]
        },
        voice: {
          provider: 'playht',
          voiceId: 'jennifer'
        },
        name: 'Property Assistant'
      });
    }
  };

  const stopCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  return (
    <div className="">
      <div className="mb-4 flex items-center justify-between space-y-2">
        <Heading
          title="Investment Section"
          description="Get Funding for your Real-Esatate Property in few Clicks"
        />
        <div className="hidden items-center space-x-2 md:flex">
          <Link href="/dashboard">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Request Help
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <Tabs defaultValue="listings" className="w-full p-4">
          <TabsList>
            <TabsTrigger value="listings">Property Listings</TabsTrigger>
            <TabsTrigger value="add">Add Property</TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <Card key={property.id}>
                  <CardHeader>
                    <CardTitle>{property.name}</CardTitle>
                    <CardDescription>{property.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="flex items-center">
                      <DollarSign className="mr-2" /> Price: $
                      {parseFloat(property.price).toLocaleString()}
                    </p>
                    <p className="mt-2 flex items-center">
                      <Home className="mr-2" /> ROI: {property.roi}%
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button onClick={() => handleInvestNow(property)}>
                          Invest Now
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="overflow-y-auto">
                        <SheetHeader>
                          <SheetTitle>{selectedProperty?.name}</SheetTitle>
                          <SheetDescription>
                            Property Details and AI Assistant
                          </SheetDescription>
                        </SheetHeader>
                        <div className="mt-4 mt-6 space-y-6">
                          <Card>
                            <CardHeader>
                              <CardTitle>Property Information</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">Type:</span>
                                <span>{selectedProperty?.type}</span>
                              </div>
                              <Separator />
                              <div className="flex items-center justify-between">
                                <span className="font-medium">Price:</span>
                                <span>
                                  $
                                  {parseFloat(
                                    selectedProperty?.price
                                  ).toLocaleString()}
                                </span>
                              </div>
                              <Separator />
                              <div className="flex items-center justify-between">
                                <span className="font-medium">ROI:</span>
                                <span>{selectedProperty?.roi}%</span>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>AI Assistant</CardTitle>
                              <CardDescription>
                                Chat about this property investment
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="flex space-x-2">
                                  <Button
                                    onClick={startCall}
                                    disabled={isCallActive}
                                  >
                                    {isCallActive
                                      ? 'Call in Progress'
                                      : 'Start Call'}
                                  </Button>
                                  <Button
                                    onClick={stopCall}
                                    disabled={!isCallActive}
                                    variant="outline"
                                  >
                                    End Call
                                  </Button>
                                </div>
                                <div className="rounded-md bg-muted p-4">
                                  <h4 className="mb-2 font-semibold">
                                    AI Prompt:
                                  </h4>
                                  <p className="text-sm">
                                    {selectedProperty?.ai_prompt ||
                                      'No prompt specified'}
                                  </p>
                                </div>
                                {message && (
                                  <div className="rounded-md bg-muted p-4">
                                    <h4 className="mb-2 font-semibold">
                                      Last Message:
                                    </h4>
                                    <pre className="whitespace-pre-wrap text-sm">
                                      {message}
                                    </pre>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>List Your Property</CardTitle>
                <CardDescription>
                  Add your property details below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={newProperty.name}
                        onChange={handleInputChange}
                        placeholder="Enter property name"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="type">Type</Label>
                      <Input
                        id="type"
                        name="type"
                        value={newProperty.type}
                        onChange={handleInputChange}
                        placeholder="e.g., Apartment, House, Commercial"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={newProperty.price}
                        onChange={handleInputChange}
                        placeholder="Enter price"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="roi">Expected ROI (%)</Label>
                      <Input
                        id="roi"
                        name="roi"
                        type="number"
                        step="0.1"
                        value={newProperty.roi}
                        onChange={handleInputChange}
                        placeholder="Enter expected ROI"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="ai_prompt">AI Prompt</Label>
                      <Input
                        id="ai_prompt"
                        name="ai_prompt"
                        value={newProperty.ai_prompt}
                        onChange={handleInputChange}
                        placeholder="Enter AI prompt for property analysis"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4">
                    Add Property
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
