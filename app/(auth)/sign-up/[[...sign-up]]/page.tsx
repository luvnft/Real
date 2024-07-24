'use client'

import Link from 'next/link';
import { useState } from 'react';
import { useSignUp } from "@clerk/nextjs";
import { useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import axios from 'axios';

const supabase = createClient('https://tbnfcmekmqbhxfvrzmbp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmZjbWVrbXFiaHhmdnJ6bWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA4NTI5MjUsImV4cCI6MjAzNjQyODkyNX0.M5pBYdFpa3oonK4yXrW0hDsjhrlq7NNjB5p7PY4DmCI');

export default function AuthenticationPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState('');

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
      });

      await result.prepareEmailAddressVerification({ strategy: "email_code" });
      console.log("User role:", role);
      setVerifying(true);
    } catch (err) {
      console.error("Error during sign up:", err);
      setError("An error occurred during sign up.");
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      } else {
        await setActive({ session: completeSignUp.createdSessionId });
        const userId = completeSignUp.createdUserId;

        const response = await axios.post('/api/create-stripe-account', { email });
        const stripeAccountId = response.data.stripeAccountId;

        const { data, error } = await supabase.from('users').insert([
          { userid: userId, email: email, role: role, stripe_account_id: stripeAccountId }
        ]);

        if (error) throw error;
        console.log(`User added to ${role}s table:`, data);
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error("Error during verification:", err);
      setError("An error occurred during verification.");
    }
  };

  if (verifying) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Verify your email</CardTitle>
            <CardDescription>Weve sent a verification code to your email. Please enter it below.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerification}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="code">Verification Code</Label>
                  <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleVerification}>Verify</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        {/* Left side content */}
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>Enter your details below to create your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="role">Role</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="buyer">Buyer</SelectItem>
                        <SelectItem value="seller">Seller</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                        <SelectItem value="landinspector">Inspector</SelectItem>
                        <SelectItem value="attorney">Attorney</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className='w-full' onClick={handleSubmit}>Sign Up</Button>
            </CardFooter>
          </Card>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
         
        </div>
      </div>
    </div>
  );
}