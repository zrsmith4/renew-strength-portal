import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks
 */
export const sanitizeHtml = (content: string): string => {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u'],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });
};

/**
 * Validates and sanitizes text input
 */
export const sanitizeTextInput = (input: string, maxLength: number = 1000): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Remove any HTML tags and limit length
  const sanitized = DOMPurify.sanitize(input, { ALLOWED_TAGS: [], KEEP_CONTENT: true });
  return sanitized.slice(0, maxLength).trim();
};

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validates phone number format
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone.trim()) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Validates payment amount
 */
export const validatePaymentAmount = (amount: number): boolean => {
  return typeof amount === 'number' && amount > 0 && amount <= 10000 && Number.isFinite(amount);
};

/**
 * Rate limiting utility
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  constructor(
    private maxRequests: number = 10,
    private windowMs: number = 60000 // 1 minute
  ) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }
}

/**
 * Audit logging utility
 */
export const logAuditEvent = async (
  action: string,
  tableName: string,
  recordId?: string,
  oldValues?: any,
  newValues?: any
) => {
  try {
    // In a real implementation, this would call a secure audit logging service
    console.log('Audit Event:', {
      action,
      tableName,
      recordId,
      oldValues,
      newValues,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to log audit event:', error);
  }
};