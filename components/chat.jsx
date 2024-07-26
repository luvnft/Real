'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Initialize Supabase client
const supabase = createClient(
  'https://tbnfcmekmqbhxfvrzmbp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmZjbWVrbXFiaHhmdnJ6bWJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDg1MjkyNSwiZXhwIjoyMDM2NDI4OTI1fQ.QPyLbV_M2ZGvw_bpbpPZui4HBtODsDHhFR92p4Yos1I'
);

export default function TabbedMessages() {
  const [propertyChats, setPropertyChats] = useState([]);
  const [professionalChats, setProfessionalChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (user) {
      fetchMessages();
      checkUserRole();
    }
  }, [user]);

  const checkUserRole = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('userid', user.id)
      .single();

    if (data) {
      setUserRole(data.role);
    } else {
      setUserRole('new_user');
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      // Fetch property chats
      const { data: propertyData, error: propertyError } = await supabase
        .from('chats')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      if (propertyError) throw propertyError;
      setPropertyChats(propertyData);

      // Fetch professional chats only if the user is a professional
      if (userRole === 'professional') {
        const { data: professionalData, error: professionalError } =
          await supabase
            .from('professionalchat')
            .select('*')
            .eq('professionid', user.id)
            .order('created_at', { ascending: false });

        if (professionalError) throw professionalError;
        setProfessionalChats(professionalData);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const renderMessages = (messages) => (
    <ScrollArea className="h-[70vh]">
      <div className="mt-4 space-y-4">
        {messages.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <MessageSquare className="mb-4 h-12 w-12 text-gray-400" />
              <p className="text-lg font-semibold text-gray-700">
                No messages yet
              </p>
              <p className="text-sm text-gray-500">
                When you receive messages, they will appear here.
              </p>
            </CardContent>
          </Card>
        ) : (
          messages.map((message) => (
            <Card key={message.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  Message from {message.sender_name}
                </CardTitle>
                <Badge className="ml-2" style={{ width: 'fit-content' }}>
                  {new Date(message.created_at).toLocaleDateString()}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-sm text-gray-600">
                  Email: {message.sender_email}
                </p>
                <p className="text-sm">{message.message}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </ScrollArea>
  );

  return (
    <div className="mb-4">
      <div className="mb-4 flex items-center justify-between space-y-2">
        <Heading
          title="Chat Section"
          description="View messages from potential buyers and professional inquiries"
        />
        <div className="hidden items-center space-x-2 md:flex">
          <Link href="/dashboard">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <Separator />

      <Tabs defaultValue="property" className="mt-4">
        <TabsList>
          <TabsTrigger value="property">Property Chats</TabsTrigger>
          {userRole === 'professional' && (
            <TabsTrigger value="professional">Professional Chats</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="property">
          {renderMessages(propertyChats)}
        </TabsContent>
        {userRole === 'professional' && (
          <TabsContent value="professional">
            {renderMessages(professionalChats)}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
