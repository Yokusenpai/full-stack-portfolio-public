export type Viewport = {
  themeColor: { media: string; color: string }[];
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f8f8' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
};
