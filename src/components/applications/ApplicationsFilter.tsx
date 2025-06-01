
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ApplicationsList } from './ApplicationsList';
import { ApplicationStats } from '@/hooks/useApplicationsWithStats';

interface ApplicationsFilterProps {
  type: 'talent' | 'business';
  jobId?: string;
  stats?: ApplicationStats;
}

export function ApplicationsFilter({ type, jobId, stats }: ApplicationsFilterProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Bewerber suchen..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabs with Status Filters */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">
            Alle {stats && `(${stats.total})`}
          </TabsTrigger>
          <TabsTrigger value="new">
            Neue {stats && `(${stats.new})`}
          </TabsTrigger>
          <TabsTrigger value="reviewing">
            In Prüfung {stats && `(${stats.reviewing})`}
          </TabsTrigger>
          <TabsTrigger value="interview">
            Interview {stats && `(${stats.interview})`}
          </TabsTrigger>
          <TabsTrigger value="offer">
            Angebot {stats && `(${stats.offer})`}
          </TabsTrigger>
          <TabsTrigger value="hired">
            Eingestellt {stats && `(${stats.hired})`}
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Abgelehnt {stats && `(${stats.rejected})`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ApplicationsList type={type} jobId={jobId} searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="new">
          <ApplicationsList type={type} jobId={jobId} statusFilter="new" searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="reviewing">
          <ApplicationsList type={type} jobId={jobId} statusFilter="reviewing" searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="interview">
          <ApplicationsList type={type} jobId={jobId} statusFilter="interview" searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="offer">
          <ApplicationsList type={type} jobId={jobId} statusFilter="offer" searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="hired">
          <ApplicationsList type={type} jobId={jobId} statusFilter="hired" searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="rejected">
          <ApplicationsList type={type} jobId={jobId} statusFilter="rejected" searchTerm={searchTerm} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
