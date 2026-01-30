'use client'

import { ReactNode } from 'react';

export const SectionHeader = ({ children }: { children: ReactNode }) => (
  <div className="mb-4 w-fit inline-block px-3 py-1 bg-white border border-gray-100 rounded-lg text-[16px] font-semibold shadow-sm text-gray-800">
    {children}
  </div>
);