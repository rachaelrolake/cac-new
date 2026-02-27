"use client"

import { useTokenExpiry } from '@/hooks/useTokenExpiry';

/**
 * Component that monitors token expiry and automatically logs out users
 * Must be placed inside AuthProvider
 */
export function TokenExpiryMonitor() {
    useTokenExpiry();
    return null; // This component renders nothing
}