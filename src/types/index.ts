export interface Media {
  id: string;
  filename: string;
  filepath: string;
  mimetype: string;
  category: string;
  alt: string;
  sortOrder: number;
  featured: boolean;
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}
