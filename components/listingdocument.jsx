'use client'

import { useState, useRef } from 'react';
import { chatSession } from '@/constants/GeminiAIModel';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Home() {
  const [formData, setFormData] = useState({
    agreementType: 'rent',
    propertyAddress: '',
    partyAName: '',
    partyBName: '',
    startDate: '',
    endDate: '',
    amount: '',
  });
  const [generatedAgreement, setGeneratedAgreement] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const printContentRef = useRef(null);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generateAgreement = async () => {
    setIsLoading(true);
    const prompt = `Generate a ${formData.agreementType} agreement for the following details:
    Property Address: ${formData.propertyAddress}
    Party A: ${formData.partyAName}
    Party B: ${formData.partyBName}
    Start Date: ${formData.startDate}
    End Date: ${formData.endDate}
    Amount: ${formData.amount}
    
    Please provide a formal and legally-sound agreement based on these details. Format the agreement with proper sections, numbered clauses, and include placeholders for signatures at the end.`;

    try {
      const result = await chatSession.sendMessage(prompt);
      const response = await result.response;
      setGeneratedAgreement(response.text());
    } catch (error) {
      console.error('Error generating agreement:', error);
      setGeneratedAgreement('An error occurred while generating the agreement.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Agreement</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            h1 {
              text-align: center;
              color: #2c3e50;
            }
            @media print {
              body {
                width: 21cm;
                height: 29.7cm;
                margin: 30mm 45mm 30mm 45mm;
              }
            }
            .page-break {
              page-break-after: always;
            }
          </style>
        </head>
        <body>
          ${printContentRef.current.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto"  style={{borderRadius:'1px'}} >
        <CardHeader>
          <CardTitle>Agreement Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agreementType">Agreement Type</Label>
              <Select
                value={formData.agreementType}
                onValueChange={(value) => handleInputChange('agreementType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select agreement type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">Rent Agreement</SelectItem>
                  <SelectItem value="property transfer">Property Transfer Agreement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyAddress">Property Address</Label>
              <Input
                id="propertyAddress"
                value={formData.propertyAddress}
                onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partyAName">Party A Name</Label>
              <Input
                id="partyAName"
                value={formData.partyAName}
                onChange={(e) => handleInputChange('partyAName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partyBName">Party B Name</Label>
              <Input
                id="partyBName"
                value={formData.partyBName}
                onChange={(e) => handleInputChange('partyBName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={generateAgreement} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Agreement'}
          </Button>
        </CardFooter>
      </Card>

      {generatedAgreement && (
        <div className="mt-8">
          <div className="mb-4">
            <Button onClick={handlePrint}>Print Agreement</Button>
          </div>
          <div ref={printContentRef} className="border p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
              {formData.agreementType === 'rent' ? 'Rent Agreement' : 'Property Transfer Agreement'}
            </h1>
            <p className="mb-4">
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="mb-4">
              <strong>Property Address:</strong> {formData.propertyAddress}
            </p>
            <p className="mb-4">
              <strong>Party A:</strong> {formData.partyAName}
            </p>
            <p className="mb-4">
              <strong>Party B:</strong> {formData.partyBName}
            </p>
            <p className="mb-4">
              <strong>Start Date:</strong> {formData.startDate}
            </p>
            <p className="mb-4">
              <strong>End Date:</strong> {formData.endDate}
            </p>
            <p className="mb-4">
              <strong>Amount:</strong> ${formData.amount}
            </p>
            <div className="mt-8 whitespace-pre-wrap">{generatedAgreement}</div>
            <div className="mt-16 flex justify-between">
              <div>
                <p className="mb-8">______________________________</p>
                <p>{formData.partyAName} (Signature)</p>
              </div>
              <div>
                <p className="mb-8">______________________________</p>
                <p>{formData.partyBName} (Signature)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}