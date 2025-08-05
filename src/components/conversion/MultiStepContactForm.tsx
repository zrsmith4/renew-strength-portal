import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface MultiStepContactFormProps {
  onSuccess?: () => void;
}

const MultiStepContactForm: React.FC<MultiStepContactFormProps> = ({ onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    painArea: '',
    painLevel: '',
    message: '',
    preferredContact: '',
  });
  const { toast } = useToast();

  const totalSteps = 3;

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    onSuccess?.();
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email;
      case 2:
        return formData.painArea && formData.painLevel;
      case 3:
        return formData.preferredContact;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                step < currentStep
                  ? 'bg-brand-green border-brand-green text-white'
                  : step === currentStep
                  ? 'border-brand-green text-brand-green'
                  : 'border-gray-300 text-gray-300'
              }`}
            >
              {step < currentStep ? <Check className="h-4 w-4" /> : step}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-brand-green h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="space-y-4">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-navy">Let's get to know you</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
              />
              <Input
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
              />
            </div>
            <Input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
            />
            <Input
              type="tel"
              placeholder="Phone number (optional)"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-navy">Tell us about your pain</h3>
            <Select value={formData.painArea} onValueChange={(value) => updateField('painArea', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Where is your pain located?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="neck">Neck</SelectItem>
                <SelectItem value="back">Back</SelectItem>
                <SelectItem value="shoulder">Shoulder</SelectItem>
                <SelectItem value="knee">Knee</SelectItem>
                <SelectItem value="hip">Hip</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select value={formData.painLevel} onValueChange={(value) => updateField('painLevel', value)}>
              <SelectTrigger>
                <SelectValue placeholder="How would you rate your pain? (1-10)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-3">Mild (1-3)</SelectItem>
                <SelectItem value="4-6">Moderate (4-6)</SelectItem>
                <SelectItem value="7-8">Severe (7-8)</SelectItem>
                <SelectItem value="9-10">Extreme (9-10)</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Tell us more about your symptoms and goals (optional)"
              value={formData.message}
              onChange={(e) => updateField('message', e.target.value)}
              rows={3}
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-navy">How should we contact you?</h3>
            <Select value={formData.preferredContact} onValueChange={(value) => updateField('preferredContact', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Preferred contact method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone call</SelectItem>
                <SelectItem value="text">Text message</SelectItem>
              </SelectContent>
            </Select>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-brand-navy mb-2">What happens next?</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• We'll review your information within 24 hours</li>
                <li>• Schedule a free 15-minute consultation</li>
                <li>• Create a personalized treatment plan</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        {currentStep > 1 ? (
          <Button variant="outline" onClick={prevStep} className="flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        ) : (
          <div />
        )}

        {currentStep < totalSteps ? (
          <Button
            onClick={nextStep}
            disabled={!isStepValid()}
            className="flex items-center btn-primary"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!isStepValid()}
            className="btn-primary"
          >
            Send Message
          </Button>
        )}
      </div>
    </div>
  );
};

export default MultiStepContactForm;