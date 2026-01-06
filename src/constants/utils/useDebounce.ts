import {useState, useEffect} from 'react';
 
// Custom hook for debouncing
export function useDebounce(value:any, delay:any) {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
 
  useEffect(() => {
    // Set a timeout to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
 
    // Cleanup function to clear the timeout if value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
 
  return debouncedValue;
}