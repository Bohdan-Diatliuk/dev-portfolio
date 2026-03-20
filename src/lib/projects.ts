import data from './projects.json';

export type Project = {
    id: number;
    slug: string;
    title: string;
    titleD: string;
    description: string;
    category: string[];
    stack: string[];
    github: string;
    demo: string;
    feedback: string;
    image: string;
    images: string[];
}

export const projects: Project[] = data;