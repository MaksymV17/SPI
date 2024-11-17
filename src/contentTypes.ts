export interface BaseContent {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    status: 'draft' | 'published' | 'archived';
  }
  
  // Розширення для типу Article
  export interface Article extends BaseContent {
    title: string;
    content: string;
    author: string;
    tags?: string[];
  }
  
  // Розширення для типу Product
  export interface Product extends BaseContent {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
  }