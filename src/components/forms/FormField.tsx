import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BaseFieldProps {
  name: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

interface InputFieldProps extends BaseFieldProps {
  type: 'text' | 'email' | 'tel' | 'password' | 'number';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

interface TextareaFieldProps extends BaseFieldProps {
  type: 'textarea';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
}

interface CheckboxFieldProps extends BaseFieldProps {
  type: 'checkbox';
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

interface SelectFieldProps extends BaseFieldProps {
  type: 'select';
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

type FormFieldProps = InputFieldProps | TextareaFieldProps | CheckboxFieldProps | SelectFieldProps;

export const FormField: React.FC<FormFieldProps> = (props) => {
  const { name, label, error, disabled, required, className } = props;

  const renderField = () => {
    switch (props.type) {
      case 'textarea':
        return (
          <Textarea
            id={name}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            rows={props.rows}
            maxLength={props.maxLength}
            disabled={disabled}
            required={required}
            className={error ? 'border-red-500' : ''}
          />
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={name}
              checked={props.checked}
              onCheckedChange={props.onChange}
              disabled={disabled}
              required={required}
            />
            {label && (
              <Label htmlFor={name} className="text-sm">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
                {props.description && (
                  <span className="text-gray-500 ml-1">({props.description})</span>
                )}
              </Label>
            )}
          </div>
        );

      case 'select':
        return (
          <Select
            value={props.value}
            onValueChange={props.onChange}
            disabled={disabled}
            required={required}
          >
            <SelectTrigger className={error ? 'border-red-500' : ''}>
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {props.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return (
          <Input
            id={name}
            type={props.type}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            disabled={disabled}
            required={required}
            className={error ? 'border-red-500' : ''}
          />
        );
    }
  };

  if (props.type === 'checkbox') {
    return (
      <div className={className}>
        {renderField()}
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className={className}>
      {label && (
        <Label htmlFor={name} className="block text-sm font-medium mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      {renderField()}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      {props.type === 'textarea' && props.maxLength && (
        <p className="text-xs text-gray-500 mt-1">
          {props.value.length}/{props.maxLength} characters
        </p>
      )}
    </div>
  );
};