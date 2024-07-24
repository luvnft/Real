'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useUser } from '@clerk/nextjs';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
// Initialize Supabase client
const supabase = createClient('https://tbnfcmekmqbhxfvrzmbp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmZjbWVrbXFiaHhmdnJ6bWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA4NTI5MjUsImV4cCI6MjAzNjQyODkyNX0.M5pBYdFpa3oonK4yXrW0hDsjhrlq7NNjB5p7PY4DmCI');

export default function Component() {
  const { user, isLoaded } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phno, setPhno] = useState('');
  const [location, setLocation] = useState('');
  const [about, setAbout] = useState('');
  const [propertiessold, setPropertiesSold] = useState('');
  const [totalsales, setTotalSales] = useState('');
  const [clientrating, setClientRating] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isLoaded && user) {
      fetchUserData();
    }
  }, [isLoaded, user]);

  const fetchUserData = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('userid', user.id)
      .single();

    if (error) {
      console.error('Error fetching user data:', error);
    } else if (data) {
      setName(data.name || '');
      setEmail(user.primaryEmailAddress?.emailAddress || '');
      setPhno(data.phno || '');
      setLocation(data.location || '');
      setAbout(data.about || '');
      setPropertiesSold(data.propertiessold || '');
      setTotalSales(data.totalsales || '');
      setClientRating(data.clientrating || '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          userid: user.id,
          name: name,
          email: email,
          phno: phno,
          location: location,
          about: about,
          propertiessold: propertiessold,
          totalsales: totalsales,
          clientrating: clientrating
        });

      if (error) throw error;

      console.log('User profile updated in Supabase');
      setMessage('Profile updated successfully');
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage("An error occurred while updating the profile.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
    
    <div className="flex items-center justify-between space-y-2 mb-4">
        <Heading title="Update your Profile" description="Use our AI-Integrated restate tools and make ease of using the Platform"   />
          <div className="hidden items-center space-x-2 md:flex">
           
          <Button 
  
>
  Go Back
</Button>

          </div>
        </div>
      
        <Separator />


    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
        <CardDescription>Manage your personal information and settings.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phno">Phone Number</Label>
            <Input id="phno" type="tel" value={phno} onChange={(e) => setPhno(e.target.value)} placeholder="Enter your phone number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter your location" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="about">About</Label>
            <Textarea id="about" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="Enter your about information" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="propertiessold">Properties Sold</Label>
            <Input id="propertiessold" type="number" value={propertiessold} onChange={(e) => setPropertiesSold(e.target.value)} placeholder="Enter properties sold" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalsales">Total Sales</Label>
            <Input id="totalsales" type="number" value={totalsales} onChange={(e) => setTotalSales(e.target.value)} placeholder="Enter total sales" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientrating">Client Rating</Label>
            <Input id="clientrating" type="number" value={clientrating} onChange={(e) => setClientRating(e.target.value)} placeholder="Enter client rating" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Save Changes'}
          </Button>
          {message && <p className="mt-2 text-sm text-center">{message}</p>}
        </CardFooter>
      </form>
    </Card>
    </>
  )
}