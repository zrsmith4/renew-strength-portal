/**
 * Formats a time string (HH:MM:SS or HH:MM) to a 12-hour format with AM/PM
 * @param timeString - Time string in format "HH:MM:SS" or "HH:MM"
 * @returns Formatted time string like "2:30 PM"
 */
export function formatTime(timeString: string): string {
  try {
    // Create a date object with the time string
    const date = new Date(`2000-01-01T${timeString}`);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return timeString; // Return original if invalid
    }
    
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeString; // Return original string if formatting fails
  }
}

/**
 * Formats a date to a readable string
 * @param date - Date object or date string
 * @returns Formatted date string like "March 15, 2024"
 */
export function formatDate(date: Date | string): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      return String(date); // Return original if invalid
    }
    
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return String(date);
  }
}

/**
 * Formats a datetime to a readable string
 * @param datetime - Date object or datetime string
 * @returns Formatted datetime string like "March 15, 2024 at 2:30 PM"
 */
export function formatDateTime(datetime: Date | string): string {
  try {
    const dateObj = typeof datetime === 'string' ? new Date(datetime) : datetime;
    
    if (isNaN(dateObj.getTime())) {
      return String(datetime); // Return original if invalid
    }
    
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch (error) {
    console.error('Error formatting datetime:', error);
    return String(datetime);
  }
}