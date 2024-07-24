'use client'
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Initialize Supabase client
const supabase = createClient('https://tbnfcmekmqbhxfvrzmbp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmZjbWVrbXFiaHhmdnJ6bWJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDg1MjkyNSwiZXhwIjoyMDM2NDI4OTI1fQ.QPyLbV_M2ZGvw_bpbpPZui4HBtODsDHhFR92p4Yos1I');

export default function RoomInteriorGenerator() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'image/png') {
        setError('Please upload a PNG image.');
        return;
      }
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const uploadImage = async (file) => {
    const filename = `room_${Date.now()}.png`;
    const { data, error } = await supabase.storage
      .from('rentalinformation')
      .upload(filename, file);

    if (error) {
      throw new Error('Image upload failed: ' + error.message);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('rentalinformation')
      .getPublicUrl(filename);

    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Resize the image
      const resizedImage = await resizeImage(image, 1000, 1000);
      
      // Upload the resized image to Supabase
      const imageUrl = await uploadImage(resizedImage);

      // Call the Stable Diffusion API
      const response = await fetch('https://stablediffusionapi.com/api/v5/interior', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: 'yEUXUFfNDwuFKFLHBDcOCZmNorZ6gDdvA3gLnaS2ONlF78kvDoy85sG73Ihn',
          init_image: imageUrl,
          prompt: prompt,
          steps: 50,
          guidance_scale: 7,
          controlnet_model: "mlsd",
          controlnet_type: "mlsd",
          scheduler: "EulerAncestralDiscreteScheduler",
          samples: 1,
          safety_checker: "no",
          strength: 1,
          model_id: "realistic-vision-v13",
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setResult(data.output[0]);
      } else {
        setError('API request failed: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      setError('An error occurred: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Room Interior Generator</CardTitle>
        <CardDescription>Upload a PNG room image and enter a prompt to generate a new interior design.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="image">Room Image (PNG only)</Label>
              <Input id="image" type="file" onChange={handleImageUpload} accept="image/png" />
            </div>
            {imageUrl && (
              <img src={imageUrl} alt="Uploaded room" className="w-full h-48 object-cover rounded-md" />
            )}
            <div>
              <Label htmlFor="prompt">Prompt</Label>
              <Input
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the desired interior"
              />
            </div>
            <Button type="submit" disabled={loading || !image || !prompt}>
              {loading ? 'Generating...' : 'Generate Interior'}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {result && (
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2">Generated Interior:</h3>
            <img src={result} alt="Generated interior" className="w-full rounded-md" />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}