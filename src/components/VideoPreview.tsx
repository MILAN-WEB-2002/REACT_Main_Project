import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

interface VideoPreviewProps {
  videoUrl: string;
  onClose: () => void;
}

export const VideoPreview = ({ videoUrl, onClose }: VideoPreviewProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Detection Video Clip</DialogTitle>
          <DialogDescription>
            5-second clip showing the litter detection incident
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-muted rounded-lg flex items-center justify-center h-64 w-full">
            <div className="text-center text-muted-foreground">
              <div className="text-lg font-medium mb-2">Video Preview</div>
              <div className="text-sm">
                Clip: {videoUrl.split('/').pop()}
              </div>
              <div className="text-xs mt-2 opacity-75">
                In a real system, this would show the actual video clip
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Duration: 5 seconds | Format: MP4
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};