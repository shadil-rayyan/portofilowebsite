
export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  imageHint: string;
  tags: string[];
  category: string;
  github?: string;
  webapp?: string;
  video?: string;
}
