const navNumbers = document.querySelector('.nav__numbers');
export let activePage;

const addNavNumbers = (counter) => {
    const numberItem = document.createElement('button');
    numberItem.className = 'nav__number';
    numberItem.innerHTML = counter;
    numberItem.onclick = () => setPage(counter);
    navNumbers.appendChild(numberItem);
}

export function getPaginationNumbers() {
    navNumbers.innerHTML = "";
    const postItems = document.querySelectorAll('.post');
    let postCount = postItems.length
    let pageCount = Math.ceil(postCount / 10);
    for (let i = 1; i <= pageCount; i++) {
        addNavNumbers(i);
    }
}
export function setPage(pageNumber = 1) {
    activePage = pageNumber;
    const lowerPage = (pageNumber - 1) * 10;
    const currentPage = (pageNumber) * 10;
    const postItems = document.querySelectorAll('.post');
    postItems.forEach((elem, idx) => {
        elem.classList.add('hidden');
        if (idx >= lowerPage && idx < currentPage) {
            elem.classList.remove('hidden');
        }
    })
    setNumberActive(activePage);
}

function setNumberActive(activePage) {
    const paginationNumbers = document.querySelectorAll('.nav__number');
    for (let i = 0; i < paginationNumbers.length; i++) {
        paginationNumbers[i].classList.remove("nav__number_active");
    }
    paginationNumbers[activePage - 1].classList.add('nav__number_active')
}