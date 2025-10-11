// src/types.ts
// This file will be the single source of truth for your data structures.

export interface ProjectAttributes {
    Title: string;
    Summary: string;
    Role: string;
    Foto: { 
      data: { 
        attributes: { 
          url: string; 
          alternativeText: string 
        } 
      } 
    };
    Tools: { Text: string }[];
    case_study: { 
      data: { 
        attributes: { 
          slug: string 
        } 
      } | null
    };
  }
  
  export interface Project {
    id: number;
    attributes: ProjectAttributes;
  }
  