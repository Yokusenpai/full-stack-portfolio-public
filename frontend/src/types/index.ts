export interface Project{
    _id: string;
    title: string;
    desc: string;
    imageUrl: string;
    tags: string[];
    liveUrl?: string;
    githubUrl: string;
}

export interface Artwork{
    _id: string;
    imageUrl: string;
    snsLink?: string;
    aspectRatio: 'portrait' | 'landscape' | 'square';
}