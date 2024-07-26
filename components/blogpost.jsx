// pages/index.js
'use client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import NavBar from '@/components/common/NavBar';
import { ScrollArea } from '@/components/ui/scroll-area';
// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js',
    excerpt:
      'Learn the basics of Next.js and start building awesome React applications.',
    date: '2024-07-25',
    readTime: '5 min read',
    content: `Next.js is a powerful React framework that enables you to build server-side rendered and statically generated web applications with ease. It provides a great developer experience with features like automatic code splitting, optimized performance, and simplified routing.

    To get started with Next.js, follow these steps:

    1. Set up your development environment
    2. Create a new Next.js project
    3. Understand the file structure
    4. Create your first pages
    5. Implement dynamic routing
    6. Add API routes
    7. Deploy your application

    With these basics, you'll be well on your way to creating fantastic web applications using Next.js!
    
    `
  },
  {
    id: 2,
    title: 'Mastering Tailwind CSS',
    excerpt:
      'Dive deep into Tailwind CSS and create beautiful, responsive designs effortlessly.',
    date: '2024-07-24',
    readTime: '7 min read',
    content: `Tailwind CSS is a utility-first CSS framework that allows you to rapidly build custom user interfaces. Unlike traditional CSS frameworks, Tailwind doesn't provide pre-built components. Instead, it gives you low-level utility classes that you can use to build completely custom designs.

    Key concepts to master in Tailwind CSS:

    1. Utility classes
    2. Responsive design
    3. Customization
    4. Plugins
    5. Performance optimization

    By mastering these concepts, you'll be able to create stunning, responsive designs quickly and efficiently.`
  },
  {
    id: 3,
    title: 'The Power of Shadcn UI',
    excerpt:
      'Discover how Shadcn UI can supercharge your React development process.',
    date: '2024-07-23',
    readTime: '6 min read',
    content: `Shadcn UI is a collection of re-usable components built using Radix UI and Tailwind CSS. It provides a set of accessible, customizable components that you can copy and paste into your apps.

    Benefits of using Shadcn UI:

    1. Accessibility out of the box
    2. Customizable components
    3. Dark mode support
    4. TypeScript support
    5. Easy integration with existing projects

    By leveraging Shadcn UI, you can significantly speed up your development process while ensuring your components are accessible and customizable.`
  }
];

const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <>
      <NavBar />
      <div className="container mx-auto py-8">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Latest Blog Posts
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span>{post.date}</span> · <span>{post.readTime}</span>
                </div>
                <Button variant="outline" onClick={() => setSelectedPost(post)}>
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog
          open={!!selectedPost}
          onOpenChange={() => setSelectedPost(null)}
        >
          <DialogContent className="flex h-[90vh] w-full max-w-3xl flex-col p-0">
            {selectedPost && (
              <>
                <DialogHeader className="p-6 pb-2">
                  <DialogTitle className="text-2xl font-bold">
                    {selectedPost.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-500">
                    {selectedPost.date} · {selectedPost.readTime}
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-grow p-6 pt-2">
                  <div className="pr-4">
                    <p className="whitespace-pre-wrap">
                      {selectedPost.content}
                    </p>
                  </div>
                </ScrollArea>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default BlogSection;
