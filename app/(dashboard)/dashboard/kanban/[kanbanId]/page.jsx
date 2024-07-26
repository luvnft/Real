'use client';

import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
// Initialize Supabase client
const supabase = createClient(
  'https://tbnfcmekmqbhxfvrzmbp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmZjbWVrbXFiaHhmdnJ6bWJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDg1MjkyNSwiZXhwIjoyMDM2NDI4OTI1fQ.QPyLbV_M2ZGvw_bpbpPZui4HBtODsDHhFR92p4Yos1I'
);

export default function PropertyDetails() {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUserListing, setIsUserListing] = useState(false);
  const { kanbanId } = useParams();

  const [messageForm, setMessageForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

  const handleMessageFormChange = (e) => {
    setMessageForm({ ...messageForm, [e.target.name]: e.target.value });
  };

  const sendMessage = async () => {
    try {
      const { data, error } = await supabase.from('chats').insert({
        listing_id: kanbanId,
        sender_name: messageForm.name,
        sender_email: messageForm.email,
        message: messageForm.message,
        seller_id: property.userid || 'unknown'
      });

      if (error) throw error;

      toast({
        title: 'Message Sent',
        description: 'Your message has been sent to the seller.'
      });

      setMessageForm({ name: '', email: '', message: '' });
      setIsMessageDialogOpen(false);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true);
      try {
        // First, try to fetch from Supabase (user listings)
        const { data: supabaseData, error: supabaseError } = await supabase
          .from('rentalinformation')
          .select('*')
          .eq('id', kanbanId)
          .single();

        if (supabaseData) {
          setProperty(supabaseData);

          setIsUserListing(true);
        } else {
          // If not found in Supabase, fetch from API
          const response = await axios.get(
            `https://realtor-base.p.rapidapi.com/realtor/homedetails`,
            {
              params: { property_id: kanbanId },
              headers: {
                'x-rapidapi-host': 'realtor-base.p.rapidapi.com',
                'x-rapidapi-key':
                  '21584b3dedmshf00016c0cbfb311p1454d5jsnc4044cc9a45b'
              }
            }
          );
          setProperty(response.data.data);
          console.log(response.data.data);
          setIsUserListing(false);
        }
      } catch (err) {
        setError('Failed to fetch property details');
        console.error('Error fetching property details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (kanbanId) {
      fetchPropertyDetails();
    }
  }, [kanbanId]);

  if (loading) {
    return <PropertyDetailsSkeleton />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!property) {
    return <div className="text-center">No property details found.</div>;
  }

  const getOfficePhone = () => {
    if (
      !isUserListing &&
      property.community &&
      property.community.advertisers
    ) {
      const office = property.community.advertisers[0].office;
      if (office && office.phones && office.phones.length > 0) {
        return office.phones[0].number;
      }
    }
    return 'Not available';
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="mb-4 flex items-center justify-between space-y-2">
          <Heading
            title="Property Details"
            description="View detailed information about the selected property"
          />
          <div className="hidden items-center space-x-2 md:flex">
            <Button variant="outline">
              {isUserListing ? property.listingtype : 'API Listing'}
            </Button>
            <Dialog
              open={isMessageDialogOpen}
              onOpenChange={setIsMessageDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>Contact Seller</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Contact Seller</DialogTitle>
                  <DialogDescription>
                    Send a message to the property seller.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={messageForm.name}
                      onChange={handleMessageFormChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={messageForm.email}
                      onChange={handleMessageFormChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="message" className="text-right">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={messageForm.message}
                      onChange={handleMessageFormChange}
                      className="col-span-3"
                      rows={4}
                    />
                  </div>
                </div>
                <Button onClick={sendMessage}>Send Message</Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>
              {isUserListing
                ? `${property.address}, ${property.city}, ${property.state}`
                : `${property.location.address.line}, ${property.location.address.city}, ${property.location.address.state}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                {isUserListing && property.image_url ? (
                  <img
                    src={property.image_url}
                    alt="Property"
                    className="h-auto w-full rounded-lg shadow-lg"
                  />
                ) : (
                  !isUserListing &&
                  (property.primary_photo || property.photos[0]) && (
                    <img
                      src={
                        property.primary_photo
                          ? property.primary_photo.href
                          : property.photos[0].href
                      }
                      alt="Property"
                      className="h-auto w-full rounded-lg shadow-lg"
                    />
                  )
                )}
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-bold">Key Details</h2>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Price</TableCell>
                      <TableCell>
                        {isUserListing
                          ? property.listingtype === 'sale'
                            ? `$${property.price}`
                            : `$${property.rentalprice}/mo`
                          : `$${property.list_price}/mo`}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bedrooms</TableCell>
                      <TableCell>
                        {isUserListing
                          ? property.bedrooms
                          : property.description.beds}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bathrooms</TableCell>
                      <TableCell>
                        {isUserListing
                          ? property.bathrooms
                          : property.description.baths}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Square Feet</TableCell>
                      <TableCell>
                        {isUserListing
                          ? property.squarefootage
                          : property.description.sqft}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Property Type
                      </TableCell>
                      <TableCell>
                        {isUserListing
                          ? property.propertytype
                          : property.description.type}
                      </TableCell>
                    </TableRow>
                    {!isUserListing && (
                      <>
                        <TableRow>
                          <TableCell className="font-medium">
                            Year Built
                          </TableCell>
                          <TableCell>
                            {property.description.year_built}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Price per Sqft
                          </TableCell>
                          <TableCell>${property.price_per_sqft}/sqft</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Office Phone
                          </TableCell>
                          <TableCell>{getOfficePhone()}</TableCell>
                        </TableRow>
                      </>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {!isUserListing && (
              <Tabs defaultValue="features" className="mt-6">
                <TabsList>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="schools">Schools</TabsTrigger>
                  <TabsTrigger value="price-history">Price History</TabsTrigger>
                </TabsList>
                <TabsContent value="features">
                  <Card>
                    <CardHeader>
                      <CardTitle>Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        className=" gap-2"
                        style={{ display: 'flex', flexWrap: 'wrap' }}
                      >
                        {property.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="schools">
                  <Card>
                    <CardHeader>
                      <CardTitle>Nearby Schools</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Distance</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {property.schools.schools
                            .slice(0, 3)
                            .map((school, index) => (
                              <TableRow key={index}>
                                <TableCell>{school.name}</TableCell>
                                <TableCell>
                                  {school.education_levels.join(', ')}
                                </TableCell>
                                <TableCell>{school.rating}/10</TableCell>
                                <TableCell>
                                  {school.distance_in_miles.toFixed(1)} miles
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="price-history">
                  <Card>
                    <CardHeader>
                      <CardTitle>Price History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {property.property_history &&
                      property.property_history.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Event</TableHead>
                              <TableHead>Price</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {property.property_history
                              .slice(0, 5)
                              .map((history, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    {new Date(
                                      history.date
                                    ).toLocaleDateString()}
                                  </TableCell>
                                  <TableCell>{history.event_name}</TableCell>
                                  <TableCell>${history.price}</TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <p>No price history available for this property.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}

            <Card className="mt-6" style={{ marginTop: '20px' }}>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  {isUserListing
                    ? property.description
                    : property.description.text}
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}

function PropertyDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Skeleton className="h-64 w-full" />
            <div>
              <Skeleton className="mb-4 h-8 w-1/2" />
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Skeleton className="mb-4 h-8 w-1/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
