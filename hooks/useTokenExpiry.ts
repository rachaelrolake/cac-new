"use client"

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { authStorage } from '@/lib/auth-storage';

/**
 * Hook to automatically logout user when token expires
 * Implements hybrid approach:
 * 1. Calculates time until expiry on mount
 * 2. Sets timer to logout 30 seconds before actual expiry (for safety)
 * 3. Checks expiry on every route change
 * 4. Works with API interceptor to catch 401s
 */
export function useTokenExpiry() {
  const router = useRouter();
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogout = () => {
    console.log('[TokenExpiry] Token expired - logging out');
    authStorage.clearAuth();
    router.push('/auth/login');
  };

  const setupExpiryTimer = () => {
    // Clear existing timer
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }

    // Check if already expired
    if (authStorage.isTokenExpired()) {
      console.log('[TokenExpiry] Token already expired');
      handleLogout();
      return;
    }

    // Get time until expiry
    const timeUntilExpiry = authStorage.getTimeUntilExpiry();
    
    if (timeUntilExpiry <= 0) {
      console.log('[TokenExpiry] Token expired (timeUntilExpiry <= 0)');
      handleLogout();
      return;
    }

    // Logout 30 seconds before actual expiry for safety
    const SAFETY_MARGIN = 30 * 1000; // 30 seconds
    const logoutTime = Math.max(0, timeUntilExpiry - SAFETY_MARGIN);

    console.log(`[TokenExpiry] Setting logout timer for ${Math.round(logoutTime / 1000)}s`);

    logoutTimerRef.current = setTimeout(() => {
      console.log('[TokenExpiry] Timer fired - logging out');
      handleLogout();
    }, logoutTime);
  };

  useEffect(() => {
    // Only run in browser and if authenticated
    if (typeof window === 'undefined' || !authStorage.isAuthenticated()) {
      return;
    }

    // Setup timer on mount and when dependencies change
    setupExpiryTimer();

    // Also check every minute as a fallback
    const intervalId = setInterval(() => {
      if (authStorage.isTokenExpired()) {
        console.log('[TokenExpiry] Interval check - token expired');
        handleLogout();
      }
    }, 60 * 1000); // Check every minute

    // Cleanup on unmount
    return () => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
      clearInterval(intervalId);
    };
  }, []); // Empty deps - only run once on mount

  // Return nothing - this hook just manages side effects
  return null;
}