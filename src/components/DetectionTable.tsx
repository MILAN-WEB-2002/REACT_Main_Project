import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Eye, MapPin, Clock } from 'lucide-react';
import { VideoPreview } from './VideoPreview';

interface DetectionData {
  id: number;
  timestamp: string;
  regNumber: string;
  location: string;
  confidence: number;
  clipUrl: string;
  status: 'verified' | 'pending' | 'reviewed';
  severity: 'low' | 'medium' | 'high';
}

interface DetectionTableProps {
  data: DetectionData[];
  searchTerm: string;
}

export const DetectionTable = ({ data, searchTerm }: DetectionTableProps) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filteredData = data.filter(
    (item) =>
      item.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-success/10 text-success';
      case 'pending':
        return 'bg-warning/10 text-warning';
      case 'reviewed':
        return 'bg-info/10 text-info';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-destructive/10 text-destructive';
      case 'medium':
        return 'bg-warning/10 text-warning';
      case 'low':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString()
    };
  };

  return (
    <>
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Timestamp
                </div>
              </TableHead>
              <TableHead>Registration No.</TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </div>
              </TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Video Clip</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((detection) => {
              const { date, time } = formatTimestamp(detection.timestamp);
              return (
                <TableRow key={detection.id} className="hover:bg-muted/20">
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{date}</div>
                      <div className="text-muted-foreground">{time}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono font-medium text-primary">
                      {detection.regNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{detection.location}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${detection.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium min-w-[3rem]">
                        {(detection.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(detection.severity)}>
                      {detection.severity.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(detection.status)}>
                      {detection.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedVideo(detection.clipUrl)}
                      className="h-8 w-8 p-0"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {selectedVideo && (
        <VideoPreview
          videoUrl={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
};