
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ZelleInstructionsProps {
  amount: number;
  bookingId: string;
  zelleEmail: string;
  onConfirm: () => void;
  confirmed: boolean;
  onConfirmedChange: (confirmed: boolean) => void;
}

export const ZelleInstructions = ({
  amount,
  bookingId,
  zelleEmail,
  onConfirm,
  confirmed,
  onConfirmedChange,
}: ZelleInstructionsProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Information copied successfully",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Zelle Payment Instructions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">Amount:</span>
            <div className="flex items-center gap-2">
              <span>${amount.toFixed(2)}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(amount.toFixed(2))}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Send to:</span>
            <div className="flex items-center gap-2">
              <span>{zelleEmail}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(zelleEmail)}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Memo/Note:</span>
            <div className="flex items-center gap-2">
              <span className="text-sm">Booking ID: {bookingId}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`Booking ID: ${bookingId}`)}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>
            Please send the exact amount via Zelle to the email above. 
            Include your booking ID in the memo field for verification.
          </p>
          <p className="mt-2">
            Your booking will be confirmed once we receive and verify your payment.
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="zelle-confirm"
            checked={confirmed}
            onCheckedChange={onConfirmedChange}
          />
          <label htmlFor="zelle-confirm" className="text-sm">
            I understand and will send the Zelle payment with the booking ID in the memo
          </label>
        </div>
        
        <Button
          onClick={onConfirm}
          disabled={!confirmed}
          className="w-full"
        >
          Confirm Zelle Payment Instructions
        </Button>
      </CardContent>
    </Card>
  );
};
