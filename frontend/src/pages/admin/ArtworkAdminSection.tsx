import * as React from 'react';
import { Upload, Plus, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { axiosInstance } from '../../lib/axios';
import { ArtworkCard } from '../art-section';
import { useArtworkStore } from '../../store/useArtworkStore';
import type { Artwork } from '../../types';

interface ArtworkAdminSectionProps {
  setMessage: React.Dispatch<
    React.SetStateAction<{ type: 'success' | 'error'; text: string } | null>
  >;
}

export function ArtworkAdminSection({ setMessage }: ArtworkAdminSectionProps) {
  const [artworkForm, setArtworkForm] = React.useState({
    snsLink: '',
    aspectRatio: 'square',
  });
  const [artworkImage, setArtworkImage] = React.useState<File | null>(null);
  const [artworkPreview, setArtworkPreview] = React.useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { fetchArtworks, artworks } = useArtworkStore();

  React.useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setArtworkImage(file);
    setArtworkPreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setArtworkImage(null);
    setArtworkPreview(null);
  };

  const handleArtworkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!artworkImage || artworkForm.aspectRatio === '') {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('image', artworkImage);
      formData.append('snsLink', artworkForm.snsLink);
      formData.append('aspectRatio', artworkForm.aspectRatio);

      await axiosInstance.post('/admin/artworks', formData);
      setMessage({ type: 'success', text: 'Artwork created successfully!' });
      setArtworkForm({ snsLink: '', aspectRatio: 'square' });
      clearImage();
      fetchArtworks();
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: `Error: ${error.response?.data?.message ?? 'Failed to create artwork'}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleArtworkDelete = async (_id: string) => {
    const confirmed = window.confirm('Delete this artwork permanently?');
    if (!confirmed) return;

    setMessage(null);

    try {
      await axiosInstance.delete(`/admin/artworks/${_id}`);
      setMessage({ type: 'success', text: 'Artwork deleted successfully!' });
      fetchArtworks();
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: `Error: ${error.response?.data?.message ?? 'Failed to delete artwork'}`,
      });
    } finally {
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Artwork</CardTitle>
        <CardDescription>Add a new artwork to your gallery</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleArtworkSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Artwork Image</Label>
            {artworkPreview ? (
              <div className="relative">
                <img
                  src={artworkPreview}
                  alt="Preview"
                  className="h-64 w-full rounded-lg border object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon-sm"
                  className="absolute right-2 top-2"
                  onClick={clearImage}>
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <label className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-accent hover:bg-muted/50">
                <Upload className="mb-2 size-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click to upload artwork
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="aspectRatio">Aspect Ratio</Label>
            <Select
              value={artworkForm.aspectRatio}
              onValueChange={(value) =>
                setArtworkForm({ ...artworkForm, aspectRatio: value })
              }>
              <SelectTrigger>
                <SelectValue placeholder="Select aspect ratio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="square">Square (1:1)</SelectItem>
                <SelectItem value="portrait">Portrait (3:4)</SelectItem>
                <SelectItem value="landscape">Landscape (4:3)</SelectItem>
                <SelectItem value="wide">Wide (16:9)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="snsLink">Social Media Link (optional)</Label>
            <input
              id="snsLink"
              type="url"
              placeholder="https://twitter.com/..."
              value={artworkForm.snsLink}
              onChange={(e) =>
                setArtworkForm({ ...artworkForm, snsLink: e.target.value })
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-accent"
            />
          </div>

          <Button
            type="submit"
            className="w-full gap-2"
            disabled={isSubmitting}>
            <Plus className="size-4" />
            {isSubmitting ? 'Creating...' : 'Create Artwork'}
          </Button>
        </form>
        
        {artworks.map((artwork: Artwork) => (
          <div className="mt-16" key={artwork._id}>
            <ArtworkCard
              artwork={artwork}
              onClick={() => handleArtworkDelete(artwork._id)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
