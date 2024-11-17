// Базовий тип для контенту
export interface BaseContent {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  status: 'draft' | 'published' | 'archived';
}

// Визначення інтерфейсу для статті
export interface Article extends BaseContent {
  title: string;
  body: string;
  author: string;
  tags?: string[];
}

// Тип для версійованих об'єктів
export type Versioned<T> = T & {
  version: number;
  previousVersions: Array<T & { version: number }>;
  saveVersion: () => void;
};

// Функція для створення нової версії
export function createVersion<T>(content: Versioned<T>): Versioned<T> {
  const updatedContent = { ...content, version: content.version + 1 };
  updatedContent.previousVersions.push(content);
  return updatedContent;
}

// Валідація статті
export const articleValidator = {
  validate: (article: Article) => {
    const errors: string[] = [];
    if (!article.title) errors.push('Title is required');
    if (!article.body) errors.push('Body is required');
    if (!article.author) errors.push('Author is required');
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
};

// Приклад використання

const initialArticle: Versioned<Article> = {
  id: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'draft',
  title: 'First Article',
  body: 'This is the body of the first article',
  author: 'Author',
  tags: ['TypeScript', 'Programming'],
  version: 1,
  previousVersions: [],
  saveVersion() {
    this.previousVersions.push({ ...this, version: this.version });
    this.version++;
  }
};

// Створення нової версії
const updatedArticle = createVersion(initialArticle);

// Валідація статті
const validationResult = articleValidator.validate(updatedArticle);

console.log('New Version:', updatedArticle);
console.log('Validation Result:', validationResult);
