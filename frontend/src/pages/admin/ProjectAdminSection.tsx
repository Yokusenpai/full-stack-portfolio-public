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
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { axiosInstance } from '../../lib/axios';
import { ProjectCard } from '../project-section';
import type { Project } from '../../types';

interface ProjectAdminSectionProps {
  projects: Project[];
  onProjectsUpdated: () => void;
  setMessage: React.Dispatch<
    React.SetStateAction<{ type: 'success' | 'error'; text: string } | null>
  >;
}

export function ProjectAdminSection({
  projects,
  onProjectsUpdated,
  setMessage,
}: ProjectAdminSectionProps) {
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
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProjectImage(file);
    setProjectPreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setProjectImage(null);
    setProjectPreview(null);
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !projectImage ||
      projectForm.title === '' ||
      projectForm.desc === '' ||
      projectForm.tags === '' ||
      projectForm.githubUrl === ''
    ) {
      setMessage({ type: 'error', text: 'Please fill all required fields.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('image', projectImage);
      formData.append('title', projectForm.title);
      formData.append('desc', projectForm.desc);
      formData.append('tags', projectForm.tags);
      formData.append('liveUrl', projectForm.liveUrl);
      formData.append('githubUrl', projectForm.githubUrl);

      await axiosInstance.post('/admin/projects', formData);
      setMessage({ type: 'success', text: 'Project created successfully!' });
      setProjectForm({ title: '', desc: '', tags: '', liveUrl: '', githubUrl: '' });
      clearImage();
      onProjectsUpdated();
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: `Error: ${error.response?.data?.message ?? 'Failed to create project'}`,
      });
    } finally {
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
      onProjectsUpdated();
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: `Error: ${error.response?.data?.message ?? 'Failed to delete project'}`,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Project</CardTitle>
        <CardDescription>Add a new project</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleProjectSubmit} className="space-y-6">
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
                  onClick={clearImage}>
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
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="My Awesome Project"
              value={projectForm.title}
              onChange={(e) =>
                setProjectForm({ ...projectForm, title: e.target.value })
              }
              required
            />
          </div>

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

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input
                id="liveUrl"
                type="url"
                placeholder="https://myproject.com"
                value={projectForm.liveUrl}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, liveUrl: e.target.value })
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
                  setProjectForm({ ...projectForm, githubUrl: e.target.value })
                }
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
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
  );
}
