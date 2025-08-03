import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Play, Download, Filter, Search, Users, Calendar as CalendarIcon, History } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { DetectionTable } from './DetectionTable';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [detectionData, setDetectionData] = useState([
    {
      id: 1,
      timestamp: '2024-08-02 14:32:15',
      regNumber: 'ABC-1234',
      location: 'Main St & 5th Ave',
      confidence: 0.89,
      clipUrl: '/api/clips/clip-001.mp4',
      status: 'verified' as 'verified' | 'pending' | 'reviewed',
      severity: 'medium' as 'low' | 'medium' | 'high'
    },
    {
      id: 2,
      timestamp: '2024-08-02 14:28:42',
      regNumber: 'XYZ-9876',
      location: 'Park Avenue',
      confidence: 0.94,
      clipUrl: '/api/clips/clip-002.mp4',
      status: 'pending' as 'verified' | 'pending' | 'reviewed',
      severity: 'high' as 'low' | 'medium' | 'high'
    },
    {
      id: 3,
      timestamp: '2024-08-02 14:15:33',
      regNumber: 'DEF-5678',
      location: 'Downtown Plaza',
      confidence: 0.76,
      clipUrl: '/api/clips/clip-003.mp4',
      status: 'reviewed' as 'verified' | 'pending' | 'reviewed',
      severity: 'low' as 'low' | 'medium' | 'high'
    },
    {
      id: 4,
      timestamp: '2024-08-02 13:58:21',
      regNumber: 'GHI-2468',
      location: 'Shopping Center',
      confidence: 0.91,
      clipUrl: '/api/clips/clip-004.mp4',
      status: 'verified' as 'verified' | 'pending' | 'reviewed',
      severity: 'high' as 'low' | 'medium' | 'high'
    },
    {
      id: 5,
      timestamp: '2024-08-02 13:45:17',
      regNumber: 'JKL-1357',
      location: 'Residential Area',
      confidence: 0.83,
      clipUrl: '/api/clips/clip-005.mp4',
      status: 'pending' as 'verified' | 'pending' | 'reviewed',
      severity: 'medium' as 'low' | 'medium' | 'high'
    }
  ]);

  const handleStatusUpdate = (id: number, newStatus: 'verified' | 'pending' | 'reviewed') => {
    setDetectionData(prevData => 
      prevData.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const filteredByDate = selectedDate 
    ? detectionData.filter(item => {
        const itemDate = new Date(item.timestamp);
        const selected = new Date(selectedDate);
        return itemDate.toDateString() === selected.toDateString();
      })
    : detectionData;

  const reviewedItems = detectionData.filter(item => item.status === 'verified' || item.status === 'reviewed');

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
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Meet the Team
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Meet the Team</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <img 
                    src="/lovable-uploads/008f4f4c-1edd-41cd-b2e2-3da2deab584e.png" 
                    alt="Team Photo" 
                    className="w-full rounded-lg"
                  />
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Team Members:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Milan paul sunny</li>
                      <li>• MuhammedZahran</li>
                      <li>• Sreelekshmi</li>
                      <li>• Adarsh TJ</li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={onLogout} size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
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

        {/* Main Content with Tabs */}
        <Tabs defaultValue="detections" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="detections">Live Detections</TabsTrigger>
            <TabsTrigger value="reviews">Review History</TabsTrigger>
          </TabsList>

          <TabsContent value="detections" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Detection Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[200px] justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Filter by date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  {selectedDate && (
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedDate(undefined)}
                      size="sm"
                    >
                      Clear Date
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
                
                <DetectionTable data={filteredByDate} searchTerm={searchTerm} onStatusUpdate={handleStatusUpdate} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Review History ({reviewedItems.length} items)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Accepted Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-success">
                        {reviewedItems.filter(item => item.status === 'verified').length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Rejected Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-destructive">
                        {reviewedItems.filter(item => item.status === 'reviewed').length}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <DetectionTable 
                  data={reviewedItems} 
                  searchTerm="" 
                  onStatusUpdate={handleStatusUpdate} 
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};