'use client';
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { v4 as uuidv4 } from 'uuid';
// Initialize Supabase client
const supabase = createClient(
  'https://tbnfcmekmqbhxfvrzmbp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmZjbWVrbXFiaHhmdnJ6bWJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDg1MjkyNSwiZXhwIjoyMDM2NDI4OTI1fQ.QPyLbV_M2ZGvw_bpbpPZui4HBtODsDHhFR92p4Yos1I'
);

export default function UserForm() {
  const { user } = useUser();
  const [userRole, setUserRole] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user) {
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tableName = `${userRole}s`;
    const uniqueUserId = uuidv4();

    const { data, error } = await supabase
      .from(tableName)
      .insert({ ...formData, userid: uniqueUserId });

    if (error) {
      console.error('Error submitting form:', error);
    } else {
      alert('Form submitted successfully!');
    }
  };

  if (!userRole) {
    return <div>Loading...</div>;
  }

  const renderFormFields = () => {
    const fields = {
      seller: [
        { name: 'fullName', label: 'Full Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Phone Number', type: 'tel' },
        { name: 'propertyAddress', label: 'Property Address', type: 'text' },
        { name: 'askingPrice', label: 'Asking Price', type: 'number' },
        {
          name: 'numberOfProperties',
          label: 'Number of Properties Selling',
          type: 'number'
        },
        {
          name: 'minimumPrice',
          label: 'Minimum Selling Price',
          type: 'number'
        },
        {
          name: 'maximumPrice',
          label: 'Maximum Selling Price',
          type: 'number'
        },
        { name: 'squareFootage', label: 'Square Footage', type: 'number' },
        { name: 'bedrooms', label: 'Number of Bedrooms', type: 'number' },
        { name: 'bathrooms', label: 'Number of Bathrooms', type: 'number' },
        {
          name: 'propertyDescription',
          label: 'Property Description',
          type: 'textarea'
        },
        { name: 'yearBuilt', label: 'Year Built', type: 'text' }
      ],
      buyer: [
        { name: 'fullName', label: 'Full Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Phone Number', type: 'tel' },
        { name: 'desiredLocation', label: 'Desired Location', type: 'text' },
        { name: 'budget', label: 'Budget', type: 'number' },
        { name: 'minBedrooms', label: 'Minimum Bedrooms', type: 'number' },
        { name: 'minBathrooms', label: 'Minimum Bathrooms', type: 'number' },
        {
          name: 'minSquareFootage',
          label: 'Minimum Square Footage',
          type: 'number'
        },
        {
          name: 'additionalRequirements',
          label: 'Additional Requirements',
          type: 'textarea'
        },
        {
          name: 'preApprovalStatus',
          label: 'Pre-approval Status',
          type: 'text'
        }
      ],
      agent: [
        { name: 'fullName', label: 'Full Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Phone Number', type: 'tel' },
        { name: 'licenseNumber', label: 'License Number', type: 'text' },
        { name: 'brokerageName', label: 'Brokerage Name', type: 'text' },
        { name: 'specialization', label: 'Specialization', type: 'text' },
        {
          name: 'yearsOfExperience',
          label: 'Years of Experience',
          type: 'number'
        },
        { name: 'bio', label: 'Professional Bio', type: 'textarea' },
        { name: 'serviceAreas', label: 'Service Areas', type: 'text' },
        { name: 'website', label: 'Website URL', type: 'url' }
      ],
      attorney: [
        { name: 'fullName', label: 'Full Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Phone Number', type: 'tel' },
        { name: 'barNumber', label: 'Bar Number', type: 'text' },
        { name: 'lawFirmName', label: 'Law Firm Name', type: 'text' },
        { name: 'practiceAreas', label: 'Practice Areas', type: 'textarea' },
        {
          name: 'yearsOfExperience',
          label: 'Years of Experience',
          type: 'number'
        },
        { name: 'bio', label: 'Professional Bio', type: 'textarea' },
        { name: 'education', label: 'Education', type: 'text' },
        { name: 'website', label: 'Website URL', type: 'url' }
      ],
      professional: [
        { name: 'fullName', label: 'Full Name', type: 'text' },
        { name: 'profession', label: 'Profession', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Phone Number', type: 'tel' },
        { name: 'city', label: 'City', type: 'text' },
        { name: 'about', label: 'About', type: 'textarea' },
        { name: 'skills', label: 'Skills', type: 'textarea' },
        { name: 'experience', label: 'Experience', type: 'textarea' },
        { name: 'aiContent', label: 'AI Content', type: 'textarea' }
      ],
      landinspector: [
        { name: 'fullName', label: 'Full Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Phone Number', type: 'tel' },
        { name: 'licenseNumber', label: 'License Number', type: 'text' },
        { name: 'certifications', label: 'Certifications', type: 'textarea' },
        {
          name: 'yearsOfExperience',
          label: 'Years of Experience',
          type: 'number'
        },
        { name: 'specializations', label: 'Specializations', type: 'textarea' },
        { name: 'serviceAreas', label: 'Service Areas', type: 'text' },
        {
          name: 'inspectionTypes',
          label: 'Types of Inspections Offered',
          type: 'textarea'
        },
        {
          name: 'availabilitySchedule',
          label: 'Availability Schedule',
          type: 'textarea'
        }
      ]
    };

    return fields[userRole].map((field, index) => (
      <div key={index} className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={field.name}>{field.label}</Label>
        {field.type === 'textarea' ? (
          <Textarea
            id={field.name}
            name={field.name}
            placeholder={field.label}
            onChange={handleInputChange}
            required
          />
        ) : (
          <Input
            type={field.type}
            id={field.name}
            name={field.name}
            placeholder={field.label}
            onChange={handleInputChange}
            required
          />
        )}
      </div>
    ));
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          {userRole.charAt(0).toUpperCase() +
            userRole.slice(1).replace('_', ' ')}{' '}
          Form
        </CardTitle>
        <CardDescription>Please fill out the form below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">{renderFormFields()}</div>
          <CardFooter className="flex justify-end pt-6">
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
