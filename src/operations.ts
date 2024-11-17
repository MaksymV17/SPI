import { BaseContent } from '.';

// Generic тип для операцій з контентом
export type ContentOperations<T extends BaseContent> = {
    create: (data: T) => T;
    read: (id: string) => T | undefined;
    update: (id: string, data: Partial<T>) => T | undefined;
    delete: (id: string) => boolean;
  };
  
  