'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import Link from 'next/link';
import { Plus, Code } from 'lucide-react';
import Confetti from 'react-confetti';

// Initialize Supabase client
const supabase = createClient(
  'https://tbnfcmekmqbhxfvrzmbp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmZjbWVrbXFiaHhmdnJ6bWJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDg1MjkyNSwiZXhwIjoyMDM2NDI4OTI1fQ.QPyLbV_M2ZGvw_bpbpPZui4HBtODsDHhFR92p4Yos1I'
);

export default function PropertyListingForm() {
  const { user } = useUser();
  const [showConfetti, setShowConfetti] = useState(false);

  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0
  });

  const detectSize = useCallback(() => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    detectSize();
    return () => window.removeEventListener('resize', detectSize);
  }, [detectSize]);

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zip: '',
    propertytype: '',
    bedrooms: '',
    bathrooms: '',
    squarefootage: '',
    lotsize: '',
    price: '',
    sellername: '',
    selleremail: '',
    sellerphone: '',
    description: '',
    listingtype: '',
    securitydeposit: '',
    rentalprice: ''
  });
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [createdListingId, setCreatedListingId] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSelectChange = (id, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!image) return null;

    const fileExt = image.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    try {
      setUploading(true);
      const { error: uploadError } = await supabase.storage
        .from('rentalinformation')
        .upload(filePath, image);

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
        error: urlError
      } = supabase.storage.from('rentalinformation').getPublicUrl(filePath);

      if (urlError) {
        throw urlError;
      }

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error.message);
      setError('Failed to upload image. Please try again.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!user) {
      setError('No user logged in');
      return;
    }

    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage();
        if (!imageUrl) return; // Stop if image upload failed
      }

      const { data, error } = await supabase
        .from('rentalinformation')
        .insert([
          {
            userid: user.id,
            ...formData,
            image_url: imageUrl
          }
        ])
        .select();

      if (error) throw error;

      console.log('Property listing added successfully:', data);
      setShowConfetti(true);
      setSuccess(true);
      setCreatedListingId(data[0].id);

      console.log(data);
      // Reset form
      setFormData({
        address: '',
        city: '',
        state: '',
        zip: '',
        propertytype: '',
        bedrooms: '',
        bathrooms: '',
        squarefootage: '',
        lotsize: '',
        price: '',
        sellername: '',
        selleremail: '',
        sellerphone: '',
        description: '',
        listingtype: '',
        securitydeposit: '',
        rentalprice: ''
      });
      setImage(null);
    } catch (error) {
      console.error('Error inserting property listing:', error.message);
      setError('Failed to create property listing. Please try again.');
    }
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={1000}
          gravity={0.5}
          initialVelocityY={20}
          initialVelocityX={10}
          explosionForce={5}
          colors={[
            '#ff0000',
            '#00ff00',
            '#0000ff',
            '#ffff00',
            '#ff00ff',
            '#00ffff'
          ]}
        />
      )}

      <div className="mb-4 flex items-center justify-between space-y-2">
        <Heading
          title="List Your Property"
          description="Use our AI-Integrated restate tools and make ease of using the Platform"
        />
        <div className="hidden items-center space-x-2 md:flex">
          <Link href="/dashboard/professionform">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </Link>
        </div>
      </div>

      <Separator />

      <Card className="">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Fill all the Details{' '}
          </CardTitle>
          <CardDescription>
            Enter the details below to advertise your property.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          {success && (
            <div className="mb-4 text-green-500">
              Property listing created successfully!
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main St"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city" className="text-sm font-medium">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="San Francisco"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="state" className="text-sm font-medium">
                    State
                  </Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="CA"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="zip" className="text-sm font-medium">
                    Zip Code
                  </Label>
                  <Input
                    id="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    placeholder="94101"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="propertytype" className="text-sm font-medium">
                  Property Type
                </Label>
                <Select
                  id="propertytype"
                  value={formData.propertytype}
                  onValueChange={(value) =>
                    handleSelectChange('propertytype', value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-family">
                      Single-Family Home
                    </SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="multi-family">Multi-Family</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bedrooms" className="text-sm font-medium">
                    Bedrooms
                  </Label>
                  <Select
                    id="bedrooms"
                    value={formData.bedrooms}
                    onValueChange={(value) =>
                      handleSelectChange('bedrooms', value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bathrooms" className="text-sm font-medium">
                    Bathrooms
                  </Label>
                  <Select
                    id="bathrooms"
                    value={formData.bathrooms}
                    onValueChange={(value) =>
                      handleSelectChange('bathrooms', value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="squarefootage"
                    className="text-sm font-medium"
                  >
                    Square Footage
                  </Label>
                  <Input
                    id="squarefootage"
                    type="number"
                    value={formData.squarefootage}
                    onChange={handleInputChange}
                    placeholder="2000"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lotsize" className="text-sm font-medium">
                    Lot Size (sq ft)
                  </Label>
                  <Input
                    id="lotsize"
                    type="number"
                    value={formData.lotsize}
                    onChange={handleInputChange}
                    placeholder="5000"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="listingtype" className="text-sm font-medium">
                  Listing Type
                </Label>
                <Select
                  id="listingtype"
                  value={formData.listingtype}
                  onValueChange={(value) =>
                    handleSelectChange('listingtype', value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select listing type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.listingtype === 'sale' && (
                <div className="grid gap-2">
                  <Label htmlFor="price" className="text-sm font-medium">
                    Sale Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="500000"
                    required
                  />
                </div>
              )}
              {formData.listingtype === 'rent' && (
                <>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="rentalprice"
                      className="text-sm font-medium"
                    >
                      Rental Price (per month)
                    </Label>
                    <Input
                      id="rentalprice"
                      type="number"
                      value={formData.rentalprice}
                      onChange={handleInputChange}
                      placeholder="2000"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="securitydeposit"
                      className="text-sm font-medium"
                    >
                      Security Deposit
                    </Label>
                    <Input
                      id="securitydeposit"
                      type="number"
                      value={formData.securitydeposit}
                      onChange={handleInputChange}
                      placeholder="3000"
                      required
                    />
                  </div>
                </>
              )}
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sellername" className="text-sm font-medium">
                  Seller Name
                </Label>
                <Input
                  id="sellername"
                  value={formData.sellername}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="selleremail" className="text-sm font-medium">
                  Seller Email
                </Label>
                <Input
                  id="selleremail"
                  type="email"
                  value={formData.selleremail}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sellerphone" className="text-sm font-medium">
                  Seller Phone
                </Label>
                <Input
                  id="sellerphone"
                  type="tel"
                  value={formData.sellerphone}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Property Description
                </Label>
                <Textarea
                  id="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your property..."
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="images" className="text-sm font-medium">
                  Upload Image
                </Label>
                <Input
                  id="images"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {image && <p className="text-sm text-gray-500">{image.name}</p>}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={uploading}>
              {uploading ? 'Uploading...' : 'List Property'}
            </Button>
          </div>
        </CardFooter>
      </Card>

      {success && (
        <Card className="mx-auto max-w-4xl p-6 sm:p-8 md:p-10">
          <CardContent>
            {createdListingId && (
              <div className="mt-4">
                <p
                  className="mb-2 font-semibold"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Code className="mr-2 h-4 w-4" />
                  Use this code to embed your listing:
                </p>
                <pre
                  style={{
                    padding: '10px',
                    background: '#2b2727',
                    borderRadius: '10px'
                  }}
                >
                  <code>{`<iframe src="http://localhost:3000/kanban/${createdListingId}" />`}</code>
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
