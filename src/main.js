"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Модальне вікно
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modal-overlay');
openModalBtn.addEventListener('click', () => {
    modal.classList.add('show');
    modalOverlay.style.display = 'block';
});
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300); // Затримка для плавного закриття
    modalOverlay.style.display = 'none';
});
// Подія прокрутки (scroll)
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        scrollTopBtn.style.display = 'block'; // Показуємо кнопку "Прокрутити вгору"
    }
    else {
        header.style.backgroundColor = '#333';
        scrollTopBtn.style.display = 'none'; // Ховаємо кнопку
    }
});
// Прокрутка до початку сторінки
const scrollTopBtn = document.getElementById('scroll-top-btn');
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Fetch API для отримання даних з jsonplaceholder
const dataContainer = document.getElementById('data-container');
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://jsonplaceholder.typicode.com/posts');
            const data = yield response.json();
            data.slice(0, 5).forEach((post) => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
                dataContainer.appendChild(postElement);
            });
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    });
}
fetchData();
