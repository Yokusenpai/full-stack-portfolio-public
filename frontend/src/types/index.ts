export interface Project{
    id: number;
    title: string;
    desc: string;
    imageUrl: string;
    tags: string[];
    liveUrl?: string;
    githubUrl: string;
}

export interface Artwork{
    id: number;
    imageUrl: string;
    snsLink?: string;
    aspectRatio: 'portrait' | 'landscape' | 'square';
}