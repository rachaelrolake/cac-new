'use client'

import { ReactNode } from 'react';

export const PageHeader = ({ title }: { title: string }) => (
  <div className="w-full bg-white p-5 border-b fixed top-0 left-0 z-10">
    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
  </div>
);