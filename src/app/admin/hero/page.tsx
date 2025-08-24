'use client';

import {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {toast} from '@/hooks/use-toast';
import {getDoc, setDoc, doc} from 'firebase/firestore';
import {db} from '@/lib/firebase';
import {Loader2} from 'lucide-react';

interface HeroData {
  headline: string;
  description: string;
  image: string;
}

export default function AdminHeroPage() {
  const [heroData, setHeroData] = useState<HeroData>({
    headline: '',
    description: '',
    image: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const docRef = doc(db, 'content', 'hero');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHeroData(docSnap.data() as HeroData);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch hero content.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const docRef = doc(db, 'content', 'hero');
      await setDoc(docRef, heroData, {merge: true});
      toast({title: 'Success!', description: 'Hero section updated successfully.'});
    } catch (error) {
      console.error('Error saving hero data:', error);
      toast({
        title: 'Error',
        description: 'Failed to update hero section.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Manage Hero Section</h1>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
          <CardDescription>
            Update the headline, description, and image for your hero section.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              value={heroData.headline}
              onChange={(e) =>
                setHeroData({...heroData, headline: e.target.value})
              }
              placeholder="Full-Stack Developer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={heroData.description}
              onChange={(e) =>
                setHeroData({...heroData, description: e.target.value})
              }
              placeholder="I build fast, responsive, and user-friendly web applications..."
              rows={4}
            />
          </div>
           <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={heroData.image}
              onChange={(e) =>
                setHeroData({...heroData, image: e.target.value})
              }
              placeholder="https://placehold.co/600x600.png"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
