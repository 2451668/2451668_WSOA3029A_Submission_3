//Code for a shadow toggling-function when the site scrolls - referenced from code provided by ChatGPT at OpenAI
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) { 
            header.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});