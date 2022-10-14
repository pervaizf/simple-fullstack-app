const hambMenu = document.querySelector('.icon');
const ul = document.querySelector('ul')
hambMenu.addEventListener('click',()=> {
ul.classList.toggle("hidden");
hambMenu.classList.toggle("open")
})

// button functionality
document.querySelector('#main').addEventListener('click', showQuote)
function showQuote(){
    document.querySelector('.name').classList.toggle('hide')
    document.querySelector('.quote').classList.toggle('hide')
}
