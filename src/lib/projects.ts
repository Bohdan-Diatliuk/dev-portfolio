import data from './projects.json';

export type Project = {
    id: number;
    slug: string;
    title: string;
    description: string;
    category: string[];
    stack: string[];
}

export const projects: Project[] = data;