export interface Work {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  details: {
    client?: string;
    role?: string;
    duration?: string;
    description: string;
  };
}
