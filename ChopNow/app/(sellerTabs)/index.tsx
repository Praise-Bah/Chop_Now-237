import { useEffect } from 'react';
import { useRouter } from 'expo-router';

// This file redirects from /(seller)/ to /(seller)/(tabs)/
export default function SellerIndexRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the seller tabs index
    // Use as any to bypass TypeScript path validation
    router.replace('/(seller)/(tabs)' as any);
  }, []);
  
  // Return null while redirecting
  return null;
}
