// Базовий тип для товару
type BaseProduct = {
    id: number;
    name: string;
    price: number;
    description?: string; // Опис товару
    stock: number;        // Кількість на складі
  };
  
  // Специфічний тип для електроніки
  type Electronics = BaseProduct & {
    category: 'electronics';
    warrantyPeriod: number; // Термін гарантії в місяцях
  };
  
  // Специфічний тип для одягу
  type Clothing = BaseProduct & {
    category: 'clothing';
    size: string;        // Розмір одягу (наприклад, S, M, L)
    material: string;    // Матеріал, з якого виготовлено одяг
  };
  
  // Специфічний тип для книг
  type Book = BaseProduct & {
    category: 'books';
    author: string;      // Автор книги
    genre: string;       // Жанр книги
  };
  
  // Функція для пошуку товару за ID
  const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
    return products.find(product => product.id === id);
  };
  
  // Функція для фільтрації товарів за ціною
  const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
    return products.filter(product => product.price <= maxPrice);
  };
  
  // Тип для елемента кошика
  type CartItem<T> = {
    product: T;
    quantity: number;
  };
  
  // Додавання товару в кошик
  const addToCart = <T extends BaseProduct>(
    cart: CartItem<T>[],
    product: T,
    quantity: number
  ): CartItem<T>[] => {
    // Знайдемо чи товар вже є в кошику
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      // Якщо товар є, збільшуємо його кількість
      existingItem.quantity += quantity;
    } else {
      // Якщо товару немає, додаємо його як новий елемент
      cart.push({ product, quantity });
    }
    return cart;
  };
  
  // Підрахунок загальної вартості кошика
  const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };
  
  // Створення тестових даних
  const electronics: Electronics[] = [
    {
      id: 1,
      name: "Телефон",
      price: 10000,
      category: 'electronics',
      warrantyPeriod: 12,
      stock: 50
    }
  ];
  
  const clothing: Clothing[] = [
    {
      id: 2,
      name: "Футболка",
      price: 500,
      category: 'clothing',
      size: "M",
      material: "Cotton",
      stock: 100
    }
  ];
  
  // Тестування функцій
  const phone = findProduct(electronics, 1);
  const cart: CartItem<Electronics | Clothing>[] = [];
  if (phone) {
    addToCart(cart, phone, 1);
  }
  
  const total = calculateTotal(cart);
  console.log("Кошик:", cart);
  console.log("Загальна вартість:", total); // Очікуваний результат: Загальна вартість: 10000