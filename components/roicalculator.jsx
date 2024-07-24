import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    purchasePrice: '',
    downPayment: '',
    interestRate: '',
    loanTerm: '',
    monthlyRent: '',
    annualExpenses: '',
  });
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculateROI = () => {
    const {
      purchasePrice,
      downPayment,
      interestRate,
      loanTerm,
      monthlyRent,
      annualExpenses,
    } = inputs;

    // Convert inputs to numbers
    const pp = Number(purchasePrice);
    const dp = Number(downPayment);
    const ir = Number(interestRate) / 100 / 12; // Monthly interest rate
    const lt = Number(loanTerm) * 12; // Total number of monthly payments
    const mr = Number(monthlyRent);
    const ae = Number(annualExpenses);

    // Calculate mortgage payment
    const loanAmount = pp - dp;
    const monthlyPayment = (loanAmount * ir * Math.pow(1 + ir, lt)) / (Math.pow(1 + ir, lt) - 1);

    // Calculate annual cash flow
    const annualRent = mr * 12;
    const annualMortgage = monthlyPayment * 12;
    const annualCashFlow = annualRent - annualMortgage - ae;

    // Calculate ROI
    const totalInvestment = dp + ae; // Assuming first year expenses are part of initial investment
    const roi = (annualCashFlow / totalInvestment) * 100;

    // Calculate cap rate
    const capRate = ((annualRent - ae) / pp) * 100;

    setResults({
      monthlyPayment: monthlyPayment.toFixed(2),
      annualCashFlow: annualCashFlow.toFixed(2),
      roi: roi.toFixed(2),
      capRate: capRate.toFixed(2),
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" style={{borderRadius:'1px'}} >
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Real Estate ROI Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="purchasePrice">Purchase Price ($)</Label>
              <Input
                id="purchasePrice"
                name="purchasePrice"
                type="number"
                value={inputs.purchasePrice}
                onChange={handleInputChange}
                placeholder="e.g., 200000"
              />
            </div>
            <div>
              <Label htmlFor="downPayment">Down Payment ($)</Label>
              <Input
                id="downPayment"
                name="downPayment"
                type="number"
                value={inputs.downPayment}
                onChange={handleInputChange}
                placeholder="e.g., 40000"
              />
            </div>
            <div>
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                id="interestRate"
                name="interestRate"
                type="number"
                value={inputs.interestRate}
                onChange={handleInputChange}
                placeholder="e.g., 3.5"
                step="0.1"
              />
            </div>
            <div>
              <Label htmlFor="loanTerm">Loan Term (years)</Label>
              <Input
                id="loanTerm"
                name="loanTerm"
                type="number"
                value={inputs.loanTerm}
                onChange={handleInputChange}
                placeholder="e.g., 30"
              />
            </div>
            <div>
              <Label htmlFor="monthlyRent">Monthly Rent ($)</Label>
              <Input
                id="monthlyRent"
                name="monthlyRent"
                type="number"
                value={inputs.monthlyRent}
                onChange={handleInputChange}
                placeholder="e.g., 1500"
              />
            </div>
            <div>
              <Label htmlFor="annualExpenses">Annual Expenses ($)</Label>
              <Input
                id="annualExpenses"
                name="annualExpenses"
                type="number"
                value={inputs.annualExpenses}
                onChange={handleInputChange}
                placeholder="e.g., 5000"
              />
            </div>
          </div>
          <Button onClick={calculateROI} className="w-full">
            Calculate ROI
          </Button>
          {results && (
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold">Results:</h3>
              <p>Monthly Mortgage Payment: ${results.monthlyPayment}</p>
              <p>Annual Cash Flow: ${results.annualCashFlow}</p>
              <p>ROI: {results.roi}%</p>
              <p>Cap Rate: {results.capRate}%</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ROICalculator;