'use client'
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useUser } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient('https://tbnfcmekmqbhxfvrzmbp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmZjbWVrbXFiaHhmdnJ6bWJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDg1MjkyNSwiZXhwIjoyMDM2NDI4OTI1fQ.QPyLbV_M2ZGvw_bpbpPZui4HBtODsDHhFR92p4Yos1I');

export default function ProfessionalProfileForm() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    fullName: '',
    profession: '',
    email: '',
    phone: '',
    city: '',  // Added city field
    about: '',
    skills: '',
    experience: '',
    aiContent: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        fullName: user.fullName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prevData => ({
      ...prevData,
      profession: value
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.profession) newErrors.profession = 'Profession is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.city) newErrors.city = 'City is required';  // Added city validation
    if (!formData.about) newErrors.about = 'About section is required';
    if (!formData.skills) newErrors.skills = 'Skills are required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.aiContent) newErrors.aiContent = 'AI Content is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const { data, error } = await supabase
          .from('professionals')
          .insert({
            userid: user.id,
            ...formData
          });

        if (error) throw error;
        console.log('Profile saved successfully:', data);
        // Here you can add a success message or redirect the user
      } catch (error) {
        console.error('Error saving profile:', error);
        // Here you can set an error state and display it to the user
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Professional Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="profession">Profession</Label>
            <Select onValueChange={handleSelectChange} value={formData.profession}>
              <SelectTrigger>
                <SelectValue placeholder="Select your profession" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="software_engineer">Software Engineer</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="marketer">Marketer</SelectItem>
                {/* Add more professions as needed */}
              </SelectContent>
            </Select>
            {errors.profession && <p className="text-red-500 text-sm">{errors.profession}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="New York"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1234567890"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="about">About</Label>
            <Textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              rows={4}
            />
            {errors.about && <p className="text-red-500 text-sm">{errors.about}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, Python"
            />
            <p className="text-sm text-gray-500">Separate skills with commas</p>
            {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Work Experience</Label>
            <Textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="List your previous work experience"
              rows={4}
            />
            {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="aiContent">AI Assistant Content</Label>
            <Textarea
              id="aiContent"
              name="aiContent"
              value={formData.aiContent}
              onChange={handleChange}
              placeholder="Provide content for your AI assistant to use"
              rows={6}
            />
            <p className="text-sm text-gray-500">This content will be used by your AI assistant to provide personalized responses</p>
            {errors.aiContent && <p className="text-red-500 text-sm">{errors.aiContent}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}