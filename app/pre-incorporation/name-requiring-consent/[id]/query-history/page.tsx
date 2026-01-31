'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/reusables/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


interface Query {
  id: number;
  title: string;
  sentDate: string;
  status: 'Responded' | 'Pending Response';
  message: string;
  response?: {
    date: string;
    message: string;
  };
}

const sampleQueries: Query[] = [
  {
    id: 1,
    title: 'Additional documentation required from applicant',
    sentDate: '2026-01-12 14:30',
    status: 'Responded',
    message: `Dear Ngozi Eze,

Your consent application requires additional documentation.

Please submit:
- Authorization letter from National Insurance Commission
- Proof of insurance license
- Business operational plan

Submit all documents within 5 business days to avoid application expiry.

Regards,
CAC Admin`,
    response: {
      date: '2026-01-14 09:15',
      message: 'Documents submitted via portal. Authorization letter and business plan attached.',
    },
  },
  {
    id: 2,
    title: 'Clarification needed on business activities',
    sentDate: '2026-01-12 14:30',
    status: 'Pending Response',
    message: `Dear Ngozi Eze,

We require clarification on the nature of your proposed business activities.

Please provide:
1. Detailed business plan
2. Description of services/products
3. Operational structure

Regards,
CAC Admin`,
  },
];

export default function QueryDetailsPage() {
  const [queries] = useState<Query[]>(sampleQueries);
  const router = useRouter()

  const totalQueries = queries.length;
  const respondedCount = queries.filter((q) => q.status === 'Responded').length;
  const pendingCount = queries.filter((q) => q.status === 'Pending Response').length;

  const handleApprove = () => {
    console.log('Approved');
  };

  const handleSendAnotherQuery = () => {
    console.log('Send another query');
  };

  const handleReject = () => {
    console.log('Rejected');
  };

  return (
    <div>
      <PageHeader title="Query History" />

      <div className="min-h-screen bg-gray-50 p-8 py-8 pt-24">
          <Button
            onClick={() => router.back()}
            variant="outline"
            size="lg"
            className="mb-3"
          >
            <ArrowLeft size={18} />
            <span className="font-medium">Back</span>
          </Button>

        <div className="max-w-5xl mx-auto px-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-medium">Query Details</CardTitle>
              <div className="flex gap-3">
                <Button
                  onClick={handleApprove}
                  size="xl"
                  className="bg-green-600 hover:bg-green-700 text-white px-8"
                >
                  Approve
                </Button>
                <Button
                  onClick={handleSendAnotherQuery}
                  size="xl"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6"
                >
                  Send Another Query
                </Button>
                <Button
                  onClick={handleReject}
                  size="xl"
                  className="bg-red-500 hover:bg-red-600 text-white px-8"
                >
                  Reject
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {/* Query Cards */}
              <div className="space-y-6">

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-700">
                    <span className="font-semibold">Total Queries:</span> {totalQueries} •{' '}
                    <span className="font-semibold">Responded:</span> {respondedCount} •{' '}
                    <span className="font-semibold">Pending:</span> {pendingCount}
                  </p>
                </div>

                {queries.map((query) => (
                  <div
                    key={query.id}
                    className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 ${query.status === 'Responded' ? 'border-l-green-500' : 'border-l-amber-500'
                      }`}
                  >
                    {/* Query Header */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-red-600 text-lg">Query {query.id}</span>
                            <Badge
                              variant="outline"
                              className="bg-red-50 text-red-700 border-red-200"
                            >
                              {query.title}
                            </Badge>
                          </div>
                          <p className="text-sm text-red-500">Sent on {query.sentDate}</p>
                        </div>
                        <Badge
                          className={`text-sm px-4 py-1 ${query.status === 'Responded'
                            ? 'bg-green-600 text-white'
                            : 'bg-amber-500 text-white'
                            }`}
                        >
                          {query.status}
                        </Badge>
                      </div>

                      {/* Query Message */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">Query Message:</p>
                        <div className="bg-gray-50 rounded-lg p-5 whitespace-pre-line text-sm text-gray-700 leading-relaxed">
                          {query.message}
                        </div>
                      </div>

                      {/* Response Section */}
                      {query.response && (
                        <div className="mt-5 pt-5 border-t border-gray-100">
                          <p className="text-sm text-green-600 font-medium mb-2">
                            Applicant Response (Received on {query.response.date}):
                          </p>
                          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                            <p className="text-sm text-gray-700">{query.response.message}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}