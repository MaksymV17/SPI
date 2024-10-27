// Тип для стилів фону
type BackgroundStyle = {
    backgroundColor: string;
};

// Тип для елементів з кнопкою прокрутки
type ScrollButtonElements = {
    header: HTMLElement | null;
    scrollTopBtn: HTMLButtonElement | null;
};

// Тип для параметрів прокрутки
type ScrollOption = {
    top: number;
    behavior: ScrollBehavior;
};

// Модальне вікно
const openModalBtn: HTMLButtonElement | null = document.getElementById('open-modal-btn') as HTMLButtonElement | null;
const closeModalBtn: HTMLButtonElement | null = document.getElementById('close-modal-btn') as HTMLButtonElement | null;
const modal: HTMLElement | null = document.getElementById('modal');
const modalOverlay: HTMLElement | null = document.getElementById('modal-overlay');

openModalBtn?.addEventListener('click', () => {
    if (modal && modalOverlay) {
        modal.classList.add('show');
        modalOverlay.style.display = 'block';
    }
});

closeModalBtn?.addEventListener('click', () => {
    if (modal && modalOverlay) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);  // Затримка для плавного закриття
        modalOverlay.style.display = 'none';
    }
});

// Подія прокрутки (scroll)
window.addEventListener('scroll', () => {
    const elements: ScrollButtonElements = {
        header: document.querySelector('header'),
        scrollTopBtn: document.getElementById('scroll-top-btn') as HTMLButtonElement | null,
    };

    if (elements.header && elements.scrollTopBtn) {
        const style: BackgroundStyle = {
            backgroundColor: window.scrollY > 50 ? 'rgba(0, 0, 0, 0.8)' : '#333',
        };

        elements.header.style.backgroundColor = style.backgroundColor;
        elements.scrollTopBtn.style.display = window.scrollY > 50 ? 'block' : 'none';
    }
});

// Прокрутка до початку сторінки
const scrollTopBtn: HTMLButtonElement | null = document.getElementById('scroll-top-btn') as HTMLButtonElement | null;

scrollTopBtn?.addEventListener('click', () => {
    const scrollOption: ScrollOption = {
        top: 0,
        behavior: 'smooth',
    };
    window.scrollTo(scrollOption);
});

// Тип для постів
type Post = {
    id: number;
    title: string;
    body: string;
};

// Fetch API для отримання даних з jsonplaceholder
const dataContainer: HTMLElement | null = document.getElementById('data-container');

async function fetchData(): Promise<void> {
    try {
        const response: Response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data: Post[] = await response.json();

        if (dataContainer) {
            data.slice(0, 5).forEach((post) => {
                const postElement: HTMLElement = document.createElement('div');
                postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
                dataContainer.appendChild(postElement);
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
