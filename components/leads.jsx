'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import {
  Plus,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Download,
  Home,
  Briefcase,
  Scale,
  UserCheck,
  ShoppingCart,
  Users,
  Compass
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// Initialize Supabase client
const supabase = createClient(
  'https://tbnfcmekmqbhxfvrzmbp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmZjbWVrbXFiaHhmdnJ6bWJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDg1MjkyNSwiZXhwIjoyMDM2NDI4OTI1fQ.QPyLbV_M2ZGvw_bpbpPZui4HBtODsDHhFR92p4Yos1I'
);

export default function Component() {
  const [userData, setUserData] = useState({
    sellers: [],
    buyers: [],
    agents: [],
    attorneys: [],
    landinspectors: []
  });

  const [filters, setFilters] = useState({
    status: [],
    source: [],
    dateRange: { start: null, end: null },
    priceRange: { min: null, max: null },
    bedroomsRange: { min: null, max: null },
    bathroomsRange: { min: null, max: null },
    squareFootageRange: { min: null, max: null },
    yearBuiltRange: { min: null, max: null },
    agentRating: null,
    specializations: [],
    practiceAreas: [],
    yearsOfExperience: null,
    agentState: '',
    agentCity: '',
    agentCountry: '',
    agentFullName: '',
    inspectionTypes: [],
    serviceAreas: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('sellers');
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  const [selectedLead, setSelectedLead] = useState(null);
  const [isLeadSheetOpen, setIsLeadSheetOpen] = useState(false);

  const userTypeIcons = {
    sellers: <Home className="mr-2 h-4 w-4" />,
    buyers: <ShoppingCart className="mr-2 h-4 w-4" />,
    agents: <UserCheck className="mr-2 h-4 w-4" />,
    attorneys: <Scale className="mr-2 h-4 w-4" />,
    landinspectors: <Compass className="mr-2 h-4 w-4" />
  };

  const openLeadDetails = (lead) => {
    setSelectedLead(lead);
    setIsLeadSheetOpen(true);
  };

  const downloadCSV = (lead) => {
    if (!lead) return;

    // Convert lead object to CSV string
    const headers = Object.keys(lead).join(',');
    const values = Object.values(lead)
      .map((value) => {
        if (typeof value === 'object') {
          return JSON.stringify(value).replace(/"/g, '""');
        }
        return value;
      })
      .join(',');
    const csvContent = `${headers}\n${values}`;

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create a link element and trigger download
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${lead.name}_data.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderMoreFiltersContent = () => {
    switch (activeTab) {
      case 'sellers':
        return (
          <>
            <Label>Price Range</Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceRange: { ...filters.priceRange, min: e.target.value }
                  })
                }
              />
              <Input
                type="number"
                placeholder="Max"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceRange: { ...filters.priceRange, max: e.target.value }
                  })
                }
              />
            </div>
            <Label>Bedrooms</Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    bedroomsRange: {
                      ...filters.bedroomsRange,
                      min: e.target.value
                    }
                  })
                }
              />
              <Input
                type="number"
                placeholder="Max"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    bedroomsRange: {
                      ...filters.bedroomsRange,
                      max: e.target.value
                    }
                  })
                }
              />
            </div>
            <Label>Bathrooms</Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    bathroomsRange: {
                      ...filters.bathroomsRange,
                      min: e.target.value
                    }
                  })
                }
              />
              <Input
                type="number"
                placeholder="Max"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    bathroomsRange: {
                      ...filters.bathroomsRange,
                      max: e.target.value
                    }
                  })
                }
              />
            </div>
            <Label>Square Footage</Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    squareFootageRange: {
                      ...filters.squareFootageRange,
                      min: e.target.value
                    }
                  })
                }
              />
              <Input
                type="number"
                placeholder="Max"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    squareFootageRange: {
                      ...filters.squareFootageRange,
                      max: e.target.value
                    }
                  })
                }
              />
            </div>
            <Label>Year Built</Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    yearBuiltRange: {
                      ...filters.yearBuiltRange,
                      min: e.target.value
                    }
                  })
                }
              />
              <Input
                type="number"
                placeholder="Max"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    yearBuiltRange: {
                      ...filters.yearBuiltRange,
                      max: e.target.value
                    }
                  })
                }
              />
            </div>
          </>
        );
      case 'landinspectors':
        return (
          <>
            <Label>Years of Experience</Label>
            <Input
              type="number"
              onChange={(e) =>
                setFilters({ ...filters, yearsOfExperience: e.target.value })
              }
            />
            <Label>Inspection Types</Label>
            <Input
              type="text"
              onChange={(e) =>
                setFilters({
                  ...filters,
                  inspectionTypes: e.target.value.split(',')
                })
              }
            />
            <Label>Service Areas</Label>
            <Input
              type="text"
              onChange={(e) =>
                setFilters({
                  ...filters,
                  serviceAreas: e.target.value.split(',')
                })
              }
            />
          </>
        );
      case 'buyers':
        return (
          <>
            <Label>Budget Range</Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceRange: { ...filters.priceRange, min: e.target.value }
                  })
                }
              />
              <Input
                type="number"
                placeholder="Max"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceRange: { ...filters.priceRange, max: e.target.value }
                  })
                }
              />
            </div>
            <Label>Minimum Bedrooms</Label>
            <Input
              type="number"
              onChange={(e) =>
                setFilters({
                  ...filters,
                  bedroomsRange: {
                    ...filters.bedroomsRange,
                    min: e.target.value
                  }
                })
              }
            />
            <Label>Minimum Bathrooms</Label>
            <Input
              type="number"
              onChange={(e) =>
                setFilters({
                  ...filters,
                  bathroomsRange: {
                    ...filters.bathroomsRange,
                    min: e.target.value
                  }
                })
              }
            />
            <Label>Minimum Square Footage</Label>
            <Input
              type="number"
              onChange={(e) =>
                setFilters({
                  ...filters,
                  squareFootageRange: {
                    ...filters.squareFootageRange,
                    min: e.target.value
                  }
                })
              }
            />
            <Label>Pre-approval Status</Label>
            <Input
              type="text"
              onChange={(e) =>
                setFilters({ ...filters, preApprovalStatus: e.target.value })
              }
            />
          </>
        );
      case 'agents':
        return (
          <>
            <Label>Agent Rating</Label>
            <Input
              type="number"
              min="1"
              max="5"
              onChange={(e) =>
                setFilters({ ...filters, agentRating: e.target.value })
              }
            />

            <Label>Years of Experience</Label>
            <Input
              type="number"
              onChange={(e) =>
                setFilters({ ...filters, yearsOfExperience: e.target.value })
              }
            />
            <Label>State</Label>
            <Input
              type="text"
              onChange={(e) =>
                setFilters({ ...filters, agentState: e.target.value })
              }
            />
            <Label>City</Label>
            <Input
              type="text"
              onChange={(e) =>
                setFilters({ ...filters, agentCity: e.target.value })
              }
            />
            <Label>Country</Label>
            <Input
              type="text"
              onChange={(e) =>
                setFilters({ ...filters, agentCountry: e.target.value })
              }
            />
            <Label>Full Name</Label>
            <Input
              type="text"
              onChange={(e) =>
                setFilters({ ...filters, agentFullName: e.target.value })
              }
            />
          </>
        );
      case 'attorneys':
        return (
          <>
            <Label>Practice Areas</Label>
            <Input
              type="text"
              onChange={(e) =>
                setFilters({
                  ...filters,
                  practiceAreas: e.target.value.split(',')
                })
              }
            />
            <Label>Years of Experience</Label>
            <Input
              type="number"
              onChange={(e) =>
                setFilters({ ...filters, yearsOfExperience: e.target.value })
              }
            />
            <Label>Bar Number</Label>
            <Input
              type="text"
              onChange={(e) =>
                setFilters({ ...filters, barNumber: e.target.value })
              }
            />
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (activeTab === 'agents') {
      fetchAgents();
    } else {
      fetchData(activeTab);
    }
  }, [activeTab]);

  const fetchData = async (tab) => {
    setIsLoading(true);
    let { data, error } = await supabase.from(tab).select('*');

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      const formattedData = data.map((item) => formatData(item, tab));
      setUserData((prevData) => ({
        ...prevData,
        [tab]: formattedData
      }));
    }
    setIsLoading(false);
  };

  const fetchAgents = async () => {
    setIsLoading(true);
    let { data, error } = await supabase.from('agents').select('*');

    if (error) {
      console.error('Error fetching agents:', error);
    } else {
      const formattedAgents = data.map((agent) => ({
        id: agent.id,
        name: agent.fullName,
        contact: { email: agent.email || 'N/A', phone: agent.phone || 'N/A' },
        status: agent.yearsOfExperience
          ? `Experience: ${agent.yearsOfExperience} years`
          : 'N/A',
        source: agent.brokerageName || 'N/A',
        date: agent.createdAt || 'N/A',
        licenseNumber: agent.licenseNumber || 'N/A',
        specialization: agent.specialization || 'N/A',
        yearsOfExperience: agent.yearsOfExperience || 'N/A',
        bio: agent.bio || 'N/A',
        serviceAreas: agent.serviceAreas || 'N/A',
        website: agent.website || 'N/A'
      }));

      setUserData((prevData) => ({
        ...prevData,
        agents: formattedAgents
      }));
    }
    setIsLoading(false);
  };

  const formatData = (item, tab) => {
    switch (tab) {
      case 'sellers':
        return {
          id: item.id,
          name: item.fullName,
          contact: { email: item.email, phone: item.phone },
          status: item.status || 'New',
          source: item.source || 'Website',
          date: item.created_at,
          propertyAddress: item.propertyAddress,
          askingPrice: item.askingPrice,
          bedrooms: item.bedrooms,
          bathrooms: item.bathrooms
        };
      case 'landinspectors':
        return {
          id: item.id,
          name: item.fullName,
          contact: { email: item.email, phone: item.phone },
          status: item.status || 'Available',
          source: 'Direct',
          date: item.created_at,
          licenseNumber: item.licenseNumber,
          specializations: item.specializations,
          yearsOfExperience: item.yearsOfExperience,
          serviceAreas: item.serviceAreas,
          inspectionTypes: item.inspectionTypes
        };
      case 'buyers':
        return {
          id: item.id,
          name: item.fullName,
          contact: { email: item.email, phone: item.phone },
          status: item.status || 'New',
          source: item.source || 'Website',
          date: item.created_at,
          desiredLocation: item.desiredLocation,
          budget: item.budget,
          minBedrooms: item.minBedrooms,
          minBathrooms: item.minBathrooms
        };
      case 'attorneys':
        return {
          id: item.id,
          name: item.fullName,
          contact: { email: item.email, phone: item.phone },
          status: item.status || 'Available',
          source: item.lawFirmName,
          date: item.created_at,
          barNumber: item.barNumber,
          practiceAreas: item.practiceAreas,
          yearsOfExperience: item.yearsOfExperience
        };
      default:
        return item;
    }
  };

  const renderLeadDetails = () => {
    if (!selectedLead) return null;

    const renderCommonDetails = (lead) => (
      <>
        <Card className="mb-4 mt-4">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Name:</strong> {lead.name}
            </p>
            <p>
              <strong>Email:</strong>{' '}
              {lead.contact?.email || lead.email || 'N/A'}
            </p>
            <p>
              <strong>Phone:</strong>{' '}
              {lead.contact?.phone || lead.phones?.[0]?.number || 'N/A'}
            </p>
          </CardContent>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Lead Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Status:</strong>{' '}
              <Badge variant="outline">{lead.status || 'N/A'}</Badge>
            </p>
            <p>
              <strong>Source:</strong> {lead.source || 'N/A'}
            </p>
            <p>
              <strong>Date Added:</strong>{' '}
              {lead.date || lead.last_updated || 'N/A'}
            </p>
          </CardContent>
        </Card>
      </>
    );

    switch (activeTab) {
      case 'sellers':
        return (
          <>
            {renderCommonDetails(selectedLead)}
            <Card>
              <CardHeader>
                <CardTitle>Property Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Address:</strong>{' '}
                  {selectedLead.propertyAddress || 'N/A'}
                </p>
                <p>
                  <strong>Asking Price:</strong> $
                  {selectedLead.askingPrice || 'N/A'}
                </p>
                <p>
                  <strong>Bedrooms:</strong> {selectedLead.bedrooms || 'N/A'}
                </p>
                <p>
                  <strong>Bathrooms:</strong> {selectedLead.bathrooms || 'N/A'}
                </p>
              </CardContent>
            </Card>
          </>
        );
      case 'landinspectors':
        return (
          <>
            {renderCommonDetails(selectedLead)}
            <Card>
              <CardHeader>
                <CardTitle>Land Inspector Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>License Number:</strong>{' '}
                  {selectedLead.licenseNumber || 'N/A'}
                </p>
                <p>
                  <strong>Specializations:</strong>{' '}
                  {selectedLead.specializations || 'N/A'}
                </p>
                <p>
                  <strong>Years of Experience:</strong>{' '}
                  {selectedLead.yearsOfExperience || 'N/A'}
                </p>
                <p>
                  <strong>Service Areas:</strong>{' '}
                  {selectedLead.serviceAreas || 'N/A'}
                </p>
                <p>
                  <strong>Inspection Types:</strong>{' '}
                  {selectedLead.inspectionTypes || 'N/A'}
                </p>
              </CardContent>
            </Card>
          </>
        );
      case 'buyers':
        return (
          <>
            {renderCommonDetails(selectedLead)}
            <Card>
              <CardHeader>
                <CardTitle>Desired Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Location:</strong>{' '}
                  {selectedLead.desiredLocation || 'N/A'}
                </p>
                <p>
                  <strong>Budget:</strong> ${selectedLead.budget || 'N/A'}
                </p>
                <p>
                  <strong>Minimum Bedrooms:</strong>{' '}
                  {selectedLead.minBedrooms || 'N/A'}
                </p>
                <p>
                  <strong>Minimum Bathrooms:</strong>{' '}
                  {selectedLead.minBathrooms || 'N/A'}
                </p>
              </CardContent>
            </Card>
          </>
        );
      case 'agents':
        return (
          <>
            {renderCommonDetails(selectedLead)}
            <Card>
              <CardHeader>
                <CardTitle>Agent Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>License Number:</strong>{' '}
                  {selectedLead.licenseNumber ||
                    selectedLead.license_number ||
                    'N/A'}
                </p>
                <p>
                  <strong>Specialization:</strong>{' '}
                  {selectedLead.specialization ||
                    selectedLead.specializations?.join(', ') ||
                    'N/A'}
                </p>
                <p>
                  <strong>Years of Experience:</strong>{' '}
                  {selectedLead.yearsOfExperience || 'N/A'}
                </p>
                <p>
                  <strong>Brokerage:</strong>{' '}
                  {selectedLead.source || selectedLead.broker?.name || 'N/A'}
                </p>
                <p>
                  <strong>Rating:</strong> {selectedLead.agent_rating || 'N/A'}
                </p>
              </CardContent>
            </Card>
          </>
        );
      case 'attorneys':
        return (
          <>
            {renderCommonDetails(selectedLead)}
            <Card>
              <CardHeader>
                <CardTitle>Attorney Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Bar Number:</strong> {selectedLead.barNumber || 'N/A'}
                </p>
                <p>
                  <strong>Practice Areas:</strong>{' '}
                  {Array.isArray(selectedLead.practiceAreas)
                    ? selectedLead.practiceAreas.join(', ')
                    : selectedLead.practiceAreas || 'N/A'}
                </p>
                <p>
                  <strong>Years of Experience:</strong>{' '}
                  {selectedLead.yearsOfExperience || 'N/A'}
                </p>
                <p>
                  <strong>Law Firm:</strong> {selectedLead.source || 'N/A'}
                </p>
              </CardContent>
            </Card>
          </>
        );
      default:
        return null;
    }
  };

  const filteredData = useMemo(() => {
    return userData[activeTab].filter((user) => {
      if (filters.status.length > 0 && !filters.status.includes(user.status))
        return false;
      if (filters.source.length > 0 && !filters.source.includes(user.source))
        return false;
      if (
        filters.dateRange.start &&
        new Date(user.date) < new Date(filters.dateRange.start)
      )
        return false;
      if (
        filters.dateRange.end &&
        new Date(user.date) > new Date(filters.dateRange.end)
      )
        return false;

      // Additional filters based on user type
      switch (activeTab) {
        case 'sellers':
          if (
            filters.priceRange.min &&
            user.askingPrice < filters.priceRange.min
          )
            return false;
          if (
            filters.priceRange.max &&
            user.askingPrice > filters.priceRange.max
          )
            return false;
          if (
            filters.bedroomsRange.min &&
            user.bedrooms < filters.bedroomsRange.min
          )
            return false;
          if (
            filters.bedroomsRange.max &&
            user.bedrooms > filters.bedroomsRange.max
          )
            return false;
          if (
            filters.bathroomsRange.min &&
            user.bathrooms < filters.bathroomsRange.min
          )
            return false;
          if (
            filters.bathroomsRange.max &&
            user.bathrooms > filters.bathroomsRange.max
          )
            return false;
          if (
            filters.squareFootageRange.min &&
            user.squareFootage < filters.squareFootageRange.min
          )
            return false;
          if (
            filters.squareFootageRange.max &&
            user.squareFootage > filters.squareFootageRange.max
          )
            return false;
          if (
            filters.yearBuiltRange.min &&
            user.yearBuilt < filters.yearBuiltRange.min
          )
            return false;
          if (
            filters.yearBuiltRange.max &&
            user.yearBuilt > filters.yearBuiltRange.max
          )
            return false;
          break;
        case 'landinspectors':
          if (
            filters.yearsOfExperience &&
            user.yearsOfExperience < filters.yearsOfExperience
          )
            return false;
          if (
            filters.inspectionTypes.length > 0 &&
            !filters.inspectionTypes.some((type) =>
              user.inspectionTypes.includes(type)
            )
          )
            return false;
          if (
            filters.serviceAreas.length > 0 &&
            !filters.serviceAreas.some((area) =>
              user.serviceAreas.includes(area)
            )
          )
            return false;
          break;
        case 'buyers':
          if (filters.priceRange.min && user.budget < filters.priceRange.min)
            return false;
          if (filters.priceRange.max && user.budget > filters.priceRange.max)
            return false;
          if (
            filters.bedroomsRange.min &&
            user.minBedrooms < filters.bedroomsRange.min
          )
            return false;
          if (
            filters.bathroomsRange.min &&
            user.minBathrooms < filters.bathroomsRange.min
          )
            return false;
          if (
            filters.squareFootageRange.min &&
            user.minSquareFootage < filters.squareFootageRange.min
          )
            return false;
          if (
            filters.preApprovalStatus &&
            user.preApprovalStatus !== filters.preApprovalStatus
          )
            return false;
          break;
        case 'agents':
          if (filters.agentRating && user.agent_rating < filters.agentRating)
            return false;
          if (
            filters.specializations.length > 0 &&
            !filters.specializations.some((spec) =>
              user.specializations.includes(spec)
            )
          )
            return false;
          if (
            filters.yearsOfExperience &&
            user.yearsOfExperience < filters.yearsOfExperience
          )
            return false;
          if (
            filters.agentState &&
            user.address.state.toLowerCase() !==
              filters.agentState.toLowerCase()
          )
            return false;
          if (
            filters.agentCity &&
            user.address.city.toLowerCase() !== filters.agentCity.toLowerCase()
          )
            return false;
          if (
            filters.agentCountry &&
            user.address.country.toLowerCase() !==
              filters.agentCountry.toLowerCase()
          )
            return false;
          if (
            filters.agentFullName &&
            !user.full_name
              .toLowerCase()
              .includes(filters.agentFullName.toLowerCase())
          )
            return false;
          break;
        case 'attorneys':
          if (
            filters.practiceAreas.length > 0 &&
            !filters.practiceAreas.some((area) =>
              user.practiceAreas.includes(area)
            )
          )
            return false;
          if (
            filters.yearsOfExperience &&
            user.yearsOfExperience < filters.yearsOfExperience
          )
            return false;
          if (filters.barNumber && user.barNumber !== filters.barNumber)
            return false;
          break;
      }

      return true;
    });
  }, [activeTab, filters, userData]);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between space-y-2">
        <Heading
          title="Get your Leads"
          description="Use our AI-Integrated restate tools and make ease of using the Platform"
        />
        <div className="hidden items-center space-x-2 md:flex">
          <Link href="/dashboard/leadform">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </Link>
        </div>
      </div>

      <Card className="p-4" style={{ borderRadius: '0' }}>
        <Card className="mx-auto mb-4 mt-4 w-full max-w-4xl">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList
              className="grid w-full grid-cols-4"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              {Object.keys(userData).map((userType) => (
                <TabsTrigger
                  key={userType}
                  value={userType}
                  className="capitalize"
                >
                  {userTypeIcons[userType]}
                  {userType}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </Card>

        <Card
          className="mx-auto w-full max-w-4xl"
          style={{ borderRadius: '1px' }}
        >
          <div className="flex-1 overflow-auto">
            <div className="bg-muted px-6 py-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    style={{ border: '1px solid black' }}
                  >
                    <Button variant="outline" className="w-full">
                      <span>Status</span>
                      <ChevronDownIcon className="ml-auto h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {Array.from(
                      new Set(userData[activeTab].map((user) => user.status))
                    ).map((status) => (
                      <DropdownMenuCheckboxItem
                        key={status}
                        checked={filters.status.includes(status)}
                        onCheckedChange={(checked) =>
                          setFilters({
                            ...filters,
                            status: checked
                              ? [...filters.status, status]
                              : filters.status.filter((s) => s !== status)
                          })
                        }
                      >
                        {status}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    style={{ border: '1px solid black' }}
                  >
                    <Button variant="outline" className="w-full">
                      <span>Source</span>
                      <ChevronDownIcon className="ml-auto h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {Array.from(
                      new Set(userData[activeTab].map((user) => user.source))
                    ).map((source) => (
                      <DropdownMenuCheckboxItem
                        key={source}
                        checked={filters.source.includes(source)}
                        onCheckedChange={(checked) =>
                          setFilters({
                            ...filters,
                            source: checked
                              ? [...filters.source, source]
                              : filters.source.filter((s) => s !== source)
                          })
                        }
                      >
                        {source}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="w-full" />
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    style={{ border: '1px solid black' }}
                  >
                    <Sheet
                      open={isFilterSheetOpen}
                      onOpenChange={setIsFilterSheetOpen}
                    >
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full"
                          style={{ border: '1px solid black' }}
                        >
                          <span>More Filters</span>
                          <FilterIcon className="ml-auto h-4 w-4" />
                        </Button>
                      </SheetTrigger>

                      <SheetContent className="overflow-y-auto">
                        <SheetHeader>
                          <SheetTitle>Additional Filters</SheetTitle>
                        </SheetHeader>

                        <div className="grid gap-4 py-4">
                          {renderMoreFiltersContent()}
                        </div>
                        <Button onClick={() => setIsFilterSheetOpen(false)}>
                          Apply Filters
                        </Button>
                      </SheetContent>
                    </Sheet>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuCheckboxItem>
                      Filter by Lead Score
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Filter by Assigned User
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Filter by Tags
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="">
              {isLoading ? (
                <div className="py-4 text-center">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>

                      <TableHead>Status</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>
                        {activeTab === 'sellers'
                          ? 'Property'
                          : activeTab === 'buyers'
                          ? 'Desired'
                          : activeTab === 'landinspectors'
                          ? 'Inspection'
                          : 'Professional'}{' '}
                        Info
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="font-medium">{user.name}</div>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant={
                              user.status === 'New' ? 'secondary' : 'primary'
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.source}</TableCell>
                        <TableCell>{user.date}</TableCell>
                        <TableCell>
                          {activeTab === 'sellers' && (
                            <div>
                              <div>${user.askingPrice}</div>
                            </div>
                          )}
                          {activeTab === 'landinspectors' && (
                            <div>
                              <div>License: {user.licenseNumber}</div>
                              <div>{user.specializations}</div>
                              <div>{user.yearsOfExperience} years exp.</div>
                            </div>
                          )}
                          {activeTab === 'buyers' && (
                            <div>
                              <div>{user.desiredLocation}</div>
                              <div>Budget: ${user.budget}</div>
                              <div>
                                {user.minBedrooms}+ bd {user.minBathrooms}+ ba
                              </div>
                            </div>
                          )}
                          {activeTab === 'agents' && (
                            <div>
                              <div>License: {user.licenseNumber}</div>
                              <div>{user.specialization}</div>
                              <div>{user.yearsOfExperience} years exp.</div>
                            </div>
                          )}
                          {activeTab === 'attorneys' && (
                            <div>
                              <div>Bar: {user.barNumber}</div>
                              <div>{user.practiceAreas}</div>
                              <div>{user.yearsOfExperience} years exp.</div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openLeadDetails(user)}
                            >
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </Card>
      </Card>
      <Sheet open={isLeadSheetOpen} onOpenChange={setIsLeadSheetOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Complete Details</SheetTitle>
            <Button
              onClick={() => selectedLead && downloadCSV(selectedLead)}
              variant="outline"
              className="mt-2"
            >
              <Download className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
          </SheetHeader>

          {renderLeadDetails()}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
