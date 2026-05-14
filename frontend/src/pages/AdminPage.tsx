import * as React from 'react';
import { Upload, Plus, X, FolderCode, Palette, ArrowLeft } from 'lucide-react';

import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { axiosInstance } from '../lib/axios';
import { NavLink } from 'react-router';
import { useProjectStore } from '../store/useProjectStore';
import { useEffect } from 'react';
import { ProjectCard } from './project-section';
import { useArtworkStore } from '../store/useArtworkStore';
import { ArtworkCard } from './art-section';
import type { Artwork } from '../types';

function AdminPage() {
  const [activeTab, setActiveTab] = React.useState('project');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [message, setMessage] = React.useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Project form state
  const [projectForm, setProjectForm] = React.useState({
    title: '',
    desc: '',
    tags: '',
    liveUrl: '',
    githubUrl: '',
  });
  const [projectImage, setProjectImage] = React.useState<File | null>(null);
  const [projectPreview, setProjectPreview] = React.useState<string | null>(
    null,
  );
  const { fetchProjects, projects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Artwork form state
  const [artworkForm, setArtworkForm] = React.useState({
    snsLink: '',
    aspectRatio: 'square',
  });
  const [artworkImage, setArtworkImage] = React.useState<File | null>(null);
  const [artworkPreview, setArtworkPreview] = React.useState<string | null>(
    null,
  );

  const { fetchArtworks, artworks } = useArtworkStore();
  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'project' | 'artwork',
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    if (type === 'project') {
      setProjectImage(file);
      setProjectPreview(preview);
    } else {
      setArtworkImage(file);
      setArtworkPreview(preview);
    }
  };

  const clearImage = (type: 'project' | 'artwork') => {
    if (type === 'project') {
      setProjectImage(null);
      setProjectPreview(null);
    } else {
      setArtworkImage(null);
      setArtworkPreview(null);
    }
  };

  const handleProjectSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (
      !projectImage ||
      projectForm.title === '' ||
      projectForm.desc === '' ||
      projectForm.tags === ''
    ) {
      setMessage({ type: 'error', text: 'Please fill all fields' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('image', projectImage);
    formData.append('title', projectForm.title);
    formData.append('desc', projectForm.desc);
    formData.append('tags', projectForm.tags);
    formData.append('liveUrl', projectForm.liveUrl);
    formData.append('githubUrl', projectForm.githubUrl);

    try {
      await axiosInstance.post('/admin/projects', formData);

      setMessage({ type: 'success', text: 'Project created successfully!' });
      setProjectForm({
        title: '',
        desc: '',
        tags: '',
        liveUrl: '',
        githubUrl: '',
      });
      clearImage('project');
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: `error:${error.response.data.message} Failed to create project`,
      });
    } finally {
      fetchProjects();
      setIsSubmitting(false);
    }
  };

  const handleArtworkSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!artworkImage || artworkForm.aspectRatio === '') {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('image', artworkImage);
    formData.append('snsLink', artworkForm.snsLink);
    formData.append('aspectRatio', artworkForm.aspectRatio);

    try {
      await axiosInstance.post('/admin/artworks', formData);
      setMessage({ type: 'success', text: 'Artwork created successfully!' });
      setArtworkForm({ snsLink: '', aspectRatio: 'square' });
      clearImage('artwork');
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: `error:${error.response.data.message} Failed to create project`,
      });
    } finally {
      fetchArtworks();
      setIsSubmitting(false);
    }
  };

  const handleProjectDelete = async (_id: string) => {
    const confirmed = window.confirm('Delete this project permanently?');

    if (!confirmed) return;
    setIsDeleting(true);
    setMessage(null);
    try {
      await axiosInstance.delete(`/admin/projects/${_id}`);
      setMessage({ type: 'success', text: 'Project deleted successfully!' });
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: `error:${error.response.data.message} Failed to delete project`,
      });
    } finally {
      fetchProjects();
      setIsDeleting(false);
    }
  };

  const handleArtworkDelete = async (_id: string) => {
    const confirmed = window.confirm('Delete this artwork permanently?');

    if (!confirmed) return;
    setIsDeleting(true);
    setMessage(null);
    try {
      await axiosInstance.delete(`/admin/artworks/${_id}`);
      setMessage({ type: 'success', text: 'Artwork deleted successfully!' });
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: `error:${error.response.data.message} Failed to delete project`,
      });
    } finally {
      fetchArtworks();
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <NavLink
            to="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="size-4" />
            Back to Portfolio
          </NavLink>
          <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
          <p className="mt-1 text-muted-foreground">
            Add new projects and artworks to your portfolio
          </p>
        </div>

        {/* Status Message */}
        {message && (
          <div
            className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
              message.type === 'success'
                ? 'border-accent/50 bg-accent/10 text-accent'
                : 'border-destructive/50 bg-destructive/10 text-destructive'
            }`}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full">
            <TabsTrigger value="project" className="flex-1 gap-2">
              <FolderCode className="size-4" />
              Project
            </TabsTrigger>
            <TabsTrigger value="artwork" className="flex-1 gap-2">
              <Palette className="size-4" />
              Artwork
            </TabsTrigger>
          </TabsList>

          {/* Project Form */}
          <TabsContent value="project">
            <Card>
              <CardHeader>
                <CardTitle>New Project</CardTitle>
                <CardDescription>Add a new project</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProjectSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>Project Image</Label>
                    {projectPreview ? (
                      <div className="relative">
                        <img
                          src={projectPreview}
                          alt="Preview"
                          className="h-48 w-full rounded-lg border object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon-sm"
                          className="absolute right-2 top-2"
                          onClick={() => clearImage('project')}>
                          <X className="size-4" />
                        </Button>
                      </div>
                    ) : (
                      <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-accent hover:bg-muted/50">
                        <Upload className="mb-2 size-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Click to upload image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageChange(e, 'project')}
                        />
                      </label>
                    )}
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="My Awesome Project"
                      value={projectForm.title}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="desc">Description</Label>
                    <Textarea
                      id="desc"
                      placeholder="A brief description of the project..."
                      rows={3}
                      value={projectForm.desc}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, desc: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="React, TypeScript, Tailwind (comma separated)"
                      value={projectForm.tags}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, tags: e.target.value })
                      }
                    />
                  </div>

                  {/* URLs */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="liveUrl">Live URL</Label>
                      <Input
                        id="liveUrl"
                        type="url"
                        placeholder="https://myproject.com"
                        value={projectForm.liveUrl}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            liveUrl: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="githubUrl">GitHub URL</Label>
                      <Input
                        id="githubUrl"
                        type="url"
                        placeholder="https://github.com/..."
                        value={projectForm.githubUrl}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            githubUrl: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={isSubmitting}>
                    <Plus className="size-4" />
                    {isSubmitting ? 'Creating...' : 'Create Project'}
                  </Button>
                </form>
                <div className="grid grid-cols-1 mt-14 md:grid-cols-2 lg:grid-cols-3 gap-6 scale-90">
                  {projects.map((project, index) => (
                    <div key={project._id}>
                      <ProjectCard project={project} index={index} />
                      <Button
                        disabled={isDeleting}
                        className="w-full gap-2 bg-destructive hover:bg-accent/70"
                        onClick={() => handleProjectDelete(project._id)}>
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Artwork Form */}
          <TabsContent value="artwork">
            <Card>
              <CardHeader>
                <CardTitle>New Artwork</CardTitle>
                <CardDescription>
                  Add a new artwork to your gallery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleArtworkSubmit} className="space-y-6">
                  {/* Image Upload */}
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
                          onClick={() => clearImage('artwork')}>
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
                          onChange={(e) => handleImageChange(e, 'artwork')}
                        />
                      </label>
                    )}
                  </div>

                  {/* Aspect Ratio */}
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
                        <SelectItem value="landscape">
                          Landscape (4:3)
                        </SelectItem>
                        <SelectItem value="wide">Wide (16:9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* SNS Link */}
                  <div className="space-y-2">
                    <Label htmlFor="snsLink">
                      Social Media Link (optional)
                    </Label>
                    <Input
                      id="snsLink"
                      type="url"
                      placeholder="https://twitter.com/..."
                      value={artworkForm.snsLink}
                      onChange={(e) =>
                        setArtworkForm({
                          ...artworkForm,
                          snsLink: e.target.value,
                        })
                      }
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminPage;
