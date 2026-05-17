import * as React from 'react';
import { Upload, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { axiosInstance } from '../../lib/axios';

interface ResumeAdminSectionProps {
  setMessage: React.Dispatch<
    React.SetStateAction<{ type: 'success' | 'error'; text: string } | null>
  >;
}

export function ResumeAdminSection({ setMessage }: ResumeAdminSectionProps) {
  const [resumeFile, setResumeFile] = React.useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = React.useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const fetchResume = React.useCallback(async () => {
    try {
      const response = await axiosInstance.get('/resume');
      if (response.data?.fileUrl) {
        setResumeUrl(response.data.fileUrl);
      }
    } catch (error) {
      console.log('Could not fetch resume URL', error);
    }
  }, []);

  React.useEffect(() => {
    fetchResume();
  }, [fetchResume]);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setMessage({
        type: 'error',
        text: 'Resume upload must be a PDF file.',
      });
      return;
    }

    setResumeFile(file);
    setResumeFileName(file.name);
  };

  const clearResume = () => {
    setResumeFile(null);
    setResumeFileName(null);
  };

  const handleResumeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setMessage({ type: 'error', text: 'Please upload a resume PDF.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);

      const response = await axiosInstance.post('/resume', formData);
      setResumeUrl(response.data.fileUrl);
      setMessage({ type: 'success', text: 'Resume uploaded successfully!' });
      clearResume();
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: `Error: ${error.response?.data?.message ?? 'Failed to upload resume'}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume</CardTitle>
        <CardDescription>
          Upload or replace the resume shown on your portfolio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleResumeSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Resume PDF</Label>
            <label className="flex h-28 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-accent hover:bg-muted/50">
              <Upload className="mb-2 size-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Click to upload PDF
              </span>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleResumeChange}
              />
            </label>
            {resumeFileName && (
              <div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm">
                <span>{resumeFileName}</span>
                <Button type="button" variant="ghost" onClick={clearResume}>
                  Clear
                </Button>
              </div>
            )}
          </div>

          {resumeUrl && (
            <div className="rounded-lg border border-border bg-card px-4 py-3 text-sm">
              <p className="font-medium">Current resume is available.</p>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                View current resume
              </a>
            </div>
          )}

          <Button
            type="submit"
            className="w-full gap-2"
            disabled={isSubmitting}
          >
            <Plus className="size-4" />
            {isSubmitting ? 'Uploading...' : 'Upload Resume'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
