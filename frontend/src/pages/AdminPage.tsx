import * as React from 'react';
import { FolderCode, Palette, ArrowLeft, File } from 'lucide-react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { NavLink } from 'react-router';
import { useProjectStore } from '../store/useProjectStore';
import { ProjectAdminSection } from './admin/ProjectAdminSection';
import { ResumeAdminSection } from './admin/ResumeAdminSection';
import { ArtworkAdminSection } from './admin/ArtworkAdminSection';

function AdminPage() {
  const [activeTab, setActiveTab] = React.useState('project');
  const [message, setMessage] = React.useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const { fetchProjects, projects } = useProjectStore();

  React.useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
            <TabsTrigger value="resume" className="flex-1 gap-2">
              <File className="size-4" />
              Resume
            </TabsTrigger>
          </TabsList>

          <TabsContent value="project">
            <ProjectAdminSection
              projects={projects}
              onProjectsUpdated={fetchProjects}
              setMessage={setMessage}
            />
          </TabsContent>

          <TabsContent value="resume">
            <ResumeAdminSection setMessage={setMessage} />
          </TabsContent>

          <TabsContent value="artwork">
            <ArtworkAdminSection setMessage={setMessage} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminPage;
