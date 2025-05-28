
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, DollarSign } from "lucide-react";

interface PaymentSelectionProps {
  amount: number;
  currency: string;
  onStripePayment: () => void;
  onPayPalPayment: () => void;
  onZellePayment: () => void;
  isProcessing: boolean;
}

export const PaymentSelection = ({
  amount,
  currency,
  onStripePayment,
  onPayPalPayment,
  onZellePayment,
  isProcessing,
}: PaymentSelectionProps) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Select Payment Method</CardTitle>
        <p className="text-center text-lg font-semibold">
          Amount: ${amount.toFixed(2)} {currency}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={onStripePayment}
          disabled={isProcessing}
          className="w-full flex items-center gap-2"
          variant="default"
        >
          <CreditCard className="h-4 w-4" />
          Pay with Credit Card (Stripe)
        </Button>
        
        <Button
          onClick={onPayPalPayment}
          disabled={isProcessing}
          className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
        >
          <DollarSign className="h-4 w-4" />
          Pay with PayPal
        </Button>
        
        <Button
          onClick={onZellePayment}
          disabled={isProcessing}
          className="w-full bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
          variant="secondary"
        >
          <DollarSign className="h-4 w-4" />
          Pay with Zelle
        </Button>
      </CardContent>
    </Card>
  );
};
