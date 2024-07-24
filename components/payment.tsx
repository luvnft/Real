"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutCredits } from "@/lib/actions/checkout.actions";
import { CreditCard } from "lucide-react";

export default function Home() {
  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  const onCheckout = async () => {
    await checkoutCredits();
  };

  return (
    <form action={onCheckout} method="POST">
      <Button type="submit" role="link">
        <CreditCard className="mr-2 h-4 w-4" /> Subscribe
      </Button>
    </form>
  );
}