// Project Types
export interface Project {
    id: string;
    title: string;
    description: string;
    content: string;
    image: string;
    learningOutcomes: string[];
  }
  
  // Contact Form Types
  export interface ContactFormValues {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    message: string;
  }
  
  // Education Types
  export interface Certificate {
    title: string;
    url: string;
    certNumber?: number;
  }
  
  // Navigation Types
  export interface NavItem {
    id: string;
    title: string;
    path: string;
  }