
import React from 'react';
import { Download, Play } from 'lucide-react';
import { Publication } from '@/types/publications';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Lock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PublicationCardProps {
  publication: Publication;
}

const PublicationCard = ({ publication }: PublicationCardProps) => {
  return (
    <div className="flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-4">
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={publication.thumbnailUrl} 
            alt={publication.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{publication.title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <CardDescription>{publication.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            <a href={publication.pdfUrl} download>Download PDF</a>
          </Button>
          
          {publication.hasVideo && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Play className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Video Content Available</DialogTitle>
                  <DialogDescription>
                    Full video content is available exclusively for ANAND Circle members.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center p-6 border rounded-md bg-muted/20">
                  <div className="flex flex-col items-center gap-2">
                    <Lock className="h-12 w-12 text-muted-foreground" />
                    <p className="text-center text-sm text-muted-foreground">
                      Join the ANAND Circle to access premium video content, workshops, and exclusive resources.
                    </p>
                  </div>
                </div>
                <DialogFooter className="sm:justify-center">
                  <Link to="#anand-circle">
                    <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white">
                      <Users className="mr-2 h-4 w-4" />
                      Join the Community
                    </Button>
                  </Link>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PublicationCard;
