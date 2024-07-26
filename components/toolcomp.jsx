'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import {
  Plus,
  Calculator,
  Home,
  FileText,
  Paintbrush,
  BarChart2
} from 'lucide-react';

// Import your calculator components
import ROICalculator from './roicalculator';
import MortgageCalculator from './mortagecalucltor';
import ListingDocument from './listingdocument';
import PropertyCompare from './propertycompare';
import InteriorDesign from './roomdesign';

const RealEstateToolsPage = () => {
  const [activeTab, setActiveTab] = useState('roi');

  const tools = [
    {
      id: 'roi',
      name: 'ROI',
      component: <ROICalculator />,
      icon: <Calculator className="mr-2 h-4 w-4" />
    },
    {
      id: 'mortgage',
      name: 'Mortgage',
      component: <MortgageCalculator />,
      icon: <Home className="mr-2 h-4 w-4" />
    },
    {
      id: 'document',
      name: 'Document',
      component: <ListingDocument />,
      icon: <FileText className="mr-2 h-4 w-4" />
    },
    {
      id: 'design',
      name: 'Design',
      component: <InteriorDesign />,
      icon: <Paintbrush className="mr-2 h-4 w-4" />
    },
    {
      id: 'property',
      name: 'Compare',
      component: <PropertyCompare />,
      icon: <BarChart2 className="mr-2 h-4 w-4" />
    }
  ];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between space-y-2">
        <Heading
          title="Real-Estate Tool Section"
          description="You will get all the tools required in Real-Estate to help in your journey"
        />
        <div className="hidden items-center space-x-2 md:flex">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Request New Tool
          </Button>
        </div>
      </div>

      <Separator />

      <Card className="mt-4" style={{ borderRadius: '1px' }}>
        <CardContent className="mt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList
              className="grid w-full grid-cols-2 lg:grid-cols-5"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              {tools.map((tool) => (
                <TabsTrigger
                  key={tool.id}
                  value={tool.id}
                  className="flex items-center"
                >
                  {tool.icon}
                  {tool.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {tools.map((tool) => (
              <TabsContent key={tool.id} value={tool.id}>
                {tool.component}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealEstateToolsPage;
