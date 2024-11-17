// Базовий тип для валідатора
export type Validator<T> = {
    validate: (data: T) => ValidationResult;
  };
  
  // Результат валідації
  export type ValidationResult = {
    isValid: boolean;
    errors?: string[];
  };
  
  // Композитний валідатор для різних типів контенту
  export function compositeValidator<T>(validators: Validator<T>[]): Validator<T> {
    return {
      validate: (data: T): ValidationResult => {
        const results = validators.map((validator) => validator.validate(data));
        const allValid = results.every((result) => result.isValid);
        const errors = results.map((result) => result.errors || []).reduce((acc, curr) => acc.concat(curr), []);
        return { isValid: allValid, errors: allValid ? undefined : errors };
      },
    };
  }
  