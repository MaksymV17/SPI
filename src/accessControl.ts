import { BaseContent } from '.';

  // Визначення ролей
  export type Role = 'admin' | 'editor' | 'viewer';
  
  // Права доступу
  export type Permission = {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
  
  // Система контролю доступу
  export type AccessControl<T extends BaseContent> = {
    role: Role;
    permissions: {
      [key in keyof T]: Permission;
    };
  };
  