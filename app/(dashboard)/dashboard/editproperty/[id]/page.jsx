'use client'

import { useState, useEffect } from 'react'

import { createClient } from '@supabase/supabase-js'
import { useUser } from '@clerk/nextjs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useParams } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';


// Initialize Supabase client
const supabase = createClient('https://tbnfcmekmqbhxfvrzmbp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmZjbWVrbXFiaHhmdnJ6bWJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDg1MjkyNSwiZXhwIjoyMDM2NDI4OTI1fQ.QPyLbV_M2ZGvw_bpbpPZui4HBtODsDHhFR92p4Yos1I');

export default function EditPropertyListing({ params }) {
  
  const { user } = useUser()
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
  })
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const { id } = useParams();

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!user) return

      const { data, error } = await supabase
        .from('rentalinformation')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching property data:', error)
        setError('Failed to fetch property data')
        return
      }

      if (data.userid !== user.id) {
        setError('You do not have permission to edit this property')
        return
      }

      setFormData(data)
    }

    fetchPropertyData()
  }, [user, params.id])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }))
  }

  const handleSelectChange = (id, value) => {
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0])
    }
  }

  const uploadImage = async () => {
    if (!image) return formData.image_url
    
    const fileExt = image.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${user.id}/${fileName}`

    try {
      setUploading(true)
      const { error: uploadError } = await supabase.storage
        .from('rentalinformation')
        .upload(filePath, image)

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl }, error: urlError } = supabase.storage
        .from('rentalinformation')
        .getPublicUrl(filePath)

      if (urlError) {
        throw urlError
      }

      return publicUrl
    } catch (error) {
      console.error('Error uploading image:', error.message)
      setError('Failed to upload image. Please try again.')
      return null
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    
    if (!user) {
      setError('No user logged in')
      return
    }

    try {
      let imageUrl = await uploadImage()
      
      const { error } = await supabase
        .from('rentalinformation')
        .update({
          ...formData,
          image_url: imageUrl || formData.image_url
        })
        .eq('id', params.id)

      if (error) throw error

      setSuccess(true)
      router.push('/dashboard') // Redirect to dashboard after successful update
    } catch (error) {
      console.error('Error updating property listing:', error.message)
      setError('Failed to update property listing. Please try again.')
    }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <>
    <ScrollArea className="h-full">
    <div className="container mx-auto py-10">
      <Heading title="Edit Property Listing" description="Update the details of your property listing." />
      <Separator className="my-6" />
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Property Details</CardTitle>
          <CardDescription>Make changes to your property listing below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" value={formData.address} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={formData.city} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" value={formData.state} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="zip">Zip Code</Label>
                  <Input id="zip" value={formData.zip} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="propertytype">Property Type</Label>
                  <Select id="propertytype" value={formData.propertytype} onValueChange={(value) => handleSelectChange('propertytype', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single-family">Single-Family Home</SelectItem>
                      <SelectItem value="condo">Condominium</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="multi-family">Multi-Family</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input id="bedrooms" type="number" value={formData.bedrooms} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input id="bathrooms" type="number" value={formData.bathrooms} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="squarefootage">Square Footage</Label>
                  <Input id="squarefootage" type="number" value={formData.squarefootage} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="lotsize">Lot Size (sq ft)</Label>
                  <Input id="lotsize" type="number" value={formData.lotsize} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="listingtype">Listing Type</Label>
                  <Select id="listingtype" value={formData.listingtype} onValueChange={(value) => handleSelectChange('listingtype', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            {formData.listingtype === 'sale' && (
              <div>
                <Label htmlFor="price">Sale Price</Label>
                <Input id="price" type="number" value={formData.price} onChange={handleInputChange} required />
              </div>
            )}
            {formData.listingtype === 'rent' && (
              <>
                <div>
                  <Label htmlFor="rentalprice">Rental Price (per month)</Label>
                  <Input id="rentalprice" type="number" value={formData.rentalprice} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="securitydeposit">Security Deposit</Label>
                  <Input id="securitydeposit" type="number" value={formData.securitydeposit} onChange={handleInputChange} required />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="description">Property Description</Label>
              <Textarea id="description" value={formData.description} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="image">Update Image</Label>
              <Input id="image" type="file" onChange={handleFileChange} accept="image/*" />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Update Property'}
          </Button>
        </CardFooter>
      </Card>
      {success && <div className="mt-4 text-green-500">Property listing updated successfully!</div>}
    </div>
    </ScrollArea>
    </>
  )
}