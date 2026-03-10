'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/reusables/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { entityAccountsAPI, type QueryHistoryResponse } from '@/lib/api/users-management';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function QueryHistoryPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const entityId = params.id as string;
  const entityType = searchParams.get('type') || 'ALL';

  const [queryHistory, setQueryHistory] = useState<QueryHistoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQueryHistory();
  }, [entityId, entityType]);

  const fetchQueryHistory = async () => {
    setIsLoading(true);
    try {
      const data = await entityAccountsAPI.getEntityQueryHistory(entityId, entityType);
      setQueryHistory(data);
    } catch (error: any) {
      toast.error('Failed to load query history', {
        description: error.response?.data?.message || 'Please try again',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'yyyy-MM-dd HH:mm');
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
      </div>
    );
  }

  const totalQueries = queryHistory?.totalQueries || 0;
  const respondedCount = queryHistory?.responded || 0;
  const pendingCount = queryHistory?.pending || 0;
  const queries = queryHistory?.data || [];

  return (
    <div>
      <PageHeader title="Query History" />

      <div className="min-h-screen bg-gray-50 p-8 py-8 pt-24">
        <Button onClick={() => router.back()} variant="outline" size="lg" className="mb-3">
          <ArrowLeft size={18} />
          <span className="font-medium">Back</span>
        </Button>

        <div className="max-w-5xl mx-auto px-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-medium">Query Details</CardTitle>
            </CardHeader>

            <CardContent>
              {/* Summary Bar */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-700">
                  <span className="font-semibold">Total Queries:</span> {totalQueries} •{' '}
                  <span className="font-semibold">Responded:</span> {respondedCount} •{' '}
                  <span className="font-semibold">Pending:</span> {pendingCount}
                </p>
              </div>

              {/* Query Cards */}
              {queries.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No queries found for this application.
                </div>
              ) : (
                <div className="space-y-6">
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
                              <span className="font-bold text-red-600 text-lg">
                                Query {query.queryNumber}
                              </span>
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                {query.queryTitle}
                              </Badge>
                            </div>
                            <p className="text-sm text-red-500">Sent on {formatDate(query.queriedAt)}</p>
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
                            {query.queryReason}
                          </div>
                        </div>

                        {/* Response Section */}
                        {query.applicantResponse && (
                          <div className="mt-5 pt-5 border-t border-gray-100">
                            <p className="text-sm text-green-600 font-medium mb-2">
                              Applicant Response (Received on {formatDate(query.respondedAt)}):
                            </p>
                            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                              <p className="text-sm text-gray-700">{query.applicantResponse}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}