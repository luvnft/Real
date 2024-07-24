'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import supabase from '@/lib/supabaseClient';
import { useToast } from '../ui/use-toast';
import FileUpload from '../file-upload';

const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string()
});

export const IMG_MAX_LIMIT = 3;

const formSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  imgUrl: z.array(ImgSchema).optional(),
  company: z.string().min(3, { message: 'Company name must be at least 3 characters' }),
  totalSalesVolume: z.coerce.number().nonnegative(),
  propertiesSold: z.coerce.number().int().nonnegative(),
  totalRentalVolume: z.coerce.number().nonnegative()
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any | null;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Broker' : 'Add Broker';
  const description = initialData ? 'Edit broker information.' : 'List yourself as a Broker';
  const toastMessage = initialData ? 'Broker updated.' : 'New Broker Added.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData
    ? initialData
    : {
        name: '',
        company: '',
        totalSalesVolume: 0,
        propertiesSold: 0,
        totalRentalVolume: 0,
        imgUrl: []
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('brokerdetails')
        .insert({
         // id: initialData?.id, // Include this for updates, it will be ignored for inserts
          name: data.name,
          company: data.company,
          total_sales_volume: data.totalSalesVolume,
          properties_sold: data.propertiesSold,
          total_rental_volume: data.totalRentalVolume,
          image_url: data.imgUrl?.[0]?.url || null // Use the first image URL if available, otherwise null
        });

      if (error) throw error;

      
      toast({
        title: "Success",
        description: toastMessage
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image (Optional)</FormLabel>
                <FormControl>
                
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalSalesVolume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Sales Volume</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="propertiesSold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Properties Sold</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalRentalVolume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Rental Volume</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};