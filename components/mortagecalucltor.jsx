import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMortgage = () => {
    const principal = parseFloat(loanAmount);
    const interest = parseFloat(interestRate) / 100 / 12;
    const payments = parseFloat(loanTerm) * 12;

    const x = Math.pow(1 + interest, payments);
    const monthly = (principal * x * interest) / (x - 1);

    setMonthlyPayment(monthly.toFixed(2));
  };

  return (
    <Card className="w-full max-w-md mx-auto"  style={{borderRadius:'1px'}}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Mortgage Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="loanAmount">Loan Amount ($)</Label>
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="e.g., 200000"
            />
          </div>
          <div>
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="e.g., 3.5"
              step="0.1"
            />
          </div>
          <div>
            <Label htmlFor="loanTerm">Loan Term (years)</Label>
            <Input
              id="loanTerm"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              placeholder="e.g., 30"
            />
          </div>
          <Button onClick={calculateMortgage} className="w-full">
            Calculate
          </Button>
          {monthlyPayment && (
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold">Monthly Payment</h3>
              <p className="text-2xl font-bold">${monthlyPayment}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MortgageCalculator;