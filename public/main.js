const hambMenu = document.querySelector('.icon');
const ul = document.querySelector('ul')
hambMenu.addEventListener('click',()=> {
ul.classList.toggle("hidden");
hambMenu.classList.toggle("open")
})

