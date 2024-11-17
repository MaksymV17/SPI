import { BaseContent } from '.'; 

// Система версіонування
export type Versioned<T extends BaseContent> = T & {
    version: number;
    previousVersions: Array<T & { version: number }>;
  
    saveVersion: () => void;
  };
  
  // Реалізація функції для версіонування контенту
  export function createVersionedContent<T extends BaseContent>(content: T): Versioned<T> {
    let version = 1;
    const previousVersions: Array<T & { version: number }> = [];
  
    return {
      ...content,
      version,
      previousVersions,
      saveVersion() {
        previousVersions.push({ ...content, version });
        version++;
      },
    };
  }
  