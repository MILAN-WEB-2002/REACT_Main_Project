import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Play, Download, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DetectionTable } from './DetectionTable';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for the litter detection system
  const detectionData = [
    {
      id: 1,
      timestamp: '2024-08-02 14:32:15',
      regNumber: 'ABC-1234',
      location: 'Main St & 5th Ave',
      confidence: 0.89,
      clipUrl: '/api/clips/clip-001.mp4',
      status: 'verified' as const,
      severity: 'medium' as const
    },
    {
      id: 2,
      timestamp: '2024-08-02 14:28:42',
      regNumber: 'XYZ-9876',
      location: 'Park Avenue',
      confidence: 0.94,
      clipUrl: '/api/clips/clip-002.mp4',
      status: 'pending' as const,
      severity: 'high' as const
    },
    {
      id: 3,
      timestamp: '2024-08-02 14:15:33',
      regNumber: 'DEF-5678',
      location: 'Downtown Plaza',
      confidence: 0.76,
      clipUrl: '/api/clips/clip-003.mp4',
      status: 'reviewed' as const,
      severity: 'low' as const
    },
    {
      id: 4,
      timestamp: '2024-08-02 13:58:21',
      regNumber: 'GHI-2468',
      location: 'Shopping Center',
      confidence: 0.91,
      clipUrl: '/api/clips/clip-004.mp4',
      status: 'verified' as const,
      severity: 'high' as const
    },
    {
      id: 5,
      timestamp: '2024-08-02 13:45:17',
      regNumber: 'JKL-1357',
      location: 'Residential Area',
      confidence: 0.83,
      clipUrl: '/api/clips/clip-005.mp4',
      status: 'pending' as const,
      severity: 'medium' as const
    }
  ];

  const stats = {
    totalDetections: detectionData.length,
    verified: detectionData.filter(d => d.status === 'verified').length,
    pending: detectionData.filter(d => d.status === 'pending').length,
    avgConfidence: (detectionData.reduce((acc, d) => acc + d.confidence, 0) / detectionData.length * 100).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-foreground">
              REACT Litter Detection
            </h1>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              AI Monitoring System
            </Badge>
          </div>
          <Button variant="outline" onClick={onLogout} size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Detections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalDetections}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.verified}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Avg Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-info">{stats.avgConfidence}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Detection Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by registration number or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            
            <DetectionTable data={detectionData} searchTerm={searchTerm} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};